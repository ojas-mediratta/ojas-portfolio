import React from "react";
import Section from "@/components/Section";
import Container from "@/components/Container";

export default function Contact() {
  return (
    <Section id="contact" className="pb-16 md:pb-28">
      <Container>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Let’s collaborate
        </h2>
        <p className="mt-2 text-subtext">
          Open to internships, research, and consulting. Send me a note!
        </p>
      </Container>
    </Section>
  );
}