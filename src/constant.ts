export const protectedRoutes = [
  "/user",
  "/user/:page*",
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

// recipe status
export const RECIPE_STATUS_OPTIONS = [
  {
    key: "pending",
    label: "pending",
  },
  {
    key: "published",
    label: "published",
  },
  {
    key: "unpublished",
    label: "unpublished",
  },
  {
    key: "private",
    label: "private",
  },
];

// recipe ispaid
export const RECIPE_ISPAID_OPTIONS = [
  {
    key: "true",
    label: "Yes",
  },
  {
    key: "false",
    label: "No",
  },
];
