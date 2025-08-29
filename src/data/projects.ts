export type Project = {
  slug: string;
  title: string;
  blurb: string;
  tags: string[];
  thumb?: string;
  previewVideo?: string;
  mainVideo?: string;
  previewGif?: string;
  links?: { live?: string; code?: string };
  area?: "Robotics" | "Embedded" | "ML" | "Systems" | "Other";
  body?: string;             // long writeup (supports \n\n)
  gallery?: string[];        // additional images in public/media
};

export const PROJECTS: Project[] = [
  {
    slug: "blip-auv",
    title: "Blip: Autonomous Underwater Vehicle for Dolphin Vocalization Research",
    blurb: "AUV robot with real-time whistle/click vocalization classification and closed-loop control.",
    tags: ["Robotics", "C++", "ESP32", "Android", "Controls", "Audio DSP"],
    area: "Robotics",
    thumb: "media/blip-auv/blip_thumb.jpg",
    previewVideo: "media/blip-auv/blip_preview.mp4",
    mainVideo: "media/blip-auv/blip_main.mp4",
    links: { live: "https://www.linkedin.com/posts/ojas-mediratta_robotics-embedded-signalprocessing-activity-7358290478351478784-0Afr?utm_source=share&utm_medium=member_desktop&rcm=ACoAADdTxJgB6uIFgkQecw_eTHt3ywpT-XIfTt8" },
    body: `BLIP (Bio-inspired Listening & Interaction Platform) is an autonomous underwater vehicle (AUV) designed for dolphin communication research. Developed in collaboration with the Wild Dolphin Project and Georgia Tech’s Contextual Computing Group, the system blends marine-ready hardware, embedded control systems, and onboard machine learning to enable real-time acoustic interaction with wild dolphins.

    Over the course of 15+ pool trials and 4+ Atlantic deployments, BLIP has evolved into a modular, field-tested research platform capable of withstanding harsh marine conditions while running sophisticated signal processing onboard. My role has spanned hardware, electronics, firmware, and signal processing pipelines.

    Highlights
      -	Embedded control: Implemented PID-mixed thruster control on an ESP32-based board for 4-DOF maneuverability (surge, heave, yaw, pitch).
      -	Acoustic perception: Developed whistle detection pipelines — from Goertzel filters and FFTs to CNN-based tone classification — running in real time on a modded Google Pixel 9 with hydrophone input.
      -	Interactive behaviors: Designed a tone-to-action system where detected whistles trigger specific robot responses, enabling naturalistic human–animal interaction experiments.
      -	Hardware evolution: Iteratively designed syntactic foam thruster mounts, TPU-based protective skins, and a vacuum-tested pressure vessel for electronics and batteries.
      -	Telemetry & control: Built custom Android dashboards, OTA update systems, and a web-based telemetry site for monitoring vehicle state and acoustic events during field trials.
      -	Field testing: Conducted 15+ pool trials and 4+ open-ocean deployments in the Bahamas, validating pressure housing, buoyancy, thruster balance, and DSP pipelines under real conditions.
      -	Research contribution: Provides a first-of-its-kind platform for experimental dolphin communication studies, bridging robotics, embedded systems, and marine biology.

      BLIP represents a convergence of robotics, embedded systems, and marine biology, but my personal contributions have centered on the vehicle’s intelligence and integration. I engineered the DSP pipeline on Android, enabling real-time whistle detection and classification, and built the communication layer linking the ESP32 control board with the onboard phone. I also developed the supporting software ecosystem — including Android dashboards, OTA update systems, and a live web-based telemetry site — that made the platform usable and adaptable during deployments.

      BLIP continues to serve as a testbed for marine HRI (human–robot interaction) research, with ongoing work focusing on extending its acoustic vocabulary, improving robustness, and scaling the platform for broader field use."`,
    gallery: [
      "media/blip-auv/blip_1.jpg", 
      "media/blip-auv/blip_2.jpg", 
      "media/blip-auv/blip_3.jpg"]
  },
  {
    slug: "et55-keyboard",
    title: "ET55: A Custom 55‑key, Hand‑Wired Mechanical Keyboard.",
    blurb: "An ultra-compact board blending the vintage feel of IBM Model F layouts with modern touches—QMK firmware, USB-C, an OLED status screen, and a rotary-encoder volume knob.",
    tags: ["Embedded Systems", "C++", "ATMega34U4", "Fusion360"],
    area: "Embedded",
    thumb: "media/et55/et55_thumb.jpg",
    previewVideo: "media/placeholder.mp4",
    links: { code: "https://github.com/ojas-mediratta/ET55-Keyboard" },
    body: `ET55 is a 55-key, hand-wired mechanical keyboard that combines the vintage charm of IBM layouts with modern embedded features. Built as part of my ECE 4180 Embedded Systems Design course, the project explores both hardware craftsmanship and firmware design, resulting in a compact yet highly capable board.

      The keyboard runs QMK firmware on an ATmega32U4 Pro Micro, with USB-C for reliable connectivity. It features a crisp OLED display for status text and playful animations, as well as a rotary encoder that doubles as a volume knob and mode switcher. A 3D-printed case and custom plate hold the switch matrix in place, giving the build a professional finish despite its hand-wired internals.

      Highlights
        -	Hand-wired matrix: Built a 55-key MX switch array with diodes (COL2ROW) for full NKRO support, carefully routed and heat-shrunk to avoid shorts.
        -	Embedded control: Integrated an SSD1306 OLED (128×32 over I²C) for status info and animations, plus a rotary encoder for volume and layer toggling.
        -	Firmware integration: Used stock QMK firmware with a four-layer layout (Base, Symbols, Nav, Function) and standard compile/flash workflow for extensibility.
        -	Case design: Modeled and 3D-printed the enclosure with iterative refinements to plate alignment and encoder clearance.
        -	Power & connectivity: Implemented USB-C on the Pro Micro for modern, reversible connections and stable data transfer.
        -	Prototyping & testing: Iterated through multiple builds to refine switch feel, OLED reliability, and encoder ergonomics.
        -	Open design: Published complete design files, schematics, and BOM for reproducibility and community modification.

      Beyond the technical details, the project was a deep dive into end-to-end embedded hardware design—from circuit prototyping and firmware flashing to enclosure fabrication and debugging. ET55 demonstrates how compact embedded systems can deliver both nostalgic user experience and modern functionality.

      See the repo README for full build notes.`,

    gallery: [
      "media/et55/et55_1.jpg",
      "media/et55/et55_2.jpg",
      "media/et55/et55_3.jpg"
    ]
  },
  {
    slug: "buzzcaster-guitar",
    title: "BuzzCaster: Gig-Ready, Teensy-Powered Guitar Effects",
    blurb: "Electric guitar with built-in, Teensy 4.1 effects chain, onboard DSP, LCD UI, and custom body mods.",
    tags: ["Embedded Systems", "C++", "Teensy 4.1", "Audio DSP"],
    area: "Embedded",
    thumb: "media/buzzcaster/buzzcaster_thumb.jpg",
    previewVideo: "media/buzzcaster/buzzcaster_preview.mp4",
    links: { code: "https://github.com/ojas-mediratta/BuzzCaster-Guitar" },
    body: `BuzzCaster is a custom guitar project that integrates a full digital signal processing chain directly inside the instrument itself, eliminating the need for bulky external pedals. Instead of running cables into a pedalboard, the Teensy-based system brings effects and signal shaping onboard, making the guitar fully self-contained.

    To make this possible, I routed out the guitar body to house the electronics, added a compact LCD + encoder interface for real-time control, and tuned the preamp to preserve proper pickup impedance. The result is a playable instrument that feels familiar but has built-in flexibility for live performance and experimentation.

    Highlights
      -	Onboard DSP effects: Embedded a complete effects chain using a Teensy microcontroller and PJRC’s real-time audio framework, covering essentials like delay, reverb, EQ, and distortion.
      -	Custom integration: Designed and routed a dedicated cavity to mount electronics seamlessly into the guitar body, paired with a clean LCD + rotary encoder UI for on-instrument parameter control.
      -	Power & reliability: Built a dedicated battery housing and engineered safeguards to handle 3.3 V logic, USB power quirks, and “trickle mode” issues from portable power banks.
      -	Preamp tuning: Adjusted the input stage to match pickup impedance, preserving the natural tone of the guitar while feeding into the digital effects system.
      -	Iterative prototyping: Went through multiple hardware revisions—refining signal clarity, ergonomics, and housing design—to ensure both audio fidelity and gig-ready robustness.
      -	End-to-end build process: From circuit prototyping and 3D-printed brackets to firmware development and live testing, the project demonstrates full-stack embedded audio design.

    More details, including schematics, firmware, and build notes, are documented in the repo README.`,
    gallery: [
      "media/buzzcaster/buzzcaster_1.jpg",
      "media/buzzcaster/buzzcaster_2.jpg",
      "media/buzzcaster/buzzcaster_3.jpg"
    ]
  }
];