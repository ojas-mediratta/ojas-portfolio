export type PubType = "paper" | "article" | "talk" | "poster" | "video" | "demo";

export type Publication = {
  title: string;
  outlet?: string;         // conference, journal, site, venue
  date?: string;           // e.g. "Aug 2025"
  type: PubType;
  authors?: string[];        // optional string for now
  // Media
  href?: string;           // canonical link (paper page, YouTube, arXiv, etc.)
  code?: string;
  pdf?: string;            // if you want a direct pdf link (public/…)
  thumb?: string;          // poster/thumbnail image (public/… or remote)
  previewVideo?: string;   // short mp4/webm (public/… or remote) for hover
  previewGif?: string;     // optional fallback gif if you prefer
};

export const PUBLICATIONS: Publication[] = [
  // {
  //   title: "Underwater Robotic Platform for Dolphin Vocalization Studies",
  //   outlet: "Human Robot Interaction (HRI)",
  //   date: "2026",
  //   type: "paper",
  //   authors: ["Riley Mehrman", "Ojas Mediratta", "Charles D. Ramey", "et al."],
  //   href: "https://example.com/project", // external paper link
  //   code: "https://github.com/ojas-mediratta/BLIP-AUV", // optional GitHub code link
  //   thumb: "media/blip-auv/blip_1.jpg",
  //   previewVideo: "media/blip-auv/blip_preview.mp4",
  // }
];