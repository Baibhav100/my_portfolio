"use client";

import React, { useState } from "react";
import { Download, FileText, Sparkles, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useProjectPreview } from "@/context/ProjectPreviewContext";

const ResumeDownloadTicker = () => {
  const { isSplit, isExpanded, splitRatio } = useProjectPreview();
  const [downloaded, setDownloaded] = useState(false);

  // Hide if split preview is expanded to 100%
  if (isExpanded) return null;

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <aside
      aria-label="Download Resume Ticker"
      className="fixed z-40 top-1/2 -translate-y-1/2 transition-all duration-300 pointer-events-auto"
      style={
        isSplit
          ? { right: `calc(${100 - splitRatio}% + 0.75rem)` }
          : { right: "0.75rem" }
      }
    >
      <motion.a
        href="/baibhav.pdf"
        download="Baibhav_Rajkumar_Resume.pdf"
        onClick={handleDownload}
        title="Click to Download Baibhav's Resume (PDF)"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="group relative flex items-center gap-3 pl-3 pr-4 py-2.5 rounded-full bg-black/90 dark:bg-black/95 text-white border border-white/20 hover:border-white/50 backdrop-blur-xl shadow-2xl shadow-black/80 hover:shadow-white/10 transition-all duration-300 cursor-pointer overflow-hidden max-w-[280px] sm:max-w-[340px]"
      >
        {/* Subtle Next.js shimmer light across the ticker */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform pointer-events-none" />

        {/* Icon container */}
        <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white/10 border border-white/20 group-hover:bg-white/20 group-hover:border-white/40 transition-colors shrink-0">
          {downloaded ? (
            <Check className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
          ) : (
            <Download className="w-4 h-4 text-white group-hover:translate-y-0.5 transition-transform stroke-[2]" />
          )}
          {/* Active status pulse beacon */}
          <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
        </div>

        {/* Ticker Content */}
        <div className="flex flex-col min-w-0 pr-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-400">
              {downloaded ? "Downloading..." : "Resume"}
            </span>
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-white/10 text-neutral-300 font-mono font-medium">
              PDF
            </span>
          </div>

          {/* Marquee ticker row */}
          <div className="relative w-36 sm:w-48 overflow-hidden h-4 flex items-center">
            <div className="flex gap-4 whitespace-nowrap animate-ticker text-[10px] text-neutral-400 group-hover:text-neutral-200 font-medium tracking-tight">
              <span>✦ DOWNLOAD CV</span>
              <span>✦ 3+ YRS EXP</span>
              <span>✦ FULL STACK & AI</span>
              <span>✦ BAIBHAV RAJKUMAR</span>
              {/* Duplicate for seamless infinite loop */}
              <span>✦ DOWNLOAD CV</span>
              <span>✦ 3+ YRS EXP</span>
              <span>✦ FULL STACK & AI</span>
              <span>✦ BAIBHAV RAJKUMAR</span>
            </div>
          </div>
        </div>

        {/* Action arrow badge */}
        <div className="hidden sm:flex items-center justify-center pl-1 text-neutral-500 group-hover:text-white transition-colors">
          <FileText className="w-3.5 h-3.5" />
        </div>
      </motion.a>

      {/* Keyframe animation for ticker */}
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          display: flex;
          width: max-content;
          animation: ticker 12s linear infinite;
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }
      `}</style>
    </aside>
  );
};

export default ResumeDownloadTicker;

