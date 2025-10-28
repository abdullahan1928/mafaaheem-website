export const ROUTES = {
    HOME: "/",
    COURSES: "/courses",
    COURSE: (id: string) => `/courses/${id}`,
    TEAM: "/team",
    EVENTS: "/events",
    BLOGS: "/blogs",
    BLOG: (id: string) => `/blog/${id}`
};