import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, 'public/uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});
const upload = multer({ storage });

const DATA_FILE = path.join(__dirname, 'data.json');

// Default initial data
const initialData = {
  settings: {
    name: "Amine Bouramtane",
    title: "Junior Data Analyst & AI Engineer",
    title_fr: "Data Analyste Junior & Ingénieur IA",
    title_ar: "محلل بيانات جونيور ومهندس ذكاء اصطناعي",
    headline: "Transforming complex datasets into actionable business intelligence & high-performance computer vision systems.",
    headline_fr: "Transformer des jeux de données complexes en intelligence décisionnelle et en systèmes de vision par ordinateur performants.",
    headline_ar: "تحويل مجموعات البيانات المعقدة إلى رؤى استراتيجية وأنظمة رؤية حاسوبية عالية الأداء.",
    bio: "AI Engineer with a Master's in Artificial Intelligence & Data Science (Cadi Ayyad University) and 6 months of professional experience as a Data Analyst at NewDev Fès. Skilled in data analysis, predictive modeling, machine learning, and computer vision.",
    bio_fr: "Ingénieur IA titulaire d'un Master en IA & Data Science (Université Cadi Ayyad) et 6 mois d'expérience professionnelle en tant que Data Analyst chez NewDev Fès. Spécialisé en analyse de données, modélisation prédictive et vision par ordinateur.",
    bio_ar: "مهندس ذكاء اصطناعي حاصل على الماجستير في الذكاء الاصطناعي وعلوم البيانات (جامعة القاضي عياض) وخبرة 6 أشهر كمحلل بيانات في NewDev فاس. متخصص في تحليل البيانات والنمذجة التنبؤية والرؤية الحاسوبية.",
    about: "Based in Marrakech, Morocco. Passionate about using Python, SQL, Power BI, PyTorch, and YOLO to build automated data pipelines and edge AI surveillance solutions. Background in full-stack development (Laravel, Livewire, React).",
    about_fr: "Basé à Marrakech, Maroc. Passionné par l'utilisation de Python, SQL, Power BI, PyTorch et YOLO pour construire des pipelines de données automatisés. Solide bagage en développement full-stack.",
    about_ar: "مقيم في مراكش، المغرب. شغوف باستخدام Python و SQL و Power BI و PyTorch و YOLO لبناء أنابيب بيانات مؤتمتة وتطبيقات ذكاء اصطناعي على الأجهزة المدمجة.",
    email: "bouramtaneamine1@gmail.com",
    phone: "+212 602716306",
    location: "Marrakech, Morocco",
    github: "https://github.com/Aminebouramtane",
    linkedin: "https://linkedin.com/in/Amine Bouramtane",
    photo: "/pf.png",
    availability: "Available for Data Analyst & AI Engineer roles",
    availability_fr: "Disponible pour opportunités Data Analyst & Ingénieur IA",
    availability_ar: "متاح لفرص العمل كمحلل بيانات ومهندس ذكاء اصطناعي",
    cv_url: "/cv.pdf"
  },
  projects: [
    {
      id: "p1",
      slug: "e-commerce-data-mining",
      title: "E-Commerce Data Mining & BI Platform",
      title_fr: "Plateforme d'Analyse E-Commerce & BI",
      title_ar: "منصة تنقيب بيانات التجارة الإلكترونية وذكاء الأعمال",
      tagline: "End-to-end transaction analysis, RFM customer segmentation, and interactive star-schema Power BI dashboard.",
      tagline_fr: "Analyse de 7000+ transactions, segmentation RFM K-Means et tableau de bord Power BI en schéma en étoile.",
      tagline_ar: "تحليل أكثر من 7000 معاملة، تقسيم العملاء باستخدام RFM و K-Means، ولائحة قيادة Power BI.",
      description: "Comprehensive data science and business intelligence project analyzing over 7,000 customer transactions. Designed a star-schema data warehouse, conducted RFM segmentation using K-Means clustering, and implemented predictive customer churn models with Random Forest and Gradient Boosting.",
      context: "Modern e-commerce enterprises generate vast amounts of transactional data. Without unified customer profiling and churn prediction, marketing teams miss retention opportunities.",
      approach: "Built an ETL pipeline in Python (Pandas/SQL), engineered RFM features, performed K-Means clustering to identify high-value buyer personas, and developed a star-schema data warehouse in MySQL with an interactive Power BI reporting suite.",
      results: "Segmented 7,000+ transactions into 4 distinct buyer profiles, yielding an estimated 18% improvement in customer retention strategy targeting.",
      learned: "Advanced relational schema modeling, cluster silhouette evaluation, and executive Power BI KPI presentation.",
      category: "BI & Analytics",
      tech: ["Python", "MySQL", "Power BI", "Scikit-learn", "Pandas", "K-Means"],
      metrics: [
        { label: "Transactions Analyzed", value: "7,000+" },
        { label: "Customer Segments", value: "4 RFM Clusters" },
        { label: "Model Accuracy", value: "92.4%" }
      ],
      year: 2026,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        { url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80", alt: "Power BI Executive Dashboard" },
        { url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80", alt: "RFM Cluster Analytics" }
      ],
      link: "https://github.com/Aminebouramtane",
      repo: "https://github.com/Aminebouramtane",
      featured: true,
      published: true,
      draft: false,
      sort_order: 1
    },
    {
      id: "p2",
      slug: "churn-analysis-dashboard",
      title: "Customer Churn Analysis Dashboard",
      title_fr: "Tableau de Bord d'Analyse de l'Attrition Client",
      title_ar: "لوحة تحكم تحليل تسرب العملاء",
      tagline: "Statistical EDA and predictive churn modeling across 7,000+ customer records.",
      tagline_fr: "Analyse exploratoire et modèle prédictif d'attrition sur 7000+ dossiers clients.",
      tagline_ar: "تحليل استكشافي ونموذج تنبؤ بتسرب العملاء لأكثر من 7000 سجل.",
      description: "End-to-end churn risk profiling system built using Python, Pandas, Scikit-learn, and Power BI to identify key risk drivers and empower customer success teams.",
      context: "Subscription platforms lose significant revenue to customer churn. Identifying early risk indicators enables targeted retention workflows.",
      approach: "Cleaned and transformed 7,000+ customer records. Performed univariate and bivariate EDA, trained logistic regression and Random Forest models, and visualized customer churn probabilities in Power BI.",
      results: "Discovered 12 top indicators of customer attrition and created a live probability matrix for retention specialists.",
      learned: "Imbalanced dataset handling (SMOTE), feature importance extraction, and Power BI interactive drill-throughs.",
      category: "Data Analysis",
      tech: ["Power BI", "Python", "Pandas", "Scikit-learn", "SQL"],
      metrics: [
        { label: "Customer Records", value: "7,000+" },
        { label: "Risk Drivers Identified", value: "12 Drivers" },
        { label: "Retention Impact", value: "+18%" }
      ],
      year: 2025,
      image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        { url: "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=1200&q=80", alt: "Power BI Churn Risk Report" }
      ],
      link: "https://github.com/Aminebouramtane",
      repo: "https://github.com/Aminebouramtane",
      featured: true,
      published: true,
      draft: false,
      sort_order: 2
    },
    {
      id: "p3",
      slug: "ai-video-surveillance-smart-agriculture",
      title: "AI Video Surveillance for Smart Agriculture",
      title_fr: "Surveillance Vidéo par IA pour l'Agriculture Intelligente",
      title_ar: "نظام المراقبة بفيديو الذكاء الاصطناعي للزراعة الذكية",
      tagline: "Real-time automated intruder detection using YOLOv8, DETR, OpenCV, and MQTT.",
      tagline_fr: "Détection d'intrusion en temps réel avec YOLOv8, DETR, OpenCV et MQTT.",
      tagline_ar: "كشف التسلل الحقيقي باستخدام YOLOv8 و DETR و OpenCV و MQTT.",
      description: "Computer vision solution for smart crop protection. Deployed YOLOv8 and DETR object detection models on video camera feeds with low-latency MQTT message broadcasting for edge notifications.",
      context: "Agricultural farmlands require automated perimeter protection against crop damage and trespassers without manual monitoring.",
      approach: "Annotated custom field dataset, fine-tuned YOLOv8 and DETR architectures in PyTorch, processed video streams with OpenCV, and published event alerts via MQTT to edge hardware.",
      results: "Achieved sub-15ms inference latency and 96.4% detection precision on outdoor agricultural video feeds.",
      learned: "Model optimization for edge deployment, PyTorch transfer learning, and real-time streaming pipelines.",
      category: "Computer Vision",
      tech: ["Python", "YOLOv8", "DETR", "OpenCV", "MQTT", "PyTorch"],
      metrics: [
        { label: "Inference Latency", value: "<15ms" },
        { label: "Detection Precision", value: "96.4%" },
        { label: "Edge Frame Rate", value: "45 FPS" }
      ],
      year: 2026,
      image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        { url: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=1200&q=80", alt: "Agriculture Detection Interface" }
      ],
      link: "https://github.com/Aminebouramtane",
      repo: "https://github.com/Aminebouramtane",
      featured: true,
      published: true,
      draft: false,
      sort_order: 3
    },
    {
      id: "p4",
      slug: "real-time-object-detection-pipeline",
      title: "Real-Time Object Detection & Tracking Pipeline",
      title_fr: "Pipeline de Détection & Suivi d'Objets en Temps Réel",
      title_ar: "أنبوب كشف وتتبع الأجسام في الوقت الفعلي",
      tagline: "Comparative benchmark of YOLOv5, YOLOv8, and DETR on surveillance streams.",
      tagline_fr: "Benchmark comparatif de YOLOv5, YOLOv8 et DETR sur flux vidéo.",
      tagline_ar: "مقارنة معيارية بين YOLOv5 و YOLOv8 و DETR على بث الفيديو.",
      description: "Custom video processing pipeline benchmarking CNN and Transformer architectures for high-speed object detection and tracking in multi-camera setups.",
      context: "Security video analysis requires choosing the optimal trade-off between frame rate (FPS) and mean Average Precision (mAP).",
      approach: "Built modular video pipeline using Python, PyTorch, OpenCV, and TensorFlow. Conducted automated comparative performance metrics across custom datasets.",
      results: "Identified optimal deployment thresholds for 60 FPS video ingestion with zero dropped frames.",
      learned: "Deep learning model evaluation (mAP@0.5, mAP@0.5:0.95), CUDA acceleration, and frame buffer management.",
      category: "Machine Learning",
      tech: ["Python", "PyTorch", "OpenCV", "TensorFlow", "YOLOv5", "YOLOv8"],
      metrics: [
        { label: "Architectures Evaluated", value: "3 Types" },
        { label: "Target Speed", value: "60 FPS" },
        { label: "Training Epochs", value: "300" }
      ],
      year: 2025,
      image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        { url: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=1200&q=80", alt: "Tracking Benchmark Analytics" }
      ],
      link: "https://github.com/Aminebouramtane",
      repo: "https://github.com/Aminebouramtane",
      featured: false,
      published: true,
      draft: false,
      sort_order: 4
    }
  ],
  skills: [
    { id: "s1", grp: "AI & ML", name: "Python", sort_order: 1 },
    { id: "s2", grp: "AI & ML", name: "Scikit-learn", sort_order: 2 },
    { id: "s3", grp: "AI & ML", name: "PyTorch", sort_order: 3 },
    { id: "s4", grp: "AI & ML", name: "TensorFlow", sort_order: 4 },
    { id: "s5", grp: "AI & ML", name: "Deep Learning", sort_order: 5 },
    { id: "s6", grp: "AI & ML", name: "Edge Deployment", sort_order: 6 },
    { id: "s7", grp: "Computer Vision", name: "OpenCV", sort_order: 7 },
    { id: "s8", grp: "Computer Vision", name: "YOLO (v5/v8)", sort_order: 8 },
    { id: "s9", grp: "Computer Vision", name: "DETR", sort_order: 9 },
    { id: "s10", grp: "Computer Vision", name: "CNNs", sort_order: 10 },
    { id: "s11", grp: "Data & BI", name: "Pandas & NumPy", sort_order: 11 },
    { id: "s12", grp: "Data & BI", name: "SQL & MySQL", sort_order: 12 },
    { id: "s13", grp: "Data & BI", name: "Power BI", sort_order: 13 },
    { id: "s14", grp: "Data & BI", name: "Data Warehousing", sort_order: 14 },
    { id: "s15", grp: "Full Stack", name: "Laravel & PHP", sort_order: 15 },
    { id: "s16", grp: "Full Stack", name: "JavaScript & React", sort_order: 16 },
    { id: "s17", grp: "Full Stack", name: "REST APIs", sort_order: 17 },
    { id: "s18", grp: "Other", name: "Linux & Docker", sort_order: 18 },
    { id: "s19", grp: "Other", name: "MQTT", sort_order: 19 }
  ],
  timeline: [
    {
      id: "t1",
      kind: "work",
      role: "Data Analyst",
      role_fr: "Data Analyste",
      role_ar: "محلل بيانات",
      org: "NewDev Fès",
      place: "Fès, Morocco",
      period: "6 Months",
      details: "Collected, cleaned, transformed, and analyzed complex datasets to extract business insights.\nPerformed exploratory data analysis (EDA) and preprocessing using Python, Pandas, and NumPy.\nQueried relational databases with SQL to deliver actionable reporting.\nCreated interactive Power BI dashboards communicating key KPIs to executive management.",
      sort_order: 1
    },
    {
      id: "t2",
      kind: "work",
      role: "Full-Stack Developer Intern",
      role_fr: "Stagiaire Développeur Full-Stack",
      role_ar: "متدرب تطوير الويب الكامل",
      org: "Atlecs",
      place: "Casablanca, Morocco",
      period: "Nov 2023 – Jan 2024",
      details: "Developed and deployed web applications using Laravel and Livewire.\nOptimized database queries and application performance.\nImplemented CI/CD deployment workflows and collaborated across cross-functional teams.",
      sort_order: 2
    },
    {
      id: "t3",
      kind: "education",
      role: "Computer Science Student",
      role_fr: "Étudiant en Informatique",
      role_ar: "طالب علوم الحاسوب",
      org: "1337 Coding School – UM6P",
      place: "Benguerir, Morocco",
      period: "Present",
      details: "Specializing in Software Architecture, Advanced Algorithmics & Systems Development.",
      sort_order: 3
    },
    {
      id: "t4",
      kind: "education",
      role: "Master's Degree in AI & Data Science",
      role_fr: "Master en Intelligence Artificielle & Data Science",
      role_ar: "ماجستير في الذكاء الاصطناعي وعلوم البيانات",
      org: "Faculty of Sciences Semlala, Cadi Ayyad University",
      place: "Marrakech, Morocco",
      period: "2026",
      details: "Advanced curriculum covering Machine Learning, Deep Learning, Computer Vision, Data Mining, and Distributed Big Data Processing.",
      sort_order: 4
    },
    {
      id: "t5",
      kind: "education",
      role: "Bachelor's in Data Analytics & Decision-Making Systems",
      role_fr: "Licence en Analyse de Données & Systèmes Decisionnels",
      role_ar: "بكالوريوس في تحليل البيانات وأنظمة صنع القرار",
      org: "Mohammed Premier University",
      place: "Oujda, Morocco",
      period: "2024",
      details: "Graduated with Honors. Focus on Business Intelligence, Statistical Modeling, and Relational Database Management.",
      sort_order: 5
    }
  ],
  messages: [
    {
      id: "m1",
      name: "Sarah Jenkins",
      email: "s.jenkins@techrecruitment.com",
      body: "Hi Amine, I was thoroughly impressed by your E-Commerce Data Mining project and your background in Computer Vision. We have an open Data Analyst / AI Engineer role in our team. Would love to connect!",
      read: false,
      date: new Date().toISOString()
    }
  ],
  stats: {
    viewsByDay: Array.from({ length: 30 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (29 - i));
      return {
        date: d.toISOString().split('T')[0],
        views: Math.floor(Math.random() * 25) + 12
      };
    }),
    topProjects: [
      { slug: "e-commerce-data-mining", title: "E-Commerce Data Mining & BI Platform", views: 142 },
      { slug: "churn-analysis-dashboard", title: "Customer Churn Analysis Dashboard", views: 98 },
      { slug: "ai-video-surveillance-smart-agriculture", title: "AI Video Surveillance for Smart Agriculture", views: 87 }
    ]
  },
  admin: {
    passwordHash: "admin123" // In production hashed, simple matching here
  }
};

