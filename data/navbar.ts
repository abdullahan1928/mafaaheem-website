import { ROUTES } from "@/routes";

export const navLinks = [
  {
    name: { en: "Home", ur: "ہوم", ar: "الرئيسية" },
    path: ROUTES.PUBLIC.HOME
  },
  {
    name: { en: "Courses", ur: "کورسز", ar: "الدورات" },
    path: ROUTES.PUBLIC.COURSES.LIST
  },
  {
    name: { en: "Events", ur: "ایونٹس", ar: "الفعاليات" },
    path: ROUTES.PUBLIC.EVENTS.LIST
  },
  {
    name: { en: "Blogs", ur: "بلاگز", ar: "المدونات" },
    path: ROUTES.PUBLIC.BLOGS.LIST
  },
  {
    name: { en: "About Us", ur: "ہمارے بارے میں", ar: "من نحن" },
    path: ROUTES.PUBLIC.TEAM
  },
]

export const contactContent = { en: "Contact Us", ur: "رابطہ کریں", ar: "اتصل بنا" }