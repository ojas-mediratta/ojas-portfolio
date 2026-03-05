export type ContentSection =
  | { type: 'text'; content: string }
  | { type: 'video'; src: string; caption?: string }
  | { type: 'videos'; items: string[]; caption?: string }
  | { type: 'image'; src: string; caption?: string }
  | { type: 'images'; items: string[]; caption?: string }
  | { type: 'youtube'; videoId: string; caption?: string };

export type ProjectArea = "Robotics" | "Embedded" | "AI/ML" | "Other";

export type Project = {
  slug: string;
  title: string;
  blurb: string;
  tags: string[];
  thumb?: string;
  previewVideo?: string;
  mainVideo?: string;
  youtubeVideo?: string;
  previewGif?: string;
  links?: { link?: string; code?: string };
  area?: ProjectArea | ProjectArea[];
  status?: 'Active' | 'Complete';
  body?: string;
  sections?: ContentSection[];
  gallery?: string[];        
};

export const PROJECTS: Project[] = [
  {
    slug: "blip-auv",
    title: "BLIP: Autonomous Underwater Vehicle for Dolphin Research",
    blurb: "AUV robot with real-time whistle/click vocalization classification and closed-loop control.",
    tags: ["Robotics", "C++", "ESP32", "Android", "Controls", "Audio DSP"],
    area: "Robotics",
    status: "Active",
    thumb: "media/blip-auv/blip_thumb.jpg",
    previewVideo: "media/blip-auv/blip_preview.mp4",
    mainVideo: "media/blip-auv/blip_main.mp4",
    links: { link: "https://www.linkedin.com/posts/ojas-mediratta_robotics-embedded-signalprocessing-activity-7358290478351478784-0Afr?utm_source=share&utm_medium=member_desktop&rcm=ACoAADdTxJgB6uIFgkQecw_eTHt3ywpT-XIfTt8" },
    sections: [
      { type: 'text', content: `BLIP is an autonomous and remotely-operated underwater vehicle built for dolphin communication research. It started as a collaboration between the Wild Dolphin Project and Georgia Tech’s Contextual Computing Group, and we've built it out into a platform that lets us study how dolphins respond to interactive acoustic signals in the wild. There's a lot of research work with dolphins that involves modeling behaviors and associating them with specific whistle sounds that the dolphins can replicate. The goal is to establish a 'shared vocabulary' in a sense, so that we can eventually engage in two-way communication.` },
      { type: 'text', content: `Of course, one of the important aspects to communicating is not just being able to make sounds, but to also understand sounds that are made by others. This is where we used deep-learning to classify and recognize different types of dolphin vocalizations in real time. Our classifier is running on the robot and is able to turn dolphin vocalizations into behaviors and responses that are meaningful to the dolphins, and very quickly. The foundational work on developing this classifier and it's associated hardware (known as the CHAT system) was done at Georgia Tech well before my time and is part of a collaboration with Google. You can see more at [DolphinGemma](https://blog.google/innovation-and-ai/products/dolphingemma/).` },
      { type: 'text', content: `BLIP has been through more than 15 pool trials and several ocean deployments, with each consecutive deployment giving us more data and insights. Some important considerations were that BLIP needed to be repairable in the field, pressure tolerant, and easy to deploy by one person, so we spent a lot of time on the design with those constraints.` },
      { type: 'video', src: 'media/blip-auv/blip_1.mp4', caption: 'Early in-water trials and pool tests' },
      { type: 'text', content: `I owned the entire software, firmware, and most of the electrical integration of the system. I built some software tools to make using the robot easier for the non-technical marine biologists on the team, like the pipeline for real-time parameter tuning that they relied on during deployments. I implemented the OTA update system that let us push fixes without opening the robot, and developed the live web telemetry site that streamed robot state and acoustic detections in real time. These tools ended up being very important during field operations.` },
      { type: 'video', src: 'media/blip-auv/blip_4.mp4', caption: 'Tone recognition test' },
      { type: 'text', content: `On the embedded side, I designed and implemented the full control layer that linked an ESP32-based thruster controller with an onboard Google Pixel 9. The ESP32 handled cascaded PID-mixed thruster control across four degrees of freedom, and the Pixel ran all digital signal processing on the hydrophone stream. I built the DSP pipeline from the ground up, starting with Goertzel filters and template matching, then expanding into FFT processing that fed into a CNN classifier. Once a whistle was detected, the system mapped it to interactive behaviors so the robot could respond in a way that fit the rhythm of dolphin communication.` },
      { type: 'text', content: `A lot of my time also went into the internal electronics. As the robot's enclosure changed through different iterations, I handled the sensor stack, power distribution, wiring architecture, bi-directional communication links, and the integration work that kept everything working and fitting inside the confined pressure vessel.` },
      { type: 'video', src: 'media/blip-auv/blip_12.mp4', caption: 'Early PID tuning in water' },
      { type: 'text', content: `Working across so many layers of the system taught me a lot of engineering lessons and forced me to become good at a lot of different things. Jumping between software, firmware, and hardware forced me to learn quickly and understand how decisions in one part of the stack affect everything else. It shaped me into more of a generalist who can move through a wide spectrum of problems and keep a complex system working as a whole.` },
      { type: 'text', content: `BLIP is still growing as a research platform. We are expanding its acoustic vocabulary, increasing reliability for longer deployments, and exploring how underwater robots can participate in broader studies of marine communication and behavior.` },

    ],
    gallery: [
      "media/blip-auv/blip_2.jpg",
      "media/blip-auv/blip_3.jpg",
      "media/blip-auv/blip_5.jpg",
      "media/blip-auv/blip_6.jpg",
      "media/blip-auv/blip_7.jpg",
      "media/blip-auv/blip_8.jpg",
      "media/blip-auv/blip_9.jpg",
      "media/blip-auv/blip_10.jpg",
      "media/blip-auv/blip_11.jpg"]
  },
  {
    slug: "tactile-sensing",
    title: "Tactile Sensing for Robotic Manipulation and Collaborative Tasks",
    blurb: "Research in tactile sensing and reinforcement learning with dextrous manipulators for human-robot and robot-robot collaborative tasks.",
    tags: ["Robotics", "Isaac Sim", "Sensors", "Manipulation", "Controls", "Fusion360"],
    area: "Robotics",
    status: "Active",
    thumb: "media/tactile-sensing/tactile-sensing_thumb.jpeg",
    previewVideo: "media/tactile-sensing/tactile-sensing_preview.mov",
    mainVideo: "",
    links: { code: "" },
    sections: [
      { type: 'text', content: `I'm working on the design of a parallel gripper with linear actuation for the Unitree G1, intended to accept custom flexible tactile sensors I am developing, inspired by [3D‑ViTac](https://binghao-huang.github.io/3D-ViTac/). This work is ongoing at the LIDAR Lab, Georgia Tech.` },
      { type: 'text', content: `The second gripper I am working on engineering tasks for is the Inspire hand from Inspire robotics. This hand has built-in tactile sensing, and I am working on real to sim in Issac Sim for this hand too. We're working on collecting tactile sensor data at the moment, and beyond characterizing the real pressure to analog value mapping, we've done some initial testing to see which gripper design works best for the collaborative tasks we're trying to optimize for. I wrote a python script that outputs the sensor readings to a GUI and logs pose as well as tactile sensor values to a csv.` },
      { type: 'video', src: `media/tactile-sensing/lipobattery-grip-trial.mp4`, caption: 'Testing of the inspire hand.' },
    ],
    gallery: [
    ]
  },
  // {
  //   slug: "mine-track",
  //   title: "MineTrack: Visual Odometry from Minecraft Gameplay",
  //   blurb: "Using Minecraft as a controlled simulation to study learning-based visual odometry, pose estimation, and SLAM from raw vision data.",
  //   tags: ["AI/ML", "Robotics", "Python", "Pytorch", "Computer Vision", "SLAM"],
  //   area: ["AI/ML", "Robotics"],
  //   status: "Active",
  //   thumb: "media/mine-track/mine-track_preview.gif",
  //   previewVideo: "media/mine-track/mine-track_preview.gif",
  //   mainVideo: "",
  //   links: { code: "" },
  //   sections: [
  //     { type: 'text', content: `This project is currently in the planning stage.` },
  //     { type: 'text', content: `MineTrack is a machine learning course project that combines unsupervised representation learning with supervised regression to study vision-based motion estimation. Minecraft gameplay data will be used as a synthetic dataset, pairing video frames with ground-truth pose information for training and evaluation.` },
  //     { type: 'text', content: `Further details, experiments, and results will be added as the project is implemented.` },
  //   ],
  //   gallery: []
  // },
  {
    slug: "advanced-mobile-robotics",
    title: "Advanced Mobile Robotics: Estimation, SLAM, and Control",
    blurb: "A sequence of robotics implementations spanning robot mobility, optimization, estimation, and control for swimming, land-roaming, and flying robots.",
    tags: ["Robotics", "Python", "GTSAM", "Webots", "Control", "SLAM"],
    area: "Robotics",
    status: "Active",
    thumb: "media/advanced-mobile-robotics/advanced-mobile-robotics_thumb.jpg",
    previewVideo: "media/advanced-mobile-robotics/advanced-mobile-robotics_preview.mov",
    mainVideo: "media/advanced-mobile-robotics/advanced-mobile-robotics_preview.mov",
    links: { code: "" },
    sections: [
    { type: 'text', content: `This project tracks my work in Georgia Tech's Advanced Mobile Robotics course (ECE 8803 AMR). The course has 4 different projects called 'Swim', 'Walk', 'Drive', and 'Fly'. Each of them involves the use of the GTSAM Python library and Webots for implementing things like control and filtering` },
    { type: 'text', content: `First, we worked on 'Swim', which mostly focused on state estimation and control for an underwater ROV in the Webots simulator. I implemented an EKF using GTSAM's NavStateImuEKF package to fuse IMU data with position, depth, and range measurements for real-time localization.` },
    { type: 'text', content: `We also had to build autonomous control functionality. I built a proportional controller that tracks desired trajectories. I broke it into four independent control channels: XY-plane distance error for forward thrust, depth error for vertical control, yaw error for heading, and roll error for stabilization. The key challenge was handling angle wrapping correctly—yaw and roll errors had to be mapped to [-π, π) to avoid discontinuities. I tuned the gains empirically until the robot tracked smoothly without too much oscillation.` },
    { type: 'images', items: ['media/advanced-mobile-robotics/advanced-mobile-robotics_1.jpg', 'media/advanced-mobile-robotics/advanced-mobile-robotics_2.mp4'], caption: 'Autonomous trajectory following and tracking error over time' },
    { type: 'text', content: `This project gave me solid experience with nonlinear filtering on Lie groups (the state lives in SE(3)) and sensor fusion with heterogeneous measurements. Working with GTSAM's factor graph library had a learning curve but was useful for understanding how to handle uncertainty with estimation.` },
    { type: 'text', content: `We've just moved onto the 'Walk' project, which focuses on legged locomotion and control for Boston Dynamics' spot quadruped. There's been some introduction for forward and inverse kinematics as well as probablistic roadmaps.` },
    { type: 'text', content: `Following the introduction to legged locomotion for Boston Dynamics' Spot quadruped, I implemented a Product of Exponentials (POE) based inverse kinematics controller for a single Spot leg. This involved building forward kinematics using body-frame screw axes, computing the body Jacobian through adjoint transformations, and developing a gradient descent IK solver that prioritizes translational accuracy over orientation. I validated the controller in Webots simulation and it performed well with a quick convergence.` },
    { type: 'video', src: 'media/advanced-mobile-robotics/advanced-mobile-robotics_preview.mov', caption: 'Spot leg inverse kinematics demo' },
  ],
    gallery: []
  },
  {
    slug: "turtlebot3-ros2",
    title: "ROS2 Perception, Planning, and Control Experiments with TurtleBot3",
    blurb: "Exploring robotics principles in ROS2 using the TurtleBot3 platform, including SLAM, navigation, and computer vision.",
    tags: ["Robotics", "AI/ML", "Python", "ROS2", "OpenCV", "Gazebo"],
    area: "Robotics",
    status: "Complete",
    thumb: "media/turtlebot3/turtlebot3_thumb.jpg",
    previewVideo: "media/turtlebot3/turtlebot3_preview.mp4",
    mainVideo: "media/turtlebot3/turtlebot3_preview.mp4",
    links: { code: "https://github.com/ojas-mediratta/turtlebot3-ros2" },
    sections: [
      { type: 'text', content: `This project was an ongoing exploration of perception, localization, and control using ROS2 on the TurtleBot3 platform. It taught me the fundamentals of using ROS 2 and implementing nodes that run both in sim and on a physical robot.` },
      { type: 'text', content: `I started by building a simple perception pipeline that used OpenCV to detect and track colored objects (all written in Python). From there, I ported everything to ROS 2 so the robot could publish processed images and target coordinates in real time. Once that worked, I moved onto writing a node that published twist commands based on the target coordinates (that used a proportional controller). Then, I built a PID controller that fused camera and LIDAR inputs, which allowed the robot to chase moving targets while keeping a safe buffer of distance and maintaining alignment.` },
      { type: 'videos', items: ['media/turtlebot3/turtlebot3_1.mp4', 'media/turtlebot3/turtlebot3_3.mp4'], caption: 'OpenCV tracking demo with port to ROS2' },
      { type: 'text', content: `After that, I worked on navigation. I built a Go-to-Goal controller that blended odometry and LIDAR sensing for reactive obstacle avoidance. The robot computed velocity commands based on real-time obstacle vectors and could move toward arbitrary goal positions while steering cleanly around whatever got in the way. You can see it working in the video below.` },
      { type: 'video', src: 'media/turtlebot3/turtlebot3_4.mp4', caption: 'Waypoint navigation with obstacle avoidance' },
      { type: 'text', content: `The next phase focused on full mapping, localization, and global navigation with the ROS 2 Nav2 stack. I set up AMCL for reliable pose estimation, and tuned costmap and controller parameters until the robot could handle narrow hallways without drifting or oscillating. To automate longer missions, I wrote a ROS 2 node that publishes sequential waypoints to the /goal_pose topic so the robot can traverse a full route on its own. I tested everything in Gazebo's maze world and then transferred it to the physical TurtleBot3, where it performed pretty well.` },
      { type: 'text', content: `The final project brought everything together in a maze navigation task that required real-time sign classification using computer vision. The robot had to autonomously navigate through a maze while identifying and responding to visual commands posted at intersections. We experimented with several machine learning approaches for image classification, testing different models to balance accuracy with computational constraints. After evaluating options including deep learning architectures (just for fun, we found out these were way too big to run on our limited turtlebot3), we settled on a Support Vector Machine (SVM) classifier. The SVM proved to be lightweight enough to run directly onboard the TurtleBot3 while still delivering excellent classification performance. We ended up completing the course near perfectly, with the exception of one misclassification.` },
      { type: 'videos', items: ['media/turtlebot3/turtlebot3_5.mp4', 'media/turtlebot3/turtlebot3_preview.mp4'], caption: 'Localization and sign-based maze navigation demos' },
      { type: 'text', content: `Overall, I'm pretty satisfied with the skills I was able to develop working with ROS2 and implementing some baseline fundamentals for robotics. View my code and the rest of my work in the linked GitHub repository.` },
    ]
  },
  {
    slug: "buzzcaster-guitar",
    title: "BuzzCaster: Gig-Ready, Teensy-Powered Guitar Effects",
    blurb: "Electric guitar with a built-in Teensy 4.1 effects chain, onboard DSP, LCD UI, simple controls, and custom body mods.",
    tags: ["Embedded Systems", "C++", "Teensy 4.1", "Arduino", "Rapid Prototyping", "Audio DSP"],
    area: "Embedded",
    status: "Complete",
    thumb: "media/buzzcaster/buzzcaster_thumb.jpg",
    previewVideo: "media/buzzcaster/buzzcaster_preview.mp4",
    links: { code: "https://github.com/ojas-mediratta/BuzzCaster-Guitar" },
    sections: [
      { type: 'text', content: `Guitar has been one of my passions for over a decade. I have spent countless hours playing and trying out different gear like pedals and amps. When it came time to choose a final project for CS 3651 (Prototyping Intelligent Devices), I saw the chance to bring that passion together with my interest in embedded systems: building a guitar with its own onboard effects.` },
      { type: 'text', content: `The result was BuzzCaster, a custom guitar project that integrates a complete digital signal processing (DSP) chain directly inside the instrument. Instead of relying on external pedals and cables, the guitar itself handles delay, reverb, chorus, and distortion through a Teensy microcontroller running PJRC’s real-time audio framework. The goal was to keep the instrument familiar in form and playability, while giving it the flexibility of a built-in effects unit.` },
      { type: 'video', src: 'media/buzzcaster/buzzcaster_4.mp4', caption: 'Early circuit prototyping' },
      { type: 'text', content: `Making this possible required significant design work. I routed out the guitar body to house the electronics, created a compact LCD and encoder interface for real-time control, and tuned the preamp to preserve the pickups’ natural impedance. Power stability was another challenge, so I designed a dedicated battery housing and safeguards to handle USB quirks and power bank issues.` },
      { type: 'images', items: ['media/buzzcaster/buzzcaster_6.jpg', 'media/buzzcaster/buzzcaster_7.jpg'], caption: 'Routing and laser engraving the body' },
      { type: 'text', content: `The project had a lot of different parts in which I learned a lot. There was a lot of work with circuit prototyping, 3D-printed mounting solutions and firmware development. By the end, I had not only a fully playable instrument but also a proof of concept in embedded audio design.` },
      { type: 'text', content: `More details, including schematics, firmware, and build notes, are documented in the repo README.` },
    ],
    gallery: [
      "media/buzzcaster/buzzcaster_1.jpg",
      "media/buzzcaster/buzzcaster_2.jpg",
      "media/buzzcaster/buzzcaster_3.jpg",
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
    tags: ["Embedded Systems", "C++", "ATMega34U4", "Fusion360", "Rapid Prototyping"],
    area: "Embedded",
    status: "Complete",
    thumb: "media/et55/et55_thumb.jpg",
    previewVideo: "media/et55/et55_preview.mp4",
    mainVideo: "media/et55/et55_main.mp4",
    links: { code: "https://github.com/ojas-mediratta/ET55-Keyboard" },
    sections: [
      { type: 'text', content: `Mechanical keyboards have been a hobby of mine for years. I love the tactile feel of quality switches, the sound of well-built boards, and the endless customization options that let me tailor my typing experience. Over time, I have built several custom keyboards from kits and parts, but I had never designed and built one entirely from scratch—until ET55.` },
      { type: 'text', content: `ET55 is a 55-key, hand-wired mechanical keyboard that blends the vintage feel of IBM Model F layouts with modern features like QMK firmware, USB-C connectivity, an OLED status screen, and a rotary-encoder volume knob. The design process was a deep dive into keyboard engineering, from switch selection and wiring to firmware configuration and case design.` },
      { type: 'video', src: 'media/et55/et55_4.mp4', caption: 'Internals and physical design' },
      { type: 'text', content: `Building ET55 involved several key steps. First, I designed the layout and wiring schematic, ensuring that every switch was correctly placed and connected for NKRO functionality. I hand-wired each switch using diodes and copper wire, taking care to insulate connections with heat shrink tubing to prevent shorts.` },
      { type: 'images', items: ['media/et55/et55_2.jpg', 'media/et55/et55_3.jpg'], caption: 'Hand-wiring the switches and diodes' },
      { type: 'text', content: `Next, I integrated a Pro Micro (ATmega32U4) microcontroller to handle the keyboard’s logic and communication. I programmed it using QMK firmware, customizing the keymap to fit the compact layout and adding layers for additional functionality. The rotary encoder was set up to control volume and switch layers, while the OLED display provided real-time status updates.` },
      { type: 'text', content: `For the case and plate, I modeled custom parts in Fusion 360 and 3D-printed them to achieve a precise fit. This process involved several iterations to refine tolerances and ensure that the switches seated properly despite the wiring underneath.` },
      { type: 'text', content: `The final result is a compact, functional keyboard that feels great to type on and showcases my skills in embedded systems and mechanical design. ET55 has become a staple in my daily setup, combining nostalgia with modern convenience in a unique package.` },
    ],
    gallery: [
      "media/et55/et55_1.jpg",
      "media/et55/et55_2.jpg",
      "media/et55/et55_3.jpg",
    ]
  },
  {
    slug: "keyboard-design",
    title: "Freelance Custom Mechanical Keyboard Design and Manufacturing",
    blurb: "Completely bespoke mechanical keyboards, tailored to client specifications and preferences, and machined out of premium materials.",
    tags: ["Design and Manufacturing", "Fusion360", "Blender", "DFM"],
    area: "Other",
    status: "Complete",
    thumb: "media/keyboard-design/keyboard-design_thumb.jpg",
    previewVideo: "media/keyboard-design/keyboard-design_preview.mp4",
    mainVideo: "media/keyboard-design/keyboard-design_preview.mp4",
    links: { code: "https://github.com/ojas-mediratta/keyboard-design" },
    sections: [
      { type: 'text', content: `Like many in the enthusiast mechanical keyboard community, I started out fascinated by the design and engineering that go into custom boards. The scene thrives on experimentation with things like materials, mounting styles, switches, layouts, the list goes on. As someone who spent a lot of time on my computer, the community interested me and the cool looking and sounding boards I saw online triggered the consumerist part of my brain (too many hobbies are like this haha).` },
      { type: 'images', items: ['media/keyboard-design/keyboard-design_27.jpeg', 'media/keyboard-design/keyboard-design_28.jpeg'], caption: 'My first custom prototype and my collection' },
      { type: 'text', content: `After a few months with a couple of off-the-shelf custom boards, I decided to take the plunge and design my own keyboard from scratch. I saw people on reddit posting interest checks for their designs, so I figured I could try that too. At the time (and even today) one of the most coveted boards was the TGR Singa Unikorn. It was a super simple design (so much so that the bakeneko, another popular board, was basically a Singa clone with a few tweaks), but it had this elegant, timeless aesthetic that I really liked. I decided to model something inspired by that style but with my own spin on it.` },
      { type: 'text', content: `With no prior experience in CAD, I dove into Fusion 360. At first, I barely knew how to sketch a rectangle, but I pushed through tutorials and geekhack posts to understand the practices involved when designing keyboards. Soon enough, I was able to produce a Unikorn clone that, in my opinion, was way nicer than the boards that people had been dropping $2000 on resale on r/MechMarket. After showing off my board at the Georgia Tech Mechanical Keyboard Club, I got a few messages from people interested in commissioning their own custom designs.` },
      { type: 'videos', items: ['media/keyboard-design/keyboard-design_6.mp4', 'media/keyboard-design/keyboard-design_15.mp4'], caption: 'Client boards in-progress' },
      { type: 'text', content: `From there, freelance commissions grew organically. Clients would come with a concept, sometimes just a layout or an aesthetic inspiration, and I’d take on the challenge of turning it into a manufacturable design. That meant iterating on case geometry while still ensuring PCB compatibility, since I was still relying on pre-designed PCBs in my designs. I ended up doing a lot of Unikorn clones (for the reasons described above), but did some more unique one offs like the one shown in the video above, which was a 60% board with a stainless steel weight and a super special side profile.` },
      { type: 'videos', items: ['media/keyboard-design/keyboard-design_2.mp4', 'media/keyboard-design/keyboard-design_3.mp4'], caption: 'Aluminum machining for Endurance Proto v2' },
      { type: 'text', content: `What started as just a desire for a one-off board turned into a series of freelance collaborations where I could merge cool technical design with the culture of enthusiast keyboards, producing pieces that are at once tools and expressions of identity. More in the gallery below!`}
    ],
    gallery: [
      "media/keyboard-design/keyboard-design_5.jpg",
      "media/keyboard-design/keyboard-design_7.jpg",
      "media/keyboard-design/keyboard-design_8.jpg",
      "media/keyboard-design/keyboard-design_9.mp4",
      "media/keyboard-design/keyboard-design_10.jpg",
      "media/keyboard-design/keyboard-design_11.jpg",
      "media/keyboard-design/keyboard-design_12.jpg",
      "media/keyboard-design/keyboard-design_13.jpg",
      "media/keyboard-design/keyboard-design_14.jpg",
      "media/keyboard-design/keyboard-design_16.mp4",
      "media/keyboard-design/keyboard-design_17.jpg",
      "media/keyboard-design/keyboard-design_18.jpg",
      "media/keyboard-design/keyboard-design_19.jpg",
      "media/keyboard-design/keyboard-design_20.jpg",
      "media/keyboard-design/keyboard-design_21.jpg",
      "media/keyboard-design/keyboard-design_22.jpg",
      "media/keyboard-design/keyboard-design_23.jpg",
      "media/keyboard-design/keyboard-design_24.jpg",
      "media/keyboard-design/keyboard-design_25.jpeg",
      "media/keyboard-design/keyboard-design_26.jpeg",
      "media/keyboard-design/keyboard-design_29.jpeg",
    ]
  },
   {
    slug: "hackGT12",
    title: "Dose: Modern care in a bottle [HackGT 12 Best Overall Winner]",
    blurb: "A smart medicine bottle that uses embedded sensing and rich dashboards to ensure safe, consistent medication adherence.",
    tags: ["Embedded Systems", "C++", "ESP32", "Rapid Prototyping", "MedTech"],
    area: "Embedded",
    status: "Complete",
    thumb: "media/hackGT12/dose_thumb3.jpeg",
    previewVideo: "media/hackGT12/dose_preview.mp4",
    youtubeVideo: "8https://youtu.be/j7cSnyq9Vn8?si=D-a5kVKJLNQyEynK",
    links: { code: "https://github.com/dawsonp2003/HackGT12-Dose", link: "https://devpost.com/software/dose-ebmo9z" },
    sections: [
      { type: 'text', content: `Dose was my HackGT12 Hackathon project. This was my first ever hackathon, and I loved it. Over the course of 36 intense hours, my team and I brainstormed, built, and debugged our way through sleepless nights, sticky notes, and too many energy drinks to count. HackGT12 brought together 900+ participants, and being part of that energy—watching the room buzz with ideas while racing the clock to bring ours to life—was unforgettable. We set out to tackle a problem that’s huge but often invisible: medication non-adherence.` },
      { type: 'text', content: `Medication non-adherence happens when patients don’t take their medication at the prescribed time or in the prescribed way. It might sound simple, but the impact is massive—studies estimate it costs the U.S. healthcare system $100–300 billion every year in avoidable direct costs. Missed doses, overdoses, and inconsistent adherence don’t just create complications for patients, but also ripple outward into failed treatments, unnecessary hospitalizations, and unreliable results in drug trial research.` },
      { type: 'text', content: `That’s where Dose comes in. We designed it as a smart pill bottle that combines embedded sensing with rich data delivery. For patients, it makes adherence straightforward. For researchers and clinicians, it provides the high-quality data needed to truly understand whether treatments are working as intended. Building the hardware, software, and dashboard in such a short time was equal parts challenging and exhilarating—but seeing our prototype come together at the expo made every late-night bug fix worth it.` }, 
    ],
    gallery: [
      "media/hackGT12/dose_1.jpeg",
      "media/hackGT12/dose_2.jpeg",
      "media/hackGT12/dose_3.jpeg", 
      "media/hackGT12/dose_4.jpeg",
      "media/hackGT12/dose_5.jpeg",
      "media/hackGT12/dose_6.jpeg",
      "media/hackGT12/dose_7.jpeg",
      "media/hackGT12/dose_8.jpeg",
      "media/hackGT12/dose_9.jpeg",
      "media/hackGT12/dose_10.jpeg",
      "media/hackGT12/dose_11.jpeg",
      "media/hackGT12/dose_12.jpeg",
      "media/hackGT12/dose_13.jpeg",
      "media/hackGT12/dose_14.jpeg",
    ]
  },
  {
    slug: "ai-atl25",
    title: "Lucid: Vision That Keeps Highways Safe [AI ATL 25 Winner]",
    blurb: "A computer vision system that monitors truck driver fatigue through facial cues and heart-rate analytics, streamed to a live fleet dashboard.",
    tags: ["AI/ML", "React", "Typescript", "OpenCV", "Mediapipe", "Snowflake API"],
    area: "AI/ML",
    thumb: "media/ai-atl25/lucid_thumb.png",
    youtubeVideo: "https://youtu.be/AiMx3mfucmc",
    previewVideo: "media/ai-atl25/lucid_preview.mp4",
    links: { code: "https://github.com/amukker15/GTAI", link: "https://devpost.com/software/lucid-nijx3r"},
    sections: [
      { type: 'text', content: `Lucid was my second ever hackathon project, and somehow, we won again (this time in a sponsor track for Snowflake AI Cloud systems). I’d just come off my first win a month earlier and decided to ride the wave.` },
      { type: 'text', content: `We built Lucid at the AI ATL Hackathon: a computer vision system that monitors truck driver fatigue in real time. The goal was simple; catch signs of drowsiness like blinking, yawning, or nodding off before they become dangerous. The data runs through a Snowflake backend and updates a live dashboard that shows each driver’s fatigue levels across a fleet.` },
      { type: 'text', content: `I focused mostly on the physical and frontend sides of the project. I designed and printed the demo hardware, an enclosure for the mobile phone which included the cameras and sensors, which took a few rounds of failed prints and redesigns before it came together cleanly. On the frontend, I worked on the React dashboard and the mobile port, making sure the visuals were clean, responsive, and intuitive.` },
      { type: 'text', content: `I also jumped in on some backend work, helping connect the API to Snowflake and shape how the data was stored and streamed to the frontend. It was a lot of small but essential details: data schemas, validation, debugging.` },
      { type: 'text', content: `By the end of the weekend, we had a full working demo; hardware, dashboard, backend, everything, and it actually felt cohesive. The prototype made it tangible, and the UI made it look finished. For a 36-hour build, it came together in a way that surprised even us.` },
    ],
    gallery: [
      "media/ai-atl25/lucid_1.png",
      "media/ai-atl25/lucid_2.jpeg",
      "media/ai-atl25/lucid_3.jpeg",
      "media/ai-atl25/lucid_4.jpeg",
      "media/ai-atl25/lucid_5.jpeg",
    ]
  },
];