// Helper: load DB
function getData() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
    return initialData;
  }
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    return initialData;
  }
}

// Helper: save DB
function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// Session mock
let loggedInSessions = new Set();

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader === 'Bearer token-admin-session' || loggedInSessions.has(req.headers['x-session-id'])) {
    return next();
  }
  return res.status(401).json({ error: 'Unauthorized session' });
}

// ================= PUBLIC ROUTES =================

// GET /api/site -> { settings, projects[], skills[], timeline[] }
app.get('/api/site', (req, res) => {
  const db = getData();
  const publicProjects = db.projects
    .filter(p => p.published && !p.draft)
    .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
  
  res.json({
    settings: db.settings,
    projects: publicProjects,
    skills: db.skills.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)),
    timeline: db.timeline.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
  });
});

// GET /api/projects/:slug
app.get('/api/projects/:slug', (req, res) => {
  const db = getData();
  const project = db.projects.find(p => p.slug === req.params.slug);
  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }
  res.json(project);
});

// POST /api/contact { name, email, body, website }
app.post('/api/contact', (req, res) => {
  const { name, email, body, website } = req.body;
  // Honeypot check
  if (website) {
    // Spambot caught silently
    return res.json({ success: true, message: 'Message received' });
  }
  if (!name || !email || !body) {
    return res.status(400).json({ error: 'Please fill in all required fields.' });
  }

  const db = getData();
  const newMessage = {
    id: 'm-' + Date.now(),
    name,
    email,
    body,
    read: false,
    date: new Date().toISOString()
  };
  db.messages.unshift(newMessage);
  saveData(db);
  res.json({ success: true, message: 'Message received successfully!' });
});

