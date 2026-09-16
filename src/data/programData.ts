import { LearningStep, FAQItem } from '../types';

export const MANUFACTURING_STEPS: LearningStep[] = [
  {
    stepNumber: 1,
    title: 'ESD Safety Protocols',
    subtitle: 'Electrostatic Discharge Grounding & Work Area Isolation',
    description:
      'Electrostatic discharge can invisibly destroy sensitive server ICs and SMD capacitors. Wear an anti-static wrist strap properly bonded to a verified earth ground, use a dissipative ESD mat, and avoid static-prone synthetic clothing.',
    keyActions: [
      'Wear an anti-static wrist strap and connect clamp securely to grounded chassis or ESD mat plug.',
      'Operate on a certified conductive anti-static benchtop mat.',
      'Avoid high-friction clothing like wool or nylon; work in humidity-regulated rooms (40-60% RH).',
    ],
    safetyTips: [
      'Never touch component leads directly without grounding first.',
      'Keep server components inside ESD protective shielding bags until the exact moment of installation.',
    ],
    toolsRequired: ['ESD Grounding Wrist Strap', 'Conductive ESD Work Mat', 'Grounding Plug / Alligator Clip'],
    verificationCheck: 'Confirm wrist strap resistance is between 1MΩ and 10MΩ and clip is anchored to bare unpainted metal.',
    iconName: 'ShieldAlert',
    badge: 'Mandatory Safety',
  },
  {
    stepNumber: 2,
    title: 'Identify Components & Architecture',
    subtitle: 'Motherboard Layout, Sockets, DIMMs & Key Interfaces',
    description:
      'Familiarize yourself thoroughly with the server motherboard topology before touching fasteners. Inspect multi-CPU sockets (e.g., LGA 4189 / 4677), multi-channel ECC DDR4/DDR5 DIMM slots, Southbridge/Chipset heatsinks, PCIe riser brackets, and front-panel headers.',
    keyActions: [
      'Inspect physical PCB layout against the server manufacturer service manual diagram.',
      'Locate primary and secondary CPU socket positions (Socket 0 and Socket 1).',
      'Identify memory channel pairings (A1, B1, C1, D1) and onboard diagnostics LEDs.',
    ],
    safetyTips: [
      'Look for any scratched traces, bent socket protection covers, or bulging solid capacitors.',
    ],
    toolsRequired: ['Service Documentation', 'Inspection Magnifier / LED Work Light'],
    verificationCheck: 'Confirm all connector locations, socket orientations, and power headers match documentation.',
    iconName: 'Cpu',
  },
  {
    stepNumber: 3,
    title: 'Prepare Chassis / Standoffs',
    subtitle: 'Chassis Alignment & Precision Standoff Placement',
    description:
      'Place the server rackmount or tower chassis on a flat, anti-static work surface. Install ONLY the specific brass or steel standoffs that directly correspond to the mounting holes on the server motherboard.',
    keyActions: [
      'Place server chassis firmly on a stable workbench.',
      'Screw in standoff posts only into labeled hole patterns matching your motherboard form factor (E-ATX, EEB, Proprietary).',
      'Verify that rear I/O shield aperture is accurately cleared and aligned.',
    ],
    safetyTips: [
      'CRITICAL: An extra, misplaced standoff underneath the board will cause a fatal electrical short-circuit upon power-up!',
    ],
    toolsRequired: ['Hex Standoff Driver (5mm/6mm)', 'Precision Phillips #2 Screwdriver'],
    verificationCheck: 'Verify standoff count exactly equals motherboard screw holes with zero extraneous posts beneath PCB.',
    iconName: 'Server',
  },
  {
    stepNumber: 4,
    title: 'Mount Motherboard into Chassis',
    subtitle: 'Rear I/O Mating & Cross-Pattern Fastening',
    description:
      'Carefully angle the server motherboard into the chassis, sliding rear port connectors into the I/O shield or backplate cutouts. Align PCB mounting holes with standoffs and secure using standard chassis screws.',
    keyActions: [
      'Align rear I/O connectors cleanly with the chassis opening.',
      'Lower the board gently without dragging the solder underside against standoffs.',
      'Hand-tighten center screw first to hold alignment, then install remaining perimeter screws.',
    ],
    safetyTips: [
      'Do not over-tighten screws; overtightening cracks internal multi-layer PCB copper planes.',
    ],
    toolsRequired: ['Magnetic Tip #2 Phillips Driver', 'Non-conductive PCB Washers'],
    verificationCheck: 'Board is seated level with all screws torqued hand-snug and no chassis flex detected.',
    iconName: 'Layers',
  },
  {
    stepNumber: 5,
    title: 'Open CPU Socket Actuation Lever',
    subtitle: 'Releasing Dual Load Levers & Socket Shield Cover',
    description:
      'Server LGA sockets utilize heavy dual-lever retention brackets (such as LGA 3647 / 4189 / SP3 / AM5). Release the marked retention levers in exact sequence (first lever 1, then lever 2) and swing the load plate upward.',
    keyActions: [
      'Release the first socket lever marked with unlock glyph and gently unhook from its retaining tab.',
      'Release the secondary lever to lift the load plate assembly.',
      'Leave the protective plastic cover in place or lift open as prescribed by the socket manufacturer.',
    ],
    safetyTips: [
      'NEVER touch the microscopic gold LGA socket pins; any bent pin can permanently ruin the motherboard.',
    ],
    toolsRequired: ['None (Hand operation only)'],
    verificationCheck: 'Socket levers fully swung past 90 degrees and pin field is pristine with zero foreign particles.',
    iconName: 'Unlock',
  },
  {
    stepNumber: 6,
    title: 'Install Enterprise Server CPU',
    subtitle: 'Pin 1 Golden Triangle Alignment & Zero Insertion Force',
    description:
      'Grip the enterprise CPU by its substrate edges only. Orient the golden triangle marker on the CPU with the corresponding triangle on the socket corner or carrier clip. Lower straight down with zero side-to-side rocking.',
    keyActions: [
      'Handle CPU strictly by outer substrate edges; avoid contact with gold contact pads or top heat spreader.',
      'Align Pin 1 indicator (gold triangle) with socket alignment post.',
      'Seat processor squarely into socket with zero force (ZIF). Close load plate and lock levers in reverse sequence.',
    ],
    safetyTips: [
      'Never force or drop the CPU into the socket. If resistance is felt, re-verify orientation key notches.',
    ],
    toolsRequired: ['CPU Carrier Tray / Suction Lifter (where required by Intel/AMD spec)'],
    verificationCheck: 'CPU seated completely flat; retention plate latches smoothly without grinding or bowing.',
    iconName: 'Cpu',
    badge: 'High Precision',
  },
  {
    stepNumber: 7,
    title: 'Install Server Heatsink & Thermal Compound',
    subtitle: 'Even Diagonal Torquing Pattern & Thermal Interface Material',
    description:
      'Inspect pre-applied thermal interface material (TIM) or apply an even cross/dot pattern of high-grade server thermal grease. Position the heavy heatsink over the mounting posts and tighten spring-loaded screws in a diagonal star/criss-cross sequence.',
    keyActions: [
      'Verify protective plastic peel on heatsink copper base has been removed.',
      'Place heatsink squarely over CPU bracket posts.',
      'Tighten screws evenly in a cross pattern (1-2-3-4 in small increments) to ensure uniform mounting pressure across the die.',
    ],
    safetyTips: [
      'Uneven torque will crack processor silicon or cause poor thermal contact leading to immediate thermal throttling.',
    ],
    toolsRequired: ['Torx T20 / T30 Screwdriver or Calibrated Torque Wrench (12-14 in-lbs)'],
    verificationCheck: 'Heatsink screws bottomed out on shoulder stops with zero wobble or tilted contact angle.',
    iconName: 'ThermometerSnowflake',
  },
  {
    stepNumber: 8,
    title: 'Install ECC Registered Memory Modules',
    subtitle: 'Multi-Channel Population Rules & Audible Locking Clicks',
    description:
      'Consult the memory population matrix (e.g., A1, B1, C1, D1 for optimal 4-channel or 8-channel interleaving). Align the asymmetric notch on the DDR module with the slot key. Press downward firmly on both outer edges until ejector latches click shut.',
    keyActions: [
      'Follow the motherboard memory population order precisely (primary slots first).',
      'Align DDR notch with socket key to verify correct direction.',
      'Apply even thumb pressure on both ends until retaining clips click closed automatically.',
    ],
    safetyTips: [
      'Never insert non-ECC memory into servers requiring RDIMM/LRDIMM configurations.',
    ],
    toolsRequired: ['ESD Gloves or Grounded Hands'],
    verificationCheck: 'Both side latches fully snapped into notch pockets with DIMM seated perfectly parallel to slot.',
    iconName: 'Server',
  },
  {
    stepNumber: 9,
    title: 'Install PCIe Riser Cards & NVMe/SAS Storage',
    subtitle: 'Riser Bracket Seating & Backplane Drive Connections',
    description:
      'Install PCIe riser cages and hardware RAID/HBA controllers. Route mini-SAS HD or SlimSAS cables to hot-swap drive backplanes, securing cards into chassis slots with thumbscrews.',
    keyActions: [
      'Slide PCIe riser card straight down into motherboard PCIe slots, ensuring guide pins engage chassis frame.',
      'Lock riser retention latches.',
      'Install storage controller cards, M.2 NVMe drives, and connect SAS/SATA backplane data cables.',
    ],
    safetyTips: [
      'Check cable bend radius; avoid bending high-speed SAS cables tighter than a 1-inch radius.',
    ],
    toolsRequired: ['Phillips #1/#2 Screwdriver'],
    verificationCheck: 'Riser card seated level; backplane SAS/SATA cables firmly clicked with locking latches.',
    iconName: 'HardDrive',
  },
  {
    stepNumber: 10,
    title: 'Connect Power, Fan Modules & Front Panel Headers',
    subtitle: 'EPS 12V High-Current Harnesses, Redundant Fans & Sensor Headers',
    description:
      'Connect primary 24-pin ATX/server mainboard power, dual 8-pin EPS12V CPU power lines, hot-plug system fan harnesses, front control panel headers, and ambient temperature sensor cables.',
    keyActions: [
      'Match keyed power connectors and verify plastic retention latch hooks firmly over socket lip.',
      'Connect redundant server fan arrays into labeled FAN_1 through FAN_6 headers.',
      'Route cables cleanly through chassis cable management channels away from cooling airflow paths.',
    ],
    safetyTips: [
      'Do not force reverse-polarity connectors. Ensure fan wiring cannot contact spinning fan blades.',
    ],
    toolsRequired: ['Velcro Cable Ties / Zip Ties'],
    verificationCheck: 'All power latches snapped shut; fans routed clear of air baffles and heatsinks.',
    iconName: 'Zap',
  },
  {
    stepNumber: 11,
    title: 'Comprehensive Final Pre-Power Inspection',
    subtitle: 'Debris Clearance, Tool Accounting & Air Baffle Placement',
    description:
      'Perform a forensic visual check of the entire chassis interior. Account for every removed screw and tool. Check that no washers, wire strands, or plastic films remain inside. Re-install server air shroud/baffles.',
    keyActions: [
      'Inspect with LED inspection light for loose screws, zip-tie clippings, or wire strands.',
      'Verify all DIMMs, CPU heatsinks, cables, and PCIe brackets are mechanically rigid.',
      'Fit clear plastic air shroud/cooling duct properly over CPU heatsinks to guide blower fan airflow.',
    ],
    safetyTips: [
      'A forgotten loose screw rolling across a running PCB during shipment causes catastrophic short circuits.',
    ],
    toolsRequired: ['LED Work Light', 'Inspection Mirror', 'Inventory Checklist'],
    verificationCheck: '100% tool accounting completed; air shroud installed; zero debris detected in chassis cavity.',
    iconName: 'CheckCircle2',
  },
  {
    stepNumber: 12,
    title: 'First Power-On & BIOS / POST Verification',
    subtitle: 'Standby Power, BMC / IPMI Health, POST Execution & Hardware Validation',
    description:
      'Connect redundant AC power cables and monitor. Observe standby power LED, check BMC (Baseboard Management Controller) heartbeat, press power switch, and enter BIOS setup utility to verify all CPUs, RAM capacity, and storage drives.',
    keyActions: [
      'Connect AC power cord and verify BMC heartbeat LED flashes green on rear I/O.',
      'Power on system and observe diagnostic POST code display (e.g., 00 -> 79 -> 99 -> A0).',
      'Press Del or F2 to enter BIOS Setup Utility.',
      'Verify: CPU Model detected, Total ECC Memory capacity verified in quad-channel mode, Storage drives recognized, Fans OK, System Ready.',
    ],
    safetyTips: [
      'If error beeps or POST stops at memory error code, immediately disconnect AC power and verify DIMM seating.',
    ],
    toolsRequired: ['VGA/DisplayPort Monitor', 'USB Keyboard', 'True-RMS AC Power Cord'],
    verificationCheck: 'Server passes POST cleanly to BIOS Setup Utility with all CPU cores and memory channels recognized.',
    iconName: 'Tv',
    badge: 'Milestone Completion',
  },
];

