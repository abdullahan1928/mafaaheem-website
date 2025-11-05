export function formatDateWithLanguage(date?: string | Date, lang: "en" | "ur" | "ar" = "en") {
  if (!date) return "";
  try {
    const d = date instanceof Date ? date : new Date(date);
    const day = d.getDate();
    const year = d.getFullYear();
    const month = d.getMonth();

    const monthNames = {
      en: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      ],
      ur: [
        "جنوری", "فروری", "مارچ", "اپریل", "مئی", "جون",
        "جولائی", "اگست", "ستمبر", "اکتوبر", "نومبر", "دسمبر",
      ],
      ar: [
        "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
        "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر",
      ],
    };

    const monthName =
      monthNames[lang]?.[month] ?? monthNames.en[month];

    if (lang === "ar" || lang === "ur") {
      return `${day} ${monthName} ${year}`;
    }

    return `${monthName} ${day}, ${year}`;
  } catch {
    return String(date);
  }
}
