"use client";

import React from "react";
import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";
import { Columns } from "lucide-react";
import { useProjectPreview } from "@/context/ProjectPreviewContext";

const ProjectCard = ({ project }) => {
  const { imgUrl, title, description, gitUrl, previewUrl, id } = project;
  const { openPreview, activeProject, activeType, isSplit } = useProjectPreview();

  const isActive = activeProject && activeProject.id === id;

  const handleCardClick = (e) => {
    // If click originated from a link or specific button, let that handler run
    if (e.target.closest("button")) return;
    if (previewUrl && previewUrl !== "#") {
      openPreview(project, "preview");
    } else {
      openPreview(project, "github");
    }
  };

  const handleGithubClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openPreview(project, "github");
  };

  const handlePreviewClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openPreview(project, "preview");
  };

  return (
    <div
      onClick={handleCardClick}
      className={`group/card relative rounded-xl transition-all duration-300 cursor-pointer ${
        isActive
          ? "ring-2 ring-primary-500 shadow-2xl shadow-purple-500/25 scale-[1.02]"
          : "hover:scale-[1.02] hover:shadow-xl"
      }`}
    >
      {/* Active Indicator Badge */}
      {isActive && (
        <div className="absolute -top-3 left-4 z-20 px-3 py-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-[11px] font-bold uppercase tracking-wider rounded-full shadow-lg flex items-center gap-1.5 animate-pulse">
          <span className="w-2 h-2 rounded-full bg-white" />
          {activeType === "github" ? "GitHub in Split View" : "Live in Split View"}
        </div>
      )}

      {/* Image Container */}
      <div
        className="h-52 md:h-64 rounded-t-xl relative group shadow-xl overflow-hidden"
        style={{
          background: `url(${imgUrl || project.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Subtle Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Hover Actions Overlay */}
        <div className="flex flex-col items-center justify-center absolute top-0 left-0 w-full h-full bg-[#0a0a0a]/75 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 gap-3 p-4">
          <div className="flex items-center gap-3">
            {/* GitHub Split Trigger */}
            {gitUrl && gitUrl !== "#" && (
              <button
                onClick={handleGithubClick}
                title="Open GitHub in Split View"
                className={`h-12 w-12 border-2 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg ${
                  isActive && activeType === "github"
                    ? "border-primary-400 bg-primary-600 text-white"
                    : "border-[#ADB7BE] hover:border-white text-[#ADB7BE] hover:text-white bg-black/40"
                }`}
              >
                <CodeBracketIcon className="h-6 w-6" />
              </button>
            )}

            {/* Live Preview Split Trigger */}
            {previewUrl && previewUrl !== "#" && (
              <button
                onClick={handlePreviewClick}
                title="Open Live Preview in Split View"
                className={`h-12 w-12 border-2 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg ${
                  isActive && activeType === "preview"
                    ? "border-primary-400 bg-primary-600 text-white"
                    : "border-primary-400 bg-primary-600/40 hover:bg-primary-500 text-white shadow-purple-500/30"
                }`}
              >
                <EyeIcon className="h-6 w-6" />
              </button>
            )}
          </div>

          {/* Quick Click Hint Pill */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-medium backdrop-blur border border-white/20">
            <Columns className="w-3.5 h-3.5 text-primary-400" />
            <span>Click to split screen</span>
          </div>
        </div>

        {/* Bottom Tag Badges on Image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {project.tag && (
            <div className="flex flex-wrap gap-1">
              {project.tag
                .filter((t) => t !== "All")
                .map((t, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded bg-black/60 text-white/90 backdrop-blur border border-white/10"
                  >
                    {t}
                  </span>
                ))}
            </div>
          )}

          {previewUrl && previewUrl !== "#" ? (
            <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-black/60 px-2 py-0.5 rounded backdrop-blur border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Live Web
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[10px] font-semibold text-purple-400 bg-black/60 px-2 py-0.5 rounded backdrop-blur border border-purple-500/20">
              GitHub Repo
            </span>
          )}
        </div>
      </div>

      {/* Info Content */}
      <div className="text-gray-900 dark:text-white rounded-b-xl bg-gray-50 dark:bg-[#111111] py-5 px-4 transition-colors duration-300 border-x border-b border-gray-200 dark:border-white/5 shadow-xl">
        <div className="flex items-center justify-between gap-2 mb-2">
          <h5 className="text-lg md:text-xl font-bold truncate group-hover/card:text-primary-500 transition-colors">
            {title}
          </h5>
          <span className="text-xs text-primary-500 shrink-0 font-medium opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center gap-0.5">
            Split View ⇥
          </span>
        </div>
        <p className="text-gray-600 dark:text-[#ADB7BE] text-sm line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;
