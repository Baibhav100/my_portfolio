"use client";
import Link from "next/link";
import React, { useState } from "react";
import NavLink from "./NavLink";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MenuOverlay from "./MenuOverlay";
import { ThemeToggle } from "./ThemeToggle";
import { useProjectPreview } from "@/context/ProjectPreviewContext";
import { Columns, X, Sparkles } from "lucide-react";

const navLinks = [
  { title: "About", path: "#about" },
  { title: "Projects", path: "#projects" },
  { title: "Experience", path: "#experience" },
  { title: "Contact", path: "#contact" },
];

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { isSplit, activeProject, activeType, closePreview } = useProjectPreview();

  return (
    <nav className="sticky top-0 left-0 right-0 z-40 w-full border-b border-gray-200/80 dark:border-white/10 bg-[#F8F9FA]/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl transition-all duration-300">
      <div className="flex flex-wrap items-center justify-between mx-auto px-4 sm:px-6 py-2.5 lg:py-3 max-w-[1400px]">
        {/* Brand Name */}
        <Link
          href={"/"}
          className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight transition-all duration-300 hover:opacity-90 py-1 truncate max-w-[220px] sm:max-w-none flex items-center"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-600 dark:from-white dark:via-neutral-200 dark:to-neutral-400">
            Baibhav
          </span>
          <span className="ml-1.5 font-medium text-neutral-500 dark:text-neutral-400 text-lg sm:text-xl">
            Rajkumar
          </span>
          <span className="text-primary-500 font-black text-2xl leading-none">.</span>
        </Link>

        {/* Right side controls: Split Badge (if active), ThemeToggle, Mobile Hamburger */}
        <div className="flex items-center gap-2 md:order-2">
          {/* Active Split View Mini Tag */}
          {isSplit && activeProject && (
            <button
              onClick={closePreview}
              title="Close live split preview"
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-primary-500/10 text-primary-500 hover:bg-primary-500/20 border border-primary-500/30 transition-all"
            >
              <Columns className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {activeType === "github" ? "GitHub:" : "Live:"}
              </span>
              <span className="font-bold max-w-[90px] truncate">{activeProject.title}</span>
              <X className="w-3 h-3 hover:text-red-500" />
            </button>
          )}

          <ThemeToggle />

          <div className={`mobile-menu ${isSplit ? "block xl:hidden" : "block md:hidden"}`}>
            {!navbarOpen ? (
              <button
                onClick={() => setNavbarOpen(true)}
                className="flex items-center p-2 border rounded-lg border-slate-200 dark:border-neutral-800 text-slate-800 dark:text-slate-200 hover:text-black dark:hover:text-white"
                aria-label="Open menu"
              >
                <Bars3Icon className="h-5 w-5" />
              </button>
            ) : (
              <button
                onClick={() => setNavbarOpen(false)}
                className="flex items-center p-2 border rounded-lg border-slate-200 dark:border-neutral-800 text-slate-800 dark:text-slate-200 hover:text-black dark:hover:text-white"
                aria-label="Close menu"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className={`menu ${isSplit ? "hidden xl:block" : "hidden md:block"} md:w-auto md:order-1`} id="navbar">
          <ul className="flex p-4 md:p-0 md:flex-row md:space-x-6 lg:space-x-8 mt-0 text-sm font-medium items-center">
            {navLinks.map((link, index) => (
              <li key={index}>
                <NavLink href={link.path} title={link.title} />
              </li>
            ))}
            {/* AI Lab special link */}
            <li>
              <Link
                href="/ai-lab"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/40 text-purple-400 hover:text-purple-300 hover:border-purple-400/70 text-xs font-semibold transition-all hover:scale-105"
              >
                <Sparkles className="w-3.5 h-3.5" />
                AI Lab
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {navbarOpen ? <MenuOverlay links={navLinks} /> : null}
    </nav>
  );
};

export default Navbar;
