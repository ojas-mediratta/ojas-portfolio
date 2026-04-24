export type ContentSection =
  | { type: 'text'; content: string }
  | { type: 'video'; src: string; caption?: string }
  | { type: 'videos'; items: string[]; caption?: string }
  | { type: 'image'; src: string; caption?: string }
  | { type: 'images'; items: string[]; caption?: string }
  | { type: 'carousel'; items: { src: string; caption?: string }[] }
  | { type: 'youtube'; videoId: string; caption?: string };

export type ProjectArea = "Robotics" | "Embedded" | "AI/ML" | "Other";

export type Project = {
  slug: string;
  title: string;
  blurb: string;
  tags: string[];
  thumb?: string;
  previewVideo?: string;
  fitPreviewVideo?: boolean;
  mainVideo?: string;
  youtubeVideo?: string;
  previewGif?: string;
  links?: { link?: string; code?: string; paper?: string };
  area?: ProjectArea | ProjectArea[];
  status?: 'Active' | 'Complete';
  body?: string;
  sections?: ContentSection[];
  gallery?: string[];        
};

export const PROJECTS: Project[] = [
  {
    slug: "blip-auv",
    title: "BLIP: Marine ROV for Dolphin Research",
    blurb: "A marine robot for dolphin research with real-time whistle/click classification and closed-loop control.",
    tags: ["Robotics", "C++", "ESP32", "Android", "Controls", "Audio DSP"],
    area: "Robotics",
    status: "Active",
    thumb: "media/blip-auv/blip_thumb.jpg",
    previewVideo: "media/blip-auv/blip_preview.mp4",
    mainVideo: "media/blip-auv/blip_main.mp4",
    links: { link: "https://www.linkedin.com/posts/ojas-mediratta_robotics-embedded-signalprocessing-activity-7358290478351478784-0Afr?utm_source=share&utm_medium=member_desktop&rcm=ACoAADdTxJgB6uIFgkQecw_eTHt3ywpT-XIfTt8" },
    sections: [
      { type: 'text', content: `BLIP is an autonomous and remotely operated underwater vehicle built for dolphin communication research. It began as a collaboration between the Wild Dolphin Project and Georgia Tech's Contextual Computing Group, and now serves as a field platform for testing interactive acoustic signals with dolphins. The long-term goal is to map whistle sounds to behaviors and build a usable shared vocabulary.` },
      { type: 'text', content: `A key requirement is not just producing sounds, but also understanding dolphin sounds in real time. We use deep learning to classify vocalizations onboard, then map detections to robot behaviors. The core classifier and hardware foundation (the CHAT system) was developed at Georgia Tech before my involvement as part of a collaboration with Google. More details are available at [DolphinGemma](https://blog.google/innovation-and-ai/products/dolphingemma/).` },
      { type: 'text', content: `BLIP has been through more than 15 pool trials and several ocean deployments, with each consecutive deployment giving us more data and insights. Some important considerations were that BLIP needed to be repairable in the field, pressure tolerant, and easy to deploy by one person, so we spent a lot of time on the design with those constraints.` },
      { type: 'video', src: 'media/blip-auv/blip_1.mp4', caption: 'Early in-water trials and pool tests' },
      { type: 'text', content: `I owned the entire software, firmware, and most of the electrical integration of the system. I built some software tools to make using the robot easier for the non-technical marine biologists on the team, like the pipeline for real-time parameter tuning that they relied on during deployments. I implemented the OTA update system that let us push fixes without opening the robot, and developed the live web telemetry site that streamed robot state and acoustic detections in real time. These tools ended up being very important during field operations.` },
      { type: 'video', src: 'media/blip-auv/blip_4.mp4', caption: 'Tone recognition test' },
      { type: 'text', content: `On the embedded side, I designed and implemented the full control layer that linked an ESP32-based thruster controller with an onboard Google Pixel 9. The ESP32 handled cascaded PID-mixed thruster control across four degrees of freedom, and the Pixel ran all digital signal processing on the hydrophone stream. I built the DSP pipeline from the ground up, starting with Goertzel filters and template matching, then expanding into FFT processing that fed into a CNN classifier. Once a whistle was detected, the system mapped it to interactive behaviors so the robot could respond in a way that fit the rhythm of dolphin communication.` },
      { type: 'text', content: `A lot of my time also went into the internal electronics. As the robot's enclosure changed through different iterations, I handled the sensor stack, power distribution, wiring architecture, bi-directional communication links, and the integration work that kept everything working and fitting inside the confined pressure vessel.` },
      { type: 'video', src: 'media/blip-auv/blip_12.mp4', caption: 'Early PID tuning in water' },
      { type: 'text', content: `Working across software, firmware, and hardware taught me how tightly coupled each part of the system is. It also pushed me to become a stronger generalist who can keep a complex robot reliable end to end.` },
      { type: 'text', content: `BLIP is still an active research platform. Current work focuses on expanding acoustic behaviors, improving reliability for longer deployments, and supporting broader marine communication studies.` },

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
    slug: "mine-track",
    title: "MineTrack: Visual Odometry from Minecraft Gameplay",
    blurb: "Using Minecraft gameplay as synthetic data for learning-based visual odometry and pose estimation.",
    tags: ["AI/ML", "Python", "Pytorch", "Machine Learning", "Computer Vision"],
    area: ["AI/ML"],
    status: "Active",
    thumb: "media/mine-track/mine-track_thumb.png",
    previewVideo: "media/mine-track/mine-track_preview.mp4",
    fitPreviewVideo: true,
    mainVideo: "media/mine-track/mine-track_preview.mp4",
    links: {link: "https://ojas-mediratta.github.io/Minetrack-Website/index.html", code: "https://github.com/ojas-mediratta/Minetrack" },
    sections: [
      { type: 'text', content: `MineTrack is a machine learning course project on vision-based motion estimation. It combines unsupervised representation learning with supervised regression, using Minecraft gameplay as synthetic data with paired video frames and ground-truth pose labels.`},
      { type: 'text', content: `Further details, experiments, and results can be viewed on the project [website](https://ojas-mediratta.github.io/Minetrack-Website/index.html) and [repo](https://github.com/ojas-mediratta/Minetrack).` },
    ],
    gallery: []
  },
  {
    slug: "advanced-mobile-robotics",
    title: "Advanced Mobile Robotics: Estimation, SLAM, and Control",
    blurb: "Course projects on estimation, SLAM, and control across underwater, legged, ground, and aerial robots.",
    tags: ["Robotics", "Python", "GTSAM", "Webots", "Control", "SLAM"],
    area: "Robotics",
    status: "Complete",
    thumb: "media/advanced-mobile-robotics/advanced-mobile-robotics_thumb.jpg",
    previewVideo: "media/advanced-mobile-robotics/advanced-mobile-robotics_6.mp4",
    mainVideo: "media/advanced-mobile-robotics/advanced-mobile-robotics_preview.mov",
    links: { code: "https://github.com/ojas-mediratta/Advanced-Mobile-Robotics.git" },
    sections: [
    { type: 'text', content: `This project tracks my work in Georgia Tech's Advanced Mobile Robotics course (CS 8803 AMR). The course is split into four projects: 'Swim', 'Walk', 'Drive', and 'Fly'. Each uses GTSAM (Python) and Webots for estimation and control.` },
    { type: 'text', content: `First, I worked on 'Swim', which mostly focused on state estimation and control for an underwater ROV in the Webots simulator. I implemented an EKF using GTSAM's NavStateImuEKF package to fuse IMU data with position, depth, and range measurements for real-time localization.` },
    { type: 'text', content: `I also had to build autonomous control functionality. I built a proportional controller that tracks desired trajectories. I broke it into four independent control channels: XY-plane distance error for forward thrust, depth error for vertical control, yaw error for heading, and roll error for stabilization. The key challenge was handling angle wrapping correctly—yaw and roll errors had to be mapped to [-π, π) to avoid discontinuities. I tuned the gains empirically until the robot tracked smoothly without too much oscillation.` },
    { type: 'images', items: ['media/advanced-mobile-robotics/advanced-mobile-robotics_1.jpg', 'media/advanced-mobile-robotics/advanced-mobile-robotics_2.mp4'], caption: 'Autonomous trajectory following and tracking error over time' },
    { type: 'text', content: `This project gave me solid experience with nonlinear filtering on Lie groups (the state lives in SE(3)) and sensor fusion with heterogeneous measurements. Working with GTSAM's factor graph library had a learning curve but was useful for understanding how to handle uncertainty with estimation.` },
    { type: 'text', content: `I then moved to the 'Walk' project, which focuses on legged locomotion and control for Boston Dynamics' Spot quadruped, including forward and inverse kinematics and probabilistic roadmaps.` },
    { type: 'text', content: `Following the introduction to legged locomotion for Boston Dynamics' Spot quadruped, I implemented a Product of Exponentials (POE) based inverse kinematics controller for a single Spot leg. This involved building forward kinematics using body-frame screw axes, computing the body Jacobian through adjoint transformations, and developing a gradient descent IK solver that prioritizes translational accuracy over orientation. I validated the controller in Webots simulation and it performed well with a quick convergence.` },
    { type: 'video', src: 'media/advanced-mobile-robotics/advanced-mobile-robotics_preview.mov', caption: 'Spot leg inverse kinematics demo' },
    { type: 'text', content: `I then moved into the 'Drive' project, which focused on pose-graph SLAM. I built a full pipeline around wheel encoder odometry, ICP scan matching, and GTSAM factor graphs. The single-robot version combined odometry with ICP loop closures, and the multi-robot version added inter-robot range factors so separate trajectories could be merged into one map.` },
    { type: 'text', content: `The most useful lesson from this part of the course was how much global consistency matters. ICP could look good locally and still converge to the wrong answer without a strong initial guess, while the Robotarium runs made it obvious that a map can look sharp in places but still be globally worse if the merged graph is tilted or weakly constrained.` },
    { type: 'images', items: ['media/advanced-mobile-robotics/advanced-mobile-robotics_5.png', 'media/advanced-mobile-robotics/advanced-mobile-robotics_6.mp4'], caption: 'Results from the Robotarium experiment.' },
    { type: 'text', content: `In the 'Fly' project, I built a 3D LiDAR-Inertial SLAM pipeline for a drone dataset.` },
    { type: 'text', content: `I fused IMU and LiDAR in GTSAM using IMU preintegration, IMU factors, and bias random-walk factors. I used scan registration to estimate relative LiDAR motion, then added those constraints to the graph. I implemented both backends: full batch optimization (Levenberg-Marquardt) and incremental optimization (iSAM2).` },
    { type: 'text', content: `I also added loop closure by finding revisit candidates and inserting extra LiDAR constraints when scans matched. Then I stitched keyframe point clouds into a global map by transforming each cloud into the world frame.` },
    {
      type: 'carousel',
      items: [
        {
          src: 'media/advanced-mobile-robotics/advanced-mobile-robotics_7.png',
          caption: 'Trajectory with batch LiDAR-inertial odometry.',
        },
        {
          src: 'media/advanced-mobile-robotics/advanced-mobile-robotics_8.png',
          caption: 'Trajectory with iSAM2 LiDAR-inertial odometry.',
        },
        {
          src: 'media/advanced-mobile-robotics/advanced-mobile-robotics_9.png',
          caption: 'Batch optimization with and without IMU preintegration.',
        },
        {
          src: 'media/advanced-mobile-robotics/advanced-mobile-robotics_10.png',
          caption: 'Optimization timing comparison between batch and iSAM2.',
        },
        {
          src: 'media/advanced-mobile-robotics/advanced-mobile-robotics_11.png',
          caption: 'Point cloud map from the UCLA dataset.',
        },
      ],
    },
    ],
    gallery: []
  },
  // {
  //   slug: "tactile-sensing",
  //   title: "Tactile Sensing for Robotic Manipulation and Collaborative Tasks",
  //   blurb: "Research in tactile sensing and reinforcement learning with dextrous manipulators for human-robot and robot-robot collaborative tasks.",
  //   tags: ["Robotics", "Sensors", "Manipulation", "Controls", "Fusion360"],
  //   area: "Robotics",
  //   status: "Active",
  //   thumb: "media/tactile-sensing/tactile-sensing_thumb.jpeg",
  //   previewVideo: "media/tactile-sensing/tactile-sensing_preview.mov",
  //   mainVideo: "",
  //   links: { code: "" },
  //   sections: [
  //     { type: 'text', content: `I'm working on the design of a parallel gripper with linear actuation for the Unitree G1, intended to accept custom flexible tactile sensors I am developing, inspired by [3D‑ViTac](https://binghao-huang.github.io/3D-ViTac/). This work is ongoing at the LIDAR Lab, Georgia Tech.` },
  //     { type: 'text', content: `The second gripper I am working on engineering tasks for is the Inspire hand from Inspire robotics. This hand has built-in tactile sensing, and I am working on real to sim in Issac Sim for this hand too. We're working on collecting tactile sensor data at the moment, and beyond characterizing the real pressure to analog value mapping, we've done some initial testing to see which gripper design works best for the collaborative tasks we're trying to optimize for. I wrote a python script that outputs the sensor readings to a GUI and logs pose as well as tactile sensor values to a csv.` },
  //     { type: 'video', src: `media/tactile-sensing/lipobattery-grip-trial.mp4`, caption: 'Testing of the inspire hand.' },
  //   ],
  //   gallery: [
  //   ]
  // },
  // {
  //   slug: "quantum-in-the-loop",
  //   title: "Quantum-in-the-Loop Control: Opportunities and Limitations",
  //   blurb: "Exploring quantum-assisted optimization for control systems, analyzing hybrid classical–quantum architectures with a case study for MPC.",
  //   tags: ["Quantum Computing", "Qiskit", "Control Systems", "Optimization"],
  //   area: "Other",
  //   status: "Complete",
  //   thumb: "media/quantum-in-the-loop/quantum-in-the-loop_thumb.jpg",
  //   previewVideo: "media/quantum-in-the-loop/quantum-in-the-loop_preview.mp4",
  //   mainVideo: "",
  //   links: { paper: "" },
  //   sections: [
  //   { type: 'text', content: `This project explores the concept of "quantum-in-the-loop control", a hybrid architecture where a classical control system delegates certain optimization problems to a quantum processor. Many modern control approaches in robotics, such as Model Predictive Control (MPC), trajectory optimization, and combinatorial planning require repeatedly solving optimization problems in real time. As systems scale in complexity, these optimization steps can become a computational bottleneck, motivating exploration of alternative computational paradigms.` },
  //   { type: 'text', content: `I pursued this work as a class project for ECE 8803: Quantum Devices and Hardware at Georgia Tech, a course I took out of deep personal interest in quantum physics. Rather than studying quantum algorithms in isolation, I wanted to explore how quantum computing might intersect with my primary research area of robotics and control systems. The project investigates how hybrid classical-quantum architectures could theoretically integrate with feedback control loops, where a quantum optimizer acts as a co-processor for solving discrete optimization problems.` },
  //   { type: 'text', content: `As a concrete demonstration, I implemented the Quantum Approximate Optimization Algorithm (QAOA) using Qiskit to solve a representative combinatorial optimization problem (Max-Cut) on small graphs. While this problem is not itself a control problem, it serves as a canonical example of the types of optimization tasks that arise in planning, scheduling, and resource allocation. The results help illustrate both the capabilities of hybrid quantum algorithms and the practical challenges, such as noise, latency, and qubit scaling that currently limit their use in real-time control applications.` }
  //   ],
  //   gallery: [
  //   ]
  // },
  {
    slug: "turtlebot3-ros2",
    title: "ROS2 Perception, Planning, and Control Experiments with TurtleBot3",
    blurb: "ROS2 experiments on TurtleBot3 covering perception, SLAM, navigation, and control.",
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
    blurb: "A custom electric guitar with built-in Teensy 4.1 DSP effects, LCD UI, and onboard controls.",
    tags: ["Embedded Systems", "C++", "Teensy 4.1", "Arduino", "Rapid Prototyping", "Audio DSP"],
    area: "Embedded",
    status: "Complete",
    thumb: "media/buzzcaster/buzzcaster_thumb.jpg",
    previewVideo: "media/buzzcaster/buzzcaster_preview.mp4",
    links: { code: "https://github.com/ojas-mediratta/BuzzCaster-Guitar" },
    sections: [
      { type: 'text', content: `I've played guitar for over a decade, so for my CS 3651 (Prototyping Intelligent Devices) final project I built a guitar with onboard effects.` },
      { type: 'text', content: `BuzzCaster integrates a full DSP chain directly inside the instrument. A Teensy running PJRC's real-time audio framework handles delay, reverb, chorus, and distortion, so the guitar can run effects without external pedals.` },
      { type: 'video', src: 'media/buzzcaster/buzzcaster_4.mp4', caption: 'Early circuit prototyping' },
      { type: 'text', content: `I routed the guitar body to fit the electronics, built a compact LCD + encoder interface for real-time control, and tuned the preamp to preserve pickup impedance. I also designed a dedicated battery housing and power safeguards to handle USB and power-bank edge cases.` },
      { type: 'images', items: ['media/buzzcaster/buzzcaster_6.jpg', 'media/buzzcaster/buzzcaster_7.jpg'], caption: 'Routing and laser engraving the body' },
      { type: 'text', content: `The project involved circuit prototyping, 3D-printed mounting solutions, and firmware development. The final result is a fully playable instrument and a solid embedded audio proof of concept.` },
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
    blurb: "A hand-wired 55-key keyboard with QMK firmware, USB-C, an OLED status screen, and a rotary encoder.",
    tags: ["Embedded Systems", "C++", "ATMega34U4", "Fusion360", "Rapid Prototyping"],
    area: "Embedded",
    status: "Complete",
    thumb: "media/et55/et55_thumb.jpg",
    previewVideo: "media/et55/et55_preview.mp4",
    mainVideo: "media/et55/et55_main.mp4",
    links: { code: "https://github.com/ojas-mediratta/ET55-Keyboard" },
    sections: [
      { type: 'text', content: `I've been into mechanical keyboards for years, and ET55 was my first full from-scratch build after doing several kit-based builds.` },
      { type: 'text', content: `ET55 is a 55-key, hand-wired board inspired by IBM Model F layouts, with QMK firmware, USB-C, an OLED status screen, and a rotary encoder. Building it covered the full stack: layout, wiring, firmware, and case design.` },
      { type: 'video', src: 'media/et55/et55_4.mp4', caption: 'Internals and physical design' },
      { type: 'text', content: `Building ET55 involved several key steps. First, I designed the layout and wiring schematic, ensuring that every switch was correctly placed and connected for NKRO functionality. I hand-wired each switch using diodes and copper wire, taking care to insulate connections with heat shrink tubing to prevent shorts.` },
      { type: 'images', items: ['media/et55/et55_2.jpg', 'media/et55/et55_3.jpg'], caption: 'Hand-wiring the switches and diodes' },
      { type: 'text', content: `Next, I integrated a Pro Micro (ATmega32U4) microcontroller to handle the keyboard’s logic and communication. I programmed it using QMK firmware, customizing the keymap to fit the compact layout and adding layers for additional functionality. The rotary encoder was set up to control volume and switch layers, while the OLED display provided real-time status updates.` },
      { type: 'text', content: `For the case and plate, I modeled custom parts in Fusion 360 and 3D-printed them to achieve a precise fit. This process involved several iterations to refine tolerances and ensure that the switches seated properly despite the wiring underneath.` },
      { type: 'text', content: `The final result is a compact keyboard that I use daily, and it was a strong project for applying both embedded and mechanical design skills.` },
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
    blurb: "Freelance custom mechanical keyboard design and manufacturing tailored to client requirements.",
    tags: ["Design and Manufacturing", "Fusion360", "Blender", "DFM"],
    area: "Other",
    status: "Complete",
    thumb: "media/keyboard-design/keyboard-design_thumb.jpg",
    previewVideo: "media/keyboard-design/keyboard-design_preview.mp4",
    mainVideo: "media/keyboard-design/keyboard-design_preview.mp4",
    links: { code: "https://github.com/ojas-mediratta/keyboard-design" },
    sections: [
      { type: 'text', content: `I got into custom keyboards through the enthusiast community and became interested in the engineering tradeoffs around materials, mounting styles, switches, and layouts.` },
      { type: 'images', items: ['media/keyboard-design/keyboard-design_27.jpeg', 'media/keyboard-design/keyboard-design_28.jpeg'], caption: 'My first custom prototype and my collection' },
      { type: 'text', content: `After using a few off-the-shelf customs, I decided to design my own board from scratch. I started with a design inspired by the TGR Singa Unikorn and adapted it into my own version.` },
      { type: 'text', content: `I learned CAD in Fusion 360 through tutorials and keyboard forums, then produced an early Unikorn-style prototype. After showing it at the Georgia Tech Mechanical Keyboard Club, I started getting commission requests for custom designs.` },
      { type: 'videos', items: ['media/keyboard-design/keyboard-design_6.mp4', 'media/keyboard-design/keyboard-design_15.mp4'], caption: 'Client boards in-progress' },
      { type: 'text', content: `Commissions grew from there. Clients usually came with a layout or style direction, and I translated that into manufacturable designs while maintaining PCB compatibility with available boards. Many were Unikorn-style builds, along with one-off projects like the 60% board shown above with a stainless steel weight and custom side profile.` },
      { type: 'videos', items: ['media/keyboard-design/keyboard-design_2.mp4', 'media/keyboard-design/keyboard-design_3.mp4'], caption: 'Aluminum machining for Endurance Proto v2' },
      { type: 'text', content: `What started as a personal one-off project turned into ongoing freelance collaborations that combined mechanical design, DFM constraints, and enthusiast keyboard aesthetics.`}
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
    blurb: "A Smart medicine bottle prototype with embedded sensing and dashboards for medication adherence.",
    tags: ["Embedded Systems", "C++", "ESP32", "Rapid Prototyping", "MedTech"],
    area: "Embedded",
    status: "Complete",
    thumb: "media/hackGT12/dose_thumb3.jpeg",
    previewVideo: "media/hackGT12/dose_preview.mp4",
    youtubeVideo: "8https://youtu.be/j7cSnyq9Vn8?si=D-a5kVKJLNQyEynK",
    links: { code: "https://github.com/dawsonp2003/HackGT12-Dose", link: "https://devpost.com/software/dose-ebmo9z" },
    sections: [
      { type: 'text', content: `Dose was my HackGT12 project and my first hackathon. In 36 hours, our team built a prototype focused on medication non-adherence.` },
      { type: 'text', content: `Medication non-adherence means patients miss doses or take medication incorrectly. The impact is large: estimates put avoidable U.S. healthcare costs at $100-300 billion per year, along with failed treatments, preventable hospitalizations, and lower-quality trial data.` },
      { type: 'text', content: `We built Dose as a smart pill bottle with embedded sensing and dashboard reporting. The system helps patients stay on schedule while giving clinicians and researchers clearer adherence data.` }, 
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
    blurb: "A computer vision system for truck-driver fatigue detection with live fleet dashboard streaming.",
    tags: ["AI/ML", "React", "Typescript", "OpenCV", "Mediapipe", "Snowflake API"],
    area: "AI/ML",
    thumb: "media/ai-atl25/lucid_thumb.png",
    youtubeVideo: "https://youtu.be/AiMx3mfucmc",
    previewVideo: "media/ai-atl25/lucid_preview.mp4",
    links: { code: "https://github.com/amukker15/GTAI", link: "https://devpost.com/software/lucid-nijx3r"},
    sections: [
      { type: 'text', content: `Lucid was my second hackathon project, built for AI ATL, where we won a Snowflake sponsor track.` },
      { type: 'text', content: `We built Lucid as a computer vision system for real-time truck-driver fatigue monitoring. It detects cues like blinking, yawning, and head nodding, then streams driver-level fatigue data through Snowflake to a live fleet dashboard.` },
      { type: 'text', content: `I focused on hardware packaging and frontend work. I designed and printed the phone enclosure for cameras and sensors, iterated through multiple print revisions, and built parts of the React dashboard and mobile port.` },
      { type: 'text', content: `I also jumped in on some backend work, helping connect the API to Snowflake and shape how the data was stored and streamed to the frontend. It was a lot of small but essential details: data schemas, validation, debugging.` },
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