export const MANUFACTURING_FAQS: FAQItem[] = [
  {
    id: 'mfg-faq-1',
    question: 'Why is ESD grounding strictly required before touching the motherboard?',
    answer:
      'Human bodies can easily hold static charges in excess of 10,000 Volts without any physical sensation. However, modern sub-nanometer semiconductors and gate oxide layers can be permanently destroyed or catastrophically degraded by charges as small as 100 Volts. Grounding through an ESD wrist strap and mat continuously dissipates charge safely to ground.',
  },
  {
    id: 'mfg-faq-2',
    question: 'What happens if a motherboard standoff is installed in the wrong chassis location?',
    answer:
      'An extra or misaligned metal standoff will press directly against the underside of the multi-layer server PCB. When powered on, the conductive brass standoff will bridge power planes to ground or signal lines, causing an instant short-circuit that can permanently destroy the VRM, chipset, or traces.',
  },
  {
    id: 'mfg-faq-3',
    question: 'How do you prevent bending delicate LGA socket pins during CPU installation?',
    answer:
      'Always handle server CPUs strictly by outer edges or using manufacturer-certified installation carriers. Keep the plastic socket cover seated until ready, lower the CPU vertically straight down (Zero Insertion Force), and never drag or slide the CPU horizontally across the pin bed.',
  },
  {
    id: 'mfg-faq-4',
    question: 'Why must heatsink screws be torqued in a diagonal criss-cross pattern?',
    answer:
      'Enterprise server processors have massive surface areas. Tightening one corner or side fully before the others produces severe mechanical torque imbalance, which can crack the silicon die beneath the integrated heat spreader or bend socket pins, resulting in memory channel failure.',
  },
  {
    id: 'mfg-faq-5',
    question: 'What should a learner do if POST fails during first power-on?',
    answer:
      'Check the 7-segment onboard diagnostic LED POST code or BMC web interface. The code will pinpoint the failing subsystem (e.g., 55 for memory not detected). Power off immediately, unplug AC cables, and inspect DIMM channel seating and 8-pin CPU power connections.',
  },
];

