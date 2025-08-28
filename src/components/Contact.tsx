import React from "react";
import Section from "@/components/Section";
import Container from "@/components/Container";
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";
import { PROFILE } from "@/data/links";

export default function Contact() {
  return (
    <Section id="contact" className="pb-16 md:pb-28">
      <Container>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Let’s connect
        </h2>
        <p className="mt-2 text-subtext max-w-2xl">
          I’m always open to opportunities in research, internships, or collaboration.
          Feel free to reach out directly:
        </p>

        <div className="mt-8 space-y-4 text-sm text-subtext">
          <div className="flex items-center gap-2">
            <MapPin className="size-4" /> {PROFILE.location}
          </div>
          <a
            href={`mailto:${PROFILE.email}`}
            className="flex items-center gap-2 underline-offset-4 hover:text-accent-purple hover:underline transition-colors"
          >
            <Mail className="size-4" /> {PROFILE.email}
          </a>
          <div className="flex items-center gap-2">
            <Phone className="size-4" /> {PROFILE.phone}
          </div>
        </div>
      </Container>
    </Section>
  );
}