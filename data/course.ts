export enum Category {
  AdvancedStudies = "Advanced Studies",
  RegularStudies = "Regular Studies",
  ShortCourses = "Short Courses",
  Workshops = "Workshops",
  Webinars = "Webinars",
  Other = "Other",
}

export const CategoryLabels = {
  [Category.AdvancedStudies]: {
    en: "Advanced Studies",
    ur: "اعلیٰ مطالعات",
    ar: "الدراسات المتقدمة",
  },
  [Category.RegularStudies]: {
    en: "Regular Studies",
    ur: "باقاعدہ مطالعات",
    ar: "الدراسات المنتظمة",
  },
  [Category.ShortCourses]: {
    en: "Short Courses",
    ur: "مختصر کورسز",
    ar: "الدورات القصيرة",
  },
  [Category.Workshops]: {
    en: "Workshops",
    ur: "ورکشاپس",
    ar: "ورش العمل",
  },
  [Category.Webinars]: {
    en: "Webinars",
    ur: "ویبینارز",
    ar: "الندوات عبر الإنترنت",
  },
  [Category.Other]: {
    en: "Other",
    ur: "دیگر",
    ar: "أخرى",
  },
}

export interface ICourse {
  id: string
  title: {
    en: string
    ur: string
    ar: string
  }
  author?: {
    en: string
    ur: string
    ar: string
  }
  description: {
    en: string
    ur: string
    ar: string
  }
  longDescription: {
    en: string
    ur: string
    ar: string
  }
  image: string
  duration: {
    en: string
    ur: string
    ar: string
  }
  schedule: {
    en: string
    ur: string
    ar: string
  }
  startDate: {
    en: string
    ur: string
    ar: string
  }
  students: number
  category: Category
  featured?: boolean
  enrollmentUrl: string
  instructors: {
    name: {
      en: string
      ur: string
      ar: string
    }
    role: {
      en: string
      ur: string
      ar: string
    }
    image: string
  }[]
  modules: {
    title: {
      en: string
      ur: string
      ar: string
    }
    lessons: number
    duration: {
      en: string
      ur: string
      ar: string
    }
  }[]
  features: {
    en: string[]
    ur: string[]
    ar: string[]
  }
  objectives: {
    en: string[]
    ur: string[]
    ar: string[]
  }
}

export const courseContent = {
  en: {
    loading: "Loading course details...",
    notFound: "Course Not Found",
    notFoundDescription:
      "The course you're looking for doesn't exist or has been removed.",
    backToCourses: "Back to Courses",
    enrollNow: "Enroll Now",
    enrolledText: "enrolled",
    overview: "Course Overview",
    objectives: "Learning Objectives",
    modules: "Course Modules",
    instructors: "Course Instructors",
    details: "Course Details",
    detailsSubtitle: "Everything you need to know",
    lessons: "lessons",
    duration: "Duration",
    startDate: "Start Date",
    schedule: "Schedule",
    students: "students",
    features: "What You'll Get",
    overviewDesc:
      "This module covers essential concepts and practical applications. You'll engage with classical texts, participate in discussions, and complete assignments to deepen your understanding.",
    bookBy: "Book by",
    featured: "Featured",
    viewDetails: "View Details"
  },
  ur: {
    loading: "کورس کی تفصیلات لوڈ ہو رہی ہیں...",
    notFound: "کورس نہیں ملا",
    notFoundDescription:
      "جو کورس آپ تلاش کر رہے ہیں وہ موجود نہیں ہے یا ہٹایا جا چکا ہے۔",
    backToCourses: "کورسز پر واپس جائیں",
    enrollNow: "اب رجسٹر کریں",
    enrolledText: "داخل",
    overview: "کورس کا جائزہ",
    objectives: "سیکھنے کے مقاصد",
    modules: "کورس ماڈیولز",
    instructors: "کورس کے اساتذہ",
    details: "کورس کی تفصیلات",
    detailsSubtitle: "آپ کو جاننے کی ضرورت ہے سب کچھ",
    lessons: "اسباق",
    duration: "مدت",
    startDate: "شروعات کی تاریخ",
    schedule: "شیڈول",
    students: "طلباء",
    features: "آپ کو کیا ملے گا",
    overviewDesc:
      "یہ ماڈیول ضروری تصورات اور عملی اطلاقات کا احاطہ کرتا ہے۔ آپ کلاسیکی متون کے ساتھ منسلک ہوں گے، بحث میں حصہ لیں گے، اور اپنی سمجھ کو گہرا کرنے کے لیے کام مکمل کریں گے۔",
    bookBy: "مصنف",
    featured: "نمایاں",
    viewDetails: "تفصیلات دیکھیں"
  },
  ar: {
    loading: "جاري تحميل تفاصيل الدورة...",
    notFound: "لم يتم العثور على الدورة",
    notFoundDescription:
      "الدورة التي تبحث عنها غير موجودة أو تم حذفها.",
    backToCourses: "العودة إلى الدورات",
    enrollNow: "التحق الآن",
    enrolledText: "مسجل",
    overview: "نظرة عامة على الدورة",
    objectives: "أهداف التعلم",
    modules: "وحدات الدورة",
    instructors: "مدرسو الدورة",
    details: "تفاصيل الدورة",
    detailsSubtitle: "كل ما تحتاج إلى معرفته",
    lessons: "دروس",
    duration: "المدة",
    startDate: "تاريخ البدء",
    schedule: "الجدول الزمني",
    students: "الطلاب",
    features: "ما ستحصل عليه",
    overviewDesc:
      "تغطي هذه الوحدة المفاهيم الأساسية والتطبيقات العملية. ستتعامل مع النصوص الكلاسيكية وتشارك في النقاشات وتكمل المهام لتعميق فهمك.",
    bookBy: "تأليف",
    featured: "مميز",
    viewDetails: "عرض التفاصيل"
  },
}

