import { GoogleGenAI } from "@google/genai";
import { portfolioChunks } from "@/data/portfolioChunks";

// ── Model chains ─────────────────────────────────────────────────
// Using models confirmed available for this API key
const GENERATION_MODELS = [
  "gemini-2.5-flash",       // Primary: fast, capable
  "gemini-2.5-flash-lite",  // Fallback: lighter
  "gemini-flash-latest",    // Last resort: stable alias
];
const EMBEDDING_MODEL = "gemini-embedding-2"; // Confirmed available

// ── In-memory embedding cache (server singleton) ─────────────────
// Survives across requests in the same Node.js process
const embeddingCache = new Map(); // chunkId → float[]

// ── Utility: cosine similarity ───────────────────────────────────
function cosineSim(a, b) {
  let dot = 0, magA = 0, magB = 0;
  for (let i = 0; i < a.length; i++) {
    dot  += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  return magA && magB ? dot / (Math.sqrt(magA) * Math.sqrt(magB)) : 0;
}

// ── Embed a single text string ───────────────────────────────────
async function embedText(ai, text) {
  const res = await ai.models.embedContent({
    model: EMBEDDING_MODEL,
    contents: { parts: [{ text }] },
  });
  // gemini-embedding-2 returns embeddings[0].values
  return res.embeddings?.[0]?.values ?? res.embedding?.values ?? [];
}

// ── Pre-compute (or load from cache) all chunk embeddings ─────────
async function ensureChunkEmbeddings(ai) {
  const missing = portfolioChunks.filter((c) => !embeddingCache.has(c.id));
  if (!missing.length) return;

  // Embed missing chunks in parallel (batches of 5 to avoid rate limits)
  const batchSize = 5;
  for (let i = 0; i < missing.length; i += batchSize) {
    const batch = missing.slice(i, i + batchSize);
    await Promise.all(
      batch.map(async (chunk) => {
        try {
          const vec = await embedText(ai, chunk.content);
          embeddingCache.set(chunk.id, vec);
        } catch (err) {
          console.error(`[RAG] Failed to embed chunk "${chunk.id}":`, err.message);
        }
      })
    );
  }
}

// ── Retrieve top-k most relevant chunks for a query ──────────────
async function retrieveChunks(ai, query, topK = 4) {
  await ensureChunkEmbeddings(ai);

  let queryVec;
  try {
    queryVec = await embedText(ai, query);
  } catch (err) {
    console.error("[RAG] Query embedding failed:", err.message);
    // Fallback: return all chunks (degrade gracefully)
    return portfolioChunks.slice(0, topK);
  }

  const scored = portfolioChunks
    .map((chunk) => {
      const vec = embeddingCache.get(chunk.id);
      return {
        ...chunk,
        score: vec ? cosineSim(queryVec, vec) : 0,
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);

  return scored;
}

// ── Build augmented system prompt ────────────────────────────────
function buildAugmentedPrompt(retrievedChunks, humanCorrection = null) {
  const context = retrievedChunks
    .map((c, i) => `[${i + 1}] (${c.category}) ${c.content}`)
    .join("\n\n");

  const correctionBlock = humanCorrection
    ? `\n\nHUMAN CORRECTION / CLARIFICATION:\nThe user provided this additional context: "${humanCorrection}"\nPrioritise this over anything else when forming your answer.`
    : "";

  return `You are Baibhav Rajkumar's AI portfolio assistant. Answer questions about Baibhav using ONLY the retrieved context below. Be concise, friendly, and professional.

RETRIEVED CONTEXT (use only this):
${context}${correctionBlock}

STRICT RULES:
1. Only use information from the context above — do not invent or hallucinate details.
2. If the context doesn't contain a clear answer, say "I don't have specific information about that, but feel free to reach out to Baibhav directly at baibhavrajkumar1999@gmail.com."
3. Use markdown (bullet points, bold) for structured answers.
4. Keep responses concise: 2-4 sentences for simple questions, structured lists for complex ones.
5. Speak as Baibhav's assistant (not as Baibhav himself).
6. End your response with exactly one line: CONFIDENCE:[0.00-1.00] — your honest confidence in the answer based on how well the retrieved context covers the question. Do NOT explain this line; just output it.`;
}

// ── Uncertainty phrases for HITL detection (client-side backup) ──
// These are also exported so the frontend can detect them
export const UNCERTAINTY_PHRASES = [
  "i don't have specific information",
  "i'm not sure",
  "not entirely clear",
  "i cannot confirm",
  "i don't know",
  "feel free to reach out",
  "might be",
  "possibly",
  "i'm uncertain",
];

/**
 * POST /api/chat
 * Body: {
 *   messages: [{role: "user"|"model", text: string}],
 *   humanCorrection?: string   // HITL: user's clarification
 * }
 * Returns SSE stream: chunks with type "meta"|"chunk"|"done"|"error"
 */
export async function POST(req) {
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "GOOGLE_AI_API_KEY not set." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { messages = [], humanCorrection = null } = body;
  if (!messages.length) {
    return new Response(JSON.stringify({ error: "No messages provided." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const ai = new GoogleGenAI({ apiKey });
  const latestQuery = messages[messages.length - 1].text;

  // ── RAG: retrieve relevant chunks ────────────────────────────
  let retrievedChunks = [];
  let retrievalError = null;
  try {
    retrievedChunks = await retrieveChunks(ai, latestQuery, 4);
  } catch (err) {
    retrievalError = err.message;
    retrievedChunks = portfolioChunks.slice(0, 4); // hard fallback
  }

  const systemPrompt = buildAugmentedPrompt(retrievedChunks, humanCorrection);

  // Build Gemini history (all messages except last)
  const history = messages.slice(0, -1).map((m) => ({
    role: m.role === "user" ? "user" : "model",
    parts: [{ text: m.text }],
  }));

  // ── Streaming SSE response ────────────────────────────────────
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (payload) =>
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(payload)}\n\n`)
        );

      // Send retrieval metadata upfront
      send({
        type: "meta",
        retrievedChunks: retrievedChunks.map((c) => ({
          id: c.id,
          category: c.category,
          score: c.score?.toFixed(3),
        })),
        retrievalError,
      });

      // ── Try each generation model in order ──────────────────
      for (let i = 0; i < GENERATION_MODELS.length; i++) {
        const modelId = GENERATION_MODELS[i];
        try {
          send({ type: i === 0 ? "model" : "fallback", model: modelId });

          const chat = ai.chats.create({
            model: modelId,
            config: { systemInstruction: systemPrompt },
            history,
          });

          const result = await chat.sendMessageStream({
            message: latestQuery,
          });

          let accumulated = "";
          for await (const chunk of result) {
            const text = chunk.text;
            if (text) {
              accumulated += text;
              send({ type: "chunk", text });
            }
          }

          // ── Parse confidence from the CONFIDENCE: line ───────
          const confMatch = accumulated.match(/CONFIDENCE:\s*([0-9.]+)/i);
          const confidence = confMatch ? parseFloat(confMatch[1]) : null;
          const isUncertain =
            confidence !== null
              ? confidence < 0.65
              : UNCERTAINTY_PHRASES.some((p) =>
                  accumulated.toLowerCase().includes(p)
                );

          send({ type: "done", confidence, isUncertain });
          controller.close();
          return;
        } catch (err) {
          console.error(`[chat] ${modelId} failed:`, err.message);
          if (i === GENERATION_MODELS.length - 1) {
            send({
              type: "error",
              message: "All AI models are temporarily unavailable. Please try again shortly.",
            });
            controller.close();
          }
        }
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
