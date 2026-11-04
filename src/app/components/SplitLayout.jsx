"use client";

import React from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import ProjectsSection from "./ProjectsSection";
import ExperienceSection from "./ExperienceSection";
import EmailSection from "./EmailSection";
import Footer from "./Footer";
import AIChatWidget from "./AIChatWidget";
import AILabSnackbar from "./AILabSnackbar";
import ProjectSplitPreview from "./ProjectSplitPreview";
import SplitDivider from "./SplitDivider";
import { useProjectPreview } from "@/context/ProjectPreviewContext";
import { Columns, Eye, FileText, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const SplitLayout = () => {
  const {
    isSplit,
    activeProject,
    activeType,
    closePreview,
    splitRatio,
    isExpanded,
    mobileTab,
    setMobileTab,
    isMobileScreen,
  } = useProjectPreview();

  // ─── Standard Full Viewport Layout (No Project Preview Active) ───
  if (!isSplit) {
    return (
      <main className="flex min-h-screen flex-col bg-[#F8F9FA] dark:bg-[#0a0a0a] transition-colors duration-300 relative overflow-x-hidden">
        <Navbar />
        <div className="container mt-4 sm:mt-6 mx-auto px-4 sm:px-6 md:px-12 py-2 max-w-[1400px]">
          <div className="space-y-8 md:space-y-12">
            <HeroSection />
            <AboutSection />
            <ProjectsSection />
            <ExperienceSection />
            <EmailSection />
          </div>
        </div>
        <Footer />
        <AIChatWidget />
        <AILabSnackbar />
      </main>
    );
  }

  // ─── Split Screen Layout (Project Preview Active) ───
  return (
    <main className="relative flex flex-col lg:flex-row h-screen w-screen overflow-hidden bg-[#F8F9FA] dark:bg-[#0a0a0a] transition-colors duration-300">
      {/* ─── Left Pane: Portfolio Website ─── */}
      <div
        style={{
          width: isMobileScreen
            ? mobileTab === "portfolio"
              ? "100%"
              : "0%"
            : isExpanded
            ? "0%"
            : `${splitRatio}%`,
          display:
            (isMobileScreen && mobileTab !== "portfolio") || isExpanded
              ? "none"
              : "flex",
        }}
        className="flex-col h-full overflow-y-auto overflow-x-hidden bg-[#F8F9FA] dark:bg-[#0a0a0a] transition-all duration-150 scroll-smooth border-r border-neutral-200 dark:border-white/10"
      >
        <Navbar />
        <div className="w-full px-4 sm:px-6 md:px-8 py-2 max-w-[1400px] mx-auto flex-1">
          <div className="space-y-6 md:space-y-8">
            <HeroSection />
            <AboutSection />
            <ProjectsSection />
            <ExperienceSection />
            <EmailSection />
          </div>
        </div>
        <Footer />
      </div>

      {/* ─── Draggable Resizable Divider (Desktop only) ─── */}
      {!isMobileScreen && !isExpanded && <SplitDivider />}

      {/* ─── Right Pane: Interactive Live Project Preview ─── */}
      <div
        style={{
          width: isMobileScreen
            ? mobileTab === "preview"
              ? "100%"
              : "0%"
            : isExpanded
            ? "100%"
            : `${100 - splitRatio}%`,
          display:
            isMobileScreen && mobileTab !== "preview" ? "none" : "flex",
        }}
        className="flex-col h-full overflow-hidden transition-all duration-150 relative z-30"
      >
        <ProjectSplitPreview />
      </div>

      {/* ─── Mobile Bottom Switcher Pill (Below 1024px screens) ─── */}
      {isMobileScreen && isSplit && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 bg-neutral-900/95 text-white p-1.5 rounded-full shadow-2xl border border-white/20 backdrop-blur-xl">
          <button
            onClick={() => setMobileTab("portfolio")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
              mobileTab === "portfolio"
                ? "bg-primary-600 text-white shadow"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Portfolio</span>
          </button>

          <button
            onClick={() => setMobileTab("preview")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
              mobileTab === "preview"
                ? "bg-primary-600 text-white shadow"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{activeType === "github" ? "GitHub" : "Live Demo"}</span>
          </button>

          <button
            onClick={closePreview}
            className="p-1.5 text-neutral-400 hover:text-red-400 rounded-full hover:bg-white/10 transition ml-1"
            title="Exit split view"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Global AI Chatbot Widget */}
      <AIChatWidget />
      <AILabSnackbar />
    </main>
  );
};

export default SplitLayout;
