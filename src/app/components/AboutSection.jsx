"use client";
import React, { useTransition, useState } from "react";
import Image from "next/image";
import TabButton from "./TabButton";

const TAB_DATA = [

  {
    title: "Skills",
    id: "skills",
    content: (
      <div className="skills-container">
        <h3 className="text-lg font-bold">Frontend Development</h3>
        <div className="skills-pills">
          <span className="skill-pill">React.js</span>
          <span className="skill-pill">ReactNative</span>
          <span className="skill-pill">Flutter</span>
          <span className="skill-pill">Redux</span>
          <span className="skill-pill">Next.js</span>
          <span className="skill-pill">JavaScript</span>
          <span className="skill-pill">HTML</span>
          <span className="skill-pill">CSS</span>
          <span className="skill-pill">Tailwind CSS</span>
          <span className="skill-pill">Bootstrap</span>
          <span className="skill-pill">TypeScript</span>
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
          <span className="skill-pill">Enzyme</span>
          <span className="skill-pill">Cypress</span>
          <span className="skill-pill">Debugging and Performance Optimization</span>
        </div>
  
        <h3 className="text-lg font-bold">Soft Skills</h3>
        <div className="skills-pills">
          <span className="skill-pill">Team Leadership</span>
          <span className="skill-pill">Problem-Solving</span>
          <span className="skill-pill">Effective Communication</span>
        </div>
      </div>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <ul className="list-disc pl-2">
        <li>Master&apos;s of Computer Applications(MCA)</li>
        <li>University of Science and Technology, Meghalaya</li>
      </ul>
    ),
  },
  {
    title: "Certifications",
    id: "certifications",
    content: (
      <ul className="list-disc pl-2">
        <li>AWS Cloud Practitioner</li>
        <li>Google Professional Cloud Developer</li>
      </ul>
    ),
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section className="text-warmGray-300" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <Image src="/images/about-image.png" width={500} height={500} />
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
        <h2 className=" text-4xl md:text-5xl font-extrabold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600">
             About Me
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500  mb-4"></div>
          <p className="text-base lg:text-1xl text-justify">
          Immediate joiner. Results-oriented Web Developer with over 3 years of experience in designing, developing, and deploying scalable web applications. Expertise in modern frameworks such as React.js, Node.js,
 and Next.js, with strong proficiency in RESTful API development, UI/UX design, and perfor
mance optimization. Demonstrated success in leading cross-functional teams, improving appli
cation performance, and integrating cutting-edge technologies. Adept at Agile methodologies
 and passionate about delivering user-focused solutions to meet business goals.
          </p>
          <div className="flex flex-row justify-start mt-8">
            <TabButton
              selectTab={() => handleTabChange("skills")}
              active={tab === "skills"}
            >
              {" "}
              Skills{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("education")}
              active={tab === "education"}
            >
              {" "}
              Education{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("certifications")}
              active={tab === "certifications"}
            >
              {" "}
              Certifications{" "}
            </TabButton>
          </div>
          <div className="mt-8">
            {TAB_DATA.find((t) => t.id === tab).content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
