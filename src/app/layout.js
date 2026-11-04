import './globals.css'
import { ThemeProvider } from "./components/ThemeProvider";
import { ProjectPreviewProvider } from "@/context/ProjectPreviewContext";
import SideSocials from "./components/SideSocials";

export const metadata = {
  title: 'Baibhav Rajkumar | Portfolio',
  description: 'Full Stack Developer & AI Engineer Portfolio',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ProjectPreviewProvider>
            <SideSocials />
            {children}
          </ProjectPreviewProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
