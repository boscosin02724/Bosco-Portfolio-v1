export const navItems = ["Work", "About", "Contact"];

export const profile = {
  name: "Bosco Sin",
  roles: ["AI Designer", "Visual Designer", "Brand Designer"],
  headline: "Designing Brand Experiences with AI, Motion & Spatial Storytelling.",
  philosophy:
    "I build visual systems where brand, motion, spatial design and generative technology work as one coherent experience.",
  bio:
    "A multidisciplinary designer focused on AI content creation, 3D visual direction, brand identity, exhibition storytelling and motion-led experiences for cultural, commercial and destination brands.",
  stats: [
    { value: "3+", label: "Years across visual systems and design practice" },
    { value: "40+", label: "Campaigns, exhibitions and motion-led brand assets" },
    { value: "12+", label: "Selected clients and cross-market collaborators" },
  ],
  specialties: [
    "AI Content Creation",
    "Motion Graphics",
    "Brand Identity",
    "Graphic Design",
    "Spatial Design",
    "3D Rendering",
    "Creative Direction",
  ],
};

export const projects = [
  {
    name: "Bosideng 50th Anniversary Exhibition",
    category: "Exhibition Design / 3D Rendering / Brand Experience",
    year: "2026",
    scale: "feature",
    tone: "warm",
    slug: "bosideng-50th-anniversary-exhibition",
    image: "/projects/bosideng/cover.png",
  },
  {
    name: "HAHALULU x MGM Macau",
    category: "Spatial Visual / Character Worldbuilding / Event Experience",
    year: "2026",
    scale: "feature",
    tone: "mono",
    slug: "hahalulu-mgm-macau",
    image: "/projects/hahalulu/cover.png",
  },
  {
    name: "M+ Gala",
    category: "Gala Event / Visual Identity / Spatial Design",
    year: "2026",
    scale: "wide",
    tone: "gallery",
    slug: "mplus-gala",
    image: "/projects/mplus/cover.png",
  },
  {
    name: "DJ Snake Live in Hong Kong",
    category: "AIGC Event Visualization / OOH Campaign / AI Motion",
    year: "2026",
    scale: "standard",
    tone: "dark",
    slug: "dj-snake-live-in-hong-kong",
    image: "/projects/dj-snake/cover.jpg",
  },
  {
    name: "French May Monalisa Merch",
    category: "AIGC IP Design / 3D Merchandising / Spatial Display",
    year: "2026",
    scale: "standard",
    tone: "silver",
    slug: "french-may-monalisa-merch",
    image: "/projects/french-may-monalisa/cover.png",
  },
  {
    name: "3D Animation",
    category: "3D Animation / Motion Design / Visual Storytelling",
    year: "2024-2026",
    scale: "wide",
    tone: "identity",
    image: "/projects/3d-animation/cover.png",
    externalUrl: "https://boscosin724.myportfolio.com/3dani",
    textTone: "dark",
  },
  {
    name: "All Projects",
    category: "Selected Work / Archive / Extended Portfolio",
    year: "2022-2026",
    scale: "feature",
    tone: "future",
    externalUrl: "https://boscosin724.myportfolio.com/all-work",
  },
] as const;

