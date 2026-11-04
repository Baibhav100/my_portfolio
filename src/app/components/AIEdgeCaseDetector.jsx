"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload, Brain, AlertTriangle, CheckCircle2, RotateCcw,
  Sparkles, ChevronRight, Pencil, Tag, Send, History,
  Eye, Zap, Target, Info
} from "lucide-react";

const CONFIDENCE_THRESHOLD = 0.75;

// ─── Helpers ─────────────────────────────────────────────────
const confidenceColor = (score) => {
  if (score >= 0.85) return { text: "text-emerald-400", bg: "bg-emerald-500", border: "border-emerald-500/40", badge: "bg-emerald-500/20 text-emerald-300" };
  if (score >= 0.75) return { text: "text-yellow-400", bg: "bg-yellow-500", border: "border-yellow-500/40", badge: "bg-yellow-500/20 text-yellow-300" };
  if (score >= 0.5)  return { text: "text-orange-400", bg: "bg-orange-500", border: "border-orange-500/40", badge: "bg-orange-500/20 text-orange-300" };
  return { text: "text-red-400", bg: "bg-red-500", border: "border-red-500/40", badge: "bg-red-500/20 text-red-300" };
};

const formatLabel = (label) =>
  label ? label.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : "";

// ─── Sub-components ────────────────────────────────────────────

const ConfidenceBar = ({ label, confidence, description, index, isUncertain }) => {
  const colors = confidenceColor(confidence);
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.12 }}
      className={`p-3 rounded-xl border ${colors.border} bg-white/5`}
    >
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <Target className={`w-3.5 h-3.5 ${colors.text}`} />
          <span className="text-white text-sm font-semibold">{formatLabel(label)}</span>
          {isUncertain && <span className="text-xs px-1.5 py-0.5 rounded-full bg-orange-500/20 text-orange-300 font-medium">uncertain</span>}
        </div>
        <span className={`text-xs font-bold ${colors.text}`}>{Math.round(confidence * 100)}%</span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden mb-2">
        <motion.div
          className={`h-full ${colors.bg} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${confidence * 100}%` }}
          transition={{ duration: 0.8, delay: index * 0.12 + 0.2, ease: "easeOut" }}
        />
      </div>
      {description && <p className="text-white/50 text-xs leading-relaxed">{description}</p>}
    </motion.div>
  );
};

const ReasoningPanel = ({ reasoning, uncertaintyFactors }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20"
  >
    <div className="flex items-center gap-2 mb-2">
      <Brain className="w-4 h-4 text-blue-400" />
      <span className="text-blue-300 text-xs font-semibold uppercase tracking-wider">AI Reasoning</span>
    </div>
    <p className="text-white/70 text-sm leading-relaxed">{reasoning}</p>
    {uncertaintyFactors && uncertaintyFactors.length > 0 && (
      <div className="mt-3 flex flex-wrap gap-1.5">
        {uncertaintyFactors.map((f, i) => (
          <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-300 border border-orange-500/20">
            ⚠ {f}
          </span>
        ))}
      </div>
    )}
  </motion.div>
);

