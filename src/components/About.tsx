import React from "react";
const GLITCH_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*+-_=:;<>/?";
import Section from "@/components/Section";
import Container from "@/components/Container";
import TypingEffect from "@/components/TypingEffect";
import avatarFile from "@/assets/avatar.jpg";
import { Mail, Phone, MapPin, Github, Linkedin, Download } from "lucide-react";
import { PROFILE } from "@/data/links";


const STATUS_MESSAGES = [
  "a secret IoT thing.",
  "Inventure Prize '26.",
  "portfolio UI polish.",
  "conference papers.",
  "learning ROS2.",
];

const resumeHref = `${import.meta.env.BASE_URL}resume.pdf`;


function useGlitchCycle(messages: string[], dwellMs = 2000, scrambleMs = 450) {
  const [idx, setIdx] = React.useState(0);
  const [text, setText] = React.useState(messages[0] ?? "");

  React.useEffect(() => {
    if (!messages.length) return;
    let raf: number | null = null;
    let dwellTimer: number | null = null;

    const startScramble = () => {
      const from = messages[idx] ?? "";
      const to = messages[(idx + 1) % messages.length] ?? "";
      const maxLen = Math.max(from.length, to.length);
      const start = performance.now();

      const step = (now: number) => {
        const t = Math.min(1, (now - start) / scrambleMs);
        const reveal = Math.floor(t * maxLen);
        let out = "";
        for (let i = 0; i < maxLen; i++) {
          if (i < reveal) {
            out += to[i] ?? " ";
          } else {
            out += GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          }
        }
        setText(out);
        if (t < 1) {
          raf = requestAnimationFrame(step);
        } else {
          setIdx((i) => (i + 1) % messages.length);
          setText(to);
          schedule();
        }
      };

      raf = requestAnimationFrame(step);
    };

    const schedule = () => {
      dwellTimer = window.setTimeout(startScramble, dwellMs);
    };

    // initialize current text and schedule first scramble
    setText(messages[idx] ?? "");
    schedule();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (dwellTimer) clearTimeout(dwellTimer);
    };
  }, [idx, messages, dwellMs, scrambleMs]);

  return { text };
}

export default function About() {

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
                {(() => {
                  const { text } = useGlitchCycle(STATUS_MESSAGES, 2000, 450);
                  return (
                    <div className="relative flex-1 h-6">
                      <span className="block leading-6 font-semibold text-accent-cyan font-mono">
                        {text}
                      </span>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}