import React from "react";
import Section from "@/components/Section";
import Container from "@/components/Container";

const EXPERIENCES = [
  {
    role: "Graduate Research Assistant",
    org: "Contextual Computing Group, Georgia Tech",
    date: "Aug 2024 – Present",
    desc: `Built and deployed an autonomous underwater robot for dolphin research, with a real-time DSP pipeline for whistle/click classification. Programmed ESP32 firmware for closed-loop thruster PID control, developed an Android telemetry/control app, and created a web dashboard for post-mission analysis. Also designed a submersible bone-conduction headset and worked on a wireless canine chew sensor for research trials.`
  },
    {
    role: "Graduate Teaching Assistant - Prototyping Intelligent Devices",
    org: "Georgia Institute of Technology",
    date: "Aug 2025 – Present",
    desc: `Served as a teaching assistant for an upper-level course in embedded systems and prototyping intelligent devices. Supported lectures and labs on microcontroller programming, circuit design, and rapid prototyping. Co-developed lab guides, assignments, and project docs, and mentored teams on hardware/software integration, debugging, and design trade-offs.`
  },
  {
    role: "Graduate Teaching Assistant - Mobile & Ubiquitous Computing",
    org: "Georgia Institute of Technology",
    date: "May 2025 – Aug 2025",
    desc: `Served as teaching assistant for a graduate HCI course on ubiquitous computing. Supported lectures and labs, co-designed assignments, and mentored project teams on IoT systems, wearables, and mobile prototypes. Managed grading and provided feedback in office hours.`
  },
  {
    role: "Technical Support Agent (Student Lead)",
    org: "Georgia Tech Office of Information Technology",
    date: "May 2024 – Jan 2025",
    desc: `Led a team of nine student assistants providing campus IT support. Delivered multi-channel support (in-person, phone, remote), managed incidents, and supported inventory and documentation. Contributed to IT implementations and program improvements.`
  },
  {
    role: "Freelance CAD Engineer",
    org: "Self-employed",
    date: "Jun 2022 – Nov 2023",
    desc: `Provided CAD design services using Fusion 360 and AutoCAD for machined parts. Delivered projects for domestic and international clients, coordinating with overseas manufacturers specializing in CNC and 3D printing.`
  }
];

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
              <p className="mt-2 text-sm text-subtext leading-relaxed whitespace-pre-line">
                {exp.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}