export const AUTOMOBILE_STEPS: LearningStep[] = [
  {
    stepNumber: 1,
    title: 'Prepare the Engine Block',
    subtitle: 'Thorough Decontamination, Stand Mounting & Gallery Inspection',
    description:
      'Start with a thoroughly cleaned, bare engine block securely mounted to a rated engine stand. The block is the heavy cast iron or aluminum foundation housing all moving assemblies. Every oil galley, coolant passage, and cylinder bore must be surgically cleaned and free of debris.',
    keyActions: [
      'Mount bare engine block rigidly to an engine assembly rotating stand.',
      'Run nylon rifle brushes through all main oil galleries and blow dry with compressed air.',
      'Wipe cylinder cylinder walls with lint-free white lint-free wipes until completely residue-free.',
    ],
    safetyTips: [
      'Ensure stand locking pins are engaged before rotating the heavy casting to prevent pinch injuries.',
    ],
    toolsRequired: ['Engine Stand', 'Oil Gallery Brushes', 'Solvent Degreaser', 'Compressed Air Gun'],
    verificationCheck: 'All cylinder bores cross-hatch visible, dry, clean, and zero grit detected on white cloth wipe.',
    iconName: 'Box',
    badge: 'Foundation Step',
  },
  {
    stepNumber: 2,
    title: 'Install Crankshaft & Main Bearings',
    subtitle: 'Main Saddle Lubrication, Plastigauge Tolerances & Center-Outward Torquing',
    description:
      'Lay the upper main bearing inserts into the block saddles and lubricate generously with high-tack assembly lubricant. Carefully lower the heavy balanced crankshaft into place. Install main bearing caps and torque bolts to manufacturer specifications using a calibrated torque wrench, working from center outward.',
    keyActions: [
      'Seat main bearings into block saddles, ensuring alignment tangs click firmly into machined notches.',
      'Coat bearing surfaces generously with specialized zinc-rich engine assembly lube.',
      'Gently lower crankshaft into saddles without nicking journals.',
      'Install main bearing caps in numbered order; torque bolts in three progressive stages from the center journal outward.',
    ],
    safetyTips: [
      'Do not rotate dry crankshaft; always verify smooth hand rotation after final cap torquing.',
    ],
    toolsRequired: ['Calibrated Clicker/Digital Torque Wrench', 'Assembly Lube', 'Plastigauge Strip (0.001 - 0.003")'],
    verificationCheck: 'Crankshaft spins freely by hand with 0.004-0.008" thrust end-play verified by dial indicator.',
    iconName: 'RotateCw',
  },
  {
    stepNumber: 3,
    title: 'Insert Pistons & Connecting Rods',
    subtitle: 'Ring Gap Staggering, Piston Ring Compressor & Gentle Cylinder Tapping',
    description:
      'Assemble connecting rods to pistons with floating wrist pins. Install compression and oil scraper rings, carefully staggering tiny end gaps 120° apart to prevent blow-by. Compress rings with a specialized piston ring compressor tool, then gently tap the piston crown down into the bore until the rod seats cleanly on the crankshaft journal.',
    keyActions: [
      'Stagger top compression ring, second ring, and oil control rails according to factory clock-face positions.',
      'Lubricate cylinder bore and piston skirts with clean motor oil.',
      'Clamp piston ring compressor flush against block deck.',
      'Use wooden or polymer hammer handle to gently tap piston into bore until connecting rod seats on crank pin.',
      'Torque connecting rod cap bolts to specified angle/torque.',
    ],
    safetyTips: [
      'Never hit a piston with a metal hammer. Ensure rod bolt protective boots prevent crankshaft journal gouging.',
    ],
    toolsRequired: ['Adjustable Piston Ring Compressor', 'Wooden Hammer Handle', 'Feeler Gauge'],
    verificationCheck: 'All pistons move smoothly with rod caps torqued to exact spec and zero ring binding.',
    iconName: 'Gauge',
    badge: 'High Precision',
  },
  {
    stepNumber: 4,
    title: 'Mount Cylinder Head & Head Gasket',
    subtitle: 'Alignment Dowel Verification, Multi-Layer Steel Gasket & Spiral Torque Sequence',
    description:
      'Position a pristine new multi-layer steel (MLS) head gasket over the alignment dowels on top of the engine block. The gasket creates an hermetic seal containing extreme combustion chamber pressure while isolating pressurized oil galleries and coolant passages. Lower the fully assembled cylinder head onto dowels, then tighten head bolts in the exact spiral or criss-cross sequence to prevent warping.',
    keyActions: [
      'Ensure block deck and cylinder head mating surfaces are 100% dry, flat, and degreased.',
      'Fit new head gasket with "TOP / FRONT" markings facing correctly over alignment dowels.',
      'Lower cylinder head squarely onto block dowel pins.',
      'Lubricate head bolt threads/washers with motor oil and tighten in specified multi-stage spiral sequence.',
    ],
    safetyTips: [
      'Always replace torque-to-yield (TTY) cylinder head bolts with new ones—reusing stretched bolts causes head gasket failure.',
    ],
    toolsRequired: ['Precision Torque Wrench', 'Torque Angle Gauge', 'Surface Straightedge & Feeler Gauge'],
    verificationCheck: 'All cylinder head bolts torqued to final angle/torque with zero gasket slippage or pinch.',
    iconName: 'ShieldCheck',
  },
  {
    stepNumber: 5,
    title: 'Install Engine Timing System',
    subtitle: 'Camshaft & Crankshaft Synchronization, Timing Marks & Tensioner Lock',
    description:
      'With bottom end (crankshaft) and top end (camshafts in cylinder head) assembled, they must be synchronized in mechanical lockstep. Align crankshaft TDC timing mark and camshaft sprocket timing marks precisely as specified by the OEM. Install timing chain/belt, guides, and hydraulic tensioner.',
    keyActions: [
      'Rotate crankshaft to Top Dead Center (TDC) on Cylinder #1.',
      'Align camshaft sprocket dots/lines with cylinder head datum marks.',
      'Thread timing chain or reinforced timing belt around sprockets, taking up all slack on the non-tensioner side.',
      'Release automatic hydraulic tensioner pin and rotate crankshaft two full 360° revolutions by hand to confirm mark alignment.',
    ],
    safetyTips: [
      'CRITICAL: In interference engines, mistimed camshafts will cause valves to slam directly into pistons, destroying the engine instantly.',
    ],
    toolsRequired: ['Camshaft Locking Tool', 'Crankshaft TDC Pin', 'Tensioner Retaining Pin'],
    verificationCheck: 'After 720° crank rotation, all timing marks align perfectly and belt/chain deflection meets factory tension spec.',
    iconName: 'Timer',
    badge: 'Critical Synchronization',
  },
];

