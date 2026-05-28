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
    status: "Active",
    thumb: "media/blip-auv/blip_thumb.webp",
    previewVideo: "media/blip-auv/blip_preview.mp4",
    mainVideo: "media/blip-auv/blip_main.mp4",
    links: { link: "https://www.linkedin.com/posts/ojas-mediratta_robotics-embedded-signalprocessing-activity-7358290478351478784-0Afr?utm_source=share&utm_medium=member_desktop&rcm=ACoAADdTxJgB6uIFgkQecw_eTHt3ywpT-XIfTt8" },
    sections: [
      { type: 'text', content: `BLIP is an autonomous and remotely operated underwater vehicle built for dolphin communication research. It began as a collaboration between the Wild Dolphin Project and Georgia Tech's Contextual Computing Group, and now serves as a field platform for testing interactive acoustic signals with dolphins. The long-term goal is to map whistle sounds to behaviors and build a usable shared vocabulary.` },
      { type: 'text', content: `A key requirement is not just producing sounds, but also understanding dolphin sounds in real time. We use deep learning to classify vocalizations onboard, then map detections to robot behaviors. The core classifier and hardware foundation (the CHAT system) was developed at Georgia Tech before my involvement as part of a collaboration with Google. More details are available at [DolphinGemma](https://blog.google/innovation-and-ai/products/dolphingemma/).` },
      { type: 'text', content: `BLIP has been through more than 15 pool trials and several ocean deployments, with each consecutive deployment giving us more data and insights. Some important considerations were that BLIP needed to be repairable in the field, pressure tolerant, and easy to deploy by one person, so we spent a lot of time on the design with those constraints.` },
      { type: 'video', src: 'media/blip-auv/blip_1.mp4', caption: 'Early in-water trials and pool tests' },
      { type: 'text', content: `I owned the entire software, firmware, and electrical integration of the system. I built some software tools to make using the robot easier for the non-technical marine biologists on the team, like the pipeline for real-time parameter tuning that they relied on during deployments. I implemented the OTA update system that let us push fixes without opening the robot, and developed the live web telemetry site that streamed robot state and acoustic detections in real time. These tools ended up being very important during field operations.` },
      { type: 'video', src: 'media/blip-auv/blip_4.mp4', caption: 'Tone recognition test' },
      { type: 'text', content: `On the embedded side, I designed and implemented the full control layer that linked an ESP32-based microcontroller with a Google Pixel 9. The ESP32 handled thruster control across four degrees of freedom, internal peripherals and sensors, and error handling, while the Pixel ran all digital signal processing on the hydrophone stream and handled discrete PID control for the robot. I built the DSP pipeline, starting with Goertzel filters and template matching, then expanding into FFT processing that fed into the learning-based classifier mentioned earlier. Once a whistle was detected, the system mapped it to interactive behaviors so the robot could respond in a way that fit the rhythm of dolphin communication.` },
      { type: 'text', content: `A lot of my time also went into the internal electronics. As the robot's enclosure changed through different iterations, I handled the sensor stack, power distribution, wiring architecture, bi-directional communication links, and the integration work that kept everything working while still fitting inside the confined pressure vessel.` },
      { type: 'video', src: 'media/blip-auv/blip_12.mp4', caption: 'Early PID tuning in water' },
      { type: 'text', content: `Working across software, firmware, and hardware let me develop skills in system integration. It also pushed me to become a stronger generalist who can keep a complex robot reliable end to end.` },
      { type: 'text', content: `BLIP is still an active research platform. Current work focuses on expanding it's acoustic "vocabulary", improving power and reliability for longer deployments, and supporting broader marine communication studies with other partners.` },

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
    status: "Active",
    thumb: "media/tactile-sensing/g1_thumbnail.png",
    previewVideo: "media/tactile-sensing/bucket-demo_activation.mp4",
    mainVideo: "media/tactile-sensing/yoga_ball_cropped.mp4",
    links: { link: "https://wt-umi.github.io/WTUMI/", paper: ""},
    sections: [
      { type: 'text', content: `At Georgia Tech's LIDAR Lab, I'm on the design team for a project that equips humanoid robots with tactile sensing as a complementary data source to vision in a diffusion-based control policy. The robot is trained on whole-body manipulation of bulky objects and collaborative locomotion tasks, like pushing a rolling table or carrying long objects with a person.` },
      { type: 'text', content: `My focus is hardware systems integration and tactile sensor design. I designed the sensor hardware and mounting systems for the Unitree G1 chest, forearms, and palms, and I built wearable mounts for human participants so the tactile signal distribution stays consistent between data collection and real-time inference.` },
      { type: 'videos', items: ['media/tactile-sensing/data_gathering_ball.mp4', 'media/tactile-sensing/data_gathering_beam.mp4'], caption: 'Training data collection with handheld palm end effectors (ball task) and collaborative beam transport.' },
      { type: 'text', content: `When we collect demos, we keep the sensor layout and logging pipeline as close to the robot setup as possible. That makes the tactile signatures line up between human data collection and G1 inference.` },
      { type: 'images', items: ['media/tactile-sensing/data_streaming.webm', 'media/tactile-sensing/g1_with_sensors.webp'], caption: 'Foxglove interface streaming synchronized camera and force sensor data alongside the Unitree G1 sensor setup.' },
      { type: 'text', content: `The tactile array is based on the [3D-ViTac](https://binghao-huang.github.io/3D-ViTac/) architecture. I use velostat as the piezoresistive layer, compressed between two polyamide electrode layers. One layer is routed in rows and the other in columns, allowing the array to be scanned so pressure at each cell shows up as a measurable resistance change. The chest sensor is a Touchtronix 187X (17 x 11 taxels), and the forearm arrays are my design at 17 x 26.` },
      { type: 'videos', items: ['media/tactile-sensing/assembling_forearm.mp4', 'media/tactile-sensing/forearm_sensor_testing.mp4'], caption: 'Forearm sensor assembly and functionality testing.' },
      { type: 'text', content: `The mounting hardware was its own project. The mounts had to be worn by a person during data collection, then fit the Unitree G1 in nearly the same pose so the model sees comparable signals at inference time. I iterated through multiple prototypes for the chest, forearms, and palms, and tested attachment approaches like binder clips and low-profile brackets with screws to avoid adhesives that could damage the sensors. The palm mounts also needed Pico controller mounting points because we use Pico VR controllers for teleoperation and pose data.` },
      { type: 'images', items: ['media/tactile-sensing/forearm sensors.webp', 'media/tactile-sensing/forearm_gelpad.webp'], caption: 'Gel pad layer (5N to ~15N usable range).' },
      { type: 'text', content: `I also updated the sensor pipeline to reduce noise and calibrate each array so tactile activation maps to real force values. That tightened repeatability across sessions and reduced drift during long demos.` },
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
      { type: 'text', content: `Early on, we explored dextrous gripper-based sensing and preliminary data collection workflows with the more dextrous Inspire hand. That work helped validate sensor readout and logging, but the project focus is now squarely on whole-body tactile coverage and robust integration for manipulation and collaborative locomotion tasks.` },
      { type: 'video', src: 'media/tactile-sensing/lipobattery-grip-trial.mp4', caption: 'Early dextrous gripper sensing test.' },
      { type: 'text', content: `Ongoing work, with a paper in progress for CoRL submission.` },
    ],
    gallery: []
  },
  {
    slug: "mine-track",
    title: "MineTrack: Learning-Based Visual Odometry from Minecraft Gameplay",
    blurb: "Using Minecraft gameplay as synthetic data for learning-based visual odometry and pose estimation.",
    tags: ["AI/ML", "Python", "Pytorch", "Machine Learning", "Computer Vision"],
    area: ["AI/ML"],
    status: "Complete",
    thumb: "media/mine-track/mine-track_thumb.webp",
    previewVideo: "media/mine-track/mine-track_preview.mp4",
    fitPreviewVideo: true,
    mainVideo: "media/mine-track/mine-track_preview.mp4",
    links: {link: "https://ojas-mediratta.github.io/Minetrack-Website/index.html", code: "https://github.com/ojas-mediratta/Minetrack-Project.git" },
    sections: [
      { type: 'text', content: `MineTrack is a machine learning course project on vision-based motion estimation. It combines unsupervised representation learning with supervised regression, using Minecraft gameplay as synthetic data with paired video frames and ground-truth pose labels.`},
      { type: 'text', content: `Further details, experiments, and results can be viewed on the project [website](https://ojas-mediratta.github.io/Minetrack-Website/index.html) and [repo](https://github.com/ojas-mediratta/Minetrack-Project).` },
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
    { type: 'text', content: `This project tracks my work in Georgia Tech's Advanced Mobile Robotics course (CS 8803 AMR). The course is split into four projects: 'Swim', 'Walk', 'Drive', and 'Fly'. Each uses GTSAM (Python) and Webots for estimation and control.` },
    { type: 'text', content: `First, I worked on 'Swim', which mostly focused on state estimation and control for an underwater ROV in the Webots simulator. I implemented an EKF using GTSAM's NavStateImuEKF package to fuse IMU data with position, depth, and range measurements for real-time localization.` },
    { type: 'text', content: `I also had to build autonomous control functionality. I built a proportional controller that tracks desired trajectories. I broke it into four independent control channels: XY-plane distance error for forward thrust, depth error for vertical control, yaw error for heading, and roll error for stabilization. The key challenge was handling angle wrapping correctly — yaw and roll errors had to be mapped to [-π, π) to avoid discontinuities. I tuned the gains empirically until the robot tracked smoothly without too much oscillation.` },
    { type: 'images', items: ['media/advanced-mobile-robotics/advanced-mobile-robotics_1.webp', 'media/advanced-mobile-robotics/advanced-mobile-robotics_2.mp4'], caption: 'Autonomous trajectory following and tracking error over time' },
    { type: 'text', content: `This project gave me solid experience with nonlinear filtering on Lie groups (the state lives in SE(3)) and sensor fusion with heterogeneous measurements. Working with GTSAM's factor graph library had a learning curve but was useful for understanding how to handle uncertainty with estimation.` },
    { type: 'text', content: `I then moved to the 'Walk' project, which focuses on legged locomotion and control for Boston Dynamics' Spot quadruped, including forward and inverse kinematics and probabilistic roadmaps.` },
    { type: 'text', content: `Following the introduction to legged locomotion for Boston Dynamics' Spot quadruped, I implemented a Product of Exponentials (POE) based inverse kinematics controller for a single Spot leg. This involved building forward kinematics using body-frame screw axes, computing the body Jacobian through adjoint transformations, and developing a gradient descent IK solver that prioritizes translational accuracy over orientation. I validated the controller in Webots simulation and it performed well with a quick convergence.` },
    { type: 'video', src: 'media/advanced-mobile-robotics/advanced-mobile-robotics_preview.mp4', caption: 'Spot leg inverse kinematics demo' },
    { type: 'text', content: `I then moved into the 'Drive' project, which focused on pose-graph SLAM. I built a full pipeline around wheel encoder odometry, ICP scan matching, and GTSAM factor graphs. The single-robot version combined odometry with ICP loop closures, and the multi-robot version added inter-robot range factors so separate trajectories could be merged into one map.` },
    { type: 'text', content: `The most useful lesson from this part of the course was how much global consistency matters. ICP could look good locally and still converge to the wrong answer without a strong initial guess, while the Robotarium runs made it obvious that a map can look sharp in places but still be globally worse if the merged graph is tilted or weakly constrained.` },
    { type: 'images', items: ['media/advanced-mobile-robotics/advanced-mobile-robotics_5.webp', 'media/advanced-mobile-robotics/advanced-mobile-robotics_6.mp4'], caption: 'Results from the Robotarium experiment.' },
    { type: 'text', content: `In the 'Fly' project, I built a 3D LiDAR-Inertial SLAM pipeline for a drone dataset.` },
    { type: 'text', content: `I fused IMU and LiDAR in GTSAM using IMU preintegration, IMU factors, and bias random-walk factors. I used scan registration to estimate relative LiDAR motion, then added those constraints to the graph. I implemented both backends: full batch optimization (Levenberg-Marquardt) and incremental optimization (iSAM2).` },
    { type: 'text', content: `I also added loop closure by finding revisit candidates and inserting extra LiDAR constraints when scans matched. Then I stitched keyframe point clouds into a global map by transforming each cloud into the world frame.` },
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
            body: `This project explores the concept of "quantum-in-the-loop control", a hybrid architecture where a classical control system delegates certain optimization problems to a quantum processor. Many modern control approaches in robotics, such as Model Predictive Control (MPC), trajectory optimization, and combinatorial planning require repeatedly solving optimization problems in real time. As systems scale in complexity, these optimization steps can become a computational bottleneck, motivating exploration of alternative computational paradigms.`
          },
          {
            title: 'What is QAOA?',
            body: String.raw`QAOA is a quantum algorithm for approximate combinatorial optimization. It starts from a problem written in a QUBO or Ising form, builds a cost Hamiltonian from that problem, and then alternates between evolution under the cost Hamiltonian and a mixer Hamiltonian. The parameters of those alternating steps are optimized classically so that, when the circuit is measured, it is more likely to return low-cost bitstrings. In this project, QAOA is the quantum solver I want to use after reformulating a discretized MPC problem into a QUBO.

            $$
            \lvert \psi(\boldsymbol{\gamma},\boldsymbol{\beta}) \rangle =
            \left(\prod_{\ell=1}^{p} e^{-i \beta_{\ell} H_M} e^{-i \gamma_{\ell} H_C}\right)
            \lvert + \rangle^{\otimes n}
            $$

            The equation at the bottom is the quantum state used in QAOA. It shows that the state is built by repeatedly alternating two unitaries: one generated by the cost Hamiltonian, which encodes the optimization objective, and one generated by the mixer Hamiltonian, which helps explore different bitstrings. The angles gamma ell and beta ell are the parameters that get tuned by the classical optimizer.

            Notes for the equation:

            $\lvert + \rangle^{\otimes n}$ is the initial state, which is an equal superposition over $n$ qubits. QAOA starts with all candidate bitstrings represented.
            $H_c$ is the cost Hamiltonian built from the optimization problem. The discretized MPC becomes a QUBO, which is mapped into an Ising form, which becomes $H_c$. It assigns lower energy to better solutions (low-cost control sequences).
            $H_M$ is the mixer Hamiltonian. Usually something simple like $H_M = \sum_i X_i$, where $X_i$ is a Pauli-$X$ operator on qubit $i$. The mixer drives transitions between basis states, helping exploration instead of getting stuck in one configuration.
            $\gamma_\ell$ is the evolution parameter for the cost Hamiltonian, applying phase shifts based on the cost of each bitstring.
            $\beta_\ell$ is the evolution parameter for the mixer Hamiltonian, redistributing amplitude through the search space.
            The large product operator just means that we're alternating between those steps repeatedly. The integer p is the QAOA depth. Bigger p means a potentially better approximation, but deeper circuits are more sensitive to noise and more hardware difficulty.
            $\gamma_\ell$ and $\beta_\ell$ are the parameters that get tuned.

            The cost unitary does not directly lower the cost the way a classical descent step would. Instead, it encodes the objective into phases, and then the mixer allows those phases to interfere. The hope is that constructive interference increases the probability of measuring good solutions.`
          },
          {
            title: 'What is MPC?',
            body: `MPC is a control method that repeatedly solves a short-horizon optimization problem. Instead of only reacting to the current error, it uses a model of the system to predict future behavior, chooses the best sequence of control inputs over a finite horizon, applies only the first control action, and then repeats the process at the next time step. For this project, the optimization stage is the key part, because that is the piece I'll reformulate into a quantum-compatible problem.

            Notes:
            It is predictive because it does not just react to the current state. It explicitly uses a system model to simulate future state evolution over a finite horizon.
            The reason we solve for the whole control sequence across the horizon is because the best control action now depends on what we plan to do later. Optimizing a full sequence lets MPC account for future consequences, but applying only the first action makes it robust to updated measurements and disturbances when the problem is solved again at the next step.
            The prediction horizon is the number of future time steps over which the controller predicts the system and optimizes the input sequence. A longer horizon gives more foresight, but it also makes the optimization larger and more computationally expensive.
            Typically the optimization variables are the future control inputs over the horizon, such as $u_0, u_1, \ldots, u_{N-1}$. The state trajectory is then determined by those inputs through the dynamics model.
            MPC is useful because it can account for dynamics, actuator limits, and future consequences in one optimization problem. That makes it attractive for robotics problems where constraints and multi-step planning matter.
            The quantum part would only replace or augment the optimization subproblem inside the MPC loop. The sensing, dynamics model, and control-loop structure remain classical; the quantum contribution is specifically at the optimization stage after reformulation.`
          },
          {
            title: 'Robotics Example',
            body: String.raw`Here I use a simple 1D point robot with position and velocity as the state and acceleration as the control input. The important simplification is that acceleration is limited to three discrete choices: decelerate, coast, or accelerate. That makes the MPC problem combinatorial rather than fully continuous, which is the key step that allows a binary reformulation for QAOA.

            Notes:
            This toy robot is intentionally simple because the goal is not to build a highly realistic controller, but to make the MPC-to-QUBO-to-QAOA reformulation easy to explain. A simple 1D system preserves the main control structure while keeping the optimization setup readable.
            The state is $x_k = \begin{bmatrix} p_k \\ v_k \end{bmatrix}$, meaning the robot is described by its position and velocity at each time step. Position alone is not enough to predict future motion, so velocity must also be included.
            The equations $p_{k+1} = p_k + \Delta t \, v_k$ and $v_{k+1} = v_k + \Delta t \, a_k$ are dynamics constraints. They tell the optimizer how the system is allowed to evolve, so the predicted trajectory remains physically valid.
            The control input is the acceleration $a_k \in \{-1, 0, 1\}$. This means that at each step the controller must choose between decelerating, coasting, or accelerating.
            Standard MPC often uses continuous control inputs, but here the input is discretized on purpose. That is what turns the finite-horizon optimization into a discrete decision problem and makes a binary encoding possible.
            Over a horizon of length $N$, the optimization is choosing a sequence of future control actions $a_0, a_1, \ldots, a_{N-1}$, where each one must come from the allowed discrete set.
            The goal terms on the slide correspond to a typical control objective: reach the target, minimize control effort, and satisfy the model and any constraints. In a simple cost function, minimizing effort would usually mean penalizing large acceleration values, for example with a term proportional to $\sum_k a_k^2$.
            The slide only shows the basic dynamics and input restriction, but a fuller MPC problem could also include state constraints such as velocity bounds, workspace limits, or obstacle avoidance. Even though this is a simplified robot, it still captures the key ingredients of a robotics MPC problem: state, dynamics, control input, objective, and constrained planning over a finite horizon.`
          },
          {
            title: 'From MPC to QAOA',
            body: String.raw`On the left, I encode the robot's discrete control choices using binary variables. At each timestep, the robot can decelerate, coast, or accelerate, so I assign one binary variable to each option and enforce a one-hot constraint so exactly one action is selected. I then recover the acceleration value directly from those binary variables.

            On the right, I rewrite the finite-horizon MPC objective in terms of those binary decision variables. I don't have the original finite-horizon MPC equation listed on this slide, but the top right is the form with all terms with respect to the binary vector $z$, that's what $J_{MPC}(z)$ is. I also add the one-hot constraints into the objective using quadratic penalty terms, that's what's after the lambda. After expansion, the result is a quadratic cost over binary variables, which is the QUBO form. $z$ is the binary decision vector from before, $H$ contains the quadratic terms, $g$ contains the linear terms, and $c$ is a constant. QAOA uses a cost Hamiltonian written in Ising form, so the binary optimization problem is mapped into spin variables and then into a Hamiltonian.

            Finally, that Ising objective becomes the cost Hamiltonian used by QAOA. So low-energy states of the Hamiltonian correspond to low-cost control sequences. QAOA then tries to bias the final measurement toward those low-cost solutions.

            Notes:
            On the left side of the slide, the discrete control input is encoded using binary variables. At each timestep, the robot has three possible actions: decelerate, coast, or accelerate. Those three options are represented by three binary variables, and the one-hot constraint ensures that exactly one of them is active at a time.
            The expression $a_k = -z_{(k,-1)} + z_{(k,+1)}$ shows how the actual acceleration value is recovered from the binary encoding. If the decelerate variable is active, the acceleration is $-1$; if the coast variable is active, the acceleration is $0$; and if the accelerate variable is active, the acceleration is $+1$.
            The key idea is that once the future control inputs are written in terms of binary variables, the predicted future trajectory and the MPC objective can also be rewritten in terms of those same binary variables. That is what creates the bridge from the control problem to a binary optimization problem.
            On the right side of the slide, the one-hot constraints are absorbed into the objective using quadratic penalty terms. This is necessary because QUBO stands for quadratic unconstrained binary optimization, so any constraints must be incorporated into the objective rather than enforced separately.
            After adding those penalties and expanding the objective, the result takes the standard QUBO form $\min_{z \in \{0,1\}^m} z^T H z + g^T z + c$. This means the optimization is now written as a quadratic cost over binary decision variables, which is a standard form that both classical and quantum combinatorial solvers can work with.
            The binary variables are then converted into spin variables using $z_i = (1-s_i)/2$ where $s_i \in \{-1,+1\}$. This gives the equivalent Ising form of the same optimization problem.
            From there, the Ising objective becomes the cost Hamiltonian $\hat{H}_c = \sum_i h_i Z_i + \sum_{i<j} J_{ij} Z_i Z_j$, which is the operator that QAOA actually uses. In other words, the QUBO is the classical binary optimization form, and the Ising Hamiltonian is the quantum operator form of that same cost.
            A useful way to interpret the last step is that low-cost control sequences in the MPC problem correspond to low-energy states of the Ising Hamiltonian. QAOA then searches for a quantum state that is more likely to produce those low-energy, low-cost solutions when measured.
            This slide is really the central mathematical bridge of the whole presentation: discrete control choices become binary variables, the binary objective becomes a QUBO, and the QUBO becomes the Ising Hamiltonian used by QAOA.`
          },
          {
            title: 'Performance Comparison Using Qiskit',
            body: `For this small instance, QAOA converged to the same optimal solution as the exact classical methods, which validates the MPC-to-QUBO-to-Ising pipeline. However, its runtime was much larger, which reinforces the point that current quantum optimization is better viewed here as a proof of concept than as a practical real-time controller.

            The nice part is that QAOA found the same control solution, so the formulation worked. The downside is that it took much longer, which shows that for a small MPC problem like this, classical solvers are still much more practical.

            Notes:
            The most important result is that QAOA found the same solution as the exact classical baselines. That validates the binary encoding, the QUBO construction, the Ising mapping, and the QAOA workflow itself.
            Matching the exact solution means the control-side reformulation worked. The optimization problem seen by QAOA was consistent with the original discretized MPC problem.
            The long runtime is expected for a small problem. QAOA has overhead from circuit preparation, repeated cost evaluations, and classical parameter tuning. A tiny finite-horizon MPC problem is exactly the kind of case where brute force or exact classical QUBO solving should be faster.
            That means the result is not a failure. It is actually a good proof of concept: QAOA can recover the correct control sequence, but current quantum optimization is not competitive with classical methods on this scale.
            The slide supports the broader conclusion of the presentation: the MPC-to-QAOA formulation is plausible, but practicality is limited by the current quantum hardware and algorithm stack.

            The main point of the next slide is that hardware is the real bottleneck, not just the control-side reformulation. Quantum-in-the-loop robotic control is still difficult today because the processor, support electronics, and system environment are all demanding.`
          },
          {
            title: 'Limitations and Future Work',
            body: `While a hybrid system like this is still difficult today, there are several research directions for hardware that could make this sort of thing more plausible over time. 

            The first area is fault-tolerant quantum hardware. If logical qubits become more reliable and error-correction overhead drops, then algorithms like QAOA become more meaningful on larger optimization problems. IBM’s roadmap is a good example of that direction, with its Starling fault-tolerant target.

            The second area is low- or no-EM-noise actuators. If robots ever need to operate near sensitive quantum hardware, then conventional high-current actuation may not be ideal. Piezoelectric actuators are interesting here because they can operate with minimal electromagnetic interference, and there is also current cryogenic actuator work from NASA and early superconducting-material actuator concepts for robotics.

            The third area is cryogenic and low-latency integration. Even with better qubits, the quantum processor still needs a large classical support stack for control, readout, and feedback. That is why cryo-CMOS and tighter classical-quantum integration matter so much. IBM and others are already working on that kind of system integration.

            So my conclusion is that this is not practical real-time robot control today, but there are real hardware trends that could make hybrid systems more plausible over time.”

            Notes:
            The main point of this slide is that hardware is the real bottleneck, not just the control-side reformulation. Quantum-in-the-loop robotic control is still difficult today because the processor, support electronics, and system environment are all demanding.
            Fault-tolerant QC hardware matters because current noisy devices limit circuit depth, reliability, and scalability. IBM’s public roadmap is a useful example to name-drop here, especially Starling and the broader move toward logical-qubit-based systems.
            Low- or no-EM-noise actuators matter because quantum hardware is highly sensitive to its environment. Piezoelectric actuators are worth mentioning because they are often discussed as low-EMI options, and there is also active NASA cryogenic actuator work plus early superconducting-material robotic actuator concepts.
            Cryogenic and low-latency integration matters because even a good quantum processor still depends on classical control, readout, and feedback electronics. That is why cryo-CMOS and tighter system integration are important enabling technologies for any future hybrid control loop.
            The conclusion is not that robots will soon carry quantum computers onboard. The conclusion is that there are real adjacent hardware research directions that could eventually make specialized hybrid quantum-robotic systems more plausible.`
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
    thumb: "media/buzzcaster/buzzcaster_thumb.webp",
    previewVideo: "media/buzzcaster/buzzcaster_preview.mp4",
    links: { code: "https://github.com/ojas-mediratta/BuzzCaster-Guitar" },
    sections: [
      { type: 'text', content: `I've played guitar for over a decade, so for my CS 3651 (Prototyping Intelligent Devices) final project I built a guitar with onboard effects.` },
      { type: 'text', content: `BuzzCaster integrates a full DSP chain directly inside the instrument. A Teensy running PJRC's real-time audio framework handles delay, reverb, chorus, and distortion, so the guitar can run effects without external pedals.` },
      { type: 'video', src: 'media/buzzcaster/buzzcaster_4.mp4', caption: 'Early circuit prototyping' },
      { type: 'text', content: `I routed the guitar body to fit the electronics, built a compact LCD + encoder interface for real-time control, and tuned the preamp to preserve pickup impedance. I also designed a dedicated battery housing and power safeguards to handle USB and power-bank edge cases.` },
      { type: 'images', items: ['media/buzzcaster/buzzcaster_6.webp', 'media/buzzcaster/buzzcaster_7.webp'], caption: 'Routing and laser engraving the body' },
      { type: 'text', content: `The project involved circuit prototyping, 3D-printed mounting solutions, and firmware development. The final result is a fully playable instrument and a solid embedded audio proof of concept.` },
      { type: 'text', content: `More details, including schematics, firmware, and build notes, are documented in the repo README.` },
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
      { type: 'text', content: `I've been into mechanical keyboards for years, and ET55 was my first full from-scratch build after doing several kit-based builds.` },
      { type: 'text', content: `ET55 is a 55-key, hand-wired board inspired by IBM Model F layouts, with QMK firmware, USB-C, an OLED status screen, and a rotary encoder. Building it covered the full stack: layout, wiring, firmware, and case design.` },
      { type: 'video', src: 'media/et55/et55_4.mp4', caption: 'Internals and physical design' },
      { type: 'text', content: `Building ET55 involved several key steps. First, I designed the layout and wiring schematic, ensuring that every switch was correctly placed and connected for NKRO functionality. I hand-wired each switch using diodes and copper wire, taking care to insulate connections with heat shrink tubing to prevent shorts.` },
      { type: 'images', items: ['media/et55/et55_2.webp', 'media/et55/et55_3.webp'], caption: 'Hand-wiring the switches and diodes' },
      { type: 'text', content: `Next, I integrated a Pro Micro (ATmega32U4) microcontroller to handle the keyboard's logic and communication. I programmed it using QMK firmware, customizing the keymap to fit the compact layout and adding layers for additional functionality. The rotary encoder was set up to control volume and switch layers, while the OLED display provided real-time status updates.` },
      { type: 'text', content: `For the case and plate, I modeled custom parts in Fusion 360 and 3D-printed them to achieve a precise fit. This process involved several iterations to refine tolerances and ensure that the switches seated properly despite the wiring underneath.` },
      { type: 'text', content: `The final result is a compact keyboard that I use daily, and it was a strong project for applying both embedded and mechanical design skills.` },
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
      { type: 'text', content: `I got into custom keyboards through the enthusiast community and became interested in the engineering tradeoffs around materials, mounting styles, switches, and layouts.` },
      { type: 'images', items: ['media/keyboard-design/keyboard-design_27.webp', 'media/keyboard-design/keyboard-design_28.webp'], caption: 'My first custom prototype and my collection' },
      { type: 'text', content: `After using a few off-the-shelf customs, I decided to design my own board from scratch. I started with a design inspired by the TGR Singa Unikorn and adapted it into my own version.` },
      { type: 'text', content: `I learned CAD in Fusion 360 through tutorials and keyboard forums, then produced an early Unikorn-style prototype. After showing it at the Georgia Tech Mechanical Keyboard Club, I started getting commission requests for custom designs.` },
      { type: 'videos', items: ['media/keyboard-design/keyboard-design_6.mp4', 'media/keyboard-design/keyboard-design_15.mp4'], caption: 'Client boards in-progress' },
      { type: 'text', content: `Commissions grew from there. Clients usually came with a layout or style direction, and I translated that into manufacturable designs while maintaining PCB compatibility with available boards. Many were Unikorn-style builds, along with one-off projects like the 60% board shown above with a stainless steel weight and custom side profile.` },
      { type: 'videos', items: ['media/keyboard-design/keyboard-design_2.mp4', 'media/keyboard-design/keyboard-design_3.mp4'], caption: 'Aluminum machining for Endurance Proto v2' },
      { type: 'text', content: `What started as a personal one-off project turned into ongoing freelance collaborations that combined mechanical design, DFM constraints, and enthusiast keyboard aesthetics.`}
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
      { type: 'text', content: `Dose was my HackGT12 project and my first hackathon. In 36 hours, our team built a prototype focused on medication non-adherence.` },
      { type: 'text', content: `Medication non-adherence means patients miss doses or take medication incorrectly. The impact is large: estimates put avoidable U.S. healthcare costs at $100-300 billion per year, along with failed treatments, preventable hospitalizations, and lower-quality trial data.` },
      { type: 'text', content: `We built Dose as a smart pill bottle with embedded sensing and dashboard reporting. The system helps patients stay on schedule while giving clinicians and researchers clearer adherence data.` }, 
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
      { type: 'text', content: `We built Lucid as a computer vision system for real-time truck-driver fatigue monitoring. It detects cues like blinking, yawning, and head nodding, then streams driver-level fatigue data through Snowflake to a live fleet dashboard.` },
      { type: 'text', content: `I focused on hardware packaging and frontend work. I designed and printed the phone enclosure for cameras and sensors, iterated through multiple print revisions, and built parts of the React dashboard and mobile port.` },
      { type: 'text', content: `I also jumped in on some backend work, helping connect the API to Snowflake and shape how the data was stored and streamed to the frontend. It was a lot of small but essential details: data schemas, validation, debugging.` },
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
