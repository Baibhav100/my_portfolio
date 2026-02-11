"use client";
import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, MessageCircle } from "lucide-react";

const SideSocials = () => {
    const socials = [
        {
            name: "GitHub",
            icon: <Github size={20} />,
            link: "https://github.com/Baibhav100/my_portfolio",
            color: "hover:text-gray-900 dark:hover:text-white",
        },
        {
            name: "LinkedIn",
            icon: <Linkedin size={20} />,
            link: "https://www.linkedin.com/in/baibhavrajkumar",
            color: "hover:text-blue-600 dark:hover:text-blue-400",
        },
        {
            name: "WhatsApp",
            icon: <MessageCircle size={20} />,
            link: "https://wa.me/918486128114",
            color: "hover:text-green-500 dark:hover:text-green-400",
        },
    ];

    return (
        <div className="fixed left-0 top-1/2 -translate-y-1/2 z-[100] flex flex-col gap-4 scale-75 sm:scale-100 origin-left">
            {/* Container with Glassmorphism */}
            <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-3 rounded-r-2xl shadow-2xl flex flex-col gap-6"
            >
                {socials.map((social, index) => (
                    <motion.a
                        key={index}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2, x: 5 }}
                        whileTap={{ scale: 0.9 }}
                        className={`text-gray-600 dark:text-gray-400 transition-all ${social.color} relative group`}
                    >
                        {social.icon}

                        {/* Tooltip */}
                        <span className="absolute left-12 top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            {social.name}
                        </span>
                    </motion.a>
                ))}
            </motion.div>

            {/* Decorative vertical line */}
            <motion.div
                initial={{ height: 0 }}
                animate={{ height: "100px" }}
                transition={{ delay: 0.5, duration: 1 }}
                className="w-[2px] bg-gradient-to-b from-purple-500/50 to-transparent ml-6 mt-2"
            />
        </div>
    );
};

export default SideSocials;
