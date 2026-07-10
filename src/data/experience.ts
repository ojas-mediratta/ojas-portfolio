export type Status = "Incoming" | "Ongoing" | "Completed" | "Active";

export type Experience = {
  role: string;
  org: string;
  date: string;
  details: string[];
  status?: Status;
};

export const EXPERIENCES: Experience[] = [
  {
    role: "Robotics Hardware Intern",
    org: "Physical Intelligence (π)",
    date: "Aug 2026 – Dec 2026",
    details: [
      // "Working on hardware and electronics for the defining technology of our time."
    ],
    status: "Incoming"
  },
  {
    role: "Robotics Research Intern",
    org: "GE Vernova Advanced Research Center",
    date: "May 2026 – Aug 2026",
    details: [
      "Led end-to-end integration and validation of a marine robot for confined-space inspection, spanning hardware, electronics, embedded software, and field-ready operation",
      "Developed a Linux-based control and telemetry stack integrating motors, onboard sensors, and tethered data streaming for remote inspection and maintenance data collection with BlueOS",
      "Operationalized newly-acquired Voltera PCB fabrication systems and authored standard operating procedures for safe, repeatable in-house PCB prototyping"
    ]
  },
  {
    role: "Graduate Research Assistant",
    org: "Laboratory for Intelligent Decision and Autonomous Robots (LIDAR) @ Georgia Tech",
    date: "Jan 2026 – Present",
    details: [
      "Engaged in research on tactile sensing for humanoid loco-manipulation and diffusion-based controllers for collaborative transport tasks.",
      "Designed custom flexible tactile sensors for robot end effector and upper-body application. Fabricated and tested prototypes, iterating on design for larger and higher-resolution sensing area.",
      "Designed and fabricated hardware prototypes of harnesses and mounts for human data collection and online deployment of tactile sensors.",
      "Co-authored a research paper for CoRL submission on diffusion-based control for collaborative transport, using tactile sensing data for trajectory planning."
    ]
  },
  {
    role: "Graduate Teaching Assistant",
    org: "Georgia Institute of Technology",
    date: "May 2025 – Present",
    details: [
      "Served as a teaching assistant for Mobile and Ubiquitous Computing and Prototyping Intelligent Devices; graduate-level, project based courses on embedded systems, firmware development, and edge machine learning",
      "Guided 8 student teams per semester in developing app prototypes and custom microcontroller-based projects, providing mentorship on report authorship that led to higher project success rates and more polished deliverables.",
      "Hosted office hours and asynchronous feedback sessions, guiding students through technical and research hurdles"
    ]
  },
  {
    role: "Graduate Research Assistant",
    org: "Contextual Computing Group @ Georgia Tech",
    date: "Aug 2024 – Present",
    details: [
      "Built a remotely operated vehicle (ROV) for dolphin research and enrichment, contributing across firmware, electronics, and mechanical design; successfully deployed in 15+ pool trials and 4 open-water trials in the Atlantic",
      "Designed and implemented an ESP32 firmware stack, orchestrating a cascaded PID-based controller, ESC-driven thrusters, internal sensors, over-the-air telemetry, and LED signaling, unifying system operation in the field",
      "Engineered PCBs unifying microcontroller, power, and sensor interfaces, cutting wiring volume and failure points for reliability",
      "Designed mechanical components in Fusion 360, iterating and fabricating rapidly for waterproofing and durability for field use",
      "Designed and built a bone-conduction headset for underwater use by researchers, enabling clear audio playback for real-time dolphin vocalization translation and two-way communication",
      "Co-authored a research paper documenting system design and field findings for submission to international conferences in animal-computer interaction and marine robotics"
    ]
  },
  {
    role: "Technical Support Agent (Student Lead)",
    org: "Georgia Tech Office of Information Technology",
    date: "May 2024 – Jan 2025",
    details: [
      "Responded to triaged security incidents and lead a team of 12 student assistants to proficiency for support to over 30 departments of Georgia Tech personnel via remote and on-site assistance",
      "Led an enterprise-level, system-wide VLAN migration to modernize IT infrastructure for all campus services.",
      "Programmed and deployed a PowerShell script for verifying device imaging and task sequences that reduced setup time for our team by 50% in most cases",
      "Migrated enterprise device management from the SCCM platform to Microsoft Endpoint/Intune, enabling more streamlined deployment of over 15 distinct user profiles with associated software and service access",
      "Designed and implemented an automated MS Teams notification tool using Power Automate that reduced missed remote service requests to zero over a 1 month timeline"
    ]
  },
];