// POST /api/track { path }
app.post('/api/track', (req, res) => {
  const { path: pagePath } = req.body;
  const db = getData();
  const today = new Date().toISOString().split('T')[0];
  
  let dayStat = db.stats.viewsByDay.find(d => d.date === today);
  if (dayStat) {
    dayStat.views += 1;
  } else {
    db.stats.viewsByDay.push({ date: today, views: 1 });
    if (db.stats.viewsByDay.length > 30) {
      db.stats.viewsByDay.shift();
    }
  }

  if (pagePath && pagePath.startsWith('/projects/')) {
    const slug = pagePath.replace('/projects/', '');
    let projStat = db.stats.topProjects.find(p => p.slug === slug);
    if (projStat) {
      projStat.views += 1;
    } else {
      const proj = db.projects.find(p => p.slug === slug);
      if (proj) {
        db.stats.topProjects.push({ slug, title: proj.title, views: 1 });
      }
    }
  }

  saveData(db);
  res.json({ tracked: true });
});

// Auth Routes
app.post('/api/login', (req, res) => {
  const { password } = req.body;
  const db = getData();
  if (password === db.admin.passwordHash) {
    const sessionId = 'session-' + Date.now();
    loggedInSessions.add(sessionId);
    return res.json({ success: true, token: 'token-admin-session', sessionId });
  }
  return res.status(401).json({ error: 'Invalid password' });
});