export const bosidengCaseStudy = {
  slug: "bosideng-50th-anniversary-exhibition",
  title: "Bosideng 50th Anniversary Exhibition",
  category: "Exhibition Design / 3D Rendering / Brand Experience",
  year: "2026",
  role: "Creative Planning / Spatial Design / AI Visualization",
  cover: "/projects/bosideng/cover.png",
  overview:
    "A spatial brand experience translating BOSIDENG's 50-year journey into an immersive exhibition environment, combining heritage storytelling, technological innovation and mountaineering spirit.",
  description:
    "Contributed to the creative planning and spatial design of the BOSIDENG 50th Anniversary Exhibition in Shanghai. Responsibilities included concept development, visitor journey planning, exhibition content translation, and 3D x AI visualization. The exhibition was structured around the brand's heritage, technological innovation, and mountaineering spirit, transforming BOSIDENG's story into an immersive visitor experience.",
  info: [
    ["Client", "BOSIDENG"],
    ["Location", "Shanghai"],
    ["Year", "2025"],
    ["Type", "Brand Exhibition / Spatial Experience"],
    ["Role", "Creative Planning, Spatial Design, 3D x AI Visualization"],
  ],
  narratives: ["Brand Heritage", "Smart Manufacturing & Innovation", "Mountaineering Spirit"],
  journey: [
    {
      zone: "Zone 01",
      title: "Arrival & Brand Landmark",
      image: "/projects/bosideng/cover.png",
      caption: "Exterior flagship experience",
      text: "A flagship entrance and architectural brand presence designed to announce the anniversary exhibition as a landmark destination.",
    },
    {
      zone: "Zone 02",
      title: "Snowfield Cocktail & Welcome Experience",
      image: "/projects/bosideng/cocktail-bar.png",
      caption: "Snowfield cocktail reception",
      text: "An alpine reception moment extending the exhibition atmosphere into a premium guest experience.",
    },
    {
      zone: "Zone 03",
      title: "Heritage Beginning",
      image: "/projects/bosideng/heritage.png",
      caption: "Heritage and craftsmanship storytelling",
      text: "A tactile origin story space translating craftsmanship, sewing heritage and brand memory into a warm spatial scene.",
    },
    {
      zone: "Zone 04",
      title: "Smart Manufacturing",
      image: "/projects/bosideng/smart-manufacturing.png",
      caption: "Smart manufacturing exhibition zone",
      text: "A future-facing technology zone visualizing AI down filling, production systems and manufacturing innovation.",
    },
    {
      zone: "Zone 05",
      title: "Timeline & Achievement Tower",
      image: "/projects/bosideng/timeline.png",
      caption: "Brand timeline and achievement installation",
      text: "A vertical installation collecting milestones, awards and mountaineering achievements into a cinematic brand archive.",
    },
  ],
  gallery: [
    { image: "/projects/bosideng/cover.png", caption: "Exterior flagship experience", layout: "feature" },
    { image: "/projects/bosideng/cocktail-bar.png", caption: "Snowfield cocktail reception", layout: "wide" },
    { image: "/projects/bosideng/smart-manufacturing.png", caption: "Smart manufacturing exhibition zone", layout: "split" },
    { image: "/projects/bosideng/heritage.png", caption: "Heritage and craftsmanship storytelling", layout: "split" },
    { image: "/projects/bosideng/timeline.png", caption: "Brand timeline and achievement installation", layout: "feature" },
    { image: "/projects/bosideng/arrival-welcome.png", caption: "Guest welcome and retail experience", layout: "split" },
    { image: "/projects/bosideng/fashion-tree.png", caption: "Central fashion and product storytelling", layout: "split" },
  ],
  contributions: [
    "Concept Development",
    "Visitor Journey Planning",
    "Spatial Atmosphere",
    "Exhibition Storytelling",
    "Content Translation",
    "3D x AI Visualization",
    "Presentation Visuals",
    "Interactive Experience Planning",
  ],
  contributionText:
    "Led the development of spatial atmosphere, exhibition storytelling, interactive experiences and presentation visuals, helping communicate the overall exhibition vision and visitor experience through detailed design renderings and spatial planning.",
  closing:
    "This project transformed BOSIDENG's 50-year brand story into an immersive spatial journey - connecting heritage, innovation and exploration through exhibition design.",
} as const;

