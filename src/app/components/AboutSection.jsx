"use client";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { Layout, Server, Wrench, Terminal, GraduationCap, Award } from "lucide-react";

const FrontendBackendContent = () => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto mb-10">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          Building intuitive interfaces and robust server architectures.
        </span>{" "}
        My primary stack focuses on the JavaScript ecosystem, ensuring smooth real-time capabilities and seamless full-stack integrations.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Layout className="w-6 h-6 text-primary-500" />
            <h3 className="text-xl font-bold dark:text-white">Frontend</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {["React.js", "Next.js", "Redux", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Bootstrap"].map(skill => (
              <span key={skill} className="px-3 py-1.5 bg-white dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 rounded-lg text-sm font-medium shadow-sm border border-neutral-200 dark:border-neutral-600">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-4">
            <Server className="w-6 h-6 text-secondary-500" />
            <h3 className="text-xl font-bold dark:text-white">Backend</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Node.js", "Express.js", "REST APIs", "MySQL", "MongoDB", "PHP"].map(skill => (
              <span key={skill} className="px-3 py-1.5 bg-white dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 rounded-lg text-sm font-medium shadow-sm border border-neutral-200 dark:border-neutral-600">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ToolsCloudContent = () => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto mb-10">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          Scalable configurations and data pipelines.
        </span>{" "}
        Beyond writing code, deploying to the cloud securely and managing complex workflows with modern devOps tools is crucial.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Wrench className="w-6 h-6 text-purple-500" />
            <h3 className="text-xl font-bold dark:text-white">Tools & Platforms</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Git", "Docker", "Jenkins", "AWS (EC2, S3)", "Firebase", "Heroku", "PowerBI"].map(skill => (
              <span key={skill} className="px-3 py-1.5 bg-white dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 rounded-lg text-sm font-medium shadow-sm border border-neutral-200 dark:border-neutral-600">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-4">
            <Terminal className="w-6 h-6 text-pink-500" />
            <h3 className="text-xl font-bold dark:text-white">Languages & Core</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Python", "C", "C++", "Jest", "TDD", "Performance Optimization"].map(skill => (
              <span key={skill} className="px-3 py-1.5 bg-white dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 rounded-lg text-sm font-medium shadow-sm border border-neutral-200 dark:border-neutral-600">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const EducationContent = () => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto mb-10">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          Building a robust academic foundation.
        </span>{" "}
        A consistent trajectory of formal education in computer applications providing deep theoretical and practical insights.
      </p>

      <div className="max-w-3xl mx-auto space-y-6">
        {[
          {
            degree: "Master's of Computer Applications (MCA)",
            inst: "USTM, Meghalaya",
            year: "2023"
          },
          {
            degree: "Bachelor of Computer Applications (BCA)",
            inst: "K C Das Commerce College, Guwahati",
            year: "2021"
          }
        ].map((edu, idx) => (
          <div key={idx} className="flex gap-5 items-start p-8 bg-white dark:bg-[#121212] rounded-3xl shadow-sm border border-neutral-200 dark:border-neutral-700">
            <div className="p-4 bg-primary-100 dark:bg-primary-900/30 rounded-2xl text-primary-500 shrink-0">
              <GraduationCap className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-xl font-extrabold dark:text-white leading-tight mb-2">{edu.degree}</h4>
              <p className="text-gray-600 dark:text-gray-400 font-medium mb-4">{edu.inst}</p>
              <span className="inline-block px-4 py-1.5 bg-neutral-100 dark:bg-neutral-800 text-sm font-bold rounded-lg text-gray-700 dark:text-gray-300">
                Class of {edu.year}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const CertificationsContent = () => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto mb-10">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          Never stop learning.
        </span>{" "}
        Constantly expanding my skillset to stay at the cutting edge of AI, cloud architecture, and modern development.
      </p>

      <div className="max-w-3xl mx-auto space-y-6">
        {[
          { title: "Applied Data Science, ML & AI", source: "IIT (Ongoing)" },
          { title: "AWS Certified Developer", source: "Amazon Web Services" }
        ].map((cert, idx) => (
          <div key={idx} className="flex gap-5 items-start p-8 bg-white dark:bg-[#121212] rounded-3xl shadow-sm border border-neutral-200 dark:border-neutral-700">
            <div className="p-4 bg-secondary-100 dark:bg-secondary-900/30 rounded-2xl text-secondary-500 shrink-0">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-xl font-extrabold dark:text-white leading-tight mb-2">{cert.title}</h4>
              <p className="text-gray-600 dark:text-gray-400 font-medium">{cert.source}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const data = [
  {
    category: "Full Stack",
    title: "Mastering the Modern Stack.",
    src: "/images/projects/teleworking-programmer-designing-developing-software-using-tablet.jpg",
    content: <FrontendBackendContent />,
  },
  {
    category: "DevOps & Languages",
    title: "Scalability and Deployment.",
    src: "/images/projects/top-view-unrecognizable-hacker-performing-cyberattack-night.jpg",
    content: <ToolsCloudContent />,
  },
  {
    category: "Academics",
    title: "Foundational Knowledge.",
    src: "/images/projects/education-students-happy-asian-woman-holding-notebooks-laughing-smiling-camera-enjoys-goi.jpg",
    content: <EducationContent />,
  },
  {
    category: "Achievements",
    title: "Certifications & Beyond.",
    src: "/images/projects/3957212.jpg",
    content: <CertificationsContent />,
  },
];

export default function AboutSection() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <section id="about" className="overflow-hidden relative">

      <div className="w-full h-full pt-10">
        <h2 className="max-w-7xl pl-4 mx-auto text-2xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
          Get to know my expertise.
        </h2>
        <Carousel items={cards} />
      </div>
    </section>
  );
}
