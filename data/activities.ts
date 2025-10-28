import { Language } from "@/contexts/LanguageContext"
import { BookOpen, UserPlus, BookMarked, Video } from "lucide-react"

export const activitesContent = {
    en: {
        heading: "Our Activities",
        description:
            "Explore our diverse range of activities designed to enrich your learning experience and foster community engagement.",
        recordingHeading: "Recent Class Recordings",
        recordingDescription: "Access recorded sessions from our expert instructors",
        recordingWatchText: "Watch Recording",
        studyCircles: {
            title: "Study Circles",
            description:
                "Regular study circles for in-depth exploration of Islamic knowledge.",
        },
        outdoorActivities: {
            title: "Outdoor Activities",
            description: "Educational outdoor activities and trips combined with physical activity.",
        },
        educationalWorkshops: {
            title: "Educational Workshops",
            description: "Specialized workshops on various topics facilitated by experienced educators.",
        },
        onlineClasses: {
            title: "Online Classes",
            description:
                "Virtual learning sessions available to students all over the world.",
        },
    },
    ur: {
        heading: "ہماری سرگرمیاں",
        description:
            "ہماری متنوع سرگرمیوں کی رینج کو دریافت کریں جو آپ کے سیکھنے کے تجربے کو مالا مال کرنے اور کمیونٹی کی شمولیت کو فروغ دینے کے لیے ڈیزائن کی گئی ہے۔",
        recordingHeading: "حالیہ کلاس ریکارڈنگز",
        recordingDescription: "ہمارے ماہر اساتذہ سے ریکارڈ شدہ سیشنز تک رسائی حاصل کریں",
        recordingWatchText: "ریکارڈنگ دیکھیں",
        studyCircles: {
            title: "مطالعہ کے حلقے",
            description: "اسلامی علم اور تصورات کی گہری تلاش کے لیے باقاعدہ مطالعہ کے حلقے۔",
        },
        outdoorActivities: {
            title: "بیرونی سرگرمیاں",
            description: "تعلیمی سفر اور بیرونی سرگرمیاں جو سیکھنے کو جسمانی سرگرمی کے ساتھ ملاتی ہیں۔",
        },
        educationalWorkshops: {
            title: "تعلیمی ورکشاپس",
            description: "تجربہ کار تعلیم دہندگان کی طرف سے مختلف موضوعات پر خصوصی ورکشاپس۔",
        },
        onlineClasses: {
            title: "آن لائن کلاسز",
            description: "مختلف جغرافیائی مقامات سے طلباء کے لیے دستیاب ورچوئل سیکھنے کے سیشنز۔",
        },
    },
    ar: {
        heading: "أنشطتنا",
        description:
            "استكشف مجموعة أنشطتنا المتنوعة المصممة لإثراء تجربتك التعليمية وتعزيز مشاركة المجتمع.",
        recordingHeading: "تسجيلات الفصول الحديثة",
        recordingDescription: "الوصول إلى الجلسات المسجلة من مدرسينا الخبراء",
        recordingWatchText: "مشاهدة التسجيل",
        studyCircles: {
            title: "حلقات الدراسة",
            description: "حلقات دراسية منتظمة للاستكشاف المتعمق للمعرفة الإسلامية والمفاهيم.",
        },
        outdoorActivities: {
            title: "الأنشطة الخارجية",
            description: "الرحلات التعليمية والأنشطة الخارجية التي تجمع بين التعلم والنشاط البدني.",
        },
        educationalWorkshops: {
            title: "ورش العمل التعليمية",
            description: "ورش عمل متخصصة حول مواضيع مختلفة يسهلها معلمون ذوو خبرة.",
        },
        onlineClasses: {
            title: "الفصول الدراسية عبر الإنترنت",
            description: "جلسات التعلم الافتراضية المتاحة للطلاب من مواقع جغرافية مختلفة.",
        },
    },
}

export const getActivities = (language: Language) => [
    {
        id: 1,
        title: activitesContent[language].studyCircles.title,
        description: activitesContent[language].studyCircles.description,
        icon: BookOpen,
        image: "/images/study-circle.jpeg",
    },
    {
        id: 2,
        title: activitesContent[language].outdoorActivities.title,
        description: activitesContent[language].outdoorActivities.description,
        icon: UserPlus,
        image: "/images/outdoor.jpeg",

    },
    {
        id: 3,
        title: activitesContent[language].educationalWorkshops.title,
        description: activitesContent[language].educationalWorkshops.description,
        icon: BookMarked,
        image: "/images/educational-workshop.jpeg",
    },
    {
        id: 4,
        title: activitesContent[language].onlineClasses.title,
        description: activitesContent[language].onlineClasses.description,
        icon: Video,
        image: "/images/online.png",
    },
]

export const classRecordings = [
    {
        id: "1",
        title: "الطريق الى القرآن",
        posterUrl: "/images/books/the-way-to-the-Quran.jpg",
        driveLink:
            "https://drive.google.com/file/d/1PLRaKMlOqrBGwCqyUou5kBZuiHFbF_b4/view?usp=drive_link",
        date: "January 25, 2025",
        instructor: "استاذ عبدالحسيب عثمانى",
        backgroundY: "24%",
    },
    {
        id: "2",
        title: "القبس الوھاج",
        posterUrl: "/images/books/qabas-al-wahaj.jpg",
        driveLink:
            "https://drive.google.com/file/d/1pflE21EtmJGDwQQJgVtjONlrkcZNW-Id/view?usp=drive_link",
        date: "Mar 10, 2025",
        instructor: "محمد احمد فراز ",
        backgroundY: "10%",
    },
    {
        id: "3",
        title: "البناء العقدي",
        posterUrl: "/images/books/bina-al-aqdi.jpeg",
        driveLink:
            "https://drive.google.com/file/d/1seQr5yKeACpYD3LWRx5wFSfLBdLQg2sL/view?usp=sharing",
        date: "Mar 10, 2025",
        instructor: "حمزہ نبیل",
        backgroundY: "10%",
    },
]