export const hahaluluCaseStudy = {
  slug: "hahalulu-mgm-macau",
  title: "HAHALULU x MGM Macau",
  category: "Spatial Visual / Character Worldbuilding / Event Experience",
  year: "2026",
  role: "Creative 3D Design / Environment Design / AIGC Visualization",
  cover: "/projects/hahalulu/cover.png",
  overview:
    "A playful spatial visual experience translating HAHALULU's character language into immersive event environments for MGM Macau.",
  description:
    "In the collaboration between HAHALULU and MGM Macau, I was responsible for the creative 3D design. I transformed the HAHALULU character style into a fun and immersive visual experience, including 3D environment design, booth concepts and visual elements for the event.",
  workflow:
    "Using 3D tools and AIGC, I quickly explored ideas and turned them into clear, high-quality designs that could be applied in real spaces.",
  info: [
    ["Client", "HAHALULU x MGM Macau"],
    ["Location", "Macau"],
    ["Year", "2024"],
    ["Type", "IP Event Experience / Spatial Visual"],
    ["Role", "Creative 3D Design, Booth Concept, AIGC Visualization"],
  ],
  focus: [
    {
      title: "IP to Spatial Experience",
      text: "Turning IP characters into three-dimensional spaces, structures and visitor-facing moments.",
    },
    {
      title: "Interactive Visual Moments",
      text: "Creating eye-catching, playful and interactive visuals for an event environment.",
    },
    {
      title: "3D + AIGC Workflow",
      text: "Using 3D and AI tools to speed up ideation, visualization and design refinement.",
    },
  ],
  gallery: [
    {
      image: "/projects/hahalulu/cover.png",
      caption: "Immersive atrium character world",
      layout: "feature",
    },
    {
      image: "/projects/hahalulu/entrance.jpg",
      caption: "Character entrance installation",
      layout: "split",
    },
    {
      image: "/projects/hahalulu/booth.jpg",
      caption: "Interactive booth and event space",
      layout: "split",
    },
  ],
  contributions: [
    "Creative 3D Design",
    "Environment Design",
    "Booth Concept",
    "Character Spatialization",
    "Event Visual Elements",
    "AIGC Visualization",
  ],
  closing:
    "This project turned a character IP into a joyful physical experience, using 3D and AI workflows to connect brand personality with real spatial moments.",
} as const;

export const mplusCaseStudy = {
  slug: "mplus-gala",
  title: "M+ Gala",
  category: "Gala Event / Visual Identity / Spatial Design",
  year: "2026",
  role: "Spatial Concept / Visitor Journey / 3D Visualization",
  cover: "/projects/mplus/cover.png",
  overview:
    "A sophisticated gala event design proposal for M+, shaping an immersive guest experience around contemporary culture, hospitality and spatial storytelling.",
  description:
    "Developed a gala event design proposal for M+, creating a refined and immersive guest experience that reflects the institution's contemporary cultural identity. Responsibilities included the overall spatial concept, visitor journey planning, mood development and visual storytelling.",
  process:
    "Designed key event zones including the arrival experience, red carpet, cocktail reception and social gathering areas, integrating lighting, architectural elements and premium hospitality features into a cohesive event narrative. Contributed to concept development, 3D visualisation, presentation materials and design refinement throughout the tender process.",
  info: [
    ["Client", "M+"],
    ["Location", "Hong Kong"],
    ["Year", "2026"],
    ["Type", "Gala Event / Spatial Experience"],
    ["Role", "Spatial Concept, Visitor Journey, 3D Visualization"],
  ],
  focus: [
    {
      title: "Spatial Concept",
      text: "Developing a premium event atmosphere that connects institutional identity with a contemporary gala experience.",
    },
    {
      title: "Visitor Journey",
      text: "Planning arrival, red carpet, cocktail and gathering moments as a clear guest flow.",
    },
    {
      title: "Mood & Storytelling",
      text: "Using lighting, architectural rhythm and visual cues to build a cohesive event narrative.",
    },
  ],
  gallery: [
    {
      image: "/projects/mplus/cover.png",
      caption: "Terrace cocktail and harbour-facing welcome moment",
      layout: "feature",
    },
    {
      image: "/projects/mplus/gallery-arrival.png",
      caption: "Gallery arrival and art-led hospitality experience",
      layout: "split",
    },
    {
      image: "/projects/mplus/gallery-corridor.png",
      caption: "Immersive red carpet and black-box exhibition corridor",
      layout: "split",
    },
    {
      image: "/projects/mplus/gallery-cocktail.png",
      caption: "Night-time cocktail reception and social gathering area",
      layout: "wide",
    },
    {
      image: "/projects/mplus/gallery-terrace.jpg",
      caption: "Architectural lighting and exterior event identity",
      layout: "split",
    },
    {
      image: "/projects/mplus/gallery-dinner.png",
      caption: "Gala dinner staging and premium hospitality atmosphere",
      layout: "split",
    },
  ],
  contributions: [
    "Spatial Concept",
    "Visitor Journey Planning",
    "Mood Development",
    "Visual Storytelling",
    "Event Zone Design",
    "3D Visualisation",
    "Presentation Materials",
    "Design Refinement",
  ],
  closing:
    "This proposal shaped M+ Gala as a cinematic cultural hospitality experience, connecting arrival, art, social moments and evening atmosphere into one refined event journey.",
} as const;

