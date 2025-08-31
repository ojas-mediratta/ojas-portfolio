import React from "react";
import Section from "@/components/Section";
import Container from "@/components/Container";
import TypingEffect from "@/components/TypingEffect";
import avatarFile from "@/assets/avatar.jpg";
import { Mail, Phone, MapPin, Github, Linkedin, Download } from "lucide-react";
import { PROFILE } from "@/data/links";


const STATUS_MESSAGES = [
  "an IoT device proto.",
  "Inventure Prize 26.",
  "portfolio UI polish.",
  "conference papers.",
  "learning ROS2.",
];

const resumeHref = `${import.meta.env.BASE_URL}resume.pdf`;

export default function About() {
  const [idx, setIdx] = React.useState(0);

  return (
    <Section id="about">
      <Container>
        <div className="grid gap-10 py-16 md:grid-cols-5 md:items-center md:gap-12 md:py-5">
          <div className="md:col-span-3">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              {PROFILE.name}
            </h1>

            {/* Typing line */}
            <p className="mt-2 text-xl lg:text-2xl text-accent-cyan">
              <TypingEffect words={PROFILE.titles} />
            </p>

            <p className="mt-6 max-w-2xl leading-relaxed text-subtext whitespace-pre-line">
              {PROFILE.tagline}
            </p>

            {/* Resume button */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={resumeHref}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-2 rounded-2xl border border-border bg-panel px-4 py-2 text-sm text-accent-white transition-colors hover:border-accent-cyan hover:text-accent-cyan`}
              >
                Résumé
                <Download className="size-4" />
              </a>
            </div>
          </div>

          {/* Avatar panel */}
          <div
            className="group rounded-3xl border border-border bg-panel md:col-span-2 transition-all hover:border-accent-cyan hover:shadow-sm"
          >
            <div className="p-6">
              <img
                src={avatarFile}
                alt="Headshot"
                className="w-full rounded-2xl object-cover scale-105">
              </img>
              <div className="mt-4 text-sm text-subtext flex items-center gap-2">
                <span className="font-medium whitespace-nowrap">Currently hacking on:</span>
                <div className="relative flex-1 h-6">
                  <span
                    onAnimationIteration={() => setIdx((i) => (i + 1) % STATUS_MESSAGES.length)}
                    className="block leading-6 font-semibold text-accent-cyan animate-about-fade"
                  >
                    {STATUS_MESSAGES[idx]}
                  </span>
                  <style>{`
                    @keyframes about-fade { 0% { opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { opacity: 0; } }
                    .animate-about-fade { animation: about-fade 3s ease-in-out infinite; }
                  `}</style>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}