export const AUTOMOBILE_CRUCIAL_NOTE = {
  title: 'Crucial Automotive Assembly Note',
  description:
    'This learner guide details the core "short block" (crankcase, crankshaft, rods, pistons) and "long block" (cylinder head, valvetrain, camshafts, timing system) assembly. A complete operational vehicle engine build additionally requires installing the oil pump, oil pickup tube, baffled oil pan, water pump, intake & exhaust manifolds, valve cover, sensors (crank/cam position), and high-pressure fuel delivery components.',
};

export const AUTOMOBILE_FAQS: FAQItem[] = [
  {
    id: 'auto-faq-1',
    question: 'Why are piston ring gaps staggered during assembly?',
    answer:
      'Piston rings have tiny thermal expansion gaps. If the gaps of the top compression ring, second ring, and oil rails were lined up in a straight line, combustion gasses would blow right past them down into the crankcase (blow-by), causing loss of compression, oil dilution, and power loss. Staggering gaps 120° or 180° apart creates a tortuous maze that traps gas pressure.',
  },
  {
    id: 'auto-faq-2',
    question: 'What is the consequence of tightening cylinder head bolts out of order?',
    answer:
      'Cylinder heads are large cast aluminum or iron structures under enormous clamping force. If bolts are tightened randomly or from the outside first, the head will buckle and warp unevenly against the block deck. This causes coolant-to-cylinder leaks, oil contamination, and immediate head gasket blowout.',
  },
  {
    id: 'auto-faq-3',
    question: 'Why is manual hand rotation of the crankshaft mandatory after installing the timing system?',
    answer:
      'Most modern automotive engines are "interference engines", meaning valves extend into the cylinder bore path when open. Manually rotating the crankshaft two full revolutions (720 degrees) allows technicians to feel any mechanical resistance or valve-to-piston contact safely by hand before the starter motor can deliver destructive power.',
  },
  {
    id: 'auto-faq-4',
    question: 'What is the difference between a "Short Block" and a "Long Block"?',
    answer:
      'A short block comprises the engine block, crankshaft, connecting rods, pistons, and main bearings. A long block adds the cylinder head, camshafts, valvetrain, and timing components. The long block is the sealed mechanical heart before external manifolds, fuel injectors, and alternator brackets are added.',
  },
  {
    id: 'auto-faq-5',
    question: 'Why must torque-to-yield (TTY) bolts never be reused?',
    answer:
      'TTY bolts are engineered to stretch past their elastic limit into their plastic deformation zone to maintain constant clamping pressure across heat cycles. Once stretched, they lose their tensile elasticity. Reusing them can cause bolt snapping or inadequate clamping force on the cylinder head.',
  },
];