export const djSnakeCaseStudy = {
  slug: "dj-snake-live-in-hong-kong",
  title: "DJ Snake Live in Hong Kong",
  category: "AIGC Event Visualization / OOH Campaign / AI Motion",
  year: "2026",
  role: "AI Visualization / Motion Direction / Social Content",
  cover: "/projects/dj-snake/cover.jpg",
  overview:
    "A high-energy AI visualization system for DJ Snake's Hong Kong live event, translating the city's skyline, concert atmosphere and media touchpoints into cinematic promotional visuals.",
  description:
    "Made from Nano Banana 2 + Seedance 2.0, the project explored how advanced AIGC tools can simulate event scale, stage energy and city-wide awareness before production. I created immersive concert visualizations, OOH campaign imagery and AI motion assets for social content.",
  process:
    "The work connected Hong Kong's Central Harbourfront, SOGO Causeway Bay and TST Sino Center media moments into one visual narrative, helping transform digital concepts into campaign-ready assets for a live event audience.",
  info: [
    ["Client", "DJ Snake Live in Hong Kong"],
    ["Location", "Hong Kong"],
    ["Year", "2026"],
    ["Type", "AIGC Event Campaign / AI Motion"],
    ["Tools", "Nano Banana 2, Seedance 2.0, AIGC Workflow"],
    ["Role", "AI Visualization, Motion Direction, Social Content"],
  ],
  focus: [
    {
      title: "Immersive Event Visualization",
      text: "Created high-impact AI simulations of DJ Snake's concert at the Central Harbourfront, merging Hong Kong's iconic skyline with high-energy stage aesthetics.",
    },
    {
      title: "Iconic OOH Campaign",
      text: "Developed AI-generated promotional visuals for mega-screen broadcast moments at SOGO Causeway Bay and TST Sino Center.",
    },
    {
      title: "Viral Social Content",
      text: "Produced AI motion graphics tailored for social platforms, creating fast-moving content designed for buzz, reach and engagement.",
    },
  ],
  gallery: [
    {
      image: "/projects/dj-snake/cover.jpg",
      caption: "Live in Hong Kong campaign hero",
      layout: "feature",
    },
    {
      image: "/projects/dj-snake/harbourfront.png",
      caption: "Central Harbourfront event atmosphere",
      layout: "split",
    },
    {
      image: "/projects/dj-snake/stage-aerial.png",
      caption: "Skyline stage simulation",
      layout: "split",
    },
    {
      image: "/projects/dj-snake/terrace.png",
      caption: "Hospitality and crowd energy",
      layout: "wide",
    },
    {
      image: "/projects/dj-snake/stage-crowd.png",
      caption: "Stage-facing crowd visualization",
      layout: "split",
    },
    {
      image: "/projects/dj-snake/ooh.png",
      caption: "SOGO and TST mega-screen OOH simulation",
      layout: "split",
    },
  ],
  contributions: [
    "AIGC Visual Direction",
    "Event Simulation",
    "OOH Campaign Visuals",
    "AI Motion Graphics",
    "Social Content System",
    "Prompt Art Direction",
    "Visual Refinement",
    "Campaign Presentation",
  ],
  closing:
    "This project used AI motion and cinematic visualization to turn a live music event into a city-scale promotional experience.",
} as const;

