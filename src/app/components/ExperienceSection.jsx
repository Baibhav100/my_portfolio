'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Briefcase, Calendar, CheckCircle } from 'lucide-react';

const experiences = [
  {
    id: 1,
    role: "Web Developer",
    company: "Adventure Code",
    period: "Jun 2023 - July 2025",
    achievements: [
      "Developed dynamic websites using React.js, Node.js, MySQL increasing client satisfaction by 30%.",
      "Eliminated time-consuming backend integrations by building efficient RESTful APIs with Node.js and Express.js.",
      "Implemented lazy loading, caching that increased page load speed by 40% and improved user retention by 25%.",
      "Collaborated with cross functional departments (design, product) to develop in UI/UX and drive impactful changes.",
      "Explored AI tools (Claude.ai, Kimi.ai, Deepseek, ChatGPT) which improved innovative client solutions."
    ],
    skills: ["React.js", "Node.js", "Next.js", "MySQL", "RESTful APIs", "AI Tools"]
  },
  {
    id: 2,
    role: "Front End Developer",
    company: "EKODUS Technologies Pvt Ltd",
    period: "Mar 2022 - Apr 2023",
    achievements: [
      "Designed and developed responsive websites using Flexbox, CSS and media queries, increasing user engagement by 20%.",
      "Optimized CSS and JavaScript, reducing load failures and achieving cross-browser compatibility.",
      "Leveraged Bootstrap components and React libraries for rapid development, cutting project timelines by 25%.",
      "Partnered with backend teams to streamline CI/CD pipelines and minimize post-deployment bugs."
    ],
    skills: ["React.js", "JavaScript", "Tailwind CSS", "Bootstrap", "CI/CD"]
  }
];

const ExperienceCard = ({ experience, isExpanded, toggleExpand, isInView, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="mb-8 bg-gray-50 dark:bg-[#181818] rounded-xl shadow-lg dark:shadow-xl overflow-hidden border border-gray-200 dark:border-[#232323] transition-colors duration-300"
    >
      <div
        className="p-6 cursor-pointer flex justify-between items-center"
        onClick={toggleExpand}
      >
        <div className="flex items-center">
          <div className="bg-gradient-to-br from-primary-500 to-secondary-500 p-3 rounded-lg mr-4 shadow-lg">
            <Briefcase className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300">{experience.role}</h3>
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600 font-medium">
              {experience.company}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="mr-4 flex items-center text-gray-500 dark:text-[#ADB7BE] transition-colors duration-300">
            <Calendar className="h-4 w-4 mr-1" />
            <span className="text-sm">{experience.period}</span>
          </div>
          {isExpanded ?
            <ChevronUp className="text-primary-400" /> :
            <ChevronDown className="text-primary-400" />
          }
        </div>
      </div>

      <motion.div
        initial={{ height: 0 }}
        animate={{ height: isExpanded ? 'auto' : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3 transition-colors duration-300">Key Achievements</h4>
          <ul className="mb-6 space-y-3">
            {experience.achievements.map((achievement, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isExpanded ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-start"
              >
                <CheckCircle className="h-5 w-5 text-primary-400 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-600 dark:text-[#ADB7BE] transition-colors duration-300">{achievement}</span>
              </motion.li>
            ))}
          </ul>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3 transition-colors duration-300">Skills Applied</h4>
            <div className="flex flex-wrap gap-2">
              {experience.skills.map((skill, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isExpanded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.07 }}
                  className="px-4 py-2 bg-gray-200 dark:bg-[#232323] text-gray-800 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-primary-400 dark:to-secondary-600 text-sm rounded-lg font-medium border border-gray-300 dark:border-[#333333] transition-colors duration-300"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ExperienceSection = () => {
  const [expandedId, setExpandedId] = useState(1);
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="experience" ref={sectionRef} className="py-16 bg-white dark:bg-[#121212] transition-colors duration-300">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600">
              Work Experience
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-[#ADB7BE] text-lg max-w-2xl mx-auto transition-colors duration-300">
            Over 3+ years building innovative web applications and leading development teams
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-full w-0.5 bg-gradient-to-b from-primary-500 to-secondary-500 opacity-30"></div>
            </div>

            <div className="relative">
              {experiences.map((exp, index) => (
                <ExperienceCard
                  key={exp.id}
                  experience={exp}
                  isExpanded={expandedId === exp.id}
                  toggleExpand={() => toggleExpand(exp.id)}
                  isInView={isInView}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;