import React from "react";
import Section from "@/components/Section";
import Container from "@/components/Container";
import TypingEffect from "@/components/TypingEffect";
import { Mail, Phone, MapPin, Github, Linkedin, Download } from "lucide-react";
import { PROFILE } from "@/data/links";

const resumeHref = `${import.meta.env.BASE_URL}resume.pdf`;

export default function About() {
  return (
    <Section id="about">
      <Container>
        <div className="grid gap-10 py-16 md:grid-cols-5 md:items-center md:gap-12 md:py-24">
          <div className="md:col-span-3">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              {PROFILE.name}
            </h1>

            {/* Typing line */}
            <p className="mt-2 text-lg text-accent-green">
              <TypingEffect words={PROFILE.titles} />
            </p>

            <p className="mt-6 max-w-2xl leading-relaxed text-subtext">
              {PROFILE.tagline}
            </p>

            {/* Resume button */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={PROFILE.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-border px-4 py-2 text-sm font-medium text-text transition-colors hover:border-accent-blue hover:text-accent-blue"
              >
                <Download className="size-4" /> Résumé
              </a>
            </div>

            {/* Contact info stacked */}
            <div className="mt-6 flex flex-col gap-3 text-sm text-subtext">
              <span className="inline-flex items-center gap-2">
                <MapPin className="size-4" /> {PROFILE.location}
              </span>
              <a
                href={`mailto:${PROFILE.email}`}
                className="inline-flex items-center gap-2 underline-offset-4 transition-colors hover:text-accent-purple hover:underline"
              >
                <Mail className="size-4" /> {PROFILE.email}
              </a>
              <span className="inline-flex items-center gap-2">
                <Phone className="size-4" /> {PROFILE.phone}
              </span>
              <div className="mt-2 flex items-center gap-4">
                <a
                  href={PROFILE.social.github}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-accent-blue"
                  aria-label="GitHub"
                >
                  <Github className="size-5" />
                </a>
                <a
                  href={PROFILE.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-accent-purple"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="size-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Avatar panel */}
          <div className="rounded-3xl border border-border bg-panel md:col-span-2">
            <div className="p-6">
              <img
                src={PROFILE.assets.avatar}
                alt="Headshot"
                className="aspect-square w-full rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}