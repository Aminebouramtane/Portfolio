import {
  BrainCircuit,
  Boxes,
  Code2,
  Database,
  GitBranch,
  Globe,
  LineChart,
  SearchCheck,
  Server,
  Cpu,
  Eye,
  Layers
} from 'lucide-react';

export const profile = {
  name: 'Amine Bouramtane',
  title: 'AI Software Engineer - Data Intelligent Systems',
  summary:
    'Software Engineer specialized in Artificial Intelligence, Machine Learning, and Data Systems. Passionate about building scalable intelligent systems, computer vision solutions, and data-driven applications.'
};

export const skills = [
  {
    category: 'Programming',
    icon: Code2,
    level: 90,
    items: ['C', 'C++', 'Python', 'PHP', 'JavaScript', 'SQL']
  },
  {
    category: 'AI & Data',
    icon: BrainCircuit,
    level: 92,
    items: ['Machine Learning', 'TensorFlow', 'Keras', 'Scikit-learn', 'Pandas', 'YOLO, CNN']
  },
  {
    category: 'Web',
    icon: Globe,
    level: 85,
    items: ['React', 'Laravel', 'Livewire', 'REST APIs']
  },
  {
    category: 'Databases',
    icon: Database,
    level: 84,
    items: ['MySQL', 'MongoDB']
  },
  {
    category: 'Tools',
    icon: GitBranch,
    level: 80,
    items: ['Git', 'Docker', 'CI/CD', 'Linux']
  }
];

export const projects = [
  {
    title: 'AI Tomato Monitoring System',
    description:
      'Built an intelligent crop-monitoring workflow combining computer vision and data alerts to detect plant health signals in near real-time.',
    tags: ['Computer Vision', 'YOLO', 'Python', 'Analytics'],
    icon: Eye
  },
  {
    title: 'E-Commerce Data Mining Platform',
    description:
      'Designed a data mining engine for e-commerce behavior patterns with dashboard-ready insights for customer segmentation and recommendation pipelines.',
    tags: ['Data Mining', 'React', 'SQL', 'REST API'],
    icon: SearchCheck
  },
  {
    title: 'Customer Churn Prediction Dashboard',
    description:
      'Implemented machine learning models and explainable metrics to predict churn probability and support proactive retention strategies.',
    tags: ['Machine Learning', 'Scikit-learn', 'Dashboard', 'KPI'],
    icon: LineChart
  }
];

export const experience = [
  {
    role: 'AI Software Engineer',
    company: 'Independent Projects',
    period: '2023 - Present',
    details:
      'Delivered AI-driven applications focused on intelligent automation, predictive analytics, and robust data processing pipelines.',
    icon: Cpu
  },
  {
    role: 'Data Systems Developer',
    company: 'Freelance / Collaborations',
    period: '2021 - 2023',
    details:
      'Developed scalable data workflows, backend integrations, and interactive frontends for business and analytics use cases.',
    icon: Server
  },
  {
    role: 'Software Engineering Foundations',
    company: 'Academic & Personal Lab',
    period: '2019 - 2021',
    details:
      'Built strong foundations in algorithms, system design, and full-stack development through projects and research-oriented experimentation.',
    icon: Layers
  }
];

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' }
];

export const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/Aminebouramtane', handle: '@Aminebouramtane' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/amine-bouramtane-72975a259/', handle: '/in/amine-bouramtane' }
];