app.post('/api/logout', (req, res) => {
  res.json({ success: true });
});

app.get('/api/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader === 'Bearer token-admin-session' || loggedInSessions.has(req.headers['x-session-id'])) {
    return res.json({ authenticated: true });
  }
  res.json({ authenticated: false });
});

// ================= ADMIN ROUTES =================

// File Upload
app.post('/api/admin/upload', authMiddleware, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const fileUrl = '/uploads/' + req.file.filename;
  res.json({ url: fileUrl });
});

// Projects CRUD
app.get('/api/admin/projects', authMiddleware, (req, res) => {
  const db = getData();
  res.json(db.projects.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)));
});

app.post('/api/admin/projects', authMiddleware, (req, res) => {
  const db = getData();
  const newProj = {
    id: 'p-' + Date.now(),
    slug: req.body.slug || req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    ...req.body,
    sort_order: db.projects.length + 1
  };
  db.projects.push(newProj);
  saveData(db);
  res.json(newProj);
});

app.put('/api/admin/projects/reorder', authMiddleware, (req, res) => {
  const { ids } = req.body; // array of IDs in new order
  const db = getData();
  ids.forEach((id, index) => {
    const p = db.projects.find(item => item.id === id);
    if (p) p.sort_order = index + 1;
  });
  saveData(db);
  res.json({ success: true });
});