export const COURSES: ICourse[] = [
  {
    id: "systematic-building",
    title: {
      en: "Systematic Building",
      ur: "منظم تعمیر",
      ar: "البناء المنهجي",
    },
    description: {
      en: "A comprehensive four-year course that systematically builds Islamic knowledge from foundational to advanced levels.",
      ur: "ایک جامع چار سالہ کورس جو بنیادی سے اعلیٰ سطح تک اسلامی علم کو منظم طریقے سے ترقی دیتا ہے۔",
      ar: "دورة شاملة مدتها أربع سنوات تبني المعرفة الإسلامية بشكل منهجي من المستويات الأساسية إلى المتقدمة.",
    },
    longDescription: {
      en: "The Systematic Building program (البناء المنهجي) is Mafaaheem Institute's flagship educational initiative...",
      ur: "منظم تعمیر پروگرام (البناء المنهجي) مفاہیم انسٹیٹیوٹ کی اہم تعلیمی پیشکش ہے، جو چار سال پر محیط ایک منظم اور جامع اسلامی تعلیمی نصاب فراہم کرتی ہے...",
      ar: "برنامج البناء المنهجي هو المبادرة التعليمية الرئيسية لمعهد مفاهيم، حيث يقدم نهجاً منظماً وشاملاً للتعليم الإسلامي على مدى أربع سنوات...",
    },
    image: "/images/programs/bina-al-manhaji.jpg",
    duration: {
      en: "4 years",
      ur: "چار سال",
      ar: "أربع سنوات",
    },
    schedule: {
      en: "3 sessions per week, year-round",
      ur: "ہفتے میں تین سیشن، پورے سال جاری",
      ar: "ثلاث جلسات أسبوعياً طوال العام",
    },
    startDate: {
      en: "September 2023",
      ur: "ستمبر 2023",
      ar: "سبتمبر 2023",
    },
    students: 12,
    category: Category.AdvancedStudies,
    featured: true,
    enrollmentUrl: "https://forms.google.com/mafaaheem-systematic-building-enrollment",
    instructors: [
      {
        name: {
          en: "Shaykh Ahmed Al Sayed",
          ur: "شیخ احمد السید",
          ar: "شیخ احمد السید"
        },
        role: {
          en: "Program Director & Scholar",
          ur: "پروگرام ڈائریکٹر اور عالمِ دین",
          ar: "مدير البرنامج والعالم",
        },
        image: "/images/teacher/shaykh_ahmed.jpg",
      },
      {
        name: {
          en: "Shaykh Abdul Haseeb",
          ur: "شیخ عبدالحسیب",
          ar: "شیخ عبدالحسیب"
        },
        role: {
          en: "Lead Instructor",
          ur: "مرکزی مدرس",
          ar: "المدرس الرئيسي",
        },
        image: "/images/team/shaykh.jpg",
      },
    ],
    modules: [
      {
        title: {
          en: "Year 1: Foundations",
          ur: "سال اول: بنیادیں",
          ar: "السنة الأولى: الأساسيات",
        },
        lessons: 32,
        duration: {
          en: "12 months",
          ur: "بارہ ماہ",
          ar: "اثنا عشر شهراً",
        },
      },
      {
        title: {
          en: "Year 2: Intermediate Studies",
          ur: "سال دوم: درمیانی مطالعہ",
          ar: "السنة الثانية: الدراسات المتوسطة",
        },
        lessons: 36,
        duration: {
          en: "12 months",
          ur: "بارہ ماہ",
          ar: "اثنا عشر شهراً",
        },
      },
      {
        title: {
          en: "Year 3: Advanced Concepts",
          ur: "سال سوم: اعلیٰ تصورات",
          ar: "السنة الثالثة: المفاهيم المتقدمة",
        },
        lessons: 32,
        duration: {
          en: "12 months",
          ur: "بارہ ماہ",
          ar: "اثنا عشر شهراً",
        },
      },
      {
        title: {
          en: "Year 4: Specialization & Synthesis",
          ur: "سال چہارم: تخصص اور جامع مطالعہ",
          ar: "السنة الرابعة: التخصص والتركيب",
        },
        lessons: 28,
        duration: {
          en: "12 months",
          ur: "بارہ ماہ",
          ar: "اثنا عشر شهراً",
        },
      },
    ],
    features: {
      en: [
        "Comprehensive curriculum covering all major Islamic sciences",
        "Study of classical Arabic and important classical texts",
        "Regular assessments and feedback",
        "Research projects and presentations",
        "Access to extensive Islamic library resources",
        "Annual retreats for intensive study and spiritual development",
        "Ijazah (traditional certification) in studied texts",
        "Opportunity for specialized focus in final year",
      ],
      ur: [
        "تمام اہم اسلامی علوم پر مشتمل جامع نصاب",
        "کلاسیکی عربی اور اہم متون کا مطالعہ",
        "باقاعدہ تشخیص اور رہنمائی",
        "تحقیقی منصوبے اور پریزنٹیشنز",
        "وسیع اسلامی لائبریری تک رسائی",
        "سالانہ ریٹریٹس برائے گہرا مطالعہ اور روحانی ترقی",
        "مطالعہ شدہ متون میں روایتی اجازہ",
        "آخری سال میں تخصص کا موقع",
      ],
      ar: [
        "منهج شامل يغطي جميع العلوم الإسلامية الأساسية",
        "دراسة اللغة العربية الكلاسيكية والنصوص التراثية المهمة",
        "تقييمات منتظمة وتغذية راجعة",
        "مشروعات بحثية وعروض تقديمية",
        "الوصول إلى مكتبة إسلامية واسعة",
        "خلوات سنوية للدراسة المكثفة والتزكية الروحية",
        "إجازة تقليدية في النصوص المدروسة",
        "فرصة للتخصص في السنة الأخيرة",
      ],
    },
    objectives: {
      en: [
        "Develop a comprehensive and systematic understanding of Islamic sciences",
        "Build the ability to engage with classical Islamic texts in their original language",
        "Cultivate research skills and methodological approaches to Islamic studies",
        "Develop the capacity to derive rulings and guidance from Islamic sources",
        "Understand and address contemporary issues from an Islamic perspective",
        "Prepare students to become educators, leaders, and contributors in their communities",
        "Nurture a deep connection with Islamic tradition while engaging with modernity",
      ],
      ur: [
        "اسلامی علوم کی جامع اور منظم سمجھ پیدا کریں",
        "کلاسیکی اسلامی متون کے ساتھ ان کی اصل زبان میں تعامل کی صلاحیت پیدا کریں",
        "تحقیقی اور علمی مہارتوں کو فروغ دیں",
        "اسلامی ذرائع سے احکام و رہنمائی اخذ کرنے کی صلاحیت حاصل کریں",
        "اسلامی زاویۂ نظر سے جدید مسائل کو سمجھیں اور حل کریں",
        "طلباء کو اپنی برادریوں میں معلم، رہنما اور خدمت گزار بننے کے قابل بنائیں",
        "اسلامی روایت سے گہرا تعلق استوار کریں اور جدیدیت سے توازن رکھیں",
      ],
      ar: [
        "تطوير فهم شامل ومنهجي للعلوم الإسلامية",
        "اكتساب القدرة على التعامل مع النصوص الإسلامية الكلاسيكية بلغتها الأصلية",
        "تنمية المهارات البحثية والمنهجية في الدراسات الإسلامية",
        "القدرة على استنباط الأحكام والإرشادات من المصادر الإسلامية",
        "فهم القضايا المعاصرة ومعالجتها من منظور إسلامي",
        "تأهيل الطلاب ليكونوا معلمين وقادة وفاعلين في مجتمعاتهم",
        "تعميق الارتباط بالتقليد الإسلامي مع الانفتاح على العصر",
      ],
    },
  },
  {
    id: "fiqh-us-seerah",
    title: {
      en: "Fiqh-us-Seerah",
      ur: "فقہ السیرۃ",
      ar: "فقه السيرة",
    },
    author: {
      en: "Muhammad Al Ghazali",
      ur: "محمد الغزالی",
      ar: "محمد الغزالي",
    },
    description: {
      en: "A course that dives in the deep contemplation on the journey of campaignal strategies of Prophet Muhammad SAW for the building of Islam.",
      ur: "یہ کورس نبی کریم ﷺ کی اسلامی تعمیر کے لیے جدوجہد اور حکمتِ عملی کے گہرے پہلوؤں پر غور و فکر کے لیے ترتیب دیا گیا ہے۔",
      ar: "دورة تتعمق في دراسة استراتيجية النبي محمد ﷺ في بناء الإسلام ونشر دعوته المباركة.",
    },
    longDescription: {
      en: "Fiqh-us-Seerah (فقہ السیرۃ) is an enriching course based on the work of Sheikh Muhammad Al Ghazali...",
      ur: "فقہ السیرۃ شیخ محمد الغزالی کی معروف تصنیف پر مبنی ایک علمی اور روحانی کورس ہے، جو نبی کریم ﷺ کی سیرت کو حکمت، قیادت اور امت سازی کے زاویے سے سمجھنے میں مدد دیتا ہے...",
      ar: "فقه السيرة دورة علمية مستندة إلى كتاب الشيخ محمد الغزالي، تهدف إلى دراسة حياة النبي ﷺ من زاوية المنهج القيادي والتربوي لبناء الأمة الإسلامية...",
    },
    image: "/images/programs/seerah.png",
    duration: {
      en: "1 Year",
      ur: "ایک سال",
      ar: "سنة واحدة",
    },
    schedule: {
      en: "Every Friday",
      ur: "ہر جمعہ",
      ar: "كل يوم جمعة",
    },
    startDate: {
      en: "September 2023",
      ur: "ستمبر 2023",
      ar: "سبتمبر 2023",
    },
    students: 85,
    category: Category.RegularStudies,
    featured: true,
    enrollmentUrl: "https://forms.google.com/mafaaheem-fiqa-us-seerah-enrollment",
    instructors: [
      {
        name: {
          en: "Shaykh Abdul Haseeb",
          ur: "شیخ عبدالحسیب",
          ar: "شیخ عبدالحسیب"
        },
        role: {
          en: "Lead Instructor",
          ur: "مرکزی مدرس",
          ar: "المدرس الرئيسي",
        },
        image: "/images/team/shaykh.jpg",
      },
    ],
    modules: [
      {
        title: {
          en: "Module 1: Context of Revelation",
          ur: "ماڈیول 1: وحی کا پس منظر",
          ar: "الوحدة 1: سياق الوحي",
        },
        lessons: 8,
        duration: {
          en: "2 months",
          ur: "دو ماہ",
          ar: "شهران",
        },
      },
      {
        title: {
          en: "Module 2: Makkah Phase – Preparation & Patience",
          ur: "ماڈیول 2: مکی دور — تیاری اور صبر",
          ar: "الوحدة 2: المرحلة المكية – الإعداد والصبر",
        },
        lessons: 10,
        duration: {
          en: "3 months",
          ur: "تین ماہ",
          ar: "ثلاثة أشهر",
        },
      },
      {
        title: {
          en: "Module 3: Madinah Phase – State Building & Strategy",
          ur: "ماڈیول 3: مدنی دور — ریاست سازی اور حکمتِ عملی",
          ar: "الوحدة 3: المرحلة المدنية – بناء الدولة والاستراتيجية",
        },
        lessons: 12,
        duration: {
          en: "4 months",
          ur: "چار ماہ",
          ar: "أربعة أشهر",
        },
      },
      {
        title: {
          en: "Module 4: Lessons in Leadership & Legacy",
          ur: "ماڈیول 4: قیادت اور وراثت کے اسباق",
          ar: "الوحدة 4: دروس في القيادة والإرث النبوي",
        },
        lessons: 8,
        duration: {
          en: "3 months",
          ur: "تین ماہ",
          ar: "ثلاثة أشهر",
        },
      },
    ],
    features: {
      en: [
        "Based on the renowned book by Muhammad Al Ghazali",
        "Strategic and thematic analysis of the Seerah",
        "Focus on the Prophet's ﷺ training of the companions",
        "Live sessions with opportunity for Q&A",
        "Supplementary reading materials and summaries",
        "Reflection assignments to deepen understanding",
        "Application of Seerah lessons to modern challenges",
      ],
      ur: [
        "محمد الغزالی کی مشہور کتاب پر مبنی",
        "سیرت کا حکمتِ عملی اور موضوعاتی تجزیہ",
        "نبی کریم ﷺ کی صحابہ کی تربیت پر توجہ",
        "سوال و جواب کے مواقع کے ساتھ براہِ راست سیشنز",
        "اضافی مطالعہ کا مواد اور خلاصے فراہم کیے جائیں گے",
        "سمجھ کو گہرا کرنے کے لیے غور و فکر کی سرگرمیاں",
        "عصرِ حاضر کے مسائل پر سیرت کے عملی اطلاقات",
      ],
      ar: [
        "مبني على الكتاب الشهير لمحمد الغزالي",
        "تحليل استراتيجي وموضوعي للسيرة النبوية",
        "التركيز على تربية النبي ﷺ للصحابة الكرام",
        "جلسات مباشرة مع فرصة للأسئلة والأجوبة",
        "مواد قراءة إضافية وملخصات",
        "مهام تأمل لتعميق الفهم",
        "تطبيق دروس السيرة على التحديات المعاصرة",
      ],
    },
    objectives: {
      en: [
        "Develop a deep understanding of the Seerah beyond biography",
        "Understand the Prophet's ﷺ approach to building an Islamic society",
        "Analyze the principles behind prophetic leadership and strategy",
        "Extract timeless lessons for contemporary Muslim life",
        "Instill love and reverence for the Prophet Muhammad ﷺ",
        "Equip students to convey the Seerah meaningfully to others",
      ],
      ur: [
        "سیرت کو محض سوانح نہیں بلکہ حکمت و بصیرت کے طور پر سمجھیں",
        "نبی کریم ﷺ کے معاشرہ سازی کے طریقے کو سمجھیں",
        "نبوی قیادت اور حکمتِ عملی کے اصولوں کا تجزیہ کریں",
        "عصرِ حاضر کی زندگی کے لیے سیرت سے سبق حاصل کریں",
        "نبی کریم ﷺ کی محبت اور احترام کو دلوں میں بٹھائیں",
        "طلباء کو سیرت کو مؤثر انداز میں دوسروں تک پہنچانے کے قابل بنائیں",
      ],
      ar: [
        "تكوين فهم عميق للسيرة يتجاوز الجانب التاريخي",
        "فهم منهج النبي ﷺ في بناء المجتمع الإسلامي",
        "تحليل مبادئ القيادة والاستراتيجية النبوية",
        "استخلاص الدروس الخالدة للحياة المعاصرة",
        "غرس محبة النبي ﷺ وتعظيمه في القلوب",
        "تمكين الطلاب من نقل السيرة بفاعلية ومعنى للآخرين",
      ],
    },
  },
]