import React, { useEffect } from "react";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import About from "@/sections/About";
import Projects from "@/sections/Projects";
import Research from "@/sections/Research";
import Experience from "@/sections/Experience";
import Contact from "@/sections/Contact";
import MouseGlow from "@/components/MouseGlow";
import Education from "@/sections/Education";
import ScrollIndicator from "@/components/ScrollIndicator";
import LoadingScreen from "@/components/LoadingScreen";
import { useAssetPreloader } from "@/components/AssetPreloader";
import { preloadCriticalAssets } from "@/components/PerformanceUtils";

export default function App() {
  const { isLoading, progress, loadedAssets, totalAssets } = useAssetPreloader();

  // Preload additional assets once the initial load is complete
  useEffect(() => {
    if (!isLoading) {
      preloadCriticalAssets();
    }
  }, [isLoading]);

  // Show loading screen while assets are loading
  if (isLoading) {
    return (
      <LoadingScreen 
        progress={progress}
        loadedAssets={loadedAssets}
        totalAssets={totalAssets}
      />
    );
  }

  return (
    <div className="relative min-h-screen antialiased bg-bg text-text">
      {/* Glow that follows cursor */}
      <MouseGlow />

      {/* Site header */}
      <Navbar />

      {/* Main content */}
      <main className="relative z-10">
        <About />
        <ScrollIndicator />
        <Projects />
        <Experience />
        <Education />
        <Research />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
