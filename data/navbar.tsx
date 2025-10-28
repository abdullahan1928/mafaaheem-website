import { ROUTES } from "@/routes";

export const navLinks = [
    {
        name: { en: "Home", ur: "ہوم", ar: "الرئيسية" },
        path: ROUTES.HOME
    },
    {
        name: { en: "Courses", ur: "کورسز", ar: "الدورات" },
        path: ROUTES.COURSES
    },
    {
        name: { en: "Events", ur: "ایونٹس", ar: "الفعاليات" },
        path: ROUTES.EVENTS
    },
    {
        name: { en: "Blogs", ur: "بلاگز", ar: "المدونات" },
        path: ROUTES.BLOGS
    },
    {
        name: { en: "About Us", ur: "ہمارے بارے میں", ar: "من نحن" },
        path: ROUTES.TEAM
    },
]

export const contactContent = { en: "Contact Us", ur: "رابطہ کریں", ar: "اتصل بنا" }