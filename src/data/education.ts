export type Education = {
    school: string;
    degree: string;
    date: string;
    details?: string[];
    logoKey?: "gt";      // add keys for each logo component you wire up
    logoSize?: number;   // px (optional)
    logoStroke?: number; // only relevant if your SVG uses strokes
};

export const EDUCATION: Education[] = [
    {
        school: "Georgia Institute of Technology",
        degree: "M.S. Robotics",
        date: "2025 – 2027",
        details: [
            "Concentration: Artificial Intelligence, Perception, and Mechanics",
            "Activities and Societies: Graduate Research, HackGT Hackathon Overall Winner, AI ATL Hackathon Winner, Transfer2Tech Mentor",
            "Coursework: Artificial Intelligence, Machine Learning, Computer Vision, Advanced Mobile Robotics, Robotics, Mechatronics",
        ],
        logoKey: "gt",
        logoSize: 72,
    },
    {
        school: "Georgia Institute of Technology",
        degree: "B.S. Computer Engineering",
        date: "2023 – 2025",
        details: [
            "Concentration: Distributed Systems & Software Design, and Cybersecurity",
            "Activities and Societies: Undergraduate Research, GT iOS Club, GT Mechanical Keyboards",
            "Coursework: Data Structures \& Algorithms, Digital System Design, Circuit Analysis,  Prototyping Intelligent Devices, Embedded Systems Design, Fundamentals of Machine Learning, Network Security, Cybersecurity",
        ],
        logoKey: "gt",
        logoSize: 72,
    },
    // ...
];