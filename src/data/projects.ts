export type ContentSection =
  | { type: 'text'; content: string }
  | { type: 'video'; src: string; caption?: string }
  | { type: 'videos'; items: string[]; caption?: string }
  | { type: 'image'; src: string; caption?: string }
  | { type: 'images'; items: string[]; caption?: string }
  | { type: 'carousel'; items: { src: string; caption?: string }[] }
  | { type: 'pdfSlides'; src: string; caption?: string; slides: { title?: string; body: string }[] }
  | { type: 'youtube'; videoId: string; caption?: string };

export type ProjectArea = "Robotics" | "Embedded" | "AI/ML" | "Other";

export type Project = {
  slug: string;
  title: string;
  blurb: string;
  tags: string[];
  hideHeroMedia?: boolean;
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
    status: "Complete",
    thumb: "media/blip-auv/blip_thumb.webp",
    previewVideo: "media/blip-auv/blip_preview.mp4",
    mainVideo: "media/blip-auv/blip_main.mp4",
    links: { link: "https://www.linkedin.com/posts/ojas-mediratta_robotics-embedded-signalprocessing-activity-7358290478351478784-0Afr?utm_source=share&utm_medium=member_desktop&rcm=ACoAADdTxJgB6uIFgkQecw_eTHt3ywpT-XIfTt8" },
    sections: [
      { type: 'text', content: `BLIP is a remotely operated underwater vehicle built for dolphin communication research. It is an addition to the [Dolphin Project](https://www.youtube.com/watch?v=Q95fxLuIa1Q) that the Wild Dolphin Project and the Contextual Computing Group at GT have been working on for several years. We've been able to test it in several pool and ocean deployments over two years, which taught me a lot about marine robotics and system integration for robots. I ended up using a bunch of what I learned here at GE Vernova, where I worked on a very similar project.` },
      { type: 'text', content: `The robot fills a very strange niche; it needs to be able to listen to dolphin sounds and respond to them in real time with movements that the dolphins can interpret. It was articulated to us as 1) an enrichment tool that can provide engaging experiences for the dolphins (they apparently lose interest during long interactions with researchers), and 2) a tool to collect audio data of the sounds dolphins make.` },
      { type: 'text', content: `This makes more sense when contextualized with the previous work on the Dolphin Project, where we use deep learning to classify vocalizations. The central idea is that dolphins appear to communicate with eachother through these sounds, and may even have a sort of "vocabulary" of sounds they use to communicate specific ideas. If we can recognize and translate their vocalizations as well as emit sounds that resemble the vocalizations they produce, we could theoretically establish shared vocabulary that enables two-way communication (most of this is way out of my wheelhouse though, and there's much more interesting reading available at [Denise Herzing's Website](https://www.wilddolphinproject.org/). The core learning-based classification and hardware foundation (the CHAT system) was developed at Georgia Tech before my involvement as part of a collaboration with Google. More details are available at [DolphinGemma](https://blog.google/innovation-and-ai/products/dolphingemma/).` },
      { type: 'text', content: `With each consecutive deployment, we learned more about the challenges of operating in the marine environment. Some important considerations were that BLIP needed to be repairable in the field (we had a lot of late nights on the boat trying to get things working), pressure tolerant (obviously), and easy to deploy by one person, so we spent a lot of time on the design with those constraints.` },
      { type: 'video', src: 'media/blip-auv/blip_1.mp4', caption: 'Early in-water trials and pool tests' },
      { type: 'text', content: `I owned parts across the software, firmware, and electrical integration of the system (along with [Dawson Pent](https://www.linkedin.com/in/dawson-pent/) who is brilliant).` },
      { type: 'video', src: 'media/blip-auv/blip_4.mp4', caption: 'Tone recognition test' },
      { type: 'text', content: `On the embedded side, I implemented control layer that linked the ESP32-based microcontroller with the Google Pixel 9. The ESP32 handled thruster control across our 4DOF system, internal peripherals and sensors, and error handling, while the Pixel ran all digital signal processing on the hydrophone stream and handled discrete PID control for the robot. I built the parts of the DSP pipeline that weren't ML based, so the puretone detection and the click tracking. Once a sound was detected, the system mapped it to interactive behaviors so the robot could respond in a way that fit the rhythm of dolphin communication. This makes it a unique ROV since it's remotely controlled by much lower frequency sound than is conventional for marine robots (those are usually in the inaudible range for humans).` },
      { type: 'text', content: `A lot of my time also went into the internal electronics. As the robot's enclosure changed through different iterations, I handled the sensor stack, power distribution, wiring architecture, bi-directional communication links, and the integration work.` },
      { type: 'video', src: 'media/blip-auv/blip_12.mp4', caption: 'Early PID tuning in water' },
      { type: 'text', content: `Working across software, firmware, and hardware was definitely a trial by fire, but it pushed me to become a stronger generalist who can work effectivey end-to-end.` },
    ],
    gallery: [
      "media/blip-auv/blip_2.webp",
      "media/blip-auv/blip_3.webp",
      "media/blip-auv/blip_5.webp",
      "media/blip-auv/blip_6.webp",
      "media/blip-auv/blip_7.webp",
      "media/blip-auv/blip_8.webp",
      "media/blip-auv/blip_9.webp",
      "media/blip-auv/blip_10.webp",
      "media/blip-auv/blip_11.webp"]
  },
  {
    slug: "tactile-sensing",
    title: "WT-UMI: Tactile Sensing for Whole-Body Manipulation and Collaborative Tasks",
    blurb: "Hardware design for research in tactile sensing for whole-body manipulation and human-robot collaborative tasks.",
    tags: ["Robotics", "C++", "Fusion360", "KiCAD", "Python"],
    area: "Robotics",
    status: "Complete",
    thumb: "media/tactile-sensing/g1_thumbnail.png",
    previewVideo: "media/tactile-sensing/bucket-demo_activation.mp4",
    mainVideo: "media/tactile-sensing/yoga_ball_cropped.mp4",
    links: { link: "https://wt-umi.github.io/WTUMI/", paper: ""},
    sections: [
      { type: 'text', content: `At Georgia Tech's LIDAR Lab, I worked on the design team for a project that explored how tactile sensing could enhance the capabilities of humanoid robots in whole-body manipulation and collaborative tasks. The robot is trained on whole-body manipulation of bulky objects and collaborative locomotion tasks, like pushing a rolling table or carrying long objects with a person. From what I gather, the research team was using this approach as a part of work on diffusion based control policies, which generate action tokens or trajectories in a receding horizon loop.` },
      { type: 'text', content: `My focus is hardware systems integration and tactile sensor design. Our data collection approach falls within the UMI framework, which basically means that data is collected in a way that makes the human demonstrating the task resemble the platform that will be used for inference. This is in contrast to teleoperation based data-collection approaches like direct puppeteering or motion controls for end effector position (We did some motion controller based teleop as well, but as becomes apparent quickly, the IK solver there needs to be well designed for it to work properly). In our case, this UMI looked like several wearable mounts for the tactile sensors, which were then transferred to the robot for evals. Our hope was that this would make the data we collected more representative of the distribution we expect at inference time.` },
      { type: 'videos', items: ['media/tactile-sensing/data_gathering_ball.mp4', 'media/tactile-sensing/data_gathering_beam.mp4'], caption: 'Training data collection with handheld palm end effectors (ball task) and collaborative beam transport.' },
      { type: 'text', content: `When we collect demos, we keep the sensor layout and logging pipeline as close to the robot setup as possible.` },
      { type: 'images', items: ['media/tactile-sensing/data_streaming.webm', 'media/tactile-sensing/g1_with_sensors.webp'], caption: 'Foxglove interface streaming synchronized camera and force sensor data alongside the Unitree G1 sensor setup.' },
      { type: 'text', content: `The tactile array is based on [3D-ViTac](https://binghao-huang.github.io/3D-ViTac/). The design here uses velostat as a piezoresistive layer, compressed between two polyamide layers which are a substrate for conductive traces. One layer is routed in rows and the other in columns, allowing the array to be scanned so pressure at each cell shows up as a measurable resistance change. The chest sensor is an aftermarket Touchtronix 187X (17 x 11 taxels), which I believe works in a similar manner.` },
      { type: 'videos', items: ['media/tactile-sensing/assembling_forearm.mp4', 'media/tactile-sensing/forearm_sensor_testing.mp4'], caption: 'Forearm sensor assembly and functionality testing.' },
      { type: 'text', content: `The mounting hardware was the second part of the design. The mounts had to be worn by a person during data collection, then fit the Unitree G1 in nearly the same position so there isn't too much of a difference between our collected distribution and what the robot sees during evals. I iterated through multiple prototypes for the chest, forearms, and palms, and tested attachment approaches like binder clips and low-profile brackets with screws to avoid adhesives that could damage the sensors. The palm mounts also needed Pico controller mounting points because we use Pico VR controllers for capturing end effector position.` },
      { type: 'images', items: ['media/tactile-sensing/forearm sensors.webp', 'media/tactile-sensing/forearm_gelpad.webp'], caption: 'Gel pad layer (5N to ~15N usable range).' },
      { type: 'text', content: `I also updated the sensor pipeline to reduce noise and calibrate each sensor so tactile activation maps to real force values, which helped with drift that we were seeing with our measurements.` },
      {
        type: 'carousel',
        items: [
          { src: 'media/tactile-sensing/sensor_kicad.webp', caption: 'Sensor routing and layout in KiCad.' },
          { src: 'media/tactile-sensing/stackup_3d_viewer2.webp', caption: 'Stackup render from the KiCad model.' },
          { src: 'media/tactile-sensing/sensor_real1.webp', caption: 'Fabricated tactile array after assembly.' },
          { src: 'media/tactile-sensing/sensor_real2.webp', caption: 'Assembled array ready for data collection.' },
          { src: 'media/tactile-sensing/chest_mount_print.webp', caption: 'Chest mount print-in-place test on the bed.' },
          { src: 'media/tactile-sensing/chest_mount.webp', caption: 'Chest mount CAD model.' },
          { src: 'media/tactile-sensing/chest_plate.webp', caption: 'Chest plate hardware with straps for human wear.' },
        ],
      },
      { type: 'text', content: `Early on, we explored dextrous grippers with tactile sensing built in. The one in the video is the Inspire hand, which had a similar looking output as the final design in that it produced an activation map of taxels.` },
      { type: 'video', src: 'media/tactile-sensing/lipobattery-grip-trial.mp4', caption: 'Early dextrous gripper sensing test.' },
    ],
    gallery: []
  },
  {
    slug: "mine-track",
    title: "MineTrack: Learning-Based Visual Odometry from Minecraft Gameplay",
    blurb: "Using Minecraft gameplay as synthetic data for learning-based visual odometry and dead reckoning.",
    tags: ["AI/ML", "Python", "Pytorch", "Machine Learning", "Computer Vision"],
    area: ["AI/ML"],
    status: "Complete",
    thumb: "media/mine-track/mine-track_thumb.webp",
    previewVideo: "media/mine-track/mine-track_preview.mp4",
    fitPreviewVideo: true,
    mainVideo: "media/mine-track/mine-track_preview.mp4",
    links: {link: "https://ojas-mediratta.github.io/Minetrack-Website/index.html", code: "https://github.com/ojas-mediratta/Minetrack-Project.git" },
    sections: [
      { type: 'text', content: `MineTrack is a machine learning course project on vision-based motion estimation. It combines unsupervised representation learning with supervised regression, using Minecraft gameplay as a source of synthetic data.`},
      { type: 'text', content: `You can see more on the [project website](https://ojas-mediratta.github.io/Minetrack-Website/index.html) and [repo](https://github.com/ojas-mediratta/Minetrack-Project).` },
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
    thumb: "media/advanced-mobile-robotics/advanced-mobile-robotics_thumb.webp",
    previewVideo: "media/advanced-mobile-robotics/advanced-mobile-robotics_6.mp4",
    mainVideo: "media/advanced-mobile-robotics/advanced-mobile-robotics_preview.mp4",
    links: { code: "https://github.com/ojas-mediratta/Advanced-Mobile-Robotics.git" },
    sections: [
    { type: 'text', content: `These are my projects from Georgia Tech's Advanced Mobile Robotics course (CS 8803 AMR). The course is split into 'Swim', 'Walk', 'Drive', and 'Fly', using GTSAM in Python and Webots for estimation and control.` },
    { type: 'text', content: `For 'Swim', I had to write a state estimator for an underwater ROV in Webots. I used GTSAM's NavStateImuEKF package to implement an EKF that combined IMU data with position, depth, and range measurements to estimate where the robot was.` },
    { type: 'text', content: `I also had to write a controller to get the robot to follow a desired trajectory. I used a proportional controller and split it into four channels: XY-plane distance error for forward thrust, depth error for vertical control, yaw error for heading, and roll error for stabilization. I had to be careful with angle wrapping here, mapping yaw and roll errors to [-π, π) so crossing that boundary wouldn't cause a sudden jump in the control command. From there, I tuned the gains until the robot followed the trajectory without too much oscillation.` },
    { type: 'images', items: ['media/advanced-mobile-robotics/advanced-mobile-robotics_1.webp', 'media/advanced-mobile-robotics/advanced-mobile-robotics_2.mp4'], caption: 'Autonomous trajectory following and tracking error over time' },
    { type: 'text', content: `The state estimate lives in SE(3), so this was also my introduction to nonlinear filtering on Lie groups. Getting used to GTSAM took some time, especially working out how to combine measurements from different sensors and account for their uncertainty.` },
    { type: 'text', content: `The 'Walk' project covered legged locomotion with Boston Dynamics' Spot, including forward and inverse kinematics and probabilistic roadmaps.` },
    { type: 'text', content: `For a single Spot leg, I used the Product of Exponentials formulation to build the forward kinematics from body-frame screw axes. I then computed the body Jacobian using adjoint transformations and used it in a gradient descent IK solver. I gave position accuracy more weight than orientation accuracy. In Webots, the solver converged quickly to the target leg position.` },
    { type: 'video', src: 'media/advanced-mobile-robotics/advanced-mobile-robotics_preview.mp4', caption: 'Spot leg inverse kinematics demo' },
    { type: 'text', content: `For 'Drive', I worked on pose-graph SLAM using wheel encoder odometry, ICP scan matching, and GTSAM factor graphs. I first combined odometry with ICP loop closures for one robot, then added inter-robot range factors to merge multiple robots' trajectories into a shared map.` },
    { type: 'text', content: `Getting scans to line up locally didn't necessarily mean the whole map was right. ICP could converge to the wrong alignment if the initial guess was poor. I also saw this in the Robotarium runs: parts of the map could look sharp even when the merged graph was tilted or didn't have enough constraints.` },
    { type: 'images', items: ['media/advanced-mobile-robotics/advanced-mobile-robotics_5.webp', 'media/advanced-mobile-robotics/advanced-mobile-robotics_6.mp4'], caption: 'Results from the Robotarium experiment.' },
    { type: 'text', content: `For 'Fly', I built a 3D LiDAR-inertial SLAM pipeline using a drone dataset.` },
    { type: 'text', content: `I used IMU preintegration, IMU factors, and bias random-walk factors in GTSAM. Scan registration gave me relative motion estimates from the LiDAR, which I added to the same graph. I tried both full batch optimization with Levenberg-Marquardt and incremental optimization with iSAM2.` },
    { type: 'text', content: `I added loop closures by looking for places the drone had visited before and adding LiDAR constraints when the scans matched. To build the map, I transformed each keyframe's point cloud into the world frame and combined the clouds.` },
    {
      type: 'carousel',
      items: [
        {
          src: 'media/advanced-mobile-robotics/advanced-mobile-robotics_7.webp',
          caption: 'Trajectory with batch LiDAR-inertial odometry.',
        },
        {
          src: 'media/advanced-mobile-robotics/advanced-mobile-robotics_8.webp',
          caption: 'Trajectory with iSAM2 LiDAR-inertial odometry.',
        },
        {
          src: 'media/advanced-mobile-robotics/advanced-mobile-robotics_9.webp',
          caption: 'Batch optimization with and without IMU preintegration.',
        },
        {
          src: 'media/advanced-mobile-robotics/advanced-mobile-robotics_10.webp',
          caption: 'Optimization timing comparison between batch and iSAM2.',
        },
        {
          src: 'media/advanced-mobile-robotics/advanced-mobile-robotics_11.webp',
          caption: 'Point cloud map from the UCLA dataset.',
        },
      ],
    },
    ],
    gallery: []
  },
  {
    slug: "quantum-in-the-loop",
    title: "Quantum-in-the-Loop Control: MPC Optimization Using QAOA for Robotics",
    blurb: "Quantum computing course project exploring quantum-assisted optimization for robotic control.",
    tags: ["Quantum Computing", "Robotics","Python", "Qiskit", "Control Systems"],
    hideHeroMedia: true,
    area: "Other",
    status: "Complete",
    thumb: "media/quantum-in-the-loop/quantum-in-the-loop_thumb.webp",
    previewVideo: "media/quantum-in-the-loop/quantum-in-the-loop_preview.mp4",
    links: {code: "https://github.com/ojas-mediratta/quantum-in-the-loop-MPC.git", paper: "media/quantum-in-the-loop/ECE_8803_QDH_Final_Report.pdf" },
    sections: [
      {
        type: 'pdfSlides',
        src: 'media/quantum-in-the-loop/quantum-in-the-loop_slides.pdf',
        caption: 'Slide deck viewer (loops through all pages)',
        slides: [
          {
            title: 'Introduction',
            body: `For this project, I looked at whether the optimization step in a robot controller could be handled by a quantum processor. MPC, trajectory optimization, and combinatorial planning all involve solving optimization problems, sometimes repeatedly within the control loop. As those problems get larger, the solve time can become a constraint. I used MPC as a small example to work through how that optimization problem could be written for a quantum solver. The rest of the controller stays classical.`
          },
          {
            title: 'What is QAOA?',
            body: String.raw`QAOA is an approximate solver for combinatorial optimization problems. I used it after rewriting a discretized MPC problem as a QUBO (quadratic unconstrained binary optimization problem), then mapping that to an Ising Hamiltonian.

            The circuit alternates between a cost Hamiltonian and a mixer Hamiltonian. A classical optimizer tunes the parameters of those steps, with the aim of making low-cost bitstrings more likely when the circuit is measured.

            $$
            \lvert \psi(\boldsymbol{\gamma},\boldsymbol{\beta}) \rangle =
            \left(\prod_{\ell=1}^{p} e^{-i \beta_{\ell} H_M} e^{-i \gamma_{\ell} H_C}\right)
            \lvert + \rangle^{\otimes n}
            $$

            The starting state, $\lvert + \rangle^{\otimes n}$, is an equal superposition over the bitstrings represented by the $n$ qubits. The cost Hamiltonian $H_C$ assigns lower energy to better control sequences. The mixer $H_M$, usually something like $\sum_i X_i$, moves amplitude between basis states.

            The parameters $\gamma_\ell$ and $\beta_\ell$ control the cost and mixer steps. The product in the equation means we repeat those steps $p$ times. Increasing $p$ can improve the approximation, but it also means a deeper circuit, which is harder to run reliably on noisy hardware.

            The cost step applies phases based on the objective; it doesn't directly reduce the cost like a classical gradient descent step. The mixer lets those phases interfere. The hope is that this makes good solutions more likely to be measured.`
          },
          {
            title: 'What is MPC?',
            body: String.raw`MPC uses a model of the system to predict what will happen over the next few timesteps. It solves for a sequence of control inputs, applies the first one, then solves again using the next measurement. This is the receding horizon loop.

            The variables are usually the future inputs $u_0, u_1, \ldots, u_{N-1}$. The model determines the corresponding state trajectory. Planning a whole sequence lets the controller account for the effect an action will have later, while solving again at each step lets it respond to new measurements and disturbances.

            The horizon $N$ controls how far ahead the controller looks. A longer horizon gives it more foresight but makes the optimization larger. Dynamics, actuator limits, and other constraints can all be included in the problem.

            For this project, I only reformulated that optimization step. The sensing, dynamics model, and the rest of the control loop stay classical.`
          },
          {
            title: 'Robotics Example',
            body: String.raw`I used a 1D point robot to keep the example manageable. Its state is position and velocity, and its control input is acceleration. I limited that input to three choices: decelerate, coast, or accelerate.

            The state is $x_k = \begin{bmatrix} p_k \\ v_k \end{bmatrix}$. The dynamics are $p_{k+1} = p_k + \Delta t \, v_k$ and $v_{k+1} = v_k + \Delta t \, a_k$. Velocity needs to be part of the state because position alone doesn't tell us how the robot will move at the next step.

            With $a_k \in \{-1, 0, 1\}$, the controller chooses one of three actions at each of the $N$ steps in the horizon. Discretizing the input this way makes it possible to encode the choices with binary variables.

            The objective is to reach the target while limiting control effort and following the dynamics. An effort term can penalize acceleration with $\sum_k a_k^2$. A more detailed model could also include velocity bounds, workspace limits, or obstacles, but I kept this example small so I could work through the encoding.`
          },
          {
            title: 'From MPC to QAOA',
            body: String.raw`I assigned three binary variables to each timestep, one for each acceleration choice. Exactly one should be active. The acceleration is then $a_k = -z_{(k,-1)} + z_{(k,+1)}$: selecting decelerate gives $-1$, coast gives $0$, and accelerate gives $+1$.

            Once the control inputs are written this way, I can also write the predicted trajectory and the MPC objective in terms of the binary vector $z$. The $J_{MPC}(z)$ term on the slide is that rewritten objective. The terms after $\lambda$ penalize violations of the one-hot constraint.

            Expanding those terms gives the QUBO form:

            $$\min_{z \in \{0,1\}^m} z^T H z + g^T z + c$$

            Here, $H$ holds the quadratic terms, $g$ holds the linear terms, and $c$ is a constant. The one-hot constraints are included as penalties because QUBO doesn't handle them separately.

            I then substitute $z_i = (1-s_i)/2$, where $s_i \in \{-1,+1\}$, to get the Ising form. This becomes the cost Hamiltonian $\hat{H}_c = \sum_i h_i Z_i + \sum_{i<j} J_{ij} Z_i Z_j$ used by QAOA. Low-cost control sequences correspond to low-energy states, which are the states we want to measure more often.`
          },
          {
            title: 'Performance Comparison Using Qiskit',
            body: `On this small problem, QAOA found the same optimal control sequence as the exact classical methods. That was a useful check that the binary encoding, QUBO construction, and Ising mapping were consistent with the discretized MPC problem.

            It also took much longer. Circuit preparation, repeated cost evaluations, and classical parameter tuning all add overhead. For an instance this small, brute force or an exact classical QUBO solver was more practical.

            I treated this as a proof of concept for the formulation. It recovered the solution, but the runtime didn't make a case for using it in a real-time controller.`
          },
          {
            title: 'Limitations and Future Work',
            body: `Running this kind of controller would require more than a working reformulation. The quantum processor, its support electronics, and the environment around it all place constraints on the system.

            One area I looked at was fault-tolerant hardware, including IBM's Starling target. More reliable logical qubits and lower error-correction overhead could make larger QAOA problems more feasible. Noisy devices limit the circuit depth and reliability we can work with.

            I also looked at actuation near sensitive quantum hardware. Conventional high-current actuators may cause problems there. Piezoelectric actuators are interesting because of their low electromagnetic interference; the presentation also discusses NASA's cryogenic actuator work and early superconducting-material actuator concepts for robotics.

            There is also the classical support hardware for control, readout, and feedback. Cryo-CMOS and tighter classical-quantum integration, including work by IBM and others, could help with that part of the system and its latency.

            These are possible directions for specialized hybrid systems. My example doesn't establish that they would make quantum optimization practical for real-time robotic control.`
          }
        ]
      }
    ],
  },
  {
    slug: "turtlebot3-ros2",
    title: "ROS2 Perception, Planning, and Control Experiments with TurtleBot3",
    blurb: "ROS2 experiments on TurtleBot3 covering perception, SLAM, navigation, and control.",
    tags: ["Robotics", "AI/ML", "Python", "ROS2", "OpenCV", "Gazebo"],
    area: "Robotics",
    status: "Complete",
    thumb: "media/turtlebot3/turtlebot3_thumb.webp",
    previewVideo: "media/turtlebot3/turtlebot3_preview.mp4",
    mainVideo: "media/turtlebot3/turtlebot3_preview.mp4",
    links: { code: "https://github.com/ojas-mediratta/turtlebot3-ros2" },
    sections: [
      { type: 'text', content: `I used TurtleBot3 to learn ROS 2 and work through perception, localization, and control. I wrote nodes that I could test in simulation and then run on the physical robot.` },
      { type: 'text', content: `I started with a Python script that used OpenCV to detect and track colored objects, then moved it into ROS 2 so it could publish processed images and target coordinates. Once that was working, I wrote a node that turned the target coordinates into twist commands using a proportional controller. I later added a PID controller that used both the camera and LiDAR, so the robot could follow a moving target while staying aligned and keeping some distance from it.` },
      { type: 'videos', items: ['media/turtlebot3/turtlebot3_1.mp4', 'media/turtlebot3/turtlebot3_3.mp4'], caption: 'OpenCV tracking demo with port to ROS2' },
      { type: 'text', content: `Next, I wrote a Go-to-Goal controller using odometry and LiDAR for obstacle avoidance. It used obstacle vectors to adjust its velocity commands while moving toward a goal position. The video below shows it navigating around obstacles.` },
      { type: 'video', src: 'media/turtlebot3/turtlebot3_4.mp4', caption: 'Waypoint navigation with obstacle avoidance' },
      { type: 'text', content: `I then used Nav2 for mapping, localization, and navigation. I set up AMCL for pose estimation and tuned the costmaps and controller to get through narrow hallways without drifting or oscillating. I also wrote a node that published sequential waypoints to /goal_pose so the robot could follow a longer route. I tested this in Gazebo's maze world before running it on the physical TurtleBot3, where it worked pretty well.` },
      { type: 'text', content: `The final task was a maze with signs at the intersections. The robot had to recognize each sign and use it to decide where to go. We tried a few image classifiers, including some deep learning models that turned out to be too big for the TurtleBot3's onboard compute. We ended up using an SVM, which was small enough to run on the robot and classified the signs well. It finished the course with one misclassification.` },
      { type: 'videos', items: ['media/turtlebot3/turtlebot3_5.mp4', 'media/turtlebot3/turtlebot3_preview.mp4'], caption: 'Localization and sign-based maze navigation demos' },
      { type: 'text', content: `This was where I got comfortable writing ROS 2 nodes and testing them on a robot. The code and the rest of the experiments are in the linked GitHub repo.` },
    ]
  },
  {
    slug: "buzzcaster-guitar",
    title: "BuzzCaster: Gig-Ready, Teensy-Powered Guitar Effects",
    blurb: "A custom electric guitar with built-in Teensy 4.1 DSP effects, LCD UI, and onboard controls.",
    tags: ["Embedded Systems", "C++", "Teensy 4.1", "Arduino", "Rapid Prototyping", "Audio DSP"],
    area: "Embedded",
    status: "Complete",
    thumb: "media/buzzcaster/buzzcaster_thumb.webp",
    previewVideo: "media/buzzcaster/buzzcaster_preview.mp4",
    links: { code: "https://github.com/ojas-mediratta/BuzzCaster-Guitar" },
    sections: [
      { type: 'text', content: `I've played guitar for over a decade, so for my CS 3651 (Prototyping Intelligent Devices) final project I built a guitar with onboard effects.` },
      { type: 'text', content: `The effects run on a Teensy using PJRC's real-time audio framework. It handles delay, reverb, chorus, and distortion inside the guitar, so I can use them without plugging into separate pedals.` },
      { type: 'video', src: 'media/buzzcaster/buzzcaster_4.mp4', caption: 'Early circuit prototyping' },
      { type: 'text', content: `I routed out space in the guitar body for the electronics and added an LCD and encoder to adjust the effects. I also tuned the preamp with the pickup impedance in mind. Power needed some attention as well: I designed a battery housing and added safeguards for the USB and power-bank edge cases.` },
      { type: 'images', items: ['media/buzzcaster/buzzcaster_6.webp', 'media/buzzcaster/buzzcaster_7.webp'], caption: 'Routing and laser engraving the body' },
      { type: 'text', content: `I prototyped the circuits, printed the mounts, and wrote the firmware. By the end, I had a playable guitar with the effects running onboard.` },
      { type: 'text', content: `The repo README has the schematics, firmware, and more of the build notes.` },
    ],
    gallery: [
      "media/buzzcaster/buzzcaster_1.webp",
      "media/buzzcaster/buzzcaster_2.webp",
      "media/buzzcaster/buzzcaster_3.webp",
      "media/buzzcaster/buzzcaster_5.webp",
      "media/buzzcaster/buzzcaster_6.webp",
      "media/buzzcaster/buzzcaster_7.webp",
      "media/buzzcaster/buzzcaster_8.webp",
      "media/buzzcaster/buzzcaster_9.webp",
      "media/buzzcaster/buzzcaster_10.webp",
      "media/buzzcaster/buzzcaster_11.webp",]
  },
  {
    slug: "et55-keyboard",
    title: "ET55: A Custom 55-key, Hand-Wired Mechanical Keyboard.",
    blurb: "A hand-wired 55-key keyboard with QMK firmware, USB-C, an OLED status screen, and a rotary encoder.",
    tags: ["Embedded Systems", "C++", "ATMega34U4", "Fusion360", "Rapid Prototyping"],
    area: "Embedded",
    status: "Complete",
    thumb: "media/et55/et55_thumb.webp",
    previewVideo: "media/et55/et55_preview.mp4",
    mainVideo: "media/et55/et55_main.mp4",
    links: { code: "https://github.com/ojas-mediratta/ET55-Keyboard" },
    sections: [
      { type: 'text', content: `I've been into mechanical keyboards for years. After putting together several kits, I wanted to try designing one from scratch, which became ET55.` },
      { type: 'text', content: `It's a 55-key, hand-wired board inspired by IBM Model F layouts. It runs QMK and has USB-C, an OLED status screen, and a rotary encoder. I designed the layout, wiring, firmware configuration, and case.` },
      { type: 'video', src: 'media/et55/et55_4.mp4', caption: 'Internals and physical design' },
      { type: 'text', content: `I started with the layout and wiring schematic, then hand-wired the switches with diodes and copper wire. The wiring supports NKRO, so the board can register multiple simultaneous keypresses. I used heat shrink tubing to insulate the connections and avoid shorts.` },
      { type: 'images', items: ['media/et55/et55_2.webp', 'media/et55/et55_3.webp'], caption: 'Hand-wiring the switches and diodes' },
      { type: 'text', content: `A Pro Micro with an ATmega32U4 handles the keyboard logic and USB communication. I configured QMK with a keymap for the compact layout and extra layers for the keys that didn't have a dedicated switch. The encoder controls volume and switches layers, and the OLED shows the current status.` },
      { type: 'text', content: `I modeled the case and plate in Fusion 360 and 3D-printed them. It took a few iterations to get the tolerances right so the switches would seat properly with the wiring underneath.` },
    ],
    gallery: [
      "media/et55/et55_1.webp",
      "media/et55/et55_2.webp",
      "media/et55/et55_3.webp",
    ]
  },
  {
    slug: "keyboard-design",
    title: "Freelance Custom Mechanical Keyboard Design and Manufacturing",
    blurb: "Freelance custom mechanical keyboard design and manufacturing tailored to client requirements.",
    tags: ["Design and Manufacturing", "Fusion360", "Blender", "DFM"],
    area: "Other",
    status: "Complete",
    thumb: "media/keyboard-design/keyboard-design_thumb.webp",
    previewVideo: "media/keyboard-design/keyboard-design_preview.mp4",
    mainVideo: "media/keyboard-design/keyboard-design_preview.mp4",
    links: { code: "https://github.com/ojas-mediratta/keyboard-design" },
    sections: [
      { type: 'text', content: `I got into custom keyboards through the enthusiast community. I became interested in how the materials, mounting style, switches, and layout changed the design of a board.` },
      { type: 'images', items: ['media/keyboard-design/keyboard-design_27.webp', 'media/keyboard-design/keyboard-design_28.webp'], caption: 'My first custom prototype and my collection' },
      { type: 'text', content: `After using a few off-the-shelf customs, I wanted to design my own. I started with the TGR Singa Unikorn as a reference and made my own version.` },
      { type: 'text', content: `I learned Fusion 360 through tutorials and keyboard forums, then made an early Unikorn-style prototype. After I showed it at the Georgia Tech Mechanical Keyboard Club, people started asking me to design boards for them.` },
      { type: 'videos', items: ['media/keyboard-design/keyboard-design_6.mp4', 'media/keyboard-design/keyboard-design_15.mp4'], caption: 'Client boards in-progress' },
      { type: 'text', content: `Clients usually had a layout or a style in mind. My job was to turn that into something that could be manufactured and would fit an available PCB. A lot of the commissions were Unikorn-style boards, but there were also one-off designs, like the 60% board above with a stainless steel weight and a custom side profile.` },
      { type: 'videos', items: ['media/keyboard-design/keyboard-design_2.mp4', 'media/keyboard-design/keyboard-design_3.mp4'], caption: 'Aluminum machining for Endurance Proto v2' },
      { type: 'text', content: `That first board led to more freelance work. I spent a lot of it working out how to make the designs fit the manufacturing constraints while keeping the look the client wanted.`}
    ],
    gallery: [
      "media/keyboard-design/keyboard-design_5.webp",
      "media/keyboard-design/keyboard-design_7.webp",
      "media/keyboard-design/keyboard-design_8.webp",
      "media/keyboard-design/keyboard-design_9.mp4",
      "media/keyboard-design/keyboard-design_10.webp",
      "media/keyboard-design/keyboard-design_11.webp",
      "media/keyboard-design/keyboard-design_12.webp",
      "media/keyboard-design/keyboard-design_13.webp",
      "media/keyboard-design/keyboard-design_14.webp",
      "media/keyboard-design/keyboard-design_16.mp4",
      "media/keyboard-design/keyboard-design_17.webp",
      "media/keyboard-design/keyboard-design_18.webp",
      "media/keyboard-design/keyboard-design_19.webp",
      "media/keyboard-design/keyboard-design_20.webp",
      "media/keyboard-design/keyboard-design_21.webp",
      "media/keyboard-design/keyboard-design_22.webp",
      "media/keyboard-design/keyboard-design_23.webp",
      "media/keyboard-design/keyboard-design_24.webp",
      "media/keyboard-design/keyboard-design_25.webp",
      "media/keyboard-design/keyboard-design_26.webp",
      "media/keyboard-design/keyboard-design_29.webp",
    ]
  },
   {
    slug: "hackGT12",
    title: "Dose: Modern care in a bottle [HackGT 12 Best Overall Winner]",
    blurb: "A Smart medicine bottle prototype with embedded sensing and dashboards for medication adherence.",
    tags: ["Embedded Systems", "C++", "ESP32", "Rapid Prototyping", "MedTech"],
    area: "Embedded",
    status: "Complete",
    thumb: "media/hackGT12/dose_thumb3.webp",
    previewVideo: "media/hackGT12/dose_preview.mp4",
    youtubeVideo: "8https://youtu.be/j7cSnyq9Vn8?si=D-a5kVKJLNQyEynK",
    links: { code: "https://github.com/dawsonp2003/HackGT12-Dose", link: "https://devpost.com/software/dose-ebmo9z" },
    sections: [
      { type: 'text', content: `HackGT12 was my first hackathon. Our team spent the 36 hours building Dose, a smart pill bottle prototype for tracking medication adherence.` },
      { type: 'text', content: `Medication non-adherence means missing doses or taking medication incorrectly. It can lead to failed treatments and preventable hospitalizations, and it also makes clinical trial data less reliable. Estimates put the avoidable U.S. healthcare costs at $100–300 billion per year.` },
      { type: 'text', content: `We put sensors in the bottle and connected them to a dashboard. The idea was to help patients keep track of their doses and give clinicians and researchers a clearer record of medication adherence.` },
    ],
    gallery: [
      "media/hackGT12/dose_1.webp",
      "media/hackGT12/dose_2.webp",
      "media/hackGT12/dose_3.webp", 
      "media/hackGT12/dose_4.webp",
      "media/hackGT12/dose_5.webp",
      "media/hackGT12/dose_6.webp",
      "media/hackGT12/dose_7.webp",
      "media/hackGT12/dose_8.webp",
      "media/hackGT12/dose_9.webp",
      "media/hackGT12/dose_10.webp",
      "media/hackGT12/dose_11.webp",
      "media/hackGT12/dose_12.webp",
      "media/hackGT12/dose_13.webp",
      "media/hackGT12/dose_14.webp",
    ]
  },
  {
    slug: "ai-atl25",
    title: "Lucid: Vision That Keeps Highways Safe [AI ATL 25 Winner]",
    blurb: "A computer vision system for truck-driver fatigue detection with live fleet dashboard streaming.",
    tags: ["AI/ML", "React", "Typescript", "OpenCV", "Mediapipe", "Snowflake API"],
    area: "AI/ML",
    thumb: "media/ai-atl25/lucid_thumb.webp",
    youtubeVideo: "https://youtu.be/AiMx3mfucmc",
    previewVideo: "media/ai-atl25/lucid_preview.mp4",
    links: { code: "https://github.com/amukker15/GTAI", link: "https://devpost.com/software/lucid-nijx3r"},
    sections: [
      { type: 'text', content: `Lucid was my second hackathon project, built for AI ATL, where we won a Snowflake sponsor track.` },
      { type: 'text', content: `We used computer vision to look for signs of fatigue in truck drivers, like blinking, yawning, and head nodding. The system sends that data through Snowflake to a live fleet dashboard.` },
      { type: 'text', content: `I worked on the hardware packaging and frontend. I designed and printed the phone enclosure for the cameras and sensors, went through several print revisions, and built parts of the React dashboard and mobile port.` },
      { type: 'text', content: `I also helped connect the backend API to Snowflake and work out how to store the data and send it to the frontend. That involved data schemas, validation, and debugging the connections between them.` },
    ],
    gallery: [
      "media/ai-atl25/lucid_1.webp",
      "media/ai-atl25/lucid_2.webp",
      "media/ai-atl25/lucid_3.webp",
      "media/ai-atl25/lucid_4.webp",
      "media/ai-atl25/lucid_5.webp",
    ]
  },
];