export const frenchMayMonalisaCaseStudy = {
  slug: "french-may-monalisa-merch",
  title: "French May Monalisa Merch",
  category: "AIGC IP Design / 3D Merchandising / Spatial Display",
  year: "2026",
  role: "AI IP Design / 3D Development / Production Visualization",
  cover: "/projects/french-may-monalisa/cover.png",
  overview:
    "A playful AI and 3D IP design project reimagining the Mona Lisa as a contemporary Hong Kong collectible character system for French May.",
  description:
    "I created a Mona Lisa IP using AI tools, then further developed it into a 3D design. I first used AIGC to generate different visual styles and reimagine the Mona Lisa character in a more playful and contemporary way.",
  process:
    "After finalizing the design, I translated the 2D concept into a 3D model for real-world application, preparing the character system for physical build, display and merchandise production.",
  info: [
    ["Client", "French May"],
    ["Location", "Hong Kong"],
    ["Year", "2026"],
    ["Type", "IP Character / Merchandising / 3D Display"],
    ["Role", "AI IP Design, Style Exploration, 3D Modeling"],
  ],
  focus: [
    {
      title: "AI-generated IP Character Design",
      text: "Used AIGC to explore new visual directions and transform a classic artwork into a playful contemporary character.",
    },
    {
      title: "Style Exploration",
      text: "Developed different design styles, expressions and cultural references before defining the final IP direction.",
    },
    {
      title: "3D Modeling for Production",
      text: "Translated the 2D AI concept into three-dimensional forms for physical build, display and merchandising.",
    },
    {
      title: "Production-ready Merchandising",
      text: "Prepared the character system across collectible items, object forms and presentation visuals.",
    },
  ],
  gallery: [
    {
      image: "/projects/french-may-monalisa/cover.png",
      caption: "Hong Kong-inspired Mona Lisa IP world",
      layout: "feature",
    },
    {
      image: "/projects/french-may-monalisa/merch.png",
      caption: "Collectible merchandise system",
      layout: "wide",
    },
    {
      image: "/projects/french-may-monalisa/collectible.png",
      caption: "3D figure and object set",
      layout: "feature",
    },
  ],
  contributions: [
    "AI Character Design",
    "AIGC Style Exploration",
    "Visual Development",
    "3D Modeling",
    "Merchandise Visualization",
    "Physical Build Preparation",
  ],
  closing:
    "This project shows how AI and 3D can work together to turn a classic artwork into a modern, buildable design.",
} as const;

export const services = [
  "AI Design",
  "Creative Direction",
  "3D Rendering",
  "Motion Design",
  "Brand Experience",
  "Spatial Design",
  "AIGC Workflow",
  "Visual Identity",
  "Generative AI",
  "Creative Coding",
];

export const timeline = [
  {
    period: "Education",
    title: "Design Foundation",
    detail: "Visual communication, brand systems, spatial thinking and digital production craft.",
  },
  {
    period: "Studio Practice",
    title: "Visual & Brand Designer",
    detail: "Developed identity systems, campaign visuals, motion assets and exhibition narratives.",
  },
  {
    period: "Major Projects",
    title: "Brand Experience & Motion",
    detail: "Bosideng, MGM Macau, French May, InvestHK, GTEF and large-scale LED experiences.",
  },
  {
    period: "Now",
    title: "AI Creative Direction",
    detail: "Integrating AIGC, 3D, motion, spatial design and brand storytelling into premium workflows.",
  },
  {
    period: "Awards",
    title: "Reserved",
    detail: "A flexible space for future recognitions, press features and selected achievements.",
  },
];

export const workflow = [
  ["AI", "ChatGPT", "Claude", "GPT Image", "Midjourney", "Runway", "Seedance", "ComfyUI"],
  ["Spatial", "Blender", "Cinema 4D", "Maya", "ZBrush", "Unity"],
  ["Motion", "After Effects", "DaVinci Resolve", "Premiere Pro", "Final Cut Pro", "Logic Pro"],
  ["Visual", "Figma", "Illustrator", "Photoshop", "Lightroom", "InDesign"],
];