app.put('/api/admin/projects/:id', authMiddleware, (req, res) => {
  const db = getData();
  const idx = db.projects.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Project not found' });
  db.projects[idx] = { ...db.projects[idx], ...req.body };
  saveData(db);
  res.json(db.projects[idx]);
});

app.delete('/api/admin/projects/:id', authMiddleware, (req, res) => {
  const db = getData();
  db.projects = db.projects.filter(p => p.id !== req.params.id);
  saveData(db);
  res.json({ success: true });
});

// Skills CRUD
app.get('/api/admin/skills', authMiddleware, (req, res) => {
  const db = getData();
  res.json(db.skills.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)));
});

app.post('/api/admin/skills', authMiddleware, (req, res) => {
  const db = getData();
  const newSkill = {
    id: 's-' + Date.now(),
    ...req.body,
    sort_order: db.skills.length + 1
  };
  db.skills.push(newSkill);
  saveData(db);
  res.json(newSkill);
});

app.put('/api/admin/skills/:id', authMiddleware, (req, res) => {
  const db = getData();
  const idx = db.skills.findIndex(s => s.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Skill not found' });
  db.skills[idx] = { ...db.skills[idx], ...req.body };
  saveData(db);
  res.json(db.skills[idx]);
});

app.delete('/api/admin/skills/:id', authMiddleware, (req, res) => {
  const db = getData();
  db.skills = db.skills.filter(s => s.id !== req.params.id);
  saveData(db);
  res.json({ success: true });
});

// Timeline CRUD
app.get('/api/admin/timeline', authMiddleware, (req, res) => {
  const db = getData();
  res.json(db.timeline.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)));
});

