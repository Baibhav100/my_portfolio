"use client";
import React, { useState, useEffect } from "react";
import GithubIcon from "../../../public/github-icon.svg";
import LinkedinIcon from "../../../public/linkedin-icon.svg";
import Link from "next/link";
import Image from "next/image";

// ─── Snackbar Component ───
const Snackbar = ({ message, type, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const bgColor = type === "success"
    ? "bg-emerald-500"
    : type === "error"
      ? "bg-red-500"
      : "bg-blue-500";

  const icon = type === "success"
    ? "✓"
    : type === "error"
      ? "✕"
      : "ℹ";

  return (
    <div className="fixed top-6 right-6 z-[100] animate-in slide-in-from-top-5 fade-in duration-300">
      <div className={`${bgColor} text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 min-w-[280px] max-w-md backdrop-blur-sm`}>
        <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold shrink-0">
          {icon}
        </div>
        <p className="text-sm font-medium flex-1">{message}</p>
        <button
          onClick={onClose}
          className="text-white/70 hover:text-white transition-colors ml-2 shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

const EmailSection = () => {
  const [formData, setFormData] = useState({ email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({ isVisible: false, message: "", type: "success" });

  const showSnackbar = (message, type = "success") => {
    setSnackbar({ isVisible: true, message, type });
  };

  const hideSnackbar = () => {
    setSnackbar(prev => ({ ...prev, isVisible: false }));
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.subject || !formData.message) {
      showSnackbar("Please fill in all fields.", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        showSnackbar("Message sent successfully! I'll get back to you soon. 🚀", "success");
        setFormData({ email: "", subject: "", message: "" });
      } else {
        showSnackbar(data.error || "Something went wrong. Please try again.", "error");
      }
    } catch (error) {
      showSnackbar("Network error. Please check your connection and try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Snackbar
        message={snackbar.message}
        type={snackbar.type}
        isVisible={snackbar.isVisible}
        onClose={hideSnackbar}
      />
      <section
        id="contact"
        className="grid md:grid-cols-2 my-12 md:my-12 py-24 gap-4 relative"
      >
        <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900/30 dark:from-primary-900 to-transparent rounded-full h-80 w-80 z-0 blur-3xl absolute top-3/4 -left-4 transform -translate-x-1/2 -translate-1/2 pointer-events-none"></div>
        <div className="z-10">
          <h5 className="text-xl font-bold text-gray-900 dark:text-white my-2 transition-colors duration-300">
            Let&apos;s Connect
          </h5>
          <p className="text-gray-600 dark:text-[#ADB7BE] mb-4 max-w-md transition-colors duration-300">
            {" "}
            I&apos;m currently looking for new opportunities, my inbox is always
            open. Whether you have a question or just want to say hi, I&apos;ll
            try my best to get back to you!
          </p>
          <div className="socials flex flex-row gap-2">
            <Link href="https://github.com/Baibhav100" target="_blank">
              <Image src={GithubIcon} alt="Github Icon" className="dark:filter dark:invert-0 filter invert" />
            </Link>
            <Link href="https://www.linkedin.com/in/baibhavrajkumar/" target="_blank">
              <Image src={LinkedinIcon} alt="Linkedin Icon" className="dark:filter dark:invert-0 filter invert" />
            </Link>
          </div>
        </div>
        <div>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="text-gray-900 dark:text-white block mb-2 text-sm font-medium transition-colors duration-300"
              >
                Your email
              </label>
              <input
                name="email"
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="bg-gray-50 dark:bg-[#18191E] border border-gray-300 dark:border-[#33353F] placeholder-[#9CA2A9] text-gray-900 dark:text-gray-100 text-sm rounded-lg block w-full p-2.5 transition-colors duration-300 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 outline-none"
                placeholder="baibhav@example.com"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="subject"
                className="text-gray-900 dark:text-white block text-sm mb-2 font-medium transition-colors duration-300"
              >
                Subject
              </label>
              <input
                name="subject"
                type="text"
                id="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="bg-gray-50 dark:bg-[#18191E] border border-gray-300 dark:border-[#33353F] placeholder-[#9CA2A9] text-gray-900 dark:text-gray-100 text-sm rounded-lg block w-full p-2.5 transition-colors duration-300 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 outline-none"
                placeholder="Just saying hi"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="text-gray-900 dark:text-white block text-sm mb-2 font-medium transition-colors duration-300"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="bg-gray-50 dark:bg-[#18191E] border border-gray-300 dark:border-[#33353F] placeholder-[#9CA2A9] text-gray-900 dark:text-gray-100 text-sm rounded-lg block w-full p-2.5 transition-colors duration-300 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 outline-none resize-none"
                placeholder="Let's talk about..."
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary-500 hover:bg-primary-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-2.5 px-5 rounded-lg w-full transition-all duration-300 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 100 8v4a8 8 0 01-8-8z" />
                  </svg>
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default EmailSection;