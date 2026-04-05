// Structured Knowledge Base — First Person (Baibhav's own voice)
// Each entry has: id, category, keywords (for matching), and a concise first-person response.

export const knowledgeEntries = [
  // ─── Identity ───
  {
    id: "identity",
    category: "Identity",
    keywords: ["name", "who", "yourself", "introduce", "about you", "tell me about"],
    response: "I'm Baibhav Rajkumar — a Full Stack Developer and AI/ML enthusiast based in Guwahati, Assam, India with over 3 years of industry experience.",
  },
  // ─── Contact ───
  {
    id: "contact",
    category: "Contact",
    keywords: ["contact", "email", "phone", "mobile", "reach", "call", "connect", "number", "mail", "message", "get in touch"],
    response: "You can reach me at baibhavrajkumar1999@gmail.com or call me at (+91) 7086041934. I'm also on LinkedIn (linkedin.com/in/baibhavrajkumar) and GitHub (github.com/Baibhav100).",
  },
  // ─── Location ───
  {
    id: "location",
    category: "Location",
    keywords: ["location", "where", "city", "live", "based", "from", "address", "place", "country", "state"],
    response: "I'm based in Guwahati, Assam, India. I'm open to remote roles as well as relocation for the right opportunity.",
  },
  // ─── Summary ───
  {
    id: "summary",
    category: "Summary",
    keywords: ["summary", "overview", "profile", "background", "brief", "describe", "what do you do"],
    response: "I'm a Full Stack Developer with 3+ years of experience building high-performance web apps using React.js, Node.js, Next.js, and MySQL. I also do data analysis with Python and Power BI, and I'm actively expanding into AI/ML.",
  },
  // ─── Frontend Skills ───
  {
    id: "frontend_skills",
    category: "Skills",
    keywords: ["frontend", "front-end", "front end", "react", "next", "nextjs", "tailwind", "css", "html", "bootstrap", "redux", "responsive"],
    response: "My frontend stack includes React.js, Next.js, Redux, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, and Bootstrap. I build responsive, pixel-perfect UIs with smooth Framer Motion animations.",
  },
  // ─── Backend Skills ───
  {
    id: "backend_skills",
    category: "Skills",
    keywords: ["backend", "back-end", "back end", "node", "express", "api", "rest", "mysql", "mongodb", "database", "server", "php"],
    response: "On the backend, I work with Node.js, Express.js, PHP, MySQL, and MongoDB. I design efficient RESTful APIs and optimize database queries for performance.",
  },
  // ─── DevOps & Tools ───
  {
    id: "devops",
    category: "Skills",
    keywords: ["devops", "docker", "jenkins", "ci/cd", "cicd", "aws", "cloud", "deployment", "firebase", "heroku", "git", "postman", "tools", "infrastructure"],
    response: "I have hands-on experience with Docker, Jenkins, CI/CD pipelines, AWS (EC2, S3), Firebase, Heroku, Git, and Postman.",
  },
  // ─── Programming Languages ───
  {
    id: "languages",
    category: "Skills",
    keywords: ["language", "languages", "programming", "python", "c++", "coding"],
    response: "I'm proficient in JavaScript (primary), Python, C, and C++. I use Python extensively for data analysis with NumPy and Pandas.",
  },
  // ─── Data & Analytics ───
  {
    id: "data_skills",
    category: "Skills",
    keywords: ["data", "analytics", "analysis", "powerbi", "power bi", "tableau", "numpy", "pandas", "visualization", "dashboard", "analyst"],
    response: "I work with Python (NumPy, Pandas) for data manipulation and use Power BI and Tableau for dashboards and visualization. I've built an Electric Vehicle Data Analysis dashboard using Power BI.",
  },
  // ─── All Skills (general) ───
  {
    id: "all_skills",
    category: "Skills",
    keywords: ["skill", "skills", "tech", "stack", "technology", "technologies", "expertise", "proficient", "capable", "competent", "good at", "what can you do"],
    response: "Here's my tech stack:\n\n• Frontend: React.js, Next.js, Redux, JavaScript, Tailwind, Bootstrap\n• Backend: Node.js, Express.js, PHP, REST APIs\n• Databases: MySQL, MongoDB\n• DevOps: Docker, Jenkins, CI/CD, AWS, Firebase\n• Languages: JavaScript, Python, C, C++\n• Data: NumPy, Pandas, Tableau, Power BI\n• AI/ML: OpenCV, MediaPipe, Google Speech Recognition",
  },
  // ─── Experience: Adventure Code ───
  {
    id: "exp_adventure",
    category: "Experience",
    keywords: ["adventure code", "adventure", "current job", "current role", "web developer", "2023", "2024", "2025", "recent", "latest"],
    response: "I worked as a Web Developer at Adventure Code (Jun 2023 – Jul 2025) where I:\n\n• Built dynamic sites with React.js, Node.js & MySQL, boosting client satisfaction by 30%\n• Created efficient RESTful APIs with Express.js\n• Improved page load speed by 40% through lazy loading & caching\n• Collaborated with design & product teams on UI/UX improvements\n• Leveraged AI tools like Claude.ai, Deepseek, and ChatGPT",
  },
  // ─── Experience: EKODUS ───
  {
    id: "exp_ekodus",
    category: "Experience",
    keywords: ["ekodus", "front end developer", "frontend developer", "2022", "previous", "first job", "earlier"],
    response: "I was a Front End Developer at EKODUS Technologies (Mar 2022 – Apr 2023) where I:\n\n• Developed responsive websites using Flexbox & CSS, increasing engagement by 20%\n• Optimized CSS/JS for cross-browser compatibility\n• Used Bootstrap & React libraries, cutting project timelines by 25%\n• Worked with backend teams on CI/CD pipelines",
  },
  // ─── Experience (General) ───
  {
    id: "experience_general",
    category: "Experience",
    keywords: ["experience", "work", "career", "job", "jobs", "professional", "employment", "worked", "company", "companies", "role", "roles", "history"],
    response: "I have 3+ years of professional experience:\n\n1. Web Developer @ Adventure Code (Jun 2023 – Jul 2025) — Full-stack development with React, Node.js, MySQL\n2. Front End Developer @ EKODUS Technologies (Mar 2022 – Apr 2023) — Responsive UI development with React & Bootstrap\n\nI've consistently delivered measurable improvements in performance, user retention, and client satisfaction.",
  },
  // ─── Project: ResumeSync ───
  {
    id: "proj_resumesync",
    category: "Projects",
    keywords: ["resumesync", "resume sync", "resume", "ats", "ai resume", "tailor"],
    response: "ResumeSync is my SaaS platform that uses Gemini AI and Puppeteer to tailor resumes for ATS optimization. It auto-adds missing keywords and rephrases experiences to match job descriptions. Live at resume-sync-eight.vercel.app",
  },
  // ─── Project: Vision-Based PC Automation ───
  {
    id: "proj_vision",
    category: "Projects",
    keywords: ["vision", "pc automation", "hand gesture", "opencv", "mediapipe", "cursor", "gesture"],
    response: "I built a Vision-Based PC Automation system using OpenCV for camera access, MediaPipe for hand landmark detection, and PyAutoGUI for input simulation. It translates finger movements into cursor control. GitHub: github.com/Baibhav100/vision_based_pc_automation",
  },
  // ─── Project: Speech to Action ───
  {
    id: "proj_speech",
    category: "Projects",
    keywords: ["speech", "voice", "action", "speech recognition", "voice command", "google speech"],
    response: "My Speech to Action System uses Google Speech Recognition for voice command parsing. You can search Google, open YouTube videos, and more — all through voice. GitHub: github.com/Baibhav100/speech_to_action_system",
  },
  // ─── Project: YouTube Clone ───
  {
    id: "proj_youtube",
    category: "Projects",
    keywords: ["youtube", "lookit", "clone", "video", "rapid api"],
    response: "Lookit is my YouTube clone built with React.js & RapidAPI. It features a custom video player, real-time content, lazy loading, and caching. Live at youtube-clone-nu-rouge.vercel.app",
  },
  // ─── Project: EV Dashboard ───
  {
    id: "proj_ev",
    category: "Projects",
    keywords: ["electric vehicle", "ev", "vehicle data"],
    response: "I built an interactive Power BI dashboard for Electric Vehicle data analysis and visualization, providing actionable market insights.",
  },
  // ─── Project: Portfolio ───
  {
    id: "proj_portfolio",
    category: "Projects",
    keywords: ["portfolio", "personal website", "this website", "this site"],
    response: "This portfolio is built with Next.js & Tailwind CSS, featuring Framer Motion animations, Aceternity UI components (Link Previews, Apple Cards Carousel, Timeline), and this RAG-based AI chat!",
  },
  // ─── Project: Foodish ───
  {
    id: "proj_foodish",
    category: "Projects",
    keywords: ["foodish", "food", "ordering"],
    response: "Foodish is a food ordering web app I built with React.js and Tailwind CSS. Live at foodish-alpha.vercel.app",
  },
  // ─── Project: Gaming ───
  {
    id: "proj_gaming",
    category: "Projects",
    keywords: ["gaming", "game", "award"],
    response: "I built a Gaming website with React.js focusing on high-performance rendering and interactive UI. Live at award-winning-lime.vercel.app",
  },
  // ─── All Projects ───
  {
    id: "all_projects",
    category: "Projects",
    keywords: ["project", "projects", "built", "build", "created", "showcase", "made"],
    response: "Here are my key projects:\n\n• ResumeSync — AI resume builder with Gemini AI & Puppeteer\n• Vision-Based PC Automation — Hand gesture control (OpenCV + MediaPipe)\n• Speech to Action — Voice-controlled system (Google Speech Recognition)\n• Lookit — YouTube clone (React.js + RapidAPI)\n• EV Dashboard — Data visualization (Power BI)\n• Foodish — Food ordering app (React.js + Tailwind)\n• Gaming Website — Interactive UI (React.js)\n• This Portfolio — Next.js + Aceternity UI\n\nMost are live — check my GitHub: github.com/Baibhav100",
  },
  // ─── Education ───
  {
    id: "education",
    category: "Education",
    keywords: ["education", "degree", "college", "university", "study", "studied", "school", "mca", "bca", "qualification", "academic", "ustm", "das commerce", "graduate", "graduation", "qualified"],
    response: "My qualifications:\n\n• MCA (Master of Computer Applications) — USTM, Meghalaya (2023)\n• BCA (Bachelor of Computer Applications) — K C Das Commerce College, Guwahati (2021)",
  },
  // ─── Certifications ───
  {
    id: "certifications",
    category: "Certifications",
    keywords: ["certification", "certificate", "certified", "course", "courses", "aws", "iit", "machine learning", "training"],
    response: "My certifications:\n\n• Advanced Certification in Applied Data Science, ML & AI from IIT (ongoing)\n• AWS Certified Developer",
  },
  // ─── AI/ML ───
  {
    id: "ai_ml",
    category: "AI/ML",
    keywords: ["artificial intelligence", "machine learning", "deep learning", "prompt", "prompt engineering", "gpt", "chatgpt", "claude", "llm"],
    response: "I'm actively diving into AI/ML and prompt engineering. I've built AI projects like Vision-Based PC Automation and Speech to Action, and developed ResumeSync using Gemini AI. I regularly work with Claude.ai, ChatGPT, Deepseek, and Cursor AI.",
  },
  // ─── Hiring ───
  {
    id: "hiring",
    category: "Hiring",
    keywords: ["hire", "hiring", "available", "open to", "looking for", "opportunity", "opportunities", "position", "seeking", "freelance", "remote", "relocate"],
    response: "I'm actively looking for roles in:\n\n• Frontend Development\n• Full Stack Development\n• Data / Business Analyst\n• Prompt Engineering / AI\n\nI'm open to remote and on-site positions. Reach me at baibhavrajkumar1999@gmail.com",
  },
  // ─── Strengths ───
  {
    id: "strengths",
    category: "Strengths",
    keywords: ["strength", "strengths", "soft skill", "team", "leadership", "collaborate", "collaboration", "communication", "problem solving", "why hire", "why should"],
    response: "My key strengths:\n\n• Cross-functional collaboration with design & product teams\n• Strong problem-solving and performance optimization skills\n• Quick learner — I adapt fast to new tech and tools\n• Currently pursuing advanced AI/ML certifications from IIT\n• Clear communicator who bridges technical and business teams",
  },
];

// Greeting patterns — these must match as whole words to avoid false positives
export const greetingPatterns = ["hello", "hey", "greetings", "good morning", "good afternoon", "good evening", "howdy", "hola"];
// "hi" handled separately with word boundary check

export const thankPatterns = ["thank", "thanks", "appreciate", "grateful"];
