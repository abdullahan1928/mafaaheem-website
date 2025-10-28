import { Language } from "@/contexts/LanguageContext"
import { Scale, Lightbulb, Shield, Target } from "lucide-react"

export const valuesContent = {
  en: {
    valuesHeading: "Our Core Values",
    valuesDescription: "The principles that guide our approach to education and development.",
    objectiveHeading: "Strategic Objectives",
    objectiveDescription: "Building the future through strategic education",
    values: [
      {
        title: "Moderation",
        subtitle: "Wasatiyyah",
        description:
          "Balancing divine constants with modern exigencies, following the middle path that Islam advocates.",
      },
      {
        title: "Innovation",
        subtitle: "Ibtikaar",
        description:
          "Devising practical solutions to modern challenges while staying true to Islamic principles.",
      },
      {
        title: "Authenticity",
        subtitle: "Asalah",
        description:
          "Anchoring all endeavors in Islamic principles while embracing beneficial tools and methodologies.",
      },
      {
        title: "Purposefulness",
        subtitle: "Qasadiyyah",
        description:
          "Replacing distractions with productive endeavors that contribute to personal and community growth.",
      },
    ],
    objectives: [
      {
        title: "Solidifying Islamic Foundations:",
        description:
          "Structured courses in Aqeedah, Fiqh, Tafsir, and Hadith.",
      },
      {
        title: "Comprehensive Ethical Training:",
        description:
          "Developing morally balanced individuals for community-based reform initiatives.",
      },
      {
        title: "Intellectual Resilience:",
        description:
          "Countering destructive ideologies with rooted Islamic methodologies.",
      },
      {
        title: "Leadership Development:",
        description:
          "Training impactful leaders committed to positive change.",
      },
    ],
  },
  ur: {
    valuesHeading: "ہماری بنیادی اقدار",
    valuesDescription:
      "وہ اصول جو تعلیم اور ترقی کے لیے ہماری رہنمائی کرتے ہیں۔",
    objectiveHeading: "حکمتِ عملی کے مقاصد",
    objectiveDescription: "حکمتِ عملی تعلیم کے ذریعے مستقبل کی تعمیر۔",
    values: [
      {
        title: "اعتدال",
        subtitle: "وسطيہ",
        description:
          "الہی اصولوں کو جدید ضروریات کے ساتھ متوازن کرتے ہوئے اسلام کے درمیانی راستے پر چلنا۔",
      },
      {
        title: "ابتکار",
        subtitle: "ابتکار",
        description:
          "اسلامی اصولوں پر عمل کرتے ہوئے جدید چیلنجوں کے عملی حل تیار کرنا۔",
      },
      {
        title: "اصالت",
        subtitle: "اصالت",
        description:
          "تمام کوششوں کو اسلامی اصولوں میں جڑ دیتے ہوئے فائدہ مند اوزار اور طریقے اپنانا۔",
      },
      {
        title: "مقصدیت",
        subtitle: "قصديہ",
        description:
          "غیر ضروری مصروفیات کو ایسی نتیجہ خیز کوششوں سے بدلنا جو ذاتی اور اجتماعی ترقی میں حصہ ڈالیں۔",
      },
    ],
    objectives: [
      {
        title: "اسلامی بنیادوں کو مضبوط کرنا:",
        description: "عقیدہ، فقہ، تفسیر، اور حدیث میں منظم کورسز۔",
      },
      {
        title: "جامع اخلاقی تربیت:",
        description:
          "کمیونٹی پر مبنی اصلاح کی شراکت کے لیے اخلاقی طور پر متوازن افراد کی ترقی۔",
      },
      {
        title: "فکری لچک:",
        description:
          "تخریب کن نظریات کا مقابلہ جڑے ہوئے اسلامی طریقوں سے کریں۔",
      },
      {
        title: "قیادت کی ترقی:",
        description:
          "مثبت قیادت کی تربیت جو مثبت تبدیلی کے لیے پرعزم ہو۔",
      },
    ],
  },
  ar: {
    valuesHeading: "قيمنا الأساسية",
    valuesDescription:
      "المبادئ التي توجه نهجنا في التعليم والتطوير.",
    objectiveHeading: "الأهداف الاستراتيجية",
    objectiveDescription: "بناء المستقبل من خلال التعليم الاستراتيجي.",
    values: [
      {
        title: "الاعتدال",
        subtitle: "الوسطيّة",
        description:
          "موازنة الثوابت الإلهية مع الضروريات الحديثة، متبعاً الطريق الوسط الذي يدعو إليه الإسلام.",
      },
      {
        title: "الابتكار",
        subtitle: "الابتكار",
        description:
          "ابتكار حلول عملية للتحديات الحديثة مع البقاء وفياً للمبادئ الإسلامية.",
      },
      {
        title: "الأصالة",
        subtitle: "الأصالة",
        description:
          "تثبيت جميع الجهود في المبادئ الإسلامية مع احتضان الأدوات والمنهجيات المفيدة.",
      },
      {
        title: "القصدية",
        subtitle: "القصدية",
        description:
          "استبدال الانحرافات بمساعي منتجة تساهم في النمو الشخصي والمجتمعي.",
      },
    ],
    objectives: [
      {
        title: "تعزيز الأسس الإسلامية:",
        description: "دورات منظمة في العقيدة والفقه والتفسير والحديث.",
      },
      {
        title: "التدريب الأخلاقي الشامل:",
        description:
          "تطوير أفراد متوازنين أخلاقياً لمبادرات الإصلاح القائمة على المجتمع.",
      },
      {
        title: "المرونة الفكرية:",
        description:
          "مواجهة الأيديولوجيات المدمرة بمنهجيات إسلامية راسخة.",
      },
      {
        title: "تطوير القيادة:",
        description:
          "تدريب القادة المؤثرين الملتزمين بالتغيير الإيجابي.",
      },
    ],
  },
}

export const getValues = (language: Language) => {
  const values = valuesContent[language].values
  const icons = [Scale, Lightbulb, Shield, Target]
  const colors = [
    {
      color: "from-mafaaheem-gold/10 to-mafaaheem-gold/5",
      iconColor: "text-mafaaheem-gold",
      borderColor: "border-mafaaheem-gold/30",
    },
    {
      color: "from-mafaaheem-green/10 to-mafaaheem-green/5",
      iconColor: "text-mafaaheem-green",
      borderColor: "border-mafaaheem-green/30",
    },
    {
      color: "from-mafaaheem-brown/10 to-mafaaheem-brown/5",
      iconColor: "text-mafaaheem-brown",
      borderColor: "border-mafaaheem-brown/30",
    },
    {
      color: "from-blue-500/10 to-blue-500/5",
      iconColor: "text-blue-600",
      borderColor: "border-blue-500/30",
    },
  ]

  return values.map((item, index) => ({
    id: index + 1,
    ...item,
    icon: icons[index],
    ...colors[index],
  }))
}

export const getObjectives = (language: Language) => {
  return valuesContent[language].objectives
}
