"use client";
import React, { useState } from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";

const HeroSection = () => {

  const [modalOpen, setModalOpen] = useState(false);
  return (
    <section className="lg:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-8 place-self-center text-center sm:text-left justify-self-start"
        >
          <h1 className="text-gray-900 dark:text-white mb-4 text-4xl sm:text-5xl lg:text-8xl lg:leading-normal font-extrabold transition-colors duration-300">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600">
              Hello, I&apos;m{" "}
            </span>
            <br></br>
            <TypeAnimation
              sequence={[
                "Baibhav",
                1000,
                "Web Developer",
                1000,
                "Mobile Developer",
                1000,
                "UI/UX Designer",
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h1>
          <p className="text-gray-600 dark:text-[#ADB7BE] text-base sm:text-lg mb-6 lg:text-xl text-justify transition-colors duration-300">
            I am a passionate fullstack developer and AI/ML enthusiast with a knack for creating dynamic and responsive web applications. I specialize in React.js, Node.js, and have a strong foundation in UI/UX design principles. My goal is to build user-friendly interfaces that enhance the overall user experience.
            <br></br>
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/#contact"
              className="px-8 py-4 w-full sm:w-fit rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 hover:scale-105 transition-all duration-300 text-white font-bold text-center shadow-lg shadow-primary-500/25"
            >
              Hire Me
            </Link>
            <a
              href="/Baibhav_overall.pdf"
              download
              className="p-[2px] w-full sm:w-fit rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 hover:scale-105 transition-all duration-300 group shadow-lg shadow-secondary-500/20"
            >
              <span className="block bg-white dark:bg-[#0a0a0a] group-hover:bg-slate-50 dark:group-hover:bg-[#121212] text-gray-900 dark:text-white rounded-full px-8 py-3.5 font-bold transition-all duration-300 text-center">
                Download CV
              </span>
            </a>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-4 flex justify-center items-center mt-8 lg:mt-0"
        >
          <div className="relative group p-4">
            {/* Radiant Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/30 to-secondary-500/30 rounded-full blur-3xl animate-pulse"></div>

            <div className="relative z-10">
              <Image
                src="/images/Baibhav.png"
                alt="Baibhav Rajkumar"
                className="drop-shadow-[0_0_15px_rgba(168,85,247,0.8)] filter transition-all duration-500 group-hover:scale-105"
                width={450}
                height={450}
                priority
              />
              {/* Optional: Second layer of drop-shadow for increased radiance */}
              <div className="absolute inset-0 drop-shadow-[0_0_30px_rgba(59,130,246,0.4)] pointer-events-none"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
