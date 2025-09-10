"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";

const projectsData = [
  {
    id: 1,
    title: "LOOKIT - YouTube Clone",
    description: "A youtube clone application built with React.js and RapidAPI.",
    image: "/images/projects/lookit.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/Baibhav100/Youtube_clone",
    previewUrl: "https://youtube-clone-nu-rouge.vercel.app/",
  },
  {
    id: 2,
    title: "Gaming",
    description: "Gaming website built with React.js",
    image: "/images/projects/gaming.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/Baibhav100/award-winning",
    previewUrl: "https://award-winning-lime.vercel.app/",
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: "My personal portfolio website",
    image: "/images/projects/portfolio.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/Baibhav100/my_portfolio",
    previewUrl: "https://my-portfolio-phi-red-79.vercel.app/",
  },
  {
    id: 4,
    title: "Foodish",
    description: "An attractive food ordering website using Reactjs and TailwindCss",
    image: "/images/projects/Foodish.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/Baibhav100/Foodish",
    previewUrl: "https://foodish-alpha.vercel.app/",
  },
  // {
  //   id: 5,
  //   title: "React Firebase Template",
  //   description: "Authentication and CRUD operations",
  //   image: "/images/projects/5.png",
  //   tag: ["All", "Web"],
  //   gitUrl: "/",
  //   previewUrl: "/",
  // },
  // {
  //   id: 6,
  //   title: "Full-stack Roadmap",
  //   description: "Project 5 description",
  //   image: "/images/projects/6.png",
  //   tag: ["All", "Web"],
  //   gitUrl: "/",
  //   previewUrl: "/",
  // },
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
    <section id="projects">
          <h2 className="text-center text-4xl md:text-5xl font-extrabold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600">
             My Projects
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mb-4"></div>
      <div className="text-white flex flex-row justify-center items-center gap-2 py-6">
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
