"use client";

import React, { useState, useEffect, useRef } from "react";
import { useProjectPreview } from "@/context/ProjectPreviewContext";
import { GripVertical } from "lucide-react";

const SplitDivider = () => {
  const { splitRatio, setSplitRatio, isExpanded } = useProjectPreview();
  const [isDragging, setIsDragging] = useState(false);
  const dividerRef = useRef(null);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e) => {
      const windowWidth = window.innerWidth;
      if (windowWidth <= 0) return;
      const newRatio = (e.clientX / windowWidth) * 100;
      setSplitRatio(newRatio);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    const handleTouchMove = (e) => {
      if (!e.touches || e.touches.length === 0) return;
      const touch = e.touches[0];
      const windowWidth = window.innerWidth;
      const newRatio = (touch.clientX / windowWidth) * 100;
      setSplitRatio(newRatio);
    };

    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isDragging, setSplitRatio]);

  if (isExpanded) return null;

  return (
    <div
      ref={dividerRef}
      onMouseDown={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onTouchStart={() => setIsDragging(true)}
      onDoubleClick={() => setSplitRatio(50)}
      title="Drag to resize panels • Double-click to reset (50%)"
      className={`relative z-40 hidden lg:flex items-center justify-center w-2 -mx-1 cursor-col-resize group transition-colors duration-200 select-none ${
        isDragging
          ? "bg-gradient-to-b from-primary-500 via-secondary-500 to-primary-600 shadow-lg shadow-purple-500/50"
          : "bg-transparent hover:bg-neutral-200 dark:hover:bg-neutral-800"
      }`}
    >
      {/* Background line */}
      <div
        className={`w-[1px] h-full transition-colors duration-200 ${
          isDragging
            ? "bg-white/80"
            : "bg-neutral-200 dark:bg-white/10 group-hover:bg-primary-500"
        }`}
      />

      {/* Pill Handle */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 flex items-center justify-center w-5 h-12 rounded-full border shadow-xl transition-all duration-200 ${
          isDragging
            ? "bg-primary-600 border-white text-white scale-110 shadow-primary-500/50"
            : "bg-white dark:bg-[#1a1a1a] border-neutral-300 dark:border-neutral-700 text-neutral-400 group-hover:text-primary-500 group-hover:border-primary-400 group-hover:scale-105"
        }`}
      >
        <GripVertical className="w-3.5 h-3.5" />
      </div>

      {/* Quick 50% Reset Badge on hover while dragging */}
      {isDragging && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 px-2 py-1 text-[10px] font-mono font-semibold rounded bg-neutral-900/90 text-white backdrop-blur shadow border border-white/10 whitespace-nowrap pointer-events-none">
          {Math.round(splitRatio)}% / {Math.round(100 - splitRatio)}%
        </div>
      )}
    </div>
  );
};

export default SplitDivider;

