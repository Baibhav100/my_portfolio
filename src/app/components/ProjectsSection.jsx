"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";
import { projectsData } from "@/data/projectsData";
import { useProjectPreview } from "@/context/ProjectPreviewContext";
import { Columns, Sparkles } from "lucide-react";

const ProjectsSection = () => {
  const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { isSplit, activeProject } = useProjectPreview();

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag)
  );

  const cardVariants = {
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects" className="text-gray-900 dark:text-white py-2 sm:py-4">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-4">
        <div>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-neutral-800 dark:text-neutral-200 font-sans">
            My Projects.
          </h2>
          <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 mt-2 flex items-center gap-1.5">
            <Columns className="w-4 h-4 text-primary-500 shrink-0" />
            <span>Click any project to open an interactive live preview in split screen.</span>
          </p>
        </div>

        {isSplit && activeProject && (
          <div className="text-xs text-primary-500 dark:text-primary-400 bg-primary-500/10 px-3 py-1.5 rounded-full border border-primary-500/20 font-medium self-start sm:self-auto flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-primary-500 animate-ping" />
            Active: <span className="font-bold truncate max-w-[150px]">{activeProject.title}</span>
          </div>
        )}
      </div>

      {/* Tag Filters */}
      <div className="flex flex-row justify-start sm:justify-center items-center gap-2 py-4 overflow-x-auto scrollbar-none">
        {["All", "Web", "AI", "Data", "Mobile"].map((tagName) => (
          <ProjectTag
            key={tagName}
            onClick={handleTagChange}
            name={tagName}
            isSelected={tag === tagName}
          />
        ))}
      </div>

      {/* Grid of Projects: Responsive based on split state */}
      <ul
        ref={ref}
        className={`grid gap-6 md:gap-8 transition-all duration-300 ${
          isSplit
            ? "grid-cols-1 xl:grid-cols-2"
            : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => (
            <motion.li
              key={project.id || index}
              variants={cardVariants}
              initial="initial"
              animate={isInView ? "animate" : "initial"}
              transition={{ duration: 0.3, delay: Math.min(index * 0.15, 0.6) }}
            >
              <ProjectCard project={project} />
            </motion.li>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400 text-lg py-10">
            🚀 More interesting projects are on the way. Please stay tuned!
          </div>
        )}
      </ul>
    </section>
  );
};

export default ProjectsSection;
