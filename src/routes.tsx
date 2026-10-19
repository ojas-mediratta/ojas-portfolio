import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "@/App";
import ProjectDetail from "@/components/ProjectDetail";
import ReadingPage from "@/pages/ReadingPage";
import { ThemeProvider } from "@/contexts/ThemeContext";

export default function AppRoutes() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/reading" element={<ReadingPage />} />
        {/* optional: fallback to home */}
        <Route path="*" element={<App />} />
      </Routes>
    </ThemeProvider>
  );
}
