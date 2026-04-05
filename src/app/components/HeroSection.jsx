"use client";
import React, { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";
import { LinkPreview } from "@/components/ui/link-preview";

const HeroSection = () => {
  return (
    <section className="lg:py-16">
      <div className="grid grid-cols-1">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-1 text-left justify-self-start w-full"
        >
          <h1 className="text-gray-900 dark:text-white mb-6 text-4xl sm:text-5xl lg:text-7xl lg:leading-tight font-extrabold transition-colors duration-300">
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

          <div className="text-gray-600 dark:text-[#ADB7BE] text-base sm:text-lg mb-8 text-left transition-colors duration-300 space-y-6 w-full">
            <p className="font-bold text-xl md:text-3xl text-gray-800 dark:text-gray-200">
              I build fast, scalable web applications and turn data into actionable insights.
            </p>

            <p className="leading-relaxed">
              With 3+ years of experience as a Full Stack Developer, I specialize in building{" "}
              <LinkPreview url="https://foodish-alpha.vercel.app/" isStatic={true} imageSrc="/images/projects/Foodish.png" className="font-bold text-primary-500 underline decoration-primary-500/30 underline-offset-4">
                modern web apps
              </LinkPreview>{" "}
              using React,{" "}
              <LinkPreview url="https://my-portfolio-phi-red-79.vercel.app/" isStatic={true} imageSrc="/images/projects/portfolio.png" className="font-bold text-primary-500 underline decoration-primary-500/30 underline-offset-4">
                Next.js
              </LinkPreview>
              , Node.js, and MySQL. I focus on performance, clean architecture, and user-centric design to deliver products like{" "}
              <LinkPreview url="https://resume-sync-eight.vercel.app/" isStatic={true} imageSrc="/images/projects/resumeSync.png" className="font-bold text-primary-500 underline decoration-primary-500/30 underline-offset-4">
                ResumeSync
              </LinkPreview>{" "}
              that actually solve problems.
            </p>

            <p className="leading-relaxed">
              Beyond development, I bring strong analytical skills using Python (NumPy, Pandas) to work with{" "}
              <LinkPreview url="https://app.powerbi.com/groups/me/reports/215ca4af-b50f-4ad5-898c-f2f4b6274f83/d5c89186a0602c70ecbe?experience=power-bi" isStatic={true} imageSrc="/images/projects/electric.png" className="font-bold text-secondary-500 underline decoration-secondary-500/30 underline-offset-4">
                data
              </LinkPreview>
              , automate workflows, and support decision-making. I’m currently expanding into{" "}
              <LinkPreview url="https://github.com/Baibhav100/vision_based_pc_automation" isStatic={true} imageSrc="/images/projects/computer_vision.jpg" className="font-bold text-secondary-500 underline decoration-secondary-500/30 underline-offset-4">
                AI/ML
              </LinkPreview>{" "}
              and prompt engineering, leveraging tools like Cursor AI to build smarter systems.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mt-10">
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-xl flex items-center gap-2">🔹 What I bring:</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-[#ADB7BE]">
                    <li>End-to-end development (Frontend + Backend + Database)</li>
                    <li>
                      High-performance UI development with{" "}
                      <LinkPreview url="https://youtube-clone-nu-rouge.vercel.app/" isStatic={true} imageSrc="/images/projects/lookit.png" className="font-bold text-primary-500 underline decoration-primary-500/30 underline-offset-4">
                        React & Tailwind
                      </LinkPreview>
                    </li>
                    <li>REST API design and integration</li>
                    <li>Data analysis and automation using Python</li>
                    <li>Strong collaboration with designers and product teams</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-xl flex items-center gap-2">🔹 Currently exploring:</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-[#ADB7BE]">
                    <li>
                      <LinkPreview url="https://github.com/Baibhav100/speech_to_action_system" isStatic={true} imageSrc="/images/projects/action.jpg" className="font-bold text-secondary-500 underline decoration-secondary-500/30 underline-offset-4">
                        AI/ML applications
                      </LinkPreview>{" "}
                      in real-world products
                    </li>
                    <li>Prompt engineering & AI-assisted development</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-[#121212] p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-xl">💼 Actively seeking roles in:</h3>
                  <ul className="space-y-3 font-medium text-gray-800 dark:text-gray-200">
                    <li className="flex items-center gap-2"><span className="text-xl">👉</span> Frontend Development</li>
                    <li className="flex items-center gap-2"><span className="text-xl">👉</span> Full Stack Development</li>
                    <li className="flex items-center gap-2"><span className="text-xl">👉</span> Data/Business Analyst</li>
                    <li className="flex items-center gap-2"><span className="text-xl">👉</span> Prompt Engineering / AI</li>
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
                  <p className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">📩 Let’s connect or collaborate!</p>
                  <p className="text-sm mb-2 text-gray-600 dark:text-gray-400">Open to opportunities and collaborations. Feel free to message me or email:</p>
                  <a href="mailto:baibhavrajkumar1999@gmail.com" className="text-primary-500 font-bold hover:underline transition-colors break-all text-lg">
                    baibhavrajkumar1999@gmail.com
                  </a>
                </div>
              </div>
            </div>

          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <Link
              href="/#contact"
              className="px-8 py-4 w-full sm:w-fit rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 hover:scale-105 transition-all duration-300 text-white font-bold text-center shadow-lg shadow-primary-500/25"
            >
              Hire Me
            </Link>
            <a
              href="/baibhav.pdf"
              download
              className="p-[2px] w-full sm:w-fit rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 hover:scale-105 transition-all duration-300 group shadow-lg shadow-secondary-500/20"
            >
              <span className="block bg-white dark:bg-[#0a0a0a] group-hover:bg-slate-50 dark:group-hover:bg-[#121212] text-gray-900 dark:text-white rounded-full px-8 py-3.5 font-bold transition-all duration-300 text-center">
                Download CV
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
