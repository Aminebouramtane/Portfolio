export type Language = 'en' | 'fr' | 'ar';

export interface Translations {
  nav: {
    work: string;
    numbers: string;
    toolkit: string;
    path: string;
    contact: string;
    admin: string;
  };
  hero: {
    available: string;
    seeProjects: string;
    downloadCv: string;
  };
  work: {
    title: string;
    subtitle: string;
    all: string;
    featured: string;
    viewCaseStudy: string;
    viewCode: string;
    viewLive: string;
  };
  numbers: {
    title: string;
    subtitle: string;
    byCategory: string;
    byTool: string;
    bySkillGroup: string;
    projectsCount: string;
    resetFilter: string;
  };
  about: {
    title: string;
    quickFacts: string;
    location: string;
    education: string;
    experience: string;
    languages: string;
  };
  toolkit: {
    title: string;
    subtitle: string;
  };
  path: {
    title: string;
    subtitle: string;
    experience: string;
    education: string;
  };
  contact: {
    title: string;
    subtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    send: string;
    sending: string;
    successMsg: string;
    errorMsg: string;
    directContact: string;
  };
  footer: {
    rights: string;
    backToTop: string;
  };
  projectDetail: {
    context: string;
    approach: string;
    results: string;
    learned: string;
    toolsUsed: string;
    keyMetrics: string;
    nextProject: string;
    backToProjects: string;
  };
  admin: {
    title: string;
    loginTitle: string;
    passwordPlaceholder: string;
    loginButton: string;
    overview: string;
    projects: string;
    skills: string;
    timeline: string;
    profile: string;
    messages: string;
    backup: string;
    account: string;
    logout: string;
    saveChanges: string;
    changesSaved: string;
    addProject: string;
    editProject: string;
    deleteConfirm: string;
    exportJson: string;
    importJson: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      work: "Work",
      numbers: "Numbers",
      toolkit: "Toolkit",
      path: "Path",
      contact: "Contact",
      admin: "Admin"
    },
    hero: {
      available: "Available for Data & AI roles",
      seeProjects: "See the projects",
      downloadCv: "Download CV"
    },
    work: {
      title: "Selected Work",
      subtitle: "High-impact data analytics platforms, BI dashboards, and vision systems.",
      all: "All Projects",
      featured: "Featured",
      viewCaseStudy: "View case study",
      viewCode: "Source code",
      viewLive: "Live preview"
    },
    numbers: {
      title: "The Numbers",
      subtitle: "Interactive analytics breakdown of projects and technical frequency.",
      byCategory: "Projects per Category",
      byTool: "Tool Frequency",
      bySkillGroup: "Skills Distribution",
      projectsCount: "Projects",
      resetFilter: "Reset Category Filter"
    },
    about: {
      title: "About Me",
      quickFacts: "Quick Facts",
      location: "Marrakech, Morocco",
      education: "Master's in AI & Data Science (Cadi Ayyad Univ)",
      experience: "6 Months Professional Data Analyst Experience",
      languages: "Arabic (Native), English (Fluent), French (Professional)"
    },
    toolkit: {
      title: "Technical Toolkit",
      subtitle: "Core technologies and libraries used to engineer data products."
    },
    path: {
      title: "Path & Timeline",
      subtitle: "Academic foundation and professional experience journey.",
      experience: "Professional Experience",
      education: "Education & Specialization"
    },
    contact: {
      title: "Get In Touch",
      subtitle: "Interested in collaborating or discussing an open position? Drop a message.",
      nameLabel: "Your Name",
      namePlaceholder: "e.g., Alex Reed",
      emailLabel: "Email Address",
      emailPlaceholder: "alex@company.com",
      messageLabel: "Project or Opportunity Details",
      messagePlaceholder: "Describe your project or position...",
      send: "Send Message",
      sending: "Sending...",
      successMsg: "Message sent! Amine will get back to you shortly.",
      errorMsg: "Failed to send message. Please try again.",
      directContact: "Direct Contact"
    },
    footer: {
      rights: "All rights reserved. Designed & built by Amine Bouramtane.",
      backToTop: "Back to top"
    },
    projectDetail: {
      context: "Context & Problem",
      approach: "Engineering Approach",
      results: "Business Results",
      learned: "Key Takeaways",
      toolsUsed: "Technologies & Frameworks",
      keyMetrics: "Key Impact Metrics",
      nextProject: "Next Project",
      backToProjects: "Back to all projects"
    },
    admin: {
      title: "Admin Dashboard",
      loginTitle: "Admin Authentication",
      passwordPlaceholder: "Enter admin password",
      loginButton: "Sign In",
      overview: "Overview",
      projects: "Projects",
      skills: "Skills",
      timeline: "Experience & Education",
      profile: "Profile Settings",
      messages: "Messages",
      backup: "Backup Data",
      account: "Account Settings",
      logout: "Log Out",
      saveChanges: "Save Changes",
      changesSaved: "Changes Saved",
      addProject: "Add New Project",
      editProject: "Edit Project",
      deleteConfirm: "Are you sure you want to delete this item?",
      exportJson: "Export JSON",
      importJson: "Import JSON"
    }
  },
  fr: {
    nav: {
      work: "Projets",
      numbers: "Chiffres",
      toolkit: "Compétences",
      path: "Parcours",
      contact: "Contact",
      admin: "Admin"
    },
    hero: {
      available: "Disponible pour postes Data & IA",
      seeProjects: "Découvrir les projets",
      downloadCv: "Télécharger le CV"
    },
    work: {
      title: "Projets Sélectionnés",
      subtitle: "Plateformes d'analyse de données, tableaux de bord BI et systèmes de vision.",
      all: "Tous les projets",
      featured: "En vedette",
      viewCaseStudy: "Voir l'étude de cas",
      viewCode: "Code source",
      viewLive: "Aperçu en direct"
    },
    numbers: {
      title: "Les Chiffres",
      subtitle: "Analyse interactive des projets et fréquence des technologies.",
      byCategory: "Projets par catégorie",
      byTool: "Fréquence des outils",
      bySkillGroup: "Répartition des compétences",
      projectsCount: "Projets",
      resetFilter: "Réinitialiser le filtre"
    },
    about: {
      title: "À propos",
      quickFacts: "Informations clés",
      location: "Marrakech, Maroc",
      education: "Master IA & Data Science (Univ. Cadi Ayyad)",
      experience: "6 mois d'expérience Data Analyst",
      languages: "Arabe (Maternelle), Anglais (Courant), Français (Professionnel)"
    },
    toolkit: {
      title: "Boîte à Outils",
      subtitle: "Technologies et bibliothèques utilisées pour créer des produits de données."
    },
    path: {
      title: "Parcours",
      subtitle: "Parcours académique et expériences professionnelles.",
      experience: "Expérience Professionnelle",
      education: "Formation & Diplômes"
    },
    contact: {
      title: "Me Contacter",
      subtitle: "Une opportunité ou un projet ? N'hésitez pas à me laisser un message.",
      nameLabel: "Votre nom",
      namePlaceholder: "ex: Jean Dupont",
      emailLabel: "Adresse e-mail",
      emailPlaceholder: "jean@entreprise.com",
      messageLabel: "Détails du projet ou opportunité",
      messagePlaceholder: "Décrivez votre projet ou besoin...",
      send: "Envoyer le message",
      sending: "Envoi en cours...",
      successMsg: "Message envoyé avec succès ! Je vous répondrai rapidement.",
      errorMsg: "Erreur lors de l'envoi du message.",
      directContact: "Contact direct"
    },
    footer: {
      rights: "Tous droits réservés. Conçu et développé par Amine Bouramtane.",
      backToTop: "Haut de page"
    },
    projectDetail: {
      context: "Contexte & Problème",
      approach: "Démarche Technique",
      results: "Résultats Obtenus",
      learned: "Apprentissages Clés",
      toolsUsed: "Technologies Utilisées",
      keyMetrics: "Indicateurs d'Impact",
      nextProject: "Projet Suivant",
      backToProjects: "Retour aux projets"
    },
    admin: {
      title: "Administration",
      loginTitle: "Connexion Administrateur",
      passwordPlaceholder: "Mot de passe administrateur",
      loginButton: "Se connecter",
      overview: "Aperçu",
      projects: "Projets",
      skills: "Compétences",
      timeline: "Parcours & Expérience",
      profile: "Profil & Bio",
      messages: "Messages",
      backup: "Sauvegarde",
      account: "Compte",
      logout: "Déconnexion",
      saveChanges: "Enregistrer les modifications",
      changesSaved: "Modifications enregistrées",
      addProject: "Nouveau Projet",
      editProject: "Modifier le Projet",
      deleteConfirm: "Voulez-vous vraiment supprimer cet élément ?",
      exportJson: "Exporter en JSON",
      importJson: "Importer JSON"
    }
  },
  ar: {
    nav: {
      work: "المشاريع",
      numbers: "الأرقام",
      toolkit: "المهارات",
      path: "المسار",
      contact: "التواصل",
      admin: "الإدارة"
    },
    hero: {
      available: "متاح لفرص العمل في البيانات والذكاء الاصطناعي",
      seeProjects: "تصفح المشاريع",
      downloadCv: "تحميل السيرة الذاتية"
    },
    work: {
      title: "أبرز الأعمال",
      subtitle: "منصات تحليل البيانات، لوحات تحكم ذكاء الأعمال، وأنظمة الرؤية الحاسوبية.",
      all: "جميع المشاريع",
      featured: "مميز",
      viewCaseStudy: "عرض دراسة الحالة",
      viewCode: "الرمز البرمجي",
      viewLive: "معاينة مباشرة"
    },
    numbers: {
      title: "الأرقام والإحصائيات",
      subtitle: "تحليل تفاعلي للمشاريع وتوزيع الأدوات والمهارات.",
      byCategory: "المشاريع حسب الفئة",
      byTool: "تكرار استخدام الأدوات",
      bySkillGroup: "توزيع المهارات",
      projectsCount: "مشاريع",
      resetFilter: "إعادة ضبط التصفية"
    },
    about: {
      title: "نبذة عني",
      quickFacts: "حقائق سريعة",
      location: "مراكش، المغرب",
      education: "ماجستير في الذكاء الاصطناعي وعلوم البيانات (جامعة القاضي عياض)",
      experience: "6 أشهر خبرة مهنية كمحلل بيانات",
      languages: "العربية (الأم)، الإنجليزية (متمكن)، الفرنسية (احترافي)"
    },
    toolkit: {
      title: "حقيبة الأدوات والمهارات",
      subtitle: "التقنيات والمكتبات المستخدمة لبناء حلول البيانات."
    },
    path: {
      title: "المسار والخبرات",
      subtitle: "المسار الأكاديمي والخبرات المهنية.",
      experience: "الخبرة المهنية",
      education: "التعليم والتخصص"
    },
    contact: {
      title: "تواصل معي",
      subtitle: "مهتم بالتعاون أو لديك فرصة عمل؟ أرسل رسالتك هنا.",
      nameLabel: "الاسم",
      namePlaceholder: "مثال: أمين",
      emailLabel: "البريد الإلكتروني",
      emailPlaceholder: "name@domain.com",
      messageLabel: "تفاصيل المشروع أو الفرصة",
      messagePlaceholder: "اكتب رسالتك هنا...",
      send: "إرسال الرسالة",
      sending: "جاري الإرسال...",
      successMsg: "تم إرسال الرسالة بنجاح! سأتواصل معك قريباً.",
      errorMsg: "حدث خطأ أثناء الإرسال. يرجى المحاولة لاحقاً.",
      directContact: "تواصل مباشر"
    },
    footer: {
      rights: "جميع الحقوق محفوظة. تم التصميم والتطوير بواسطة أمين بورمطان.",
      backToTop: "العودة للأعلى"
    },
    projectDetail: {
      context: "السياق والمشكلة",
      approach: "النهج التقني",
      results: "النتائج والمخرجات",
      learned: "الدروس المستفادة",
      toolsUsed: "التقنيات المستخدمة",
      keyMetrics: "مؤشرات الأداء الرئيسية",
      nextProject: "المشروع التالي",
      backToProjects: "العودة لجميع المشاريع"
    },
    admin: {
      title: "لوحة التحكم",
      loginTitle: "تسجيل الدخول للإدارة",
      passwordPlaceholder: "أدخل كلمة المرور",
      loginButton: "دخول",
      overview: "نظرة عامة",
      projects: "المشاريع",
      skills: "المهارات",
      timeline: "المسار والخبرات",
      profile: "الملف الشخصي",
      messages: "الرسائل",
      backup: "النسخ الاحتياطي",
      account: "إعدادات الحساب",
      logout: "تسجيل الخروج",
      saveChanges: "حفظ التغييرات",
      changesSaved: "تم حفظ التغييرات",
      addProject: "إضافة مشروع جديد",
      editProject: "تعديل المشروع",
      deleteConfirm: "هل أنت تأكد من رغبتك في حذف هذا العنصر؟",
      exportJson: "تصدير JSON",
      importJson: "استيراد JSON"
    }
  }
};

/**
 * Resolves dynamic API object fields localized suffix fallback.
 * e.g., getLocalized(project, 'title', 'fr') -> project.title_fr || project.title
 */
export function getLocalized<T extends Record<string, any>>(
  item: T | null | undefined,
  field: string,
  lang: Language
): string {
  if (!item) return '';
  const langKey = `${field}_${lang}`;
  if (item[langKey] && typeof item[langKey] === 'string' && item[langKey].trim() !== '') {
    return item[langKey];
  }
  return item[field] || '';
}
