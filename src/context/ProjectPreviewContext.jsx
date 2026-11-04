"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { projectsData } from "@/data/projectsData";

const defaultState = {
  activeProject: null,
  activeUrl: "",
  activeType: "preview", // "preview" | "github" | "custom"
  isSplit: false,
  splitRatio: 50,
  setSplitRatio: () => {},
  isExpanded: false,
  toggleExpand: () => {},
  isMobileScreen: false,
  mobileTab: "portfolio",
  setMobileTab: () => {},
  openPreview: () => {},
  openUrl: () => {},
  closePreview: () => {},
};

const ProjectPreviewContext = createContext(defaultState);

export const ProjectPreviewProvider = ({ children }) => {
  const [activeProject, setActiveProject] = useState(null);
  const [activeUrl, setActiveUrl] = useState("");
  const [activeType, setActiveType] = useState("preview"); // "preview" | "github"
  const [splitRatio, setSplitRatioState] = useState(50); // percentage for left pane
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const [mobileTab, setMobileTab] = useState("portfolio"); // "portfolio" | "preview"

  // Detect mobile screen width (< 1024px)
  useEffect(() => {
    const checkScreen = () => {
      setIsMobileScreen(window.innerWidth < 1024);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const setSplitRatio = useCallback((ratio) => {
    const clamped = Math.min(Math.max(ratio, 25), 75);
    setSplitRatioState(clamped);
  }, []);

  const openPreview = useCallback((projectOrId, type = "preview") => {
    let project = projectOrId;
    if (typeof projectOrId === "number" || typeof projectOrId === "string") {
      project = projectsData.find((p) => p.id === Number(projectOrId)) || null;
    }
    if (project) {
      let targetUrl = "";
      if (type === "github") {
        targetUrl = project.gitUrl && project.gitUrl !== "#"
          ? project.gitUrl
          : "https://github.com/Baibhav100";
      } else {
        targetUrl = project.previewUrl && project.previewUrl !== "#"
          ? project.previewUrl
          : (project.gitUrl && project.gitUrl !== "#" ? project.gitUrl : "https://github.com/Baibhav100");
      }
      setActiveProject(project);
      setActiveUrl(targetUrl);
      setActiveType(type);
      setIsExpanded(false);
      setMobileTab("preview");
    }
  }, []);

  const openUrl = useCallback((url, title = "Preview") => {
    if (!url) return;
    setActiveProject({ id: "custom", title, previewUrl: url, gitUrl: url });
    setActiveUrl(url);
    setActiveType("custom");
    setIsExpanded(false);
    setMobileTab("preview");
  }, []);

  const closePreview = useCallback(() => {
    setActiveProject(null);
    setActiveUrl("");
    setActiveType("preview");
    setIsExpanded(false);
    setMobileTab("portfolio");
  }, []);

  const toggleExpand = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const isSplit = Boolean(activeProject && activeUrl);

  return (
    <ProjectPreviewContext.Provider
      value={{
        activeProject,
        activeUrl,
        activeType,
        isSplit,
        splitRatio,
        setSplitRatio,
        isExpanded,
        toggleExpand,
        isMobileScreen,
        mobileTab,
        setMobileTab,
        openPreview,
        openUrl,
        closePreview,
      }}
    >
      {children}
    </ProjectPreviewContext.Provider>
  );
};

export const useProjectPreview = () => {
  const context = useContext(ProjectPreviewContext);
  return context || defaultState;
};
