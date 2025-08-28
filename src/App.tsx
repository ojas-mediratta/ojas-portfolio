import React from "react";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Publications from "@/components/Publications";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import MouseGlow from "@/components/MouseGlow";
import { THEME } from "@/data/theme";

export default function App() {
  return (
    <div
      className="relative min-h-screen antialiased"
      style={{ backgroundColor: THEME.bg, color: THEME.text }}
    >
      {/* Glow that follows cursor */}
      <MouseGlow />

      {/* Site header */}
      <Navbar />

      {/* Main content */}
      <main className="relative z-10">
        <About />
        <Projects />
        <Experience />
        <Publications />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}