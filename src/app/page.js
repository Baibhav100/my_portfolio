import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import EmailSection from "./components/EmailSection";
import Footer from "./components/Footer";
import AchievementsSection from "./components/AchievementsSection";
import ExperienceSection from "./components/ExperienceSection";
import AIChatWidget from "./components/AIChatWidget";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white dark:bg-[#0a0a0a] transition-colors duration-500">
      <Navbar />
      <div className="container mt-24 mx-auto px-6 md:px-12 py-4 max-w-[1400px]">
        <div className="space-y-16 md:space-y-24">
          <HeroSection />
          <AchievementsSection />
          <AboutSection />
          <ProjectsSection />
          <ExperienceSection />
          <EmailSection />
        </div>
      </div>
      <Footer />
      {/* This renders the new AI chat widget on the page */}
      <AIChatWidget />
    </main>
  );
}
