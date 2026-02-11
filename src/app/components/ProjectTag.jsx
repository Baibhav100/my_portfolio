import React from "react";

const ProjectTag = ({ name, onClick, isSelected }) => {
  const buttonStyles = isSelected
    ? "text-white border-primary-500 bg-primary-500 shadow-lg shadow-primary-500/20"
    : "text-gray-600 dark:text-[#ADB7BE] border-gray-300 dark:border-slate-600 hover:border-primary-500 dark:hover:border-white transition-all duration-300";
  return (
    <button
      className={`${buttonStyles} rounded-full border-2 px-6 py-3 text-xl cursor-pointer`}
      onClick={() => onClick(name)}
    >
      {name}
    </button>
  );
};

export default ProjectTag;
