/**
 * portfolioChunks.js
 * Semantic chunks of Baibhav's portfolio data.
 * Each chunk is a focused, self-contained unit of information.
 * At runtime, Gemini's text-embedding-004 model embeds each chunk.
 * RAG retrieval finds the most relevant chunks per query.
 */

export const portfolioChunks = [
  {
    id: "identity",
    category: "Identity",
    content:
      "Baibhav Rajkumar is a Full Stack Developer and AI/ML enthusiast based in Guwahati, Assam, India, with over 3 years of professional experience building high-performance web applications and data analytics solutions.",
  },
  {
    id: "contact",
    category: "Contact",
    content:
      "Contact Baibhav Rajkumar: Email baibhavrajkumar1999@gmail.com, Phone (+91) 7086041934, LinkedIn linkedin.com/in/baibhavrajkumar, GitHub github.com/Baibhav100. He is open to remote roles and relocation for the right opportunity.",
  },
  {
    id: "skills_frontend",
    category: "Skills",
    content:
      "Baibhav's frontend skills include React.js, Next.js, Redux, JavaScript (ES6+), TypeScript, Tailwind CSS, HTML5, CSS3, Bootstrap, and Framer Motion. He builds responsive, pixel-perfect UIs with smooth animations and cross-browser compatibility.",
  },
  {
    id: "skills_backend",
    category: "Skills",
    content:
      "Baibhav's backend skills include Node.js, Express.js, PHP, RESTful API design, MySQL, and MongoDB. He designs efficient server-side architectures and optimises database queries for high-traffic applications.",
  },
  {
    id: "skills_devops",
    category: "Skills",
    content:
      "Baibhav has DevOps and cloud experience with Docker, Jenkins, CI/CD pipelines, AWS (EC2, S3), Firebase, Heroku, Git, and Postman. He has configured deployment pipelines and cloud infrastructure for production applications.",
  },
  {
    id: "skills_data",
    category: "Skills",
    content:
      "Baibhav's data and analytics skills include Python (NumPy, Pandas), Power BI, and Tableau. He has built interactive dashboards and performed data analysis for business insights, including an Electric Vehicle market analysis dashboard.",
  },
  {
    id: "skills_ai",
    category: "Skills",
    content:
      "Baibhav's AI and machine learning skills include OpenCV for computer vision, MediaPipe for hand landmark detection, Google Speech Recognition, and Gemini AI for generative AI applications. He actively works with AI tools like Claude.ai, ChatGPT, Deepseek, and Cursor AI.",
  },
  {
    id: "skills_languages",
    category: "Skills",
    content:
      "Baibhav is proficient in JavaScript as his primary language, and also uses Python extensively for data analysis and automation. He has experience with C and C++ from his academic background.",
  },
  {
    id: "experience_adventure",
    category: "Experience",
    content:
      "Baibhav worked as a Web Developer at Adventure Code from June 2023 to July 2025. He built dynamic full-stack web applications with React.js, Node.js, and MySQL, created RESTful APIs with Express.js, improved page load speed by 40% through lazy loading and caching strategies, boosted client satisfaction by 30%, and collaborated closely with design and product teams. He also leveraged AI tools like Claude.ai, Deepseek, and ChatGPT to accelerate development.",
  },
  {
    id: "experience_ekodus",
    category: "Experience",
    content:
      "Baibhav worked as a Front End Developer at EKODUS Technologies from March 2022 to April 2023. He developed responsive websites using Flexbox and modern CSS, increased user engagement by 20%, optimised CSS and JavaScript for cross-browser compatibility, used Bootstrap and React component libraries to cut project timelines by 25%, and collaborated with backend teams on CI/CD pipelines.",
  },
  {
    id: "project_sprintdesk",
    category: "Projects",
    content:
      "SprintDesk is Baibhav's daily task planner and Kanban productivity board built with React 19, TypeScript, Zustand for state management, and Material-UI (MUI v6). Features include native drag-and-drop task workflows and column reorganisation, persistent state with local storage rehydration, advanced task filtering by priority, tags, search queries, and assignees. Live at sprint-desk-nzff0o9vf-baibhav100s-projects.vercel.app. GitHub: github.com/Baibhav100/SprintDesk.",
  },
  {
    id: "project_fitpulse",
    category: "Projects",
    content:
      "FitPulse is Baibhav's fitness affiliate website built with React 19, Tailwind CSS, Vite, React Router v7, and Lucide icons. It features a curated fitness product catalog with filtering, high-conversion responsive landing pages, and modern typography with animations. Live at fitpulse-sepia.vercel.app. GitHub: github.com/Baibhav100/fitpulse.",
  },
  {
    id: "project_resumesync",
    category: "Projects",
    content:
      "ResumeSync is Baibhav's AI-powered SaaS platform that tailors resumes for ATS optimisation. It uses Gemini AI for intelligent keyword insertion and experience rephrasing, and Puppeteer for web scraping job descriptions. It automatically matches resumes to job postings. Live at resume-sync-eight.vercel.app.",
  },
  {
    id: "project_vision",
    category: "Projects",
    content:
      "Baibhav's Vision-Based PC Automation project uses Python, OpenCV for camera access, MediaPipe for real-time hand landmark detection, and PyAutoGUI for mouse and keyboard simulation. It translates finger movements and hand gestures into cursor control and PC input. GitHub: github.com/Baibhav100/vision_based_pc_automation.",
  },
  {
    id: "project_speech",
    category: "Projects",
    content:
      "Baibhav's Speech to Action System uses Python and Google Speech Recognition to translate voice commands into PC actions. Users can search Google, open YouTube videos, and control applications hands-free through natural language voice input. GitHub: github.com/Baibhav100/speech_to_action_system.",
  },
  {
    id: "project_lookit",
    category: "Projects",
    content:
      "Lookit is Baibhav's YouTube clone built with React.js and the RapidAPI YouTube Data API. Features include a custom video player, real-time trending content, lazy loading for performance, and in-memory caching. Live at youtube-clone-nu-rouge.vercel.app.",
  },
  {
    id: "project_ev_dashboard",
    category: "Projects",
    content:
      "Baibhav built an interactive Electric Vehicle Data Analysis dashboard using Power BI. The dashboard provides market insights including adoption trends, manufacturer comparisons, and geographic distribution of EV registrations.",
  },
  {
    id: "project_foodish",
    category: "Projects",
    content:
      "Foodish is Baibhav's food ordering web application built with React.js and Tailwind CSS, featuring a clean menu browsing experience and cart functionality. Live at foodish-alpha.vercel.app.",
  },
  {
    id: "project_gaming",
    category: "Projects",
    content:
      "Baibhav built an interactive gaming website with React.js focused on high-performance rendering, smooth UI transitions, and immersive visual design. Live at award-winning-lime.vercel.app.",
  },
  {
    id: "project_portfolio",
    category: "Projects",
    content:
      "Baibhav's portfolio website is built with Next.js, Tailwind CSS, Framer Motion, and Aceternity UI components. It features a split-screen live project preview system, a Gemini-powered AI chat assistant with RAG retrieval, an AI Edge-Case Detector with Human-in-the-Loop, dark/light mode, and smooth animations.",
  },
  {
    id: "education",
    category: "Education",
    content:
      "Baibhav holds a Master of Computer Applications (MCA) from the University of Science and Technology Meghalaya (USTM), completed in 2023, and a Bachelor of Computer Applications (BCA) from K C Das Commerce College, Guwahati, completed in 2021.",
  },
  {
    id: "certifications",
    category: "Certifications",
    content:
      "Baibhav holds an AWS Certified Developer certification and is currently pursuing an Advanced Certification in Applied Data Science, Machine Learning, and AI from IIT.",
  },
  {
    id: "hiring_availability",
    category: "Hiring",
    content:
      "Baibhav Rajkumar is actively seeking roles in Frontend Development, Full Stack Development, Data or Business Analytics, and Prompt Engineering or AI product roles. He is open to both remote and on-site positions. Contact him at baibhavrajkumar1999@gmail.com or (+91) 7086041934.",
  },
  {
    id: "strengths",
    category: "Strengths",
    content:
      "Baibhav's key professional strengths include cross-functional collaboration with design and product teams, strong performance optimisation skills (achieved 40% speed improvements and 30% satisfaction gains), quick learning of new technologies, clear technical and business communication, and a data-driven problem-solving mindset.",
  },
];