app.post('/api/admin/timeline', authMiddleware, (req, res) => {
  const db = getData();
  const newItem = {
    id: 't-' + Date.now(),
    ...req.body,
    sort_order: db.timeline.length + 1
  };
  db.timeline.push(newItem);
  saveData(db);
  res.json(newItem);
});

app.put('/api/admin/timeline/:id', authMiddleware, (req, res) => {
  const db = getData();
  const idx = db.timeline.findIndex(t => t.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Timeline item not found' });
  db.timeline[idx] = { ...db.timeline[idx], ...req.body };
  saveData(db);
  res.json(db.timeline[idx]);
});

app.delete('/api/admin/timeline/:id', authMiddleware, (req, res) => {
  const db = getData();
  db.timeline = db.timeline.filter(t => t.id !== req.params.id);
  saveData(db);
  res.json({ success: true });
});

// Settings CRUD
app.get('/api/admin/settings', authMiddleware, (req, res) => {
  const db = getData();
  res.json(db.settings);
});

app.put('/api/admin/settings', authMiddleware, (req, res) => {
  const db = getData();
  db.settings = { ...db.settings, ...req.body };
  saveData(db);
  res.json(db.settings);
});

// Password Update
app.put('/api/admin/password', authMiddleware, (req, res) => {
  const { newPassword } = req.body;
  if (!newPassword || newPassword.length < 4) {
    return res.status(400).json({ error: 'Password must be at least 4 characters.' });
  }
  const db = getData();
  db.admin.passwordHash = newPassword;
  saveData(db);
  res.json({ success: true, message: 'Password updated successfully' });
});

// Messages Management
app.get('/api/admin/messages', authMiddleware, (req, res) => {
  const db = getData();
  res.json(db.messages);
});

app.put('/api/admin/messages/:id/read', authMiddleware, (req, res) => {
  const db = getData();
  const msg = db.messages.find(m => m.id === req.params.id);
  if (msg) {
    msg.read = req.body.read !== undefined ? req.body.read : true;
    saveData(db);
  }
  res.json(msg || {});
});

app.delete('/api/admin/messages/:id', authMiddleware, (req, res) => {
  const db = getData();
  db.messages = db.messages.filter(m => m.id !== req.params.id);
  saveData(db);
  res.json({ success: true });
});

// Stats
app.get('/api/admin/stats', authMiddleware, (req, res) => {
  const db = getData();
  const totalProjects = db.projects.length;
  const visibleProjects = db.projects.filter(p => p.published && !p.draft).length;
  const featuredProjects = db.projects.filter(p => p.featured).length;
  const unreadMessages = db.messages.filter(m => !m.read).length;

  res.json({
    counts: {
      projects: totalProjects,
      visible: visibleProjects,
      featured: featuredProjects,
      unreadMessages
    },
    viewsByDay: db.stats.viewsByDay,
    topProjects: db.stats.topProjects
  });
});

// Backup Export & Import
app.get('/api/admin/export', authMiddleware, (req, res) => {
  const db = getData();
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', 'attachment; filename=portfolio_backup.json');
  res.send(JSON.stringify(db, null, 2));
});

app.post('/api/admin/import', authMiddleware, (req, res) => {
  const importedData = req.body;
  if (!importedData || !importedData.settings || !Array.isArray(importedData.projects)) {
    return res.status(400).json({ error: 'Invalid JSON format for portfolio data' });
  }
  saveData(importedData);
  res.json({ success: true, message: 'Portfolio backup imported successfully!' });
});

app.listen(PORT, () => {
  console.log(`Portfolio API Server running on port ${PORT}`);
});
