export type PubType = "paper" | "article" | "talk" | "poster" | "video" | "demo";

export type Publication = {
  title: string;
  outlet?: string;         // conference, journal, site, venue
  date?: string;           // e.g. "Aug 2025"
  type: PubType;
  authors?: string;        // optional string for now
  tags?: string[];
  // Media
  href?: string;           // canonical link (paper page, YouTube, arXiv, etc.)
  pdf?: string;            // if you want a direct pdf link (public/…)
  thumb?: string;          // poster/thumbnail image (public/… or remote)
  previewVideo?: string;   // short mp4/webm (public/… or remote) for hover
  previewGif?: string;     // optional fallback gif if you prefer
};

export const PUBLICATIONS: Publication[] = [
  // Example — delete or replace these with your own:
  {
    title: "Underwater Robotic Platform for Dolphin Vocalization Studies",
    outlet: "GT Contextual Computing Group (project report)",
    date: "2025",
    type: "demo",
    authors: "O. Mediratta, C. Ramey, et al.",
    tags: ["DSP", "Robotics", "Embedded", "UUV"],
    href: "https://example.com/project",
    pdf: "media/dolphin_uuv_report.pdf",
    thumb: "media/dolphin_uuv_thumb.jpg",
    previewVideo: "media/dolphin_uuv_preview.mp4"
  }
];