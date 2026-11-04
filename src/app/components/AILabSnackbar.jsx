"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, X } from "lucide-react";
import { useProjectPreview } from "@/context/ProjectPreviewContext";

const AILabSnackbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { isSplit, isExpanded } = useProjectPreview();

  useEffect(() => {
    // Check if dismissed in this session
    const dismissed = sessionStorage.getItem("ai_app_snackbar_dismissed");
    if (dismissed) return;

    // Trigger after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleReject = () => {
    setIsVisible(false);
    sessionStorage.setItem("ai_app_snackbar_dismissed", "true");
  };

  const handleAccept = () => {
    setIsVisible(false);
    sessionStorage.setItem("ai_app_snackbar_dismissed", "true");
  };

  // Hide if split preview is expanded to 100%
  if (isExpanded) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 60, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 40, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 380, damping: 26 }}
          className={`fixed z-50 bottom-6 left-4 sm:left-6 md:left-8 select-none pointer-events-auto max-w-[calc(100vw-2rem)] ${
            isSplit ? "hidden sm:block" : "block"
          }`}
        >
          {/* Outer glowing border wrapper */}
          <div className="relative rounded-2xl p-[1px] bg-gradient-to-r from-purple-500/50 via-white/20 to-indigo-500/50 shadow-2xl shadow-purple-950/50">
            {/* Inner snackbar body */}
            <div className="relative flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4 px-4 py-3 rounded-[15px] bg-[#0c0d14]/95 dark:bg-black/95 backdrop-blur-xl border border-white/10">
              
              {/* Icon & Message */}
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-purple-500/15 border border-purple-500/30 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-white/95 whitespace-nowrap">
                  Do you want to explore Ai application?
                </span>
              </div>

              {/* Action Buttons: Reject & Accept */}
              <div className="flex items-center gap-2 ml-auto shrink-0">
                <button
                  onClick={handleReject}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  Reject
                </button>

                <Link
                  href="/ai-lab"
                  onClick={handleAccept}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-md shadow-purple-600/30 transition-all hover:scale-105 active:scale-95"
                >
                  <span>Accept</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AILabSnackbar;