// ─── Bounding Box Canvas ───────────────────────────────────────
const BoundingBoxCanvas = ({ imageUrl, existingBoxes, onBoxDrawn }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPt, setStartPt] = useState(null);
  const [currentBox, setCurrentBox] = useState(null);

  const getRelativeCoords = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: Math.max(0, Math.min(1, (clientX - rect.left) / rect.width)),
      y: Math.max(0, Math.min(1, (clientY - rect.top) / rect.height)),
    };
  };

  // Draw on canvas whenever box changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const cw = canvas.width;
    const ch = canvas.height;

    // Draw existing AI bounding boxes (dimmed)
    existingBoxes?.forEach((obj) => {
      const { x, y, width, height } = obj.boundingBox || {};
      if (x == null) return;
      const colors = confidenceColor(obj.confidence);
      ctx.strokeStyle = obj.confidence >= CONFIDENCE_THRESHOLD ? "rgba(52,211,153,0.6)" : "rgba(251,146,60,0.6)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.strokeRect(x * cw, y * ch, width * cw, height * ch);

      // Label
      ctx.fillStyle = obj.confidence >= CONFIDENCE_THRESHOLD ? "rgba(52,211,153,0.8)" : "rgba(251,146,60,0.8)";
      ctx.font = "bold 11px sans-serif";
      ctx.fillText(`${formatLabel(obj.label)} ${Math.round(obj.confidence * 100)}%`, x * cw + 4, y * ch - 5);
    });

    // Draw user's current box
    if (currentBox) {
      const { x, y, w, h } = currentBox;
      ctx.setLineDash([6, 3]);
      ctx.strokeStyle = "#a855f7";
      ctx.lineWidth = 2.5;
      ctx.strokeRect(x * cw, y * ch, w * cw, h * ch);
      ctx.fillStyle = "rgba(168,85,247,0.12)";
      ctx.fillRect(x * cw, y * ch, w * cw, h * ch);

      // Corner handles
      const corners = [
        [x * cw, y * ch], [(x + w) * cw, y * ch],
        [x * cw, (y + h) * ch], [(x + w) * cw, (y + h) * ch]
      ];
      ctx.setLineDash([]);
      ctx.fillStyle = "#a855f7";
      corners.forEach(([cx, cy]) => {
        ctx.fillRect(cx - 4, cy - 4, 8, 8);
      });

      // Label placeholder
      ctx.fillStyle = "rgba(168,85,247,0.9)";
      ctx.font = "bold 12px sans-serif";
      ctx.fillText("✏ Your correction", x * cw + 6, y * ch + 18);
    }
  }, [currentBox, existingBoxes]);

  const onMouseDown = (e) => {
    e.preventDefault();
    const pt = getRelativeCoords(e, canvasRef.current);
    setIsDrawing(true);
    setStartPt(pt);
    setCurrentBox(null);
  };

  const onMouseMove = (e) => {
    if (!isDrawing || !startPt) return;
    e.preventDefault();
    const pt = getRelativeCoords(e, canvasRef.current);
    setCurrentBox({
      x: Math.min(startPt.x, pt.x),
      y: Math.min(startPt.y, pt.y),
      w: Math.abs(pt.x - startPt.x),
      h: Math.abs(pt.y - startPt.y),
    });
  };

  const onMouseUp = (e) => {
    e.preventDefault();
    setIsDrawing(false);
    if (currentBox && currentBox.w > 0.02 && currentBox.h > 0.02) {
      onBoxDrawn({
        x: currentBox.x,
        y: currentBox.y,
        width: currentBox.w,
        height: currentBox.h,
      });
    }
  };

  return (
    <div className="relative w-full" style={{ aspectRatio: "4/3", maxHeight: "320px" }}>
      <img
        src={imageUrl}
        alt="Analysis target"
        className="w-full h-full object-contain rounded-xl bg-black/50"
        style={{ position: "absolute", inset: 0 }}
      />
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="absolute inset-0 w-full h-full rounded-xl cursor-crosshair"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onTouchStart={onMouseDown}
        onTouchMove={onMouseMove}
        onTouchEnd={onMouseUp}
      />
      <div className="absolute top-2 left-2 px-2 py-1 rounded-lg bg-purple-600/80 backdrop-blur-sm text-white text-xs font-medium flex items-center gap-1.5">
        <Pencil className="w-3 h-3" /> Draw a box around the correct object
      </div>
    </div>
  );
};

