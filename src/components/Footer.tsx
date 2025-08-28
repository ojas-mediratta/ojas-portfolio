import React from "react";
import Container from "@/components/Container";

export default function Footer() {
  return (
    <footer className="border-t border-border py-10 text-center text-sm opacity-70">
      <Container>© {new Date().getFullYear()} Ojas Mediratta. Vibe coded with React & Tailwind. Theme inspired by Ayu Mirage.</Container>
    </footer>
  );
}