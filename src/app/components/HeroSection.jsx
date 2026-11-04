"use client";
import React from "react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { LinkPreview } from "@/components/ui/link-preview";
import { useProjectPreview } from "@/context/ProjectPreviewContext";
import ResumeDownloadTicker from "./ResumeDownloadTicker";

// ── Complete Tech Stack for the Two Horizontal Strips ─────────────────
// Strip 1: Data, Analytics & Modern Frontend Stack
const STRIP_ONE = [
  "Python",
  "NumPy",
  "Pandas",
  "Power BI",
  "React.js",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Redux",
  "Data Analytics",
  "Framer Motion",
];

// Strip 2: Backend, Cloud, Databases & Artificial Intelligence Stack
const STRIP_TWO = [
  "MySQL",
  "Node.js",
  "Express.js",
  "AWS",
  "GenAI",
  "Agentic AI",
  "Docker",
  "MongoDB",
  "OpenCV",
  "MediaPipe",
  "Computer Vision",
  "LLMs & RAG",
];

// ── Single Marquee Strip Component ───────────────────────────────────
const TechStrip = ({ items, reverse = false, speed = 40, bgClass = "bg-black" }) => {
  // Duplicate 4 times to ensure seamless infinite looping on ultra-wide screens
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className={`relative flex w-full overflow-hidden py-2.5 sm:py-3 ${bgClass}`}>
      <div
        className="flex gap-3 sm:gap-4 whitespace-nowrap will-change-transform"
        style={{
          animation: `marquee${reverse ? "Reverse" : ""} ${speed}s linear infinite`,
        }}
      >
        {repeated.map((tech, i) => (
          <div
            key={`${tech}-${i}`}
            className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.12] bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/30 backdrop-blur-sm transition-all duration-200 select-none cursor-default shrink-0"
          >
            {/* Subtle monochrome Next.js dot indicator */}
            <span className="w-1.5 h-1.5 rounded-full bg-white/50 group-hover:bg-white transition-colors" />

            {/* Consistent Black & White / Silver Gradient Typography */}
            <span
              className="text-xs sm:text-sm font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-400 group-hover:from-white group-hover:to-white transition-colors"
              style={{
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {tech}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Two Horizontal Strips with a Gap Touching Both Window Ends ──────
const TwoHorizontalStrips = ({ isSplit }) => {
  return (
    <div
      className={`relative overflow-hidden my-4 sm:my-6 ${
        isSplit
          ? "w-[calc(100%+2rem)] sm:w-[calc(100%+3rem)] md:w-[calc(100%+4rem)] -mx-4 sm:-mx-6 md:-mx-8"
          : "w-screen relative left-1/2 -translate-x-1/2"
      }`}
    >
      {/* Edge gradient mask for smooth infinite fade-out */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 z-20 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 z-20 bg-gradient-to-l from-black via-black/80 to-transparent pointer-events-none" />

      {/* Two distinct horizontal strips with a clean gap in between */}
      <div className="flex flex-col gap-2 sm:gap-2.5">
        {/* Strip 1: Moving Forward */}
        <div className="border-y border-white/[0.12] bg-black">
          <TechStrip items={STRIP_ONE} speed={42} bgClass="bg-black" />
        </div>

        {/* Strip 2: Moving Reverse */}
        <div className="border-y border-white/[0.12] bg-[#070707]">
          <TechStrip items={STRIP_TWO} reverse speed={36} bgClass="bg-[#070707]" />
        </div>
      </div>

      {/* Hardware-accelerated CSS Keyframes */}
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marqueeReverse {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

// ── Hero Section ──────────────────────────────────────────────────
const HeroSection = () => {
  const { openPreview, isSplit } = useProjectPreview();

  return (
    <section className={isSplit ? "py-2 sm:py-4" : "py-4 sm:py-8"}>
      {/* Side floating Resume Download Ticker */}
      <ResumeDownloadTicker />

      <div className="grid grid-cols-1">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-1 text-left justify-self-start w-full"
        >
          <h1
            className={`text-gray-900 dark:text-white mb-4 font-extrabold transition-all duration-300 leading-tight ${
              isSplit
                ? "text-3xl sm:text-4xl lg:text-5xl"
                : "text-4xl sm:text-5xl lg:text-6xl lg:leading-tight"
            }`}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600">
              Hello, I&apos;m{" "}
            </span>
            <br className="hidden sm:block" />
            <TypeAnimation
              sequence={[
                "Baibhav",
                1000,
                "Full Stack Developer",
                1000,
                "Data Analyst",
                1000,
                "AI/ML Enthusiast",
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h1>

          <div className="text-gray-600 dark:text-[#ADB7BE] text-base sm:text-lg text-left transition-colors duration-300 space-y-4 w-full">
            <p
              className={`font-bold text-gray-800 dark:text-gray-200 transition-all ${
                isSplit ? "text-lg sm:text-xl md:text-2xl" : "text-xl md:text-2xl"
              }`}
            >
              I build fast, scalable web applications and turn data into actionable insights.
            </p>

            <p className="leading-relaxed">
              With 3+ years of experience as a Full Stack Developer, I specialize in building{" "}
              <LinkPreview
                url="https://foodish-alpha.vercel.app/"
                isStatic={true}
                imageSrc="/images/projects/Foodish.png"
                onClick={() => openPreview(6, "preview")}
                className="font-bold text-primary-500 underline decoration-primary-500/30 underline-offset-4"
              >
                modern web apps
              </LinkPreview>{" "}
              using React,{" "}
              <LinkPreview
                url="https://my-portfolio-phi-red-79.vercel.app/"
                isStatic={true}
                imageSrc="/images/projects/portfolio.png"
                onClick={() => openPreview(5, "preview")}
                className="font-bold text-primary-500 underline decoration-primary-500/30 underline-offset-4"
              >
                Next.js
              </LinkPreview>
              , Node.js, and MySQL. I focus on performance, clean architecture, and user-centric design to deliver products like{" "}
              <LinkPreview
                url="https://resume-sync-eight.vercel.app/"
                isStatic={true}
                imageSrc="/images/projects/resumeSync.png"
                onClick={() => openPreview(8, "preview")}
                className="font-bold text-primary-500 underline decoration-primary-500/30 underline-offset-4"
              >
                ResumeSync
              </LinkPreview>{" "}
              that actually solve problems.
            </p>

            <p className="leading-relaxed">
              Beyond development, I bring strong analytical skills using Python (NumPy, Pandas) to work with{" "}
              <LinkPreview
                url="https://app.powerbi.com/groups/me/reports/215ca4af-b50f-4ad5-898c-f2f4b6274f83/d5c89186a0602c70ecbe?experience=power-bi"
                isStatic={true}
                imageSrc="/images/projects/electric.png"
                onClick={() => openPreview(4, "preview")}
                className="font-bold text-secondary-500 underline decoration-secondary-500/30 underline-offset-4"
              >
                data
              </LinkPreview>
              , automate workflows, and support decision-making. I&apos;m currently expanding into{" "}
              <LinkPreview
                url="https://github.com/Baibhav100/vision_based_pc_automation"
                isStatic={true}
                imageSrc="/images/projects/computer_vision.jpg"
                onClick={() => openPreview(1, "github")}
                className="font-bold text-secondary-500 underline decoration-secondary-500/30 underline-offset-4"
              >
                AI/ML
              </LinkPreview>{" "}
              and prompt engineering, leveraging tools like Cursor AI to build smarter systems.
            </p>

            {/* ── Two Horizontal Strips with Gap: Full Window Width, Zero Edge Gaps ── */}
            <TwoHorizontalStrips isSplit={isSplit} />
          </div>

          {/* Bottom buttons removed; accessible via side download ticker */}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
