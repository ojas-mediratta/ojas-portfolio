export type Project = {
  slug: string;              // NEW
  title: string;
  blurb: string;
  tags: string[];
  thumb?: string;
  previewVideo?: string;
  previewGif?: string;
  links?: { live?: string; code?: string };
  area?: "Robotics" | "Embedded" | "ML" | "Systems" | "Other";
  body?: string;             // long writeup (supports \n\n)
  gallery?: string[];        // additional images in public/media
};

export const PROJECTS: Project[] = [
  // {
  //   slug: "underwater-acoustic-rover",
  //   title: "Underwater Acoustic Rover",
  //   blurb: "Autonomous UUV prototype with real-time whistle/click classification and closed-loop control.",
  //   tags: ["DSP", "PX4", "ESP32", "Controls"],
  //   area: "Robotics",
  //   thumb: "media/placeholder_uuv.jpg",
  //   previewVideo: "media/placeholder_uuv.mp4",
  //   links: { live: "#", code: "#" },
  //   body: "Longer writeup here. Describe goals, constraints, architecture, lessons.\n\nAdd sections with \\n\\n to paragraph.",
  //   gallery: ["media/uuv_1.jpg", "media/uuv_2.jpg"]
  // },
  {
    slug: "buzzcaster-guitar",
    title: "BuzzCaster: Teensy-Powered Guitar Effects",
    blurb: "Electric guitar with built-in, Teensy 4.x effects chain—onboard DSP, LCD UI, and custom body mods.",
    tags: ["C++", "Embedded", "Audio", "Teensy 4.1"],
    area: "Embedded",
    thumb: "media/buzzcaster/buzzcaster_thumb.jpg",
    previewVideo: "media/buzzcaster/buzzcaster_preview.mp4",
    links: {
      code: "https://github.com/ojas-mediratta/BuzzCaster-Guitar"
    },
    body: `BuzzCaster integrates a Teensy-based audio signal chain directly into the guitar, removing the need for external pedals.

    I routed the body to house electronics, added an LCD/encoder UI, and tuned the preamp for proper pickup impedance.

    Highlights:
    
    -	Embedded a full DSP effects chain directly into the guitar using a Teensy microcontroller and PJRC’s real-time audio framework.
    -	Designed and routed a custom cavity to integrate electronics seamlessly into the body, with a dedicated LCD + encoder interface for on-instrument control.
    -	Engineered reliable power delivery with custom battery housing and safeguards for 3.3V logic and USB power quirks.
    -	Iteratively prototyped and tested to balance audio fidelity, ergonomics, and robustness in a gig-ready instrument.

    See the repo README for full build notes.`,
    gallery: [
      "media/buzzcaster/buzzcaster_1.jpg",
      "media/buzzcaster/buzzcaster_2.jpg",
      "media/buzzcaster/buzzcaster_3.jpg"
    ]
  }
];