"use client";
import React, { useTransition, useState, useRef } from "react";
import Image from "next/image";
import TabButton from "./TabButton";
import { motion } from "framer-motion";

const TAB_DATA = [

  {
    title: "Skills",
    id: "skills",
    content: (
      <div className="skills-container">
        <h3 className="text-lg font-bold">Frontend Development</h3>
        <div className="skills-pills">
          <span className="skill-pill">React.js</span>
          <span className="skill-pill">Next.js</span>
          <span className="skill-pill">Redux</span>
          <span className="skill-pill">JavaScript</span>
          <span className="skill-pill">HTML</span>
          <span className="skill-pill">CSS</span>
          <span className="skill-pill">Tailwind CSS</span>
          <span className="skill-pill">Bootstrap</span>
        </div>

        <h3 className="text-lg font-bold">Backend Development</h3>
        <div className="skills-pills">
          <span className="skill-pill">Node.js</span>
          <span className="skill-pill">Express.js</span>
          <span className="skill-pill">RESTful APIs</span>
          <span className="skill-pill">MySQL</span>
          <span className="skill-pill">MongoDB</span>
          <span className="skill-pill">PHP</span>
        </div>

        <h3 className="text-lg font-bold">Tools and Platforms</h3>
        <div className="skills-pills">
          <span className="skill-pill">Git</span>
          <span className="skill-pill">Docker</span>
          <span className="skill-pill">Jenkins</span>
          <span className="skill-pill">CI/CD</span>
          <span className="skill-pill">Postman</span>
          <span className="skill-pill">PowerBi</span>
          <span className="skill-pill">Tableau</span>
        </div>

        <h3 className="text-lg font-bold">Programming Languages</h3>
        <div className="skills-pills">
          <span className="skill-pill">C</span>
          <span className="skill-pill">C++</span>
          <span className="skill-pill">Python</span>
        </div>

        <h3 className="text-lg font-bold">Cloud Services</h3>
        <div className="skills-pills">
          <span className="skill-pill">AWS (EC2, S3)</span>
          <span className="skill-pill">Firebase</span>
          <span className="skill-pill">Heroku</span>
        </div>

        <h3 className="text-lg font-bold">Testing</h3>
        <div className="skills-pills">
          <span className="skill-pill">Jest</span>
          <span className="skill-pill">Debugging and Performance Optimization</span>
        </div>
      </div>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <ul className="list-disc pl-2">
        <li>Master&apos;s of Computer Applications (MCA) — USTM, Meghalaya (2023)</li>
        <li>Bachelor of Computer Applications (BCA) — K C Das Commerce College, Guwahati (2021)</li>
      </ul>
    ),
  },
  {
    title: "Certifications",
    id: "certifications",
    content: (
      <ul className="list-disc pl-2">
        <li>Applied Data Science, ML & AI — IIT (Ongoing)</li>
        <li>AWS Certified Developer</li>
      </ul>
    ),
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();
  const [showPayment, setShowPayment] = useState(false);
  const [isPressing, setIsPressing] = useState(false);
  const pressTimerRef = useRef(null);

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  const handlePressStart = () => {
    setIsPressing(true);
    pressTimerRef.current = setTimeout(() => {
      setShowPayment(true);
    }, 1500); // 1.5 seconds for long press
  };

  const handlePressEnd = () => {
    setIsPressing(false);
    clearTimeout(pressTimerRef.current);
  };

  return (
    <section className="text-gray-800 dark:text-warmGray-300 overflow-hidden" id="about">
      <div className="md:grid md:grid-cols-2 gap-12 items-center py-12 px-4 xl:gap-24 sm:py-20 xl:px-20">

        {/* Interactive iPhone Mockup */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative flex justify-center items-center perspective-1000"
        >
          <motion.div
            whileHover={{ rotateY: -15, rotateX: 5, scale: 1.05 }}
            onMouseDown={handlePressStart}
            onMouseUp={handlePressEnd}
            onMouseLeave={handlePressEnd}
            onTouchStart={handlePressStart}
            onTouchEnd={handlePressEnd}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative w-[280px] h-[580px] bg-slate-900 rounded-[3rem] border-[8px] border-slate-800 shadow-2xl overflow-hidden group cursor-pointer select-none"
          >
            {/* iPhone Hardware Details */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-slate-800 rounded-b-2xl z-20 flex justify-center items-end pb-1">
              <div className="w-12 h-1 bg-slate-700 rounded-full mb-1"></div>
            </div>

            {/* Screen Content */}
            <div className="absolute inset-0 flex flex-col items-center pt-12 p-6 text-center">
              {/* Wallpaper Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/images/Baibhav.png"
                  fill
                  alt="Wallpaper"
                  className="object-cover object-top opacity-40 grayscale-[0.2]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent"></div>
              </div>

              {/* Service Advertisement UI */}
              <motion.div
                animate={{ opacity: showPayment ? 0 : 1, scale: showPayment ? 0.9 : 1 }}
                className="relative z-10 w-full h-full flex flex-col items-center pt-4"
              >
                {/* Catchy Header */}
                <div className="mb-6 px-2">
                  <h3 className="text-white font-extrabold text-xl tracking-tight leading-snug">
                    Contact me for <span className="text-purple-500">Website Templates.</span>
                  </h3>
                  <p className="text-purple-300 text-[10px] mt-2 font-medium">I will make it ready for you</p>
                </div>



                {/* Fingerprint Scanner - Middle */}
                <div className="relative flex-1 w-full flex flex-col items-center justify-center">
                  <motion.div
                    animate={{
                      scale: isPressing ? [1, 1.2, 1.1] : 1,
                      boxShadow: isPressing ? ["0 0 0px #a855f7", "0 0 20px #a855f7", "0 0 10px #a855f7"] : "0 0 0px #a855f7"
                    }}
                    transition={{ repeat: isPressing ? Infinity : 0, duration: 1 }}
                    className={`w-24 h-24 rounded-full border-2 border-white/20 flex items-center justify-center backdrop-blur-md transition-colors ${isPressing ? 'bg-purple-600/30' : 'bg-white/5'}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="w-14 h-14"
                    >
                      <path
                        fill="white"
                        d="M48 256c0-114.9 93.1-208 208-208 63.1 0 119.6 28.1 157.8 72.5 8.6 10.1 23.8 11.2 33.8 2.6s11.2-23.8 2.6-33.8C403.3 34.6 333.7 0 256 0 114.6 0 0 114.6 0 256l0 40c0 13.3 10.7 24 24 24s24-10.7 24-24l0-40zm458.5-52.9c-2.7-13-15.5-21.3-28.4-18.5s-21.3 15.5-18.5 28.4c2.9 13.9 4.5 28.3 4.5 43.1l0 40c0 13.3 10.7 24 24 24s24-10.7 24-24l0-40c0-18.1-1.9-35.8-5.5-52.9zM256 80c-19 0-37.4 3-54.5 8.6-15.2 5-18.7 23.7-8.3 35.9 7.1 8.3 18.8 10.8 29.4 7.9 10.6-2.9 21.8-4.4 33.4-4.4 70.7 0 128 57.3 128 128l0 24.9c0 25.2-1.5 50.3-4.4 75.3-1.7 14.6 9.4 27.8 24.2 27.8 11.8 0 21.9-8.6 23.3-20.3 3.3-27.4 5-55 5-82.7l0-24.9c0-97.2-78.8-176-176-176zM150.7 148.7c-9.1-10.6-25.3-11.4-33.9-.4-23.1 29.8-36.8 67.1-36.8 107.7l0 24.9c0 24.2-2.6 48.4-7.8 71.9-3.4 15.6 7.9 31.1 23.9 31.1 10.5 0 19.9-7 22.2-17.3 6.4-28.1 9.7-56.8 9.7-85.8l0-24.9c0-27.2 8.5-52.4 22.9-73.1 7.2-10.4 8-24.6-.2-34.2zM256 160c-53 0-96 43-96 96l0 24.9c0 35.9-4.6 71.5-13.8 106.1-3.8 14.3 6.7 29 21.5 29 9.5 0 17.9-6.2 20.4-15.4 10.5-39 15.9-79.2 15.9-119.7l0-24.9c0-28.7 23.3-52 52-52s52 23.3 52 52l0 24.9c0 36.3-3.5 72.4-10.4 107.9-2.7 13.9 7.7 27.2 21.8 27.2 10.2 0 19-7 21-17 7.7-38.8 11.6-78.3 11.6-118.1l0-24.9c0-53-43-96-96-96zm24 96c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 24.9c0 59.9-11 119.3-32.5 175.2l-5.9 15.3c-4.8 12.4 1.4 26.3 13.8 31s26.3-1.4 31-13.8l5.9-15.3C267.9 411.9 280 346.7 280 280.9l0-24.9z"
                      />
                    </svg>
                  </motion.div>
                  <p className="text-white/40 text-[9px] mt-4 font-bold tracking-widest uppercase animate-pulse">
                    Hold it for a moment
                  </p>
                </div>

                <a
                  href="tel:+918486128114"
                  className="w-full py-4 mt-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all shadow-xl active:scale-95"
                >
                  Call Me Now
                </a>
              </motion.div>

              {/* Payment / QR Code Overlay */}
              {showPayment && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 z-30 flex flex-col items-center justify-center p-8 bg-slate-900/90 backdrop-blur-xl"
                >
                  <button
                    onClick={(e) => { e.stopPropagation(); setShowPayment(false); }}
                    className="absolute top-8 right-6 text-white/50 hover:text-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <div className="relative w-40 h-40 bg-white p-2 rounded-2xl shadow-2xl mb-6 overflow-hidden">
                    <Image
                      src="/images/scanner.jpeg"
                      fill
                      alt="Payment QR"
                      className="object-contain p-2"
                    />
                  </div>

                  <h4 className="text-white font-bold mb-1">Contact & Pay</h4>
                  <p className="text-purple-400 font-mono text-xs mb-3 font-bold">+91 8486128114</p>
                  <p className="text-gray-400 text-[10px]">Scan to pay or save contact</p>
                </motion.div>
              )}

              {/* Progress Bar for Long Press */}
              {isPressing && !showPayment && (
                <div className="absolute bottom-10 left-6 right-6 h-1 bg-white/10 rounded-full overflow-hidden z-20">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, ease: "linear" }}
                    className="h-full bg-purple-500"
                  />
                </div>
              )}
            </div>

            {/* Inner Glow/Reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none"></div>
          </motion.div>

          {/* Background Decorative Circles */}
          <div className="absolute -z-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl -top-10 -left-10 animate-blob"></div>
          <div className="absolute -z-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -bottom-10 -right-10 animate-blob animation-delay-2000"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-4 md:mt-0 text-left flex flex-col h-full"
        >
          <h2 className=" text-4xl md:text-5xl font-extrabold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600">
              About Me
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500  mb-4"></div>
          <p className="text-base lg:text-lg text-justify text-gray-700 dark:text-[#ADB7BE] leading-relaxed">
            Immediate joiner. Results-oriented Fullstack Developer and AI/ML enthusiast with over 3 years of experience in designing, developing, and deploying scalable web applications. Expertise in modern frameworks such as React.js, Node.js, and Next.js, with strong proficiency in RESTful API development, UI/UX design, and performance optimization. Passionate about leveraging AI tools to drive innovation and delivering user-focused solutions that meet business goals.
          </p>
          <div className="flex flex-row justify-start mt-8 gap-2">
            <TabButton
              selectTab={() => handleTabChange("skills")}
              active={tab === "skills"}
            >
              Skills
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("education")}
              active={tab === "education"}
            >
              Education
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("certifications")}
              active={tab === "certifications"}
            >
              Certifications
            </TabButton>
          </div>
          <div className="mt-8 min-h-[300px]">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {TAB_DATA.find((t) => t.id === tab).content}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
