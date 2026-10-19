import React, { useMemo, useState } from "react";
import Container from "@/components/Container";
import Brandmark from "@/components/Brandmark";
import { useScrollSpy } from "@/components/useScrollSpy";
import { Menu, X, Github, Linkedin, Instagram, Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { DARK_THEME, LIGHT_THEME } from "@/data/theme";

// Color mapping for buttons - Dark theme (Ayu Mirage)
const darkButtonColors = [
  { border: DARK_THEME.cyan, text: DARK_THEME.cyan },
  { border: DARK_THEME.purple, text: DARK_THEME.purple },
  { border: DARK_THEME.green, text: DARK_THEME.green },
  { border: DARK_THEME.yellow, text: DARK_THEME.yellow },
  { border: DARK_THEME.red, text: DARK_THEME.red },
  { border: DARK_THEME.blue, text: DARK_THEME.blue },
];

// Color mapping for buttons - Light theme (Warm paper)
const lightButtonColors = [
  { border: LIGHT_THEME.cyan, text: LIGHT_THEME.cyan },
  { border: LIGHT_THEME.purple, text: LIGHT_THEME.purple },
  { border: LIGHT_THEME.green, text: LIGHT_THEME.green },
  { border: LIGHT_THEME.yellow, text: LIGHT_THEME.yellow },
  { border: LIGHT_THEME.red, text: LIGHT_THEME.red },
  { border: LIGHT_THEME.blue, text: LIGHT_THEME.blue },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const { theme, toggleTheme } = useTheme();
  
  const buttonColors = theme === 'dark' ? darkButtonColors : lightButtonColors;

  const nav = useMemo(
    () => [
      { label: "About", href: "#about" },
      { label: "Projects", href: "#projects" },
      { label: "Experience", href: "#experience" },
      { label: "Education", href: "#education" },
      { label: "Research", href: "#research" },
      { label: "Contact", href: "#contact" },
    ],
    []
  );

  // Extract section IDs for scrollspy
  const sectionIds = nav.map(item => item.href.replace('#', ''));
  const activeSection = useScrollSpy(sectionIds, 200);

  const navWithAccents = nav.map((item, idx) => {
    const colorIndex = idx % buttonColors.length;
    return {
      ...item,
      colorIndex,
      isActive: activeSection === item.href.replace('#', '') && !hoveredItem,
      isHovered: hoveredItem === item.href,
    };
  });

  return (
    <header className="sticky top-0 z-50 border-b border-border backdrop-blur" style={{ backgroundColor: theme === 'dark' ? 'rgba(31,36,48,0.6)' : 'rgba(247,245,240,0.88)' }}>
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
          <nav 
            className="absolute left-1/2 -translate-x-1/2 hidden items-center gap-6 lg:flex xl:gap-8"
            onMouseLeave={() => setHoveredItem(null)}
          >
            {navWithAccents.map((n) => {
              const isHighlighted = n.isHovered || n.isActive;
              const colors = buttonColors[n.colorIndex];
              
              return (
                <a
                  key={n.href}
                  href={n.href}
                  onMouseEnter={() => setHoveredItem(n.href)}
                  className="py-2 text-sm transition-colors hover:underline underline-offset-4"
                  style={{
                    borderColor: isHighlighted ? colors.border : 'var(--color-border)',
                    color: isHighlighted ? colors.text : 'var(--color-subtext)'
                  }}
                >
                  {n.label}
                </a>
              );
            })}
          </nav>

          {/* Right: Theme toggle + Social links */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="text-subtext hover:text-accent-yellow transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="size-5" /> : <Moon className="size-5" />}
            </button>
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
              className="text-subtext hover:text-accent-red transition-colors"
            >
              <Instagram className="size-5" />
            </a>
          </div>

          {/* Mobile: Theme toggle + menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 text-subtext transition-colors hover:text-accent-yellow"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="size-5" /> : <Moon className="size-5" />}
            </button>
            <button
              onClick={() => setOpen((o) => !o)}
              className="p-2 transition-colors hover:text-accent-purple"
              aria-label="Toggle menu"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {open && (
          <div 
            className="grid gap-3 pb-4 lg:hidden"
            onMouseLeave={() => setHoveredItem(null)}
          >
            {navWithAccents.map((n) => {
              const isHighlighted = n.isHovered || n.isActive;
              const colors = buttonColors[n.colorIndex];
              
              return (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  onMouseEnter={() => setHoveredItem(n.href)}
                  className="py-2 transition-colors hover:underline underline-offset-4"
                  style={{
                    borderColor: isHighlighted ? colors.border : 'var(--color-border)',
                    color: isHighlighted ? colors.text : 'var(--color-subtext)'
                  }}
                >
                  {n.label}
                </a>
              );
            })}
          </div>
        )}
      </Container>
    </header>
  );
}
