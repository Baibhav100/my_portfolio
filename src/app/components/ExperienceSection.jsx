"use client";
import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { CheckCircle } from "lucide-react";

export default function ExperienceSection() {
  const data = [
    {
      title: "Jun 2023 - 2025",
      content: (
        <div>
          <h3 className="text-2xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-600 mb-2">
            Web Developer 
            <span className="text-neutral-500 dark:text-neutral-400 font-bold block text-xl mt-2">@ Adventure Code</span>
          </h3>
          <div className="mb-8 mt-6 font-medium text-neutral-700 md:text-lg dark:text-neutral-300">
             Leading dynamic website development and building efficient RESTful pipelines.
          </div>
          <div className="space-y-4 mb-8">
            {[
              "Developed dynamic websites using React.js, Node.js, MySQL increasing client satisfaction by 30%.",
              "Eliminated time-consuming backend integrations by building efficient RESTful APIs with Node.js and Express.js.",
              "Implemented lazy loading, caching that increased page load speed by 40% and improved user retention by 25%.",
              "Collaborated with cross-functional departments (design, product) to develop in UI/UX and drive impactful changes.",
              "Explored AI tools (Claude.ai, Kimi.ai, Deepseek, ChatGPT) which improved innovative client solutions."
            ].map((achievement, idx) => (
              <div key={idx} className="flex items-start text-sm md:text-base text-neutral-700 dark:text-neutral-300">
                <CheckCircle className="h-5 w-5 text-primary-500 mt-0.5 mr-3 flex-shrink-0" />
                <span>{achievement}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 pt-4 border-t border-neutral-100 dark:border-neutral-800">
            {["React.js", "Node.js", "Next.js", "MySQL", "RESTful APIs", "AI Tools"].map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-sm rounded-lg font-medium text-neutral-800 dark:text-neutral-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Mar 2022 - Apr 2023",
      content: (
        <div>
          <h3 className="text-2xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-600 mb-2">
            Front End Developer 
             <span className="text-neutral-500 dark:text-neutral-400 font-bold block text-xl mt-2">@ EKODUS Technologies Pvt Ltd</span>
          </h3>
          <div className="mb-8 mt-6 font-medium text-neutral-700 md:text-lg dark:text-neutral-300">
            Designing responsive interfaces and drastically cutting project development timelines.
          </div>
          <div className="space-y-4 mb-8">
            {[
              "Designed and developed responsive websites using Flexbox, CSS and media queries, increasing user engagement by 20%.",
              "Optimized CSS and JavaScript, reducing load failures and achieving cross-browser compatibility.",
              "Leveraged Bootstrap components and React libraries for rapid development, cutting project timelines by 25%.",
              "Partnered with backend teams to streamline CI/CD pipelines and minimize post-deployment bugs."
            ].map((achievement, idx) => (
              <div key={idx} className="flex items-start text-sm md:text-base text-neutral-700 dark:text-neutral-300">
                <CheckCircle className="h-5 w-5 text-primary-500 mt-0.5 mr-3 flex-shrink-0" />
                <span>{achievement}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 pt-4 border-t border-neutral-100 dark:border-neutral-800">
            {["React.js", "JavaScript", "Tailwind CSS", "Bootstrap", "CI/CD"].map((skill, index) => (
               <span
                key={index}
                className="px-4 py-2 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-sm rounded-lg font-medium text-neutral-800 dark:text-neutral-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="experience" className="bg-white dark:bg-[#121212] transition-colors duration-300">
      <Timeline data={data} />
    </section>
  );
}