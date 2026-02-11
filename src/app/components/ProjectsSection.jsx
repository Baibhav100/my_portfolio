"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";

const projectsData = [
  {
    id: 1,
    title: "Vision-Based PC Automation",
    description: "Built a PC automated system using OpenCv and MediaPipe for hand gesture control.",
    image: "/images/projects/computer_vision.jpg",
    tag: ["All", "Web", "AI"],
    gitUrl: "https://github.com/Baibhav100/vision_based_pc_automation",
    previewUrl: "#",
  },
  {
    id: 2,
    title: "Speech to Action System",
    description: "AI system that triggers computer actions based on voice commands using Google Speech Recognition.",
    image: "/images/projects/action.jpg", // Using portfolio as placeholder for Speech to Action
    tag: ["All", "Web", "AI"],
    gitUrl: "https://github.com/Baibhav100/speech_to_action_system",
    previewUrl: "#",
  },
  {
    id: 3,
    title: "LOOKIT - YouTube Clone",
    description: "A youtube clone application built with React.js and RapidAPI.",
    image: "/images/projects/lookit.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/Baibhav100/Youtube_clone",
    previewUrl: "https://youtube-clone-nu-rouge.vercel.app/",
  },
  {
    id: 4,
    title: "Electric Vehicle Data Analysis",
    description: "PowerBi dashboard for Electric Vehicle Data Analysis and visualization.",
    image: "/images/projects/electric.png",
    tag: ["All", "Data"],
    gitUrl: "#",
    previewUrl: "https://app.powerbi.com/groups/me/reports/215ca4af-b50f-4ad5-898c-f2f4b6274f83/d5c89186a0602c70ecbe?experience=power-bi",
  },
  {
    id: 5,
    title: "Portfolio Website",
    description: "My personal portfolio website built with Next.js and Tailwind CSS.",
    image: "/images/projects/portfolio.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/Baibhav100/my_portfolio",
    previewUrl: "https://my-portfolio-phi-red-79.vercel.app/",
  },
  {
    id: 6,
    title: "Foodish - E-commerce",
    description: "An attractive food ordering website using Reactjs and TailwindCss.",
    image: "/images/projects/Foodish.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/Baibhav100/Foodish",
    previewUrl: "https://foodish-alpha.vercel.app/",
  },
  {
    id: 7,
    title: "Gaming",
    description: "Gaming website built with React.js",
    image: "/images/projects/gaming.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/Baibhav100/award-winning",
    previewUrl: "https://award-winning-lime.vercel.app/",
  },
];

const ProjectsSection = () => {
  const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag)
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects" className="text-gray-900 dark:text-white">
      <h2 className="text-center text-4xl md:text-5xl font-extrabold mb-4">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600">
          My Projects
        </span>
      </h2>
      <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mb-4"></div>
      <div className="flex flex-row justify-center items-center gap-2 py-6 overflow-x-auto">
        <ProjectTag
          onClick={handleTagChange}
          name="All"
          isSelected={tag === "All"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Web"
          isSelected={tag === "Web"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="AI"
          isSelected={tag === "AI"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Data"
          isSelected={tag === "Data"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Mobile"
          isSelected={tag === "Mobile"}
        />
      </div>
      <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => (
            <motion.li
              key={index}
              variants={cardVariants}
              initial="initial"
              animate={isInView ? "animate" : "initial"}
              transition={{ duration: 0.3, delay: index * 0.4 }}
            >
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                imgUrl={project.image}
                gitUrl={project.gitUrl}
                previewUrl={project.previewUrl}
              />
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
