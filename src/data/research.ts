export type PubType = "Paper" | "Article" | "Talk" | "Poster" | "Video" | "Demo" | "Award" | "Other";
export type Status = "Under Review" | "Published" | "Accepted" | "In Press";

export type Research = {
  title: string;
  outlet?: string;         // conference, journal, site, venue
  date?: string;           // e.g. "Aug 2025"
  type: PubType;
  authors?: string[];        // optional string for now
  status?: Status;  // publication status
  // Media
  href?: string;           // canonical link (paper page, YouTube, arXiv, etc.)
  code?: string;
  pdf?: string;            // if you want a direct pdf link (public/…)
  thumb?: string;          // poster/thumbnail image (public/… or remote)
  previewVideo?: string;   // short mp4/webm (public/… or remote) for hover
  previewGif?: string;     // optional fallback gif if you prefer
};

export const RESEARCH: Research[] = [
  {
    title: "BLIP: An Underwater Robot for Facilitating Acoustic Interactions with Dolphins",
    outlet: "IEEE Robotics and Automation (RAM) Magazine",
    date: "2026",
    type: "Article",
    authors: ["Riley Mehrman", "Ojas Mediratta", "Charles D. Ramey", "Thad Starner"],
    status: "Under Review",
    // href: "https://example.com/project", 
    thumb: "media/blip-auv/blippub_thumb.webp",
    previewVideo: "media/blip-auv/blippub_preview.mp4",
  }
];