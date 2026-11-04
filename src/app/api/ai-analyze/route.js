import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

// ── Model fallback chain (vision-capable models) ─────────────────
// Using models confirmed available for this API key
const VISION_MODELS = [
  "gemini-2.5-flash",       // Primary: fast multimodal
  "gemini-2.5-flash-lite",  // Fallback: lighter, still multimodal
  "gemini-flash-latest",    // Last resort: alias for latest flash
];

const ANALYSIS_PROMPT = `You are an expert computer vision AI. Analyze the provided image carefully and return ONLY valid JSON (no markdown, no code fences) with this exact structure:

{
  "detectedObjects": [
    {
      "label": "object name (lowercase, simple)",
      "confidence": 0.85,
      "boundingBox": { "x": 0.1, "y": 0.05, "width": 0.45, "height": 0.6 },
      "description": "one brief sentence about this object"
    }
  ],
  "primaryObject": "main subject label",
  "sceneContext": "One sentence describing the overall scene",
  "overallConfidence": 0.85,
  "uncertaintyFactors": ["list any factors causing uncertainty, e.g. blur, unusual angle, occlusion"],
  "reasoning": "Step-by-step visual analysis: what features you see, why you identified objects as such, what makes you confident or uncertain"
}

Rules:
- Detect 1-4 main objects (do not over-detect)
- Bounding box coordinates are normalized 0-1 (x, y from top-left, width, height as fractions)
- Be HONEST with confidence scores — blurry, unusual angle, or ambiguous images should score below 0.75
- If the main subject is unclear or could be multiple things, set overallConfidence below 0.6
- reasoning must be 2-4 sentences showing your visual thought process
- uncertaintyFactors should be [] when fully confident`;

const buildCorrectionPrompt = (correction, previousAnalysis) => `
You previously analyzed an image and returned:
${JSON.stringify(previousAnalysis, null, 2)}

A human expert has now corrected you. They drew a bounding box at:
x: ${correction.box.x.toFixed(3)}, y: ${correction.box.y.toFixed(3)},
width: ${correction.box.width.toFixed(3)}, height: ${correction.box.height.toFixed(3)}

And labeled that region as: "${correction.label}"
Human note: "${correction.note || "No additional note"}"

Please re-analyze the same image with this correction in mind.
Return ONLY valid JSON with the same structure as before, but:
- Include the human-corrected object with high confidence (0.88–0.97 range)
- Update reasoning to explain how the human correction improved your understanding
- Set overallConfidence above 0.85 since a human has validated the key object
- Add "humanCorrected": true at the top level of the JSON`;

export async function POST(req) {
  try {
    const apiKey = process.env.GOOGLE_AI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GOOGLE_AI_API_KEY not configured in environment." },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const imageFile = formData.get("image");
    const correctionRaw = formData.get("correction");
    const previousAnalysisRaw = formData.get("previousAnalysis");

    if (!imageFile) {
      return NextResponse.json({ error: "No image provided." }, { status: 400 });
    }

    const imageBytes = await imageFile.arrayBuffer();
    const imageBase64 = Buffer.from(imageBytes).toString("base64");
    const mimeType = imageFile.type || "image/jpeg";

    let prompt = ANALYSIS_PROMPT;
    if (correctionRaw && previousAnalysisRaw) {
      prompt = buildCorrectionPrompt(
        JSON.parse(correctionRaw),
        JSON.parse(previousAnalysisRaw)
      );
    }

    const ai = new GoogleGenAI({ apiKey });
    let lastError = null;

    // ── Try each vision model in order ───────────────────────────
    for (const modelId of VISION_MODELS) {
      try {
        const response = await ai.models.generateContent({
          model: modelId,
          contents: [
            {
              parts: [
                { inlineData: { mimeType, data: imageBase64 } },
                { text: prompt },
              ],
            },
          ],
        });

        const rawText =
          response.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

        // Strip accidental markdown fences
        const jsonText = rawText
          .replace(/^```json\s*/i, "")
          .replace(/^```\s*/i, "")
          .replace(/```\s*$/i, "")
          .trim();

        let parsed;
        try {
          parsed = JSON.parse(jsonText);
        } catch {
          const match = jsonText.match(/\{[\s\S]*\}/);
          if (match) {
            parsed = JSON.parse(match[0]);
          } else {
            throw new Error("Could not parse model response as JSON.");
          }
        }

        return NextResponse.json({
          success: true,
          modelUsed: modelId,
          analysis: parsed,
        });
      } catch (err) {
        console.error(`[ai-analyze] Model ${modelId} failed:`, err.message);
        lastError = err;
        // continue to next model
      }
    }

    // All models failed
    return NextResponse.json(
      { error: lastError?.message || "All vision models failed." },
      { status: 500 }
    );
  } catch (err) {
    console.error("[ai-analyze] Unexpected error:", err);
    return NextResponse.json(
      { error: err.message || "Unexpected server error." },
      { status: 500 }
    );
  }
}
