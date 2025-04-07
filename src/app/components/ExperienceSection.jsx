'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Briefcase, Calendar, CheckCircle } from 'lucide-react';

const experiences = [
  {
    id: 1,
    role: "Web Developer",
    company: "Adventure Code",
    period: "Jun 2023 - Present",
    achievements: [
      "Developed and launched 10+ responsive websites, increasing client satisfaction by 30%.",
      "Engineered RESTful APIs using Node.js, streamlining backend processes by 20%.",
      "Optimized application performance, reducing load times by 25%.",
      "Collaborated with designers and stakeholders to refine UI/UX, enhancing user retention by 15%.",
      "Mentored a team of junior developers, fostering a culture of innovation and continuous learning."
    ],
    skills: ["React.js", "Node.js", "Next.js", "RESTful APIs", "Team Leadership"]
  },
  {
    id: 2,
    role: "Front End Developer",
    company: "EKODUS Technologies Pvt Ltd",
    period: "Mar 2022 - Apr 2023",
    achievements: [
      "Designed and implemented responsive front-end solutions for 5+ large-scale client projects.",
      "Optimized CSS and JavaScript, reducing rendering issues and ensuring cross-browser compatibility.",
      "Collaborated with backend teams to integrate REST APIs, enhancing project efficiency by 25%."
    ],
    skills: ["React.js", "JavaScript", "CSS", "REST API Integration", "Cross-browser Compatibility"]
  },
  {
    id: 3,
    role: "Intern",
    company: "TechSpark Solutions",
    period: "July 2021 - Dec 2021",
    achievements: [
      "Assisted in the development of an internal employee portal using React.js and Node.js.",
      "Conducted comprehensive testing, identifying and resolving over 50 critical bugs.",
      "Gained hands-on experience in Agile practices, sprint planning, and daily stand-ups."
    ],
    skills: ["React.js", "Node.js", "Testing", "Agile Methodologies", "Bug Resolution"]
  }
];

const ExperienceCard = ({ experience, isExpanded, toggleExpand, isInView, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="mb-8 bg-[#181818] rounded-xl shadow-xl overflow-hidden border border-[#232323]"
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
            <h3 className="text-xl font-bold text-white">{experience.role}</h3>
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600 font-medium">
              {experience.company}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="mr-4 flex items-center text-[#ADB7BE]">
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
          <h4 className="font-semibold text-white mb-3">Key Achievements</h4>
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
                <span className="text-[#ADB7BE]">{achievement}</span>
              </motion.li>
            ))}
          </ul>
          <div>
            <h4 className="font-semibold text-white mb-3">Skills Applied</h4>
            <div className="flex flex-wrap gap-2">
              {experience.skills.map((skill, index) => (
                <motion.span 
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isExpanded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.07 }}
                  className="px-4 py-2 bg-[#232323] text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600 text-sm rounded-lg font-medium border border-[#333333]"
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
    <section id="experience" ref={sectionRef} className="py-16 bg-[#121212]">
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
          <p className="text-[#ADB7BE] text-lg max-w-2xl mx-auto">
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