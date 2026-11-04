export const projectsData = [
  {
    id: 9,
    title: "SprintDesk - Daily Task Planner",
    description: "A daily task planner and Kanban productivity board built with React, TypeScript, Zustand, and Material-UI.",
    image: "/images/projects/sprintDesk.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/Baibhav100/SprintDesk",
    previewUrl: "https://sprint-desk-nzff0o9vf-baibhav100s-projects.vercel.app/",
    highlights: [
      "Interactive Kanban board with drag-and-drop task workflows and column reorganization",
      "Persistent state management using Zustand with local storage rehydration",
      "Advanced task filtering by priority, tags, search queries, and team assignees",
      "Built with React 19, TypeScript, Vite, and Material-UI (MUI v6)"
    ],
    tech: ["React", "TypeScript", "Zustand", "Material-UI", "Vite"]
  },
  {
    id: 10,
    title: "FitPulse - Fitness Affiliate Website",
    description: "A modern fitness affiliate platform showcasing curated workout gear, supplements, and fitness programs.",
    image: "/images/projects/Fitpulse.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/Baibhav100/fitpulse",
    previewUrl: "https://fitpulse-sepia.vercel.app/",
    highlights: [
      "Curated fitness affiliate catalog with product filtering and category showcases",
      "Responsive high-conversion landing pages with modern typography and animations",
      "Client-side routing with React Router v7 and Lucide icons",
      "Built with React 19, Tailwind CSS, and Vite for lightning-fast performance"
    ],
    tech: ["React", "Tailwind CSS", "Vite", "React Router", "Lucide React"]
  },
  {
    id: 8,
    title: "ResumeSync - AI Resume Builder",
    description: "SaaS platform leveraging Gemini AI and Puppeteer to tailor resumes for ATS optimization.",
    image: "/images/projects/resumeSync.png",
    tag: ["All", "Web", "AI"],
    gitUrl: "https://github.com/Baibhav100/resumeSync",
    previewUrl: "https://resume-sync-eight.vercel.app/",
    highlights: [
      "Gemini AI integration for dynamic ATS score analysis",
      "Automated PDF generation using Puppeteer",
      "Live editable preview with modern resume templates",
      "Full authentication and user profile management"
    ],
    tech: ["Next.js", "React", "Gemini AI", "Tailwind CSS", "Puppeteer", "Node.js"]
  },
  {
    id: 1,
    title: "Vision-Based PC Automation",
    description: "Built a PC automated system using OpenCV and MediaPipe for real-time hand gesture control.",
    image: "/images/projects/computer_vision.jpg",
    tag: ["All", "AI"],
    gitUrl: "https://github.com/Baibhav100/vision_based_pc_automation",
    previewUrl: "#",
    isDesktopApp: true,
    highlights: [
      "Real-time hand tracking and landmark estimation with MediaPipe",
      "Custom gesture recognition algorithms for mouse clicks, scrolling, and volume control",
      "Low-latency camera processing loop with OpenCV and Python",
      "Smooth cursor movement interpolation to eliminate jitter"
    ],
    tech: ["Python", "OpenCV", "MediaPipe", "PyAutoGUI", "NumPy"]
  },
  {
    id: 2,
    title: "Speech to Action System",
    description: "AI system that triggers computer actions based on voice commands using Google Speech Recognition.",
    image: "/images/projects/action.jpg",
    tag: ["All", "AI"],
    gitUrl: "https://github.com/Baibhav100/speech_to_action_system",
    previewUrl: "#",
    isDesktopApp: true,
    highlights: [
      "Natural language voice command parsing and intent detection",
      "Automated system commands: browser navigation, file management, app launch",
      "Google Speech Recognition API with offline fallback options",
      "Customizable trigger phrases and voice feedback synthesizers"
    ],
    tech: ["Python", "SpeechRecognition", "Pyttsx3", "OS API", "NLP"]
  },
  {
    id: 3,
    title: "LOOKIT - YouTube Clone",
    description: "A YouTube clone video streaming application built with React.js and RapidAPI.",
    image: "/images/projects/lookit.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/Baibhav100/Youtube_clone",
    previewUrl: "https://youtube-clone-nu-rouge.vercel.app/",
    highlights: [
      "Instant video search and category filtering with RapidAPI YouTube v3",
      "Custom responsive video player with channel details and related videos feed",
      "Modern dark theme UI with sleek card animations",
      "Optimized API caching to reduce redundant network requests"
    ],
    tech: ["React.js", "RapidAPI", "Tailwind CSS", "React Player", "Material UI"]
  },
  {
    id: 4,
    title: "Electric Vehicle Data Analysis",
    description: "Interactive PowerBI dashboard for electric vehicle market trends, adoption, and battery metrics.",
    image: "/images/projects/electric.png",
    tag: ["All", "Data"],
    gitUrl: "https://github.com/Baibhav100/electric_vehicle_analysis",
    previewUrl: "https://app.powerbi.com/groups/me/reports/215ca4af-b50f-4ad5-898c-f2f4b6274f83/d5c89186a0602c70ecbe?experience=power-bi",
    highlights: [
      "Interactive multi-page PowerBI report analyzing EV market growth and forecasts",
      "DAX calculated columns and measures for EV range distribution and battery capacities",
      "Clean ETL pipeline with Python Pandas prior to data ingestion",
      "Executive summary charts for geographical adoption and manufacturer market share"
    ],
    tech: ["PowerBI", "Python", "Pandas", "DAX", "Data Modeling"]
  },
  {
    id: 5,
    title: "Portfolio Website",
    description: "My personal interactive portfolio website built with Next.js, Framer Motion, and Tailwind CSS.",
    image: "/images/projects/portfolio.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/Baibhav100/my_portfolio",
    previewUrl: "https://my-portfolio-phi-red-79.vercel.app/",
    highlights: [
      "Interactive split-view live project preview mode",
      "AI Chatbot assistant with local RAG knowledge base",
      "Dark and light theme support with glassmorphism design",
      "Fully responsive and mobile optimized"
    ],
    tech: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Gemini API"]
  },
  {
    id: 6,
    title: "Foodish - E-commerce",
    description: "An attractive food ordering and delivery website using React.js and Tailwind CSS.",
    image: "/images/projects/Foodish.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/Baibhav100/Foodish",
    previewUrl: "https://foodish-alpha.vercel.app/",
    highlights: [
      "Intuitive menu browsing with category tabs and search",
      "Interactive shopping cart with real-time price calculations",
      "Vibrant modern UI with high conversion design patterns",
      "Smooth transitions and mobile-responsive layout"
    ],
    tech: ["React.js", "Tailwind CSS", "Context API", "JavaScript", "HTML5"]
  },
  {
    id: 7,
    title: "Gaming",
    description: "Modern gaming showcase website built with React.js featuring interactive 3D inspired aesthetics.",
    image: "/images/projects/gaming.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/Baibhav100/award-winning",
    previewUrl: "https://award-winning-lime.vercel.app/",
    highlights: [
      "Award-winning inspired gaming visual aesthetics and typography",
      "Parallax scroll animations and dynamic cursor interactions",
      "High performance asset loading and responsive layout",
      "Rich media showcases with game previews and clips"
    ],
    tech: ["React.js", "Tailwind CSS", "Framer Motion", "GSAP"]
  },
];