// ─── Correction History ────────────────────────────────────────
const CorrectionHistory = ({ corrections }) => {
  if (corrections.length === 0) return null;
  return (
    <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10">
      <div className="flex items-center gap-2 mb-3">
        <History className="w-4 h-4 text-purple-400" />
        <span className="text-purple-300 text-xs font-semibold uppercase tracking-wider">Correction Log ({corrections.length})</span>
      </div>
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {corrections.map((c, i) => (
          <div key={c.id} className="flex items-center gap-3 text-xs text-white/50">
            <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center flex-shrink-0 font-bold">{i + 1}</span>
            <span className="text-white/30">AI said</span>
            <span className="text-orange-300">{formatLabel(c.aiPrediction)}</span>
            <ChevronRight className="w-3 h-3 text-white/20" />
            <span className="text-emerald-300 font-semibold">{formatLabel(c.label)}</span>
            <span className="ml-auto text-white/20">{new Date(c.timestamp).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Main Component ────────────────────────────────────────────
export default function AIEdgeCaseDetector() {
  const [phase, setPhase] = useState("idle");
  const [imageUrl, setImageUrl] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // HITL state
  const [drawnBox, setDrawnBox] = useState(null);
  const [correctionLabel, setCorrectionLabel] = useState("");
  const [correctionNote, setCorrectionNote] = useState("");
  const [isReanalyzing, setIsReanalyzing] = useState(false);

  // Correction history (localStorage)
  const [corrections, setCorrections] = useState(() => {
    if (typeof window === "undefined") return [];
    try { return JSON.parse(localStorage.getItem("ai-edge-corrections") || "[]"); }
    catch { return []; }
  });

  const fileInputRef = useRef(null);

  const primaryObj = analysis?.detectedObjects?.[0];
  const overallConf = analysis?.overallConfidence ?? 1;
  const isUncertain = overallConf < CONFIDENCE_THRESHOLD;

  // ── Analyze image ──
  const analyzeImage = useCallback(async (file, correction = null) => {
    setErrorMsg("");
    setPhase(correction ? "reanalyzing" : "processing");

    const formData = new FormData();
    formData.append("image", file);
    if (correction) {
      formData.append("correction", JSON.stringify(correction));
      formData.append("previousAnalysis", JSON.stringify(analysis));
    }

    try {
      const res = await fetch("/api/ai-analyze", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Analysis failed");
      }

      setAnalysis(data.analysis);
      const conf = data.analysis.overallConfidence ?? 1;
      setPhase(conf < CONFIDENCE_THRESHOLD ? "uncertain" : "confident");
    } catch (err) {
      setErrorMsg(err.message);
      setPhase("error");
    }
  }, [analysis]);

  // ── Handle file ──
  const handleFile = useCallback((file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setImageFile(file);
    setAnalysis(null);
    setDrawnBox(null);
    setCorrectionLabel("");
    setCorrectionNote("");
    analyzeImage(file);
  }, [analyzeImage]);

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  // ── Submit correction ──
  const handleSubmitCorrection = async () => {
    if (!correctionLabel.trim()) return;
    setIsReanalyzing(true);

    const correction = {
      box: drawnBox || { x: 0.1, y: 0.1, width: 0.8, height: 0.8 },
      label: correctionLabel.trim(),
      note: correctionNote.trim(),
    };

    // Save to history
    const entry = {
      id: Date.now(),
      label: correctionLabel.trim(),
      aiPrediction: primaryObj?.label,
      aiConfidence: overallConf,
      timestamp: new Date().toISOString(),
    };
    const updated = [entry, ...corrections].slice(0, 20);
    setCorrections(updated);
    try { localStorage.setItem("ai-edge-corrections", JSON.stringify(updated)); } catch {}

    await analyzeImage(imageFile, correction);
    setIsReanalyzing(false);
    setDrawnBox(null);
    setCorrectionLabel("");
    setCorrectionNote("");
  };

  // ── Paste from clipboard ──
  useEffect(() => {
    const onPaste = (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (const item of items) {
        if (item.type.startsWith("image/")) {
          handleFile(item.getAsFile());
          break;
        }
      }
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, [handleFile]);

  // ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#0d0d1a] to-[#0a0a0a] py-10 px-4">
      <div className="max-w-4xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            AI Edge-Case Detector · Human in the Loop
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Can the AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">handle uncertainty?</span>
          </h1>
          <p className="text-white/50 max-w-xl mx-auto text-sm leading-relaxed">
            Upload any image. Gemini Vision analyzes it and exposes its confidence. When the AI is uncertain, 
            <strong className="text-white/80"> you step in</strong> — draw a bounding box, label it, and watch the AI re-analyze with your correction.
          </p>
          <div className="flex justify-center gap-6 mt-4 text-xs text-white/30">
            <span className="flex items-center gap-1.5"><Zap className="w-3 h-3 text-yellow-400" /> Powered by Gemini 2.0 Flash</span>
            <span className="flex items-center gap-1.5"><Eye className="w-3 h-3 text-blue-400" /> Vision + Reasoning</span>
            <span className="flex items-center gap-1.5"><Brain className="w-3 h-3 text-purple-400" /> Human-in-the-Loop</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ── LEFT: Upload / Image + Canvas ── */}
          <div className="flex flex-col gap-4">

            {/* Upload Zone */}
            {phase === "idle" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => fileInputRef.current?.click()}
                onDrop={onDrop}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                className={`relative flex flex-col items-center justify-center gap-4 p-10 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-300
                  ${isDragging
                    ? "border-purple-400 bg-purple-500/10 scale-[1.02]"
                    : "border-white/15 hover:border-purple-500/50 hover:bg-white/5"
                  }`}
              >
                <div className={`p-4 rounded-2xl ${isDragging ? "bg-purple-500/20" : "bg-white/5"} transition-colors`}>
                  <Upload className={`w-8 h-8 ${isDragging ? "text-purple-400" : "text-white/40"}`} />
                </div>
                <div className="text-center">
                  <p className="text-white/70 font-medium mb-1">Drop an image or click to upload</p>
                  <p className="text-white/30 text-xs">or paste from clipboard (Ctrl+V) · JPG, PNG, WEBP, GIF</p>
                </div>
                <div className="flex gap-2 flex-wrap justify-center">
                  {["Try a blurry photo", "Try an unusual angle", "Try complex scenes"].map(hint => (
                    <span key={hint} className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/40">{hint}</span>
                  ))}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                />
              </motion.div>
            )}

            {/* Image Display with Canvas (after upload) */}
            {imageUrl && phase !== "idle" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-2xl overflow-hidden border border-white/10"
              >
                {phase === "uncertain" ? (
                  <BoundingBoxCanvas
                    imageUrl={imageUrl}
                    existingBoxes={analysis?.detectedObjects}
                    onBoxDrawn={setDrawnBox}
                  />
                ) : (
                  <div className="relative" style={{ aspectRatio: "4/3", maxHeight: "320px" }}>
                    <img
                      src={imageUrl}
                      alt="Uploaded"
                      className="w-full h-full object-contain bg-black/50"
                    />
                    {/* Overlay bounding boxes */}
                    {(phase === "confident" || phase === "reanalyzing") && analysis?.detectedObjects?.map((obj, i) => {
                      const bb = obj.boundingBox;
                      if (!bb) return null;
                      const colors = confidenceColor(obj.confidence);
                      return (
                        <div
                          key={i}
                          className={`absolute border-2 ${colors.border} rounded`}
                          style={{
                            left: `${bb.x * 100}%`,
                            top: `${bb.y * 100}%`,
                            width: `${bb.width * 100}%`,
                            height: `${bb.height * 100}%`,
                          }}
                        >
                          <span className={`absolute -top-6 left-0 px-1.5 py-0.5 text-xs font-bold rounded ${colors.badge}`}>
                            {formatLabel(obj.label)} {Math.round(obj.confidence * 100)}%
                          </span>
                        </div>
                      );
                    })}

                    {/* Processing overlay */}
                    {(phase === "processing" || phase === "reanalyzing") && (
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full border-2 border-purple-500/30 border-t-purple-400 animate-spin" />
                          <Brain className="w-5 h-5 text-purple-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        </div>
                        <p className="text-white/70 text-sm font-medium">
                          {phase === "reanalyzing" ? "Re-analyzing with your correction…" : "Gemini is analyzing…"}
                        </p>
                        <div className="flex gap-1">
                          {[0,1,2].map(i => (
                            <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-purple-400"
                              animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}

            {/* Try Another Button */}
            {imageUrl && phase !== "idle" && phase !== "processing" && (
              <button
                onClick={() => { setPhase("idle"); setImageUrl(null); setImageFile(null); setAnalysis(null); }}
                className="flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mx-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Try a different image
              </button>
            )}
          </div>

          {/* ── RIGHT: Results Panel ── */}
          <div className="flex flex-col gap-4">
            <AnimatePresence mode="wait">

              {/* Idle placeholder */}
              {phase === "idle" && (
                <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-full gap-4 p-8 rounded-2xl border border-white/8 bg-white/3 text-center"
                >
                  <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
                    {[
                      { icon: Brain, color: "text-purple-400", bg: "bg-purple-500/10", label: "LLM Vision Analysis" },
                      { icon: AlertTriangle, color: "text-orange-400", bg: "bg-orange-500/10", label: "Uncertainty Detection" },
                      { icon: Pencil, color: "text-blue-400", bg: "bg-blue-500/10", label: "Bounding Box Drawing" },
                      { icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/10", label: "Human Correction Loop" },
                    ].map(({ icon: Icon, color, bg, label }) => (
                      <div key={label} className={`p-3 rounded-xl ${bg} border border-white/8 flex flex-col items-center gap-2`}>
                        <Icon className={`w-5 h-5 ${color}`} />
                        <span className="text-white/50 text-xs text-center leading-tight">{label}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-white/25 text-xs">Upload an image to begin</p>
                </motion.div>
              )}

              {/* Processing */}
              {(phase === "processing" || phase === "reanalyzing") && (
                <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex flex-col justify-center h-full gap-4 p-6 rounded-2xl border border-white/8 bg-white/3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full border-2 border-purple-500/30 border-t-purple-400 animate-spin flex-shrink-0" />
                    <div>
                      <p className="text-white font-semibold text-sm">
                        {phase === "reanalyzing" ? "Re-analyzing with human correction…" : "Gemini Vision is reasoning…"}
                      </p>
                      <p className="text-white/40 text-xs mt-0.5">Analyzing visual features, detecting objects, computing confidence scores</p>
                    </div>
                  </div>
                  {[
                    "Extracting visual embeddings…",
                    "Identifying objects and context…",
                    "Computing confidence scores…",
                    "Generating reasoning trace…",
                  ].map((step, i) => (
                    <motion.div key={step} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.5 }}
                      className="flex items-center gap-2 text-xs text-white/40"
                    >
                      <div className="w-1 h-1 rounded-full bg-purple-400/60" />
                      {step}
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Error */}
              {phase === "error" && (
                <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex flex-col gap-3 p-6 rounded-2xl border border-red-500/30 bg-red-500/5"
                >
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    <span className="text-red-300 font-semibold">Analysis Error</span>
                  </div>
                  <p className="text-white/60 text-sm">{errorMsg}</p>
                  {errorMsg?.includes("GOOGLE_AI_API_KEY") && (
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                      <p className="text-yellow-300 text-xs font-medium mb-1 flex items-center gap-1.5"><Info className="w-3.5 h-3.5" /> Setup Required</p>
                      <p className="text-white/50 text-xs">Add <code className="bg-white/10 px-1 rounded">GOOGLE_AI_API_KEY=your_key</code> to your <code className="bg-white/10 px-1 rounded">.env.local</code> file.</p>
                    </div>
                  )}
                  <button onClick={() => imageFile && analyzeImage(imageFile)}
                    className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mt-1"
                  >
                    <RotateCcw className="w-4 h-4" /> Retry
                  </button>
                </motion.div>
              )}

              {/* ── CONFIDENT ── */}
              {phase === "confident" && analysis && (
                <motion.div key="confident" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="flex flex-col gap-4"
                >
                  {/* Status banner */}
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-emerald-300 font-semibold text-sm">AI is Confident</p>
                      <p className="text-white/50 text-xs">{analysis.sceneContext}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-emerald-400 font-bold text-lg">{Math.round(overallConf * 100)}%</div>
                      <div className="text-white/30 text-xs">confidence</div>
                    </div>
                  </div>

                  {/* Human-corrected badge */}
                  {analysis.humanCorrected && (
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                      <Sparkles className="w-4 h-4 text-purple-400" />
                      <span className="text-purple-300 text-xs font-medium">Improved by human correction · Confidence boosted</span>
                    </div>
                  )}

                  {/* Detected objects */}
                  <div className="space-y-2">
                    <p className="text-white/40 text-xs font-semibold uppercase tracking-wider">Detected Objects</p>
                    {analysis.detectedObjects?.map((obj, i) => (
                      <ConfidenceBar
                        key={i}
                        index={i}
                        label={obj.label}
                        confidence={obj.confidence}
                        description={obj.description}
                        isUncertain={obj.confidence < CONFIDENCE_THRESHOLD}
                      />
                    ))}
                  </div>

                  {/* Reasoning */}
                  <ReasoningPanel reasoning={analysis.reasoning} uncertaintyFactors={analysis.uncertaintyFactors} />

                  <CorrectionHistory corrections={corrections} />
                </motion.div>
              )}

              {/* ── UNCERTAIN / HITL ── */}
              {phase === "uncertain" && analysis && (
                <motion.div key="uncertain" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="flex flex-col gap-4"
                >
                  {/* Alert banner */}
                  <motion.div
                    animate={{ borderColor: ["rgba(251,146,60,0.3)", "rgba(251,146,60,0.7)", "rgba(251,146,60,0.3)"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-orange-500/10 border"
                  >
                    <AlertTriangle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-orange-300 font-semibold text-sm">🤔 AI is Uncertain!</p>
                      <p className="text-white/60 text-xs mt-0.5 leading-relaxed">
                        Overall confidence is only <strong className="text-orange-300">{Math.round(overallConf * 100)}%</strong>. 
                        The AI needs your help to identify the correct object.
                      </p>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <div className="text-orange-400 font-bold text-lg">{Math.round(overallConf * 100)}%</div>
                      <div className="text-white/30 text-xs">confidence</div>
                    </div>
                  </motion.div>

                  {/* AI's current best guess */}
                  <div className="space-y-2">
                    <p className="text-white/40 text-xs font-semibold uppercase tracking-wider">AI Best Guesses</p>
                    {analysis.detectedObjects?.slice(0, 2).map((obj, i) => (
                      <ConfidenceBar key={i} index={i} label={obj.label} confidence={obj.confidence}
                        description={obj.description} isUncertain={obj.confidence < CONFIDENCE_THRESHOLD} />
                    ))}
                  </div>

                  {/* Reasoning (showing uncertainty) */}
                  <ReasoningPanel reasoning={analysis.reasoning} uncertaintyFactors={analysis.uncertaintyFactors} />

                  {/* ── HITL Correction Form ── */}
                  <div className="p-4 rounded-xl bg-purple-500/8 border border-purple-500/25 space-y-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Pencil className="w-4 h-4 text-purple-400" />
                      <span className="text-purple-300 text-sm font-semibold">Step in & Correct the AI</span>
                    </div>
                    <p className="text-white/40 text-xs">
                      Draw a box around the object on the image (left panel), then type the correct label below.
                    </p>

                    {/* Box status */}
                    <div className={`flex items-center gap-2 text-xs px-3 py-2 rounded-lg ${drawnBox ? "bg-purple-500/15 text-purple-300 border border-purple-500/30" : "bg-white/5 text-white/30 border border-white/10"}`}>
                      <Target className="w-3.5 h-3.5" />
                      {drawnBox
                        ? `✓ Box drawn at (${Math.round(drawnBox.x*100)}%, ${Math.round(drawnBox.y*100)}%) — ${Math.round(drawnBox.width*100)}×${Math.round(drawnBox.height*100)}%`
                        : "No box drawn yet — draw on the image to the left"}
                    </div>

                    {/* Label input */}
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-white/30 flex-shrink-0" />
                      <input
                        value={correctionLabel}
                        onChange={(e) => setCorrectionLabel(e.target.value)}
                        placeholder="What is the correct object? (e.g. 'golden retriever')"
                        className="flex-1 bg-white/8 border border-white/15 rounded-lg px-3 py-2 text-sm text-white placeholder-white/25 focus:outline-none focus:border-purple-500/60 transition-colors"
                        onKeyDown={(e) => e.key === "Enter" && correctionLabel.trim() && handleSubmitCorrection()}
                      />
                    </div>

                    {/* Optional note */}
                    <input
                      value={correctionNote}
                      onChange={(e) => setCorrectionNote(e.target.value)}
                      placeholder="Optional: any context to help the AI? (e.g. 'taken in low light')"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white/60 placeholder-white/20 focus:outline-none focus:border-purple-500/40 transition-colors"
                    />

                    {/* Submit */}
                    <button
                      onClick={handleSubmitCorrection}
                      disabled={!correctionLabel.trim() || isReanalyzing}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm transition-colors"
                    >
                      {isReanalyzing ? (
                        <>
                          <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                          Re-analyzing with your correction…
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Submit Correction & Re-analyze
                        </>
                      )}
                    </button>
                  </div>

                  <CorrectionHistory corrections={corrections} />
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>

        {/* ── Concept explanation footer ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 p-5 rounded-2xl bg-white/3 border border-white/8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center"
        >
          {[
            { icon: Brain, color: "text-purple-400", title: "LLM Reasoning", desc: "Gemini 2.0 Flash analyzes the image and exposes its confidence scores and thought process" },
            { icon: AlertTriangle, color: "text-orange-400", title: "Uncertainty Detection", desc: "When confidence < 75%, the system pauses and triggers the human review workflow" },
            { icon: Sparkles, color: "text-emerald-400", title: "Human-in-the-Loop", desc: "User draws a bounding box, labels the object, and the AI re-analyzes with the correction context" },
          ].map(({ icon: Icon, color, title, desc }) => (
            <div key={title} className="flex flex-col items-center gap-2">
              <Icon className={`w-5 h-5 ${color}`} />
              <p className="text-white/80 text-sm font-semibold">{title}</p>
              <p className="text-white/35 text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

