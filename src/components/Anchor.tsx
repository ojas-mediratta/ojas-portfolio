import React from "react";
import { ExternalLink } from "lucide-react";

export default function Anchor({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      className="group inline-flex items-center gap-1 text-accent-blue underline-offset-4 transition-colors hover:text-accent-purple hover:underline"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {children}
      <ExternalLink className="size-4 opacity-70 transition-transform group-hover:translate-x-0.5" />
    </a>
  );
}