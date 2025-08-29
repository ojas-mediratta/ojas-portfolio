import React, { useMemo, useState } from "react";
import Container from "@/components/Container";
import Brandmark from "@/components/Brandmark";
import { Menu, X, Github, Linkedin, Instagram } from "lucide-react";

const hoverAccents = [
  "hover:border-accent-cyan hover:text-accent-cyan",
  "hover:border-accent-purple hover:text-accent-purple",
  "hover:border-accent-green hover:text-accent-green",
  "hover:border-accent-yellow hover:text-accent-yellow",
  "hover:border-accent-orange hover:text-accent-orange",
  "hover:border-accent-blue hover:text-accent-blue",
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const nav = useMemo(
    () => [
      { label: "About", href: "#about" },
      { label: "Projects", href: "#projects" },
      { label: "Experience", href: "#experience" },
      { label: "Education", href: "#education" },
      { label: "Publications", href: "#publications" },
      { label: "Contact", href: "#contact" },
    ],
    []
  );

  const navWithAccents = nav.map((item, idx) => ({
    ...item,
    hoverClass: hoverAccents[idx % hoverAccents.length],
  }));

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-[rgba(31,36,48,0.6)] backdrop-blur">
      <Container>
        <div className="relative flex h-16 items-center justify-between">
          {/* Left: Name */}
          <a
            href="#top"
            className="group text-subtext transition-colors hover:text-accent-cyan"
            aria-label="Ojas M"
          >
            <Brandmark className="h-6 w-6" />
            <span className="sr-only">Ojas M</span>
          </a>

          {/* Center: Nav */}
          <nav className="absolute left-1/2 -translate-x-1/2 hidden items-center gap-4 md:flex">
            {navWithAccents.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className={`rounded-xl border border-border px-3 py-1.5 text-sm text-subtext transition-colors ${n.hoverClass}`}
              >
                {n.label}
              </a>
            ))}
          </nav>

          {/* Right: Social links */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://github.com/ojas-mediratta"
              target="_blank"
              rel="noreferrer"
              className="text-subtext hover:text-accent-purple transition-colors"
            >
              <Github className="size-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/ojas-mediratta/"
              target="_blank"
              rel="noreferrer"
              className="text-subtext hover:text-accent-blue transition-colors"
            >
              <Linkedin className="size-5" />
            </a>
            <a
              href="https://www.instagram.com/ojas.mediratta_/"
              target="_blank"
              rel="noreferrer"
              className="text-subtext hover:text-accent-orange transition-colors"
            >
              <Instagram className="size-5" />
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="rounded-xl border border-border p-2 md:hidden transition-colors hover:border-accent-purple"
            aria-label="Toggle menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {/* Mobile nav */}
        {open && (
          <div className="grid gap-2 pb-4 md:hidden">
            {navWithAccents.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className={`rounded-xl border border-border bg-panel px-3 py-2 text-subtext transition-colors ${n.hoverClass}`}
              >
                {n.label}
              </a>
            ))}
          </div>
        )}
      </Container>
    </header>
  );
}