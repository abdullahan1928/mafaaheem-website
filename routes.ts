function withPrefix<T extends Record<string, any>>(
  prefix: string,
  routes: T
): T {
  const normalize = (p: string) =>
    p.startsWith("/") ? p : `${prefix}${p ? "/" + p : ""}`;

  function deepMap(obj: unknown): unknown {
    if (typeof obj === "string") {
      return normalize(obj);
    }
    if (typeof obj === "function") {
      return (...args: unknown[]) => {
        // Call as unknown and normalize result if string
        const res = (obj as (...a: unknown[]) => unknown)(...args)
        return typeof res === 'string' ? normalize(res) : res
      };
    }
    if (typeof obj === "object" && obj !== null) {
      const mapped: Record<string, unknown> = {};
      for (const key in obj as Record<string, unknown>) {
        mapped[key] = deepMap((obj as Record<string, unknown>)[key]);
      }
      return mapped;
    }
    return obj;
  }

  return deepMap(routes) as T;
}

export const ROUTES = {
  PUBLIC: {
    HOME: "/",
    COURSES: withPrefix("/courses", {
      LIST: "",
      VIEW: (id: string) => `${id}`,
    }),
    TEAM: "/team",
    EVENTS: withPrefix("/events", {
      LIST: "",
      VIEW: (id: string) => `${id}`,
    }),
    BLOGS: withPrefix("/blogs", {
      LIST: "",
      VIEW: (id: string) => `${id}`,
    })
  },

  AUTH: {
    LOGIN: "/login",
  },

  DASHBOARD: withPrefix("/dashboard", {
    INDEX: "",
    BLOGS: withPrefix("blogs", {
      LIST: "",
      EDIT: (slug: string) => `${slug}`,
      NEW: "new",
    }),
    EVENTS: withPrefix("events", {
      LIST: "",
      EDIT: (id: string) => `${id}`,
      NEW: "new",
    }),
    COURSES: withPrefix("courses", {
      LIST: "",
      EDIT: (slug: string) => `${slug}`,
      NEW: "new",
    }),
  }),
};

export type RouteConfig = typeof ROUTES;