import React from "react";
import Section from "@/components/Section";
import Container from "@/components/Container";
import { EXPERIENCES } from "@/data/experience";

export default function Experience() {
  return (
    <Section id="experience" className="py-12 md:py-20">
      <Container>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Experience</h2>
        <div className="mt-8 space-y-8">
          {EXPERIENCES.map((exp, i) => (
            <div key={i} className="rounded-xl border border-border bg-panel p-5 hover:border-accent-green transition-colors">
              <h3 className="text-lg font-medium">{exp.role}</h3>
              <p className="text-sm text-accent-green">{exp.org}</p>
              <p className="text-xs text-subtext">{exp.date}</p>
              <p className="mt-2 text-sm text-subtext leading-relaxed whitespace-pre-line">{exp.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}