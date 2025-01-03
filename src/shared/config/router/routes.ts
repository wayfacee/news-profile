export const ROUTES = {
  appRoute: "/",

  profile: {
    route: "profile",
    page: "/profile",
    edit: {
      route: "edit",
      page: "/profile/edit",
    },
  },

  news: {
    route: "news",
    page: "/news",
    new: {
      route: "new",
      page: "/news/:id",
    },
  },

  auth: {
    route: "auth",
    login: {
      route: "login",
      page: "/auth/login",
    },
    register: {
      route: "register",
      page: "/auth/register",
    },
    "forgot-password": {
      route: "forgot-password",
      page: "/auth/forgot-password",
    },
    "password-recovery": {
      route: "password-recovery",
      page: "/auth/password-recovery",
    },
  },

  weather: {
    route: "weather",
    page: "/weather",
    city: {
      route: ":city",
      page: "/weather/:city",
    },
  },

  currency: {
    route: "currency",
    page: "/currency",
  },

  notFound: "*",
} as const;
