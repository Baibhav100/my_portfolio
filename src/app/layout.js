import './globals.css'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { ThemeProvider } from "./components/ThemeProvider";
import { ProjectPreviewProvider } from "@/context/ProjectPreviewContext";
import SideSocials from "./components/SideSocials";

const fontSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata = {
  title: 'Baibhav Rajkumar | Portfolio',
  description: 'Full Stack Developer & AI Engineer Portfolio',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={fontSans.variable}>
      <body className={`${fontSans.className} antialiased`}>
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