export const GENERAL_PROGRAMS_DATA = [
  {
    id: 'cluster-mfg-auto',
    title: 'Manufacturing & Automobile Sector',
    subtitle: 'Bridging Shop Floors, Engineering Precision, Automation & Supply Chain Logistics',
    description:
      'These sectors require leaders who can bridge the gap between unionized shop floors and upper management while navigating robotics, zero-defect quality standards, and rigorous supply chain logistics.',
    icon: 'Factory',
    coreSoftSkills: [
      {
        name: 'Shop-Floor Communication',
        details: 'Translating complex corporate directives and engineering blueprints into clear, actionable, safety-oriented instructions that resonate across diverse multilingual shift workers.',
      },
      {
        name: 'Conflict Resolution & Negotiation',
        details: 'Addressing grievances early on the line, defusing union friction, and managing peer disputes productively to maintain continuous throughput.',
      },
      {
        name: 'Accountability & Safety Mindset',
        details: 'Fostering an institutional culture where safety and 5S/quality ownership are proactively shared at every operator level, not merely policed by supervisors.',
      },
    ],
    transformationalTopics: [
      {
        name: 'Leading Industry 4.0 & Change Management',
        details: 'Guiding frontline teams through digital transformations, collaborative robotics (cobots), and IoT sensor tracking without eroding morale, trust, or job security.',
      },
      {
        name: 'Lean Leadership (Kaizen Culture)',
        details: 'Shifting from rigid command-and-control oversight to empowering frontline operators to identify micro-bottlenecks, eliminate muda (waste), and champion continuous improvement.',
      },
      {
        name: 'Cross-Functional Influence',
        details: 'Breaking down traditional silos between design engineering, assembly operations, quality assurance, and procurement teams to align on plant-wide operational excellence.',
      },
    ],
    experientialWorkshop: 'Interactive Shop-Floor Crisis Simulation: Resolving a robotic cell shutdown, operator union dispute, and quality drift in real time.',
  },
  {
    id: 'cluster-it-ites',
    title: 'IT & ITES (Information Technology & Enabled Services)',
    subtitle: 'Rapid Innovation, Distributed Engineering, Global Delivery & Cognitive Agility',
    description:
      'The focus in IT/ITES is rapid product velocity, navigating global distributed workforces, and adapting to relentless technological disruption with high psychological safety.',
    icon: 'Laptop',
    coreSoftSkills: [
      {
        name: 'Cross-Cultural Communication',
        details: 'Navigating subtle cultural nuances across global multinational teams to ensure alignment, clarity in async documentation, and seamless hand-offs across time zones.',
      },
      {
        name: 'Cognitive Flexibility & Critical Thinking',
        details: 'Analyzing technical and architectural bottlenecks on the fly, pivoting during agile project sprints, and adopting alternative problem frameworks under tight release deadlines.',
      },
      {
        name: 'Time & Priority Management',
        details: 'Juggling competing ticket queues, architectural spikes, and high-burnout on-call duties while setting sustainable workload boundaries.',
      },
    ],
    transformationalTopics: [
      {
        name: 'Digital Leadership & AI Integration',
        details: 'Leading software engineering teams through generative AI tooling and copilot adoption while maintaining psychological safety and mitigating automation fears.',
      },
      {
        name: 'Agile Leadership & Velocity Coaching',
        details: 'Transitioning from traditional waterfall management to value-driven iterative delivery, customer-centric experimentation, and rapid retrospective execution.',
      },
      {
        name: 'Managing Distributed & Async Teams',
        details: 'Maintaining operational visibility, measuring objective output rather than hours logged, and nurturing cohesive team culture across distributed global contributors.',
      },
    ],
    experientialWorkshop: 'Virtual Distributed War-Room: Managing a high-severity production outage across 3 continents with AI triage and psychological safety.',
  },
  {
    id: 'cluster-hospitality-retail',
    title: 'Hospitality, Retail & FMCG',
    subtitle: 'High-Turnover Frontline Leadership, Guest Experience & Rapid FMCG Dynamics',
    description:
      'These fast-paced, customer-facing industries face rapid market shifts, tight margin constraints, seasonal turnover, and intense frontline pressure.',
    icon: 'Coffee',
    coreSoftSkills: [
      {
        name: 'Emotional Intelligence & Empathy',
        details: 'Recognizing and managing personal stress states while intuitively putting oneself in the shoes of both demanding guests and overwhelmed floor crew.',
      },
      {
        name: 'De-escalation & Difficult Interactions',
        details: 'Mastering proven behavioral techniques for defusing angry customers, handling public complaints with composure, and resolving peer friction respectfully.',
      },
      {
        name: 'Adaptability & Resilience',
        details: 'Bouncing back instantly from peak-hour rushes, inventory stockouts, sudden weather surges, or unexpected frontline staffing shortages.',
      },
    ],
    transformationalTopics: [
      {
        name: 'Retention & Engagement Coaching',
        details: 'Training shift managers to deliver timely recognition, micro-learning coaching, and individualized growth pathways that slash frontline turnover rates.',
      },
      {
        name: 'Crisis Management & Adaptive Decision-Making',
        details: 'Making decisive, well-reasoned choices under acute pressure during supply chain disruptions, public relations flare-ups, or guest emergencies.',
      },
      {
        name: 'Empowerment & Succession Planning',
        details: 'Spotting high-potential floor associates early, cultivating customer service champions, and building intentional internal leadership pipelines.',
      },
    ],
    experientialWorkshop: 'Frontline Surge Simulator: Handling peak holiday hotel check-in overflow with POS system outage and VIP guest escalation.',
  },
  {
    id: 'cluster-service',
    title: 'General Service Industry (Consulting, Financial, Logistics)',
    subtitle: 'Trusted Advisor Relationships, Specialized Problem-Solving & High-Stakes Delivery',
    description:
      'Whether enterprise B2B consulting, private banking, financial advisory, or global third-party logistics, this sector thrives on client trust and high-impact advisory.',
    icon: 'Briefcase',
    coreSoftSkills: [
      {
        name: 'Stakeholder Management',
        details: 'Building durable executive trust, aligning disparate agendas, and actively managing expectations across clients, regulatory partners, and internal committees.',
      },
      {
        name: 'Active Listening & Persuasion',
        details: 'Uncovering the implicit, unstated core needs of clients and presenting transformative recommendations with compelling narrative clarity and ROI proof.',
      },
      {
        name: 'Creative Problem Solving',
        details: 'Empowering consultants and financial advisors to craft bespoke, non-standard solutions for volatile client challenges.',
      },
    ],
    transformationalTopics: [
      {
        name: 'Service Excellence & Innovation',
        details: 'Instilling an organization-wide culture that perpetually seeks inventive methods to deliver value far beyond the minimum contractual SLA.',
      },
      {
        name: 'Mentoring & Coaching Leadership',
        details: 'Transitioning managerial behavior from task assignment to inquiring with catalytic questions, delivering constructive feedback, and nurturing independent strategic thinkers.',
      },
      {
        name: 'Ethical Leadership & Governance',
        details: 'Establishing robust moral frameworks for navigating conflicts of interest, corporate governance dilemmas, and client confidentiality standards.',
      },
    ],
    experientialWorkshop: 'C-Suite Advisory Boardroom Simulation: Aligning conflicting executive stakeholders during a critical organizational merger.',
  },
];

