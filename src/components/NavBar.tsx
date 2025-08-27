import React, { useMemo, useState } from "react";
import Container from "@/components/Container";
import { Menu, X } from "lucide-react";

// Tailwind classes for your accent colors
const hoverAccents = [
  "hover:border-accent-blue hover:text-accent-blue",
  "hover:border-accent-green hover:text-accent-green",
  "hover:border-accent-yellow hover:text-accent-yellow",
  "hover:border-accent-orange hover:text-accent-orange",
  "hover:border-accent-purple hover:text-accent-purple",
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const nav = useMemo(
    () => [
      { label: "About", href: "#about" },
      { label: "Projects", href: "#projects" },
      { label: "Publications", href: "#publications" },
      { label: "Experience", href: "#experience" },
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
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <a
            href="#top"
            className="font-semibold tracking-tight text-accent-blue transition-colors hover:text-accent-purple"
          >
            Ojas M
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-4 md:flex">
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