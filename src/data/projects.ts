export type Project = {
  title: string;
  blurb: string;
  tags: string[];
  // media in /public/media or remote:
  thumb?: string;          // image poster
  previewVideo?: string;   // mp4/webm (hover autoplay)
  previewGif?: string;     // gif fallback
  links?: {
    live?: string;
    code?: string;
  };
  area?: "Robotics" | "Embedded" | "ML" | "Systems" | "Other";
};

export const PROJECTS: Project[] = [
//   {
//     title: "Underwater Acoustic Rover",
//     blurb: "Autonomous UUV prototype with real-time whistle/click classification and closed-loop control.",
//     tags: ["DSP", "PX4", "ESP32", "Controls"],
//     area: "Robotics",
//     thumb: "media/placeholder_uuv.jpg",
//     previewVideo: "media/placeholder_uuv.mp4",
//     links: { live: "#", code: "#" }
//   },
];