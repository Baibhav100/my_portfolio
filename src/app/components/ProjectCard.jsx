import React from "react";
import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const ProjectCard = ({ imgUrl, title, description, gitUrl, previewUrl }) => {
  return (
    <div className="group/card hover:scale-[1.02] transition-all duration-300">
      <div
        className="h-52 md:h-72 rounded-t-xl relative group shadow-xl overflow-hidden"
        style={{ background: `url(${imgUrl})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full bg-[#0a0a0a]/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500">
          <Link
            href={gitUrl}
            target="_blank"
            className="h-14 w-14 mr-2 border-2 relative rounded-full border-[#ADB7BE] hover:border-white transition-all duration-300"
          >
            <CodeBracketIcon className="h-10 w-10 text-[#ADB7BE] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  cursor-pointer hover:text-white transition-all duration-300" />
          </Link>
          <Link
            href={previewUrl}
            target="_blank"
            className="h-14 w-14 border-2 relative rounded-full border-[#ADB7BE] hover:border-white transition-all duration-300"
          >
            <EyeIcon className="h-10 w-10 text-[#ADB7BE] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  cursor-pointer hover:text-white transition-all duration-300" />
          </Link>
        </div>
      </div>
      <div className="text-gray-900 dark:text-white rounded-b-xl bg-gray-50 dark:bg-[#111111] py-6 px-4 transition-colors duration-300 border-x border-b border-gray-200 dark:border-white/5 shadow-xl">
        <h5 className="text-xl font-semibold mb-2">{title}</h5>
        <p className="text-gray-600 dark:text-[#ADB7BE]">{description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