export const MANDATORY_COMPLIANCE_DATA = [
  {
    id: 'comp-mfg-auto',
    pillar: '1. Manufacturing & Automobile',
    icon: 'HardHat',
    modules: [
      {
        title: 'Health, Safety & Environment (HSE) / EHS Protocols',
        badge: 'OSHA / Factories Act',
        content:
          'Mandatory compliance on occupational safety standards, heavy machinery guarding, Lockout/Tagout (LOTO) energy isolation procedures, chemical hazard communication (HazCom), and workplace ergonomics.',
        interactiveCheck: 'Verify zero-energy state verification prior to servicing hydraulic stamp presses.',
      },
      {
        title: 'Quality Management Systems (QMS)',
        badge: 'ISO 9001 & IATF 16949',
        content:
          'Rigorous operational compliance covering automotive quality standards, failure mode and effects analysis (FMEA), standard operating procedure compliance, and statistical process control audit trails.',
        interactiveCheck: 'Audit calibration stamps on electronic torque wrenches used in brake assembly lines.',
      },
      {
        title: 'Good Manufacturing Practices (GMP)',
        badge: 'GMP Standard',
        content:
          'Standardized process tracking, hygiene protocols, contamination prevention, and line-clearance documentation to minimize human errors and zero-defect compliance on high-throughput assembly cells.',
        interactiveCheck: 'Confirm line clearance checklist before transitioning between distinct vehicle harness configurations.',
      },
      {
        title: 'Chemical & Hazardous Material Handling',
        badge: 'HazMat / SDS',
        content:
          'Safe industrial chemical storage, toxic fumes extraction, flammables cabinets compliance, and rapid spill-response emergency protocols for automotive solvents, cutting fluids, and battery electrolytes.',
        interactiveCheck: 'Identify secondary containment requirements and Safety Data Sheet (SDS) accessibility.',
      },
    ],
  },
  {
    id: 'comp-it-ites',
    pillar: '2. IT & ITES',
    icon: 'ShieldCheck',
    modules: [
      {
        title: 'Information Security & Cybersecurity Awareness',
        badge: 'ISO 27001 & SOC 2',
        content:
          'Mandatory institutional modules covering ISO 27001 controls, advanced spear-phishing recognition, multi-factor authentication hygiene, clean-desk policy compliance, and OWASP secure coding practices.',
        interactiveCheck: 'Simulated phishing triage: Identify forged headers and suspicious homoglyph domain names.',
      },
      {
        title: 'Data Privacy & Client Confidentiality',
        badge: 'GDPR / CCPA / DPDP Act',
        content:
          'Strict legal protocols governing the collection, processing, storage, and cross-border transfer of Personally Identifiable Information (PII) under GDPR, California CCPA, and India’s Digital Personal Data Protection Act.',
        interactiveCheck: 'Evaluate client data redaction standards in cloud sandbox development environments.',
      },
      {
        title: 'Intellectual Property (IP) Protection',
        badge: 'Proprietary IP',
        content:
          'Comprehensive training on safeguarding client source code, trade secret custody, non-disclosure compliance, and preventing unauthorized software tool usage, shadow AI adoption, or data leakage.',
        interactiveCheck: 'Confirm licensing rules and open-source copyleft compliance before deploying third-party libraries.',
      },
    ],
  },
  {
    id: 'comp-hospitality-retail',
    pillar: '3. Hospitality, Retail & FMCG',
    icon: 'ShoppingBag',
    modules: [
      {
        title: 'Food Safety & Hygiene',
        badge: 'HACCP / FSSAI',
        content:
          'Critical compliance regarding cold-chain storage temperatures, culinary kitchen hygiene, allergen segregation, critical control point logging, and preventing biological cross-contamination in hospitality and FMCG warehouses.',
        interactiveCheck: 'Verify refrigerator temperature telemetry logs and color-coded chopping board segregation.',
      },
      {
        title: 'Consumer Rights & Fair Trade Compliance',
        badge: 'Consumer Protection',
        content:
          'Training retail personnel on transparent shelf pricing, truthful marketing claims, accurate product packaging labeling, clear exchange/return policies, and fair competition consumer protection laws.',
        interactiveCheck: 'Check consumer return terms disclosure clarity on point-of-sale customer receipts.',
      },
      {
        title: 'Responsible Beverage Service',
        badge: 'Legal Licensing',
        content:
          'Statutory compliance for food & beverage teams regarding customer legal age verification, monitoring signs of visible intoxication, refuse-service protocols, and liability management.',
        interactiveCheck: 'Conduct mock age verification challenge with multi-state identification cards.',
      },
      {
        title: 'Fire & Life Safety Evacuation Protocols',
        badge: 'Life Safety Code',
        content:
          'Regular scheduled floor drills, unobstructed emergency exit maintenance, automated sprinkler inspection, and crowd-management protocols for high-traffic retail stores and hotel complexes.',
        interactiveCheck: 'Ensure panic-bar exit doors swing freely outward and emergency illumination batteries pass testing.',
      },
    ],
  },
  {
    id: 'comp-service',
    pillar: '4. General Service Industry (Financial, Consulting, Logistics)',
    icon: 'Scale',
    modules: [
      {
        title: 'Anti-Money Laundering (AML) & Know Your Customer (KYC)',
        badge: 'AML / CFT Laws',
        content:
          'Mandatory regulatory compliance for banking, financial, and legal services to identify beneficial ownership, scrutinize suspicious transactions, and file Suspicious Activity Reports (SARs).',
        interactiveCheck: 'Flag unusual structuring patterns involving high-velocity cash transfers under threshold amounts.',
      },
      {
        title: 'Insider Trading & Market Abuse Regulations',
        badge: 'SEBI / SEC / RBI Guidelines',
        content:
          'Strict statutory guidelines for personnel with access to unpublished price-sensitive information (UPSI). Enforcement of trading blackouts, conflict-of-interest declarations, and compliance log maintenance.',
        interactiveCheck: 'Examine confidential earnings release embargo compliance across corporate advisory teams.',
      },
      {
        title: 'Client Confidentiality & Professional Ethics',
        badge: 'Ethical Governance',
        content:
          'Ironclad legal commitments ensuring non-disclosure of strategic consulting frameworks, confidential merger audits, or proprietary financial records, backed by whistleblower protections.',
        interactiveCheck: 'Review secure shredding and encrypted document retention policies for deal-room files.',
      },
      {
        title: 'Trade Compliance & Export Controls',
        badge: 'Customs & Sanctions',
        content:
          'Essential compliance for logistics providers and multinational consultancies to navigate international dual-use export controls, sanctioned destination lists, and customs documentation.',
        interactiveCheck: 'Screen overseas consignment bills of lading against current international sanctions lists.',
      },
    ],
  },
];
