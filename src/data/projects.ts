export type Project = {
  slug: string;
  title: string;
  blurb: string;
  tags: string[];
  thumb?: string;
  previewVideo?: string;
  mainVideo?: string;
  previewGif?: string;
  links?: { link?: string; code?: string };
  area?: "Robotics" | "Embedded" | "ML" | "Systems" | "Other";
  /**
   * Optional project status. Use `status: 'Active'` (preferred) or `active: true` for legacy checks.
   */
  status?: 'Active' | 'In Progress' | 'Paused' | 'Archived' | 'Complete';
  active?: boolean;
  body?: string;             // long writeup (supports \n\n)
  gallery?: string[];        // additional images in public/media
};

export const PROJECTS: Project[] = [
  {
    slug: "blip-auv",
    title: "BLIP: Autonomous Underwater Vehicle for Dolphin Vocalization Research",
    blurb: "AUV robot with real-time whistle/click vocalization classification and closed-loop control.",
    tags: ["Robotics", "C++", "ESP32", "Android", "Controls", "Audio DSP"],
    area: "Robotics",
    status: "Active",
    thumb: "media/blip-auv/blip_thumb.jpg",
    previewVideo: "media/blip-auv/blip_preview.mp4",
    mainVideo: "media/blip-auv/blip_main.mp4",
    links: { link: "https://www.linkedin.com/posts/ojas-mediratta_robotics-embedded-signalprocessing-activity-7358290478351478784-0Afr?utm_source=share&utm_medium=member_desktop&rcm=ACoAADdTxJgB6uIFgkQecw_eTHt3ywpT-XIfTt8" },
    body: `BLIP (Bio-acoustic Learning Interactive Platform) is an autonomous underwater vehicle (AUV) designed for dolphin communication research. Developed in collaboration with the Wild Dolphin Project and Georgia Tech’s Contextual Computing Group, the system combines marine-ready hardware, embedded control systems, and onboard machine learning to enable real-time acoustic interaction with wild dolphins.

      The project has been through more than 15 pool trials and 4 deployments in the Atlantic, evolving into a modular, field-tested platform capable of withstanding harsh marine conditions while running sophisticated signal processing onboard. BLIP represents a unique convergence of robotics, embedded systems, and marine biology, and my contributions have centered on the vehicle’s intelligence and software integration.

      On the embedded side, I implemented the control layer linking the ESP32-based thruster board with an onboard Google Pixel 9. The ESP32 handles PID-mixed thruster control for four degrees of freedom (surge, heave, yaw, and pitch), while the Pixel runs the digital signal processing (DSP) pipeline in real time. I engineered that pipeline to handle acoustic whistle detection, progressing from Goertzel filters and FFTs to a CNN-based classification system. Detected whistles are then mapped to interactive behaviors, allowing the robot to respond with context-specific actions in a way that mirrors naturalistic animal communication.

      To make the system deployable, I built the supporting software ecosystem that researchers used during experiments. This included custom Android dashboards for real-time monitoring, OTA update systems for rapid iteration in the field, and a live web-based telemetry site for tracking robot state and acoustic events during deployments. These tools ensured the platform remained adaptable, testable, and transparent to researchers in both lab and field environments.

      From a hardware standpoint, the vehicle itself has iterated significantly, incorporating syntactic foam thruster mounts, TPU-based protective skins, and a vacuum-tested pressure vessel for electronics and batteries. While I was not the lead on mechanical design, I was greatly responsible for electronics and hardware integration—developing the sensor stack, power systems, and communication layers to interface reliably within the evolving enclosure.

      BLIP continues to serve as a first-of-its-kind testbed for experimental dolphin communication studies. Ongoing work includes expanding its acoustic vocabulary, improving robustness for long-duration ocean trials, and exploring broader applications in marine human–robot interaction research.`,
    gallery: [
      "media/blip-auv/blip_1.jpg",
      "media/blip-auv/blip_2.jpg",
      "media/blip-auv/blip_3.jpg",
      "media/blip-auv/blip_4.mp4",
      "media/blip-auv/blip_5.jpg",
      "media/blip-auv/blip_6.jpg",
      "media/blip-auv/blip_7.jpg",
      "media/blip-auv/blip_8.jpg",
      "media/blip-auv/blip_9.jpg",
      "media/blip-auv/blip_10.jpg",]
  },
  {
    slug: "buzzcaster-guitar",
    title: "BuzzCaster: Gig-Ready, Teensy-Powered Guitar Effects",
    blurb: "Electric guitar with a built-in Teensy 4.1 effects chain, onboard DSP, LCD UI, simple controls, and custom body mods.",
    tags: ["Embedded Systems", "C++", "Teensy 4.1", "Audio DSP", "Rapid Prototyping"],
    area: "Embedded",
    thumb: "media/buzzcaster/buzzcaster_thumb.jpg",
    previewVideo: "media/buzzcaster/buzzcaster_preview.mp4",
    links: { code: "https://github.com/ojas-mediratta/BuzzCaster-Guitar" },
    body: `Guitar has been one of my passions for over a decade. I have spent countless hours playing, tinkering with gear, and chasing tones, always fascinated by how design choices shape the sound and feel of an instrument. When it came time to choose a final project for CS 3651 (Prototyping Intelligent Devices), I saw the chance to bring that passion together with my interest in embedded systems: building a guitar with its own onboard effects.

    The result was BuzzCaster, a custom guitar project that integrates a complete digital signal processing (DSP) chain directly inside the instrument. Instead of relying on external pedals and cables, the guitar itself handles delay, reverb, EQ, and distortion through a Teensy microcontroller running PJRC’s real-time audio framework. The goal was to keep the instrument familiar in form and playability, while giving it the flexibility of a built-in effects unit.

    Making this possible required significant design work. I routed out the guitar body to house the electronics, created a compact LCD and encoder interface for real-time control, and tuned the preamp to preserve the pickups’ natural impedance. Power stability was another challenge, so I designed a dedicated battery housing and safeguards to handle USB quirks and power bank issues.

    The process was iterative, involving circuit prototyping, 3D-printed mounting solutions, firmware development, and repeated testing to refine both tone and ergonomics. By the end, I had not only a fully playable instrument but also a proof of concept in embedded audio design: a guitar that merges traditional playability with integrated digital processing.

    BuzzCaster represents more than a course project. It is the outcome of years of passion for music combined with technical skill, resulting in an instrument that is both expressive and self-contained.

    More details, including schematics, firmware, and build notes, are documented in the repo README.`,
    gallery: [
      "media/buzzcaster/buzzcaster_1.jpg",
      "media/buzzcaster/buzzcaster_2.jpg",
      "media/buzzcaster/buzzcaster_3.jpg",
      "media/buzzcaster/buzzcaster_4.mp4",
      "media/buzzcaster/buzzcaster_5.jpg",
      "media/buzzcaster/buzzcaster_6.jpg",
      "media/buzzcaster/buzzcaster_7.jpg",
      "media/buzzcaster/buzzcaster_8.jpg",
      "media/buzzcaster/buzzcaster_9.jpg",
      "media/buzzcaster/buzzcaster_10.jpg",
      "media/buzzcaster/buzzcaster_11.jpg",]
  },
  {
    slug: "et55-keyboard",
    title: "ET55: A Custom 55‑key, Hand‑Wired Mechanical Keyboard.",
    blurb: "An ultra-compact board blending the vintage feel of IBM Model F layouts with modern touches—QMK firmware, USB-C, an OLED status screen, and a rotary-encoder volume knob.",
    tags: ["Embedded Systems", "C++", "ATMega34U4", "Fusion360"],
    area: "Embedded",
    thumb: "media/et55/et55_thumb.jpg",
    previewVideo: "media/et55/et55_preview.mp4",
    mainVideo: "media/et55/et55_main.mp4",
    links: { code: "https://github.com/ojas-mediratta/ET55-Keyboard" },
    body: `Mechanical keyboards have always captured my attention, both for their tactile feel and for the design creativity in the enthusiast scene. When I took ECE 4180 (Embedded Systems Design), I saw the chance to build something that would push me technically while letting me create a keyboard that was truly my own. That idea became ET55, a 55-key, hand-wired mechanical keyboard inspired by vintage IBM layouts but updated with modern embedded features.

      The project brought together hardware craftsmanship and embedded development in equal measure. I hand-wired the switch matrix with diodes for full NKRO support, routing each connection with care and heat-shrinking joints to prevent shorts. For control, I used an ATmega32U4 Pro Micro running QMK firmware, giving the keyboard a flexible four-layer layout that could be easily compiled and flashed.

      I also added modern conveniences: a USB-C port for reliable connectivity, a rotary encoder that doubled as both a volume knob and layer switcher, and a crisp OLED display that could show system status or playful animations. To finish the build, I modeled and 3D-printed a custom case and plate, iterating on alignment and fit until the enclosure felt polished and cohesive despite the hand-wired internals.

      The result was more than just a keyboard. It was a full exercise in end-to-end embedded system design: prototyping, debugging, firmware integration, and enclosure fabrication all coming together in one device. ET55 showed me how compact hardware projects can combine nostalgic design influences with the flexibility of modern microcontrollers, and it gave me another opportunity to merge my personal passions with academic work.
      
      See the repo README for full build notes.`,
    gallery: [
      "media/et55/et55_1.jpg",
      "media/et55/et55_2.jpg",
      "media/et55/et55_3.jpg",
      "media/et55/et55_4.mp4",
    ]
  },
  {
    slug: "keyboard-design",
    title: "Freelance Custom Mechanical Keyboard Design and Manufacturing",
    blurb: "Completely bespoke mechanical keyboards, tailored to client specifications and preferences, and machined out of premium materials.",
    tags: ["Design and Manufacturing", "Fusion360", "Blender", "DFM"],
    area: "Other",
    thumb: "media/keyboard-design/keyboard-design_thumb.jpg",
    previewVideo: "media/keyboard-design/keyboard-design_preview.mp4",
    mainVideo: "media/keyboard-design/keyboard-design_preview.mp4",
    body: `Like many in the enthusiast mechanical keyboard community, I started out fascinated by the artistry and engineering that go into custom boards. The scene thrives on experimentation, people debating mounting styles, chasing the perfect sound profile, and pushing the limits of what a typing tool can be. I wanted more than just to buy into that culture; I wanted to create something of my own.

      With no prior experience in CAD, I dove into Fusion 360. At first, I barely knew how to sketch a rectangle, but I pushed through tutorials, forums, and trial-and-error late nights until I could translate ideas into working 3D models. My first goal was simple: design a board that felt truly bespoke, tailored to my hands, my workflow, and my taste.

      From there, freelance commissions grew organically. Clients would come with a concept, sometimes just a layout or an aesthetic inspiration, and I’d take on the challenge of turning it into a manufacturable design. That meant iterating on case geometry, experimenting with plate materials, and ensuring PCB compatibility, all while keeping ergonomics and acoustics in mind.

      Over time, I honed a process that combined community-driven design values with engineering rigor: CAD modeling in Fusion 360, prototyping through 3D prints or CNC samples, and firmware integration via QMK or VIA. Each project became an exploration of form and function, not just making a keyboard that works, but one that feels alive, with its own personality and presence on a desk.

      This journey has been as much about problem-solving as it has been about craft. What began as a personal desire for a one-off board turned into a series of freelance collaborations where I could merge technical design with the culture of enthusiast keyboards, producing pieces that are at once tools and expressions of identity.`,
    gallery: [
      "media/keyboard-design/keyboard-design_2.mp4",
      "media/keyboard-design/keyboard-design_3.mp4",
      "media/keyboard-design/keyboard-design_5.jpg",
      "media/keyboard-design/keyboard-design_6.mp4",
      "media/keyboard-design/keyboard-design_7.jpg",
      "media/keyboard-design/keyboard-design_8.jpg",
      "media/keyboard-design/keyboard-design_9.mp4",
      "media/keyboard-design/keyboard-design_10.jpg",
      "media/keyboard-design/keyboard-design_11.jpg",
      "media/keyboard-design/keyboard-design_12.jpg",
      "media/keyboard-design/keyboard-design_13.jpg",
      "media/keyboard-design/keyboard-design_14.jpg",
      "media/keyboard-design/keyboard-design_15.mp4",
      "media/keyboard-design/keyboard-design_16.mp4",
      "media/keyboard-design/keyboard-design_17.jpg",
      "media/keyboard-design/keyboard-design_18.jpg",
      "media/keyboard-design/keyboard-design_19.jpg",
      "media/keyboard-design/keyboard-design_20.jpg",
      "media/keyboard-design/keyboard-design_21.jpg",
      "media/keyboard-design/keyboard-design_22.jpg",
      "media/keyboard-design/keyboard-design_23.jpg",
      "media/keyboard-design/keyboard-design_24.jpg",
    ]
  },
];