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
      en: `The البناء المنھجی is Mafaaheem Institute's flagship educational initiative, offering a structured and comprehensive approach to Islamic education over four years. This program is designed for serious students who wish to gain a deep and systematic understanding of Islamic sciences, enabling them to become knowledgeable Muslims and potential future scholars.

  The curriculum progresses methodically from foundational to advanced levels, covering all major Islamic disciplines including Quran, Hadith, Fiqh, Usul, Aqeedah, Arabic language, Islamic history, and contemporary issues. Each year builds upon the previous one, ensuring a coherent and integrated educational experience.

  The program follows a traditional approach to Islamic learning while incorporating modern educational methodologies. Students will study classical texts under qualified scholars, engage in discussions, complete research assignments, and participate in practical application of knowledge.`,
      ur: `البناء المنہجی مفاہیم انسٹیٹیوٹ کا نمایاں تعلیمی منصوبہ ہے جو چار سال پر محیط ایک منظم اور جامع اسلامی تعلیمی نصاب فراہم کرتا ہے۔ یہ پروگرام ان سنجیدہ طلبہ کے لیے تیار کیا گیا ہے جو علومِ اسلامیہ کی گہری اور منہجی سمجھ حاصل کرنا چاہتے ہیں تاکہ وہ باعلم مسلمان اور مستقبل کے ممکنہ علماء بن سکیں۔

  نصاب کو بنیاد سے لے کر اعلیٰ سطح تک مرحلہ وار ترتیب دیا گیا ہے، جس میں قرآن، حدیث، فقہ، اصول فقہ، عقیدہ، عربی زبان، اسلامی تاریخ اور معاصر مسائل سمیت تمام بنیادی اسلامی علوم شامل ہیں۔ ہر سال پچھلے سال پر تعمیر کرتا ہے، جس سے ایک مربوط اور ہم آہنگ تعلیمی تجربہ یقینی بنایا جاتا ہے۔

  پروگرام اسلامی تعلیم کے روایتی طریقۂ تدریس کو جدید تعلیمی اصولوں کے ساتھ یکجا کرتا ہے۔ طلبہ اہلِ علم اساتذہ کی نگرانی میں کلاسیکی متون کا مطالعہ کریں گے، علمی مباحث میں حصہ لیں گے، تحقیقی اسائنمنٹس مکمل کریں گے اور اپنے علم کو عملی طور پر بروئے کار لائیں گے۔`,
      ar: `برنامج البناء المنهجي هو المبادرة التعليمية الرئيسية لمعهد مفاهيم، حيث يقدم نهجاً منظماً وشاملاً للتعليم الإسلامي على مدى أربع سنوات. صُمم هذا البرنامج للطلاب الجادين الذين يسعون إلى اكتساب فهم عميق ومنهجي للعلوم الإسلامية، ليصبحوا مسلمين واعين وعلماء محتملين في المستقبل.

  يتدرج المنهج بشكل منهجي من المستويات التأسيسية إلى المستويات المتقدمة، ويغطي جميع العلوم الإسلامية الرئيسة بما في ذلك القرآن، الحديث، الفقه، أصول الفقه، العقيدة، اللغة العربية، التاريخ الإسلامي، والقضايا المعاصرة. ويُبنى كل عام على ما سبقه لضمان تجربة تعليمية متكاملة ومترابطة.

  يتبع البرنامج المنهج التقليدي في طلب العلم مع الاستفادة من الأساليب التعليمية الحديثة. سيتعلم الطلاب المتون الكلاسيكية تحت إشراف العلماء المؤهلين، ويشاركون في المناقشات، ويكملون البحوث العلمية، ويطبقون ما تعلموه عملياً.`
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
      en: `Fiqh-us-Seerah (فقہ السیرۃ) is an enriching course based on the celebrated work of Sheikh Muhammad Al Ghazali, designed to explore the life of the Prophet Muhammad ﷺ from a unique lens — one that highlights his ﷺ divine strategy, leadership, and nurturing of the noble companions (رضي الله عنهم). Rather than a chronological biography, this course offers a thematic and analytical study of the Prophet’s ﷺ mission to establish Islam, build a just society, and guide his community with wisdom and foresight.

Students will delve into the deeper wisdom behind key events, battles, treaties, and community developments — understanding not just *what* happened, but *why* it happened and *how* it reflects prophetic methodology. The course aims to foster love, admiration, and practical inspiration from the prophetic legacy.

Taught with due reverence and academic depth, the course encourages students to connect the Prophet’s ﷺ strategic approach to contemporary challenges, empowering them to apply prophetic insights in personal and societal contexts.
`,
      ur: `فقہ السیرۃ شیخ محمد الغزالی کی معروف تصنیف پر مبنی ایک علمی اور روحانی کورس ہے، جو نبی کریم ﷺ کی سیرت کو ایک منفرد زاویے سے سمجھنے کی کوشش کرتا ہے — ایسا زاویہ جو آپ ﷺ کی حکمت عملی، قیادت، اور صحابہ کرام رضی اللہ عنہم کی تربیت کو نمایاں کرتا ہے۔ یہ کورس روایتی ترتیب وار سیرت کی بجائے موضوعاتی اور تجزیاتی مطالعہ پیش کرتا ہے تاکہ اسلام کے قیام، ایک منصفانہ معاشرے کی تشکیل، اور امت کی رہنمائی کے مشن کو بہتر طور پر سمجھا جا سکے۔

طلباء اہم واقعات، جنگوں، معاہدوں اور کمیونٹی کی ترقیات کے پیچھے حکمت کو سمجھیں گے — نہ صرف یہ کہ *کیا* ہوا، بلکہ یہ بھی کہ *کیوں* ہوا اور یہ نبی ﷺ کے طریقۂ کار کو کس طرح ظاہر کرتا ہے۔ کورس کا مقصد محبت، عقیدت اور نبی ﷺ کی تعلیمات سے عملی تحریک پیدا کرنا ہے۔

احترام اور علمی گہرائی کے ساتھ پڑھایا جانے والا یہ کورس طلباء کو موجودہ دور کے چیلنجز میں نبی ﷺ کی حکمت عملی کو جوڑنے کی ترغیب دیتا ہے، تاکہ وہ اپنی ذاتی اور معاشرتی زندگی میں نبی ﷺ کے بصیرت انگیز اصولوں کو لاگو کر سکیں۔
`,
      ar: `فقه السيرة دورة علمية مستندة إلى كتاب الشيخ محمد الغزالي، تهدف إلى دراسة حياة النبي ﷺ من منظور فريد — يبرز استراتيجياته الإلهية، قيادته، ورعايته للصحابة الكرام رضي الله عنهم. بدلاً من السيرة الزمنية التقليدية، يقدم هذا الدورة دراسة موضوعية وتحليلية لمهمة النبي ﷺ في تأسيس الإسلام، بناء مجتمع عادل، وتوجيه أمته بالحكمة والبصيرة.

سيغوص الطلاب في الحكمة العميقة وراء الأحداث المهمة، المعارك، المعاهدات، وتطور المجتمع — لفهم ليس فقط *ماذا* حدث، ولكن *لماذا* حدث و*كيف* يعكس منهجية النبي ﷺ. تهدف الدورة إلى تعزيز الحب والتقدير والإلهام العملي من إرث النبي ﷺ.

تُدرس الدورة باحترام وعمق أكاديمي، وتشجع الطلاب على ربط النهج الاستراتيجي للنبي ﷺ بالتحديات المعاصرة، مما يمكنهم من تطبيق رؤى النبي ﷺ في السياقات الشخصية والمجتمعية.
`
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