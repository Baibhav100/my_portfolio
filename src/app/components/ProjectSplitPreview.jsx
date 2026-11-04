"use client";

import React, { useState, useEffect } from "react";
import { useProjectPreview } from "@/context/ProjectPreviewContext";
import { X, ExternalLink } from "lucide-react";

const ProjectSplitPreview = () => {
  const { activeUrl, activeProject, closePreview } = useProjectPreview();
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  // Reset loading/error whenever activeUrl changes
  useEffect(() => {
    setIsLoading(true);
    setLoadError(false);
  }, [activeUrl]);

  if (!activeUrl) return null;

  // Use the local proxy for GitHub URLs to bypass X-Frame-Options: deny header
  const iframeSrc = activeUrl.includes("github.com")
    ? `/api/proxy?url=${encodeURIComponent(activeUrl)}`
    : activeUrl;

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setLoadError(true);
  };

  return (
    <div className="relative w-full h-full bg-[#0d1117] overflow-hidden select-none">
      {/* ─── ONLY A Cross Symbol on Top Right ─── */}
      <button
        onClick={closePreview}
        aria-label="Close Preview"
        title="Close"
        className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-black/75 hover:bg-black text-white/80 hover:text-white backdrop-blur-md border border-white/20 shadow-2xl transition-all duration-200 hover:scale-110 active:scale-95 group"
      >
        <X className="w-5 h-5 stroke-[2.5] transition-transform duration-200 group-hover:rotate-90" />
      </button>

      {/* ─── Loading Indicator ─── */}
      {isLoading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0d1117]/95 pointer-events-none gap-3">
          <div className="w-10 h-10 border-[3px] border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
          <p className="text-white/50 text-sm font-medium tracking-wide">Loading preview…</p>
        </div>
      )}

      {/* ─── Error / Blocked Fallback ─── */}
      {loadError && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#0d1117] gap-4 px-6 text-center">
          <div className="text-5xl">🚫</div>
          <h3 className="text-white font-semibold text-lg">Preview Unavailable</h3>
          <p className="text-white/50 text-sm max-w-xs">
            This site doesn&apos;t allow embedding. Open it directly in a new tab.
          </p>
          <a
            href={activeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-primary-500 hover:bg-primary-400 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Open in New Tab
          </a>
        </div>
      )}

      {/* ─── Full Bleed Iframe ─── */}
      <iframe
        key={activeUrl}
        src={iframeSrc}
        title="Preview"
        onLoad={handleLoad}
        onError={handleError}
        className="w-full h-full border-0 bg-white"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-top-navigation-by-user-activation"
        allow="clipboard-write; fullscreen"
      />
    </div>
  );
};

export default ProjectSplitPreview;
