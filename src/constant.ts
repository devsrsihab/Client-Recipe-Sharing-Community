export const protectedRoutes = [
  "/profile",
  "/profile/:page*",
  "/admin",
  "/auth/login",
  "/auth/register",
];

// user role
export const USER_ROLE = [
  {
    key: "user",
    label: "user",
  },
  {
    key: "admin",
    label: "admin",
  },
];
