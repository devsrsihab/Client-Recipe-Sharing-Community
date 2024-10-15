export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "SRS RecipeX",
  description: "SRS RecipeX where you can find recipes and share your own",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Membership",
      href: "/membership",
    },
    {
      label: "Contact",
      href: "/contact",
    },
    {
      label: "About",
      href: "/about",
    },

    {
      label: "Login",
      href: "/auth/login",
    },
    {
      label: "Register",
      href: "/auth/register",
    },
  ],

  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Membership",
      href: "/membership",
    },
    {
      label: "Contact",
      href: "/contact",
    },
    {
      label: "About",
      href: "/about",
    },

    {
      label: "Login",
      href: "/auth/login",
    },
    {
      label: "Register",
      href: "/auth/register",
    },
    {
      label: "Dashboard",
      href: `/user/dashboard`,
    },
    {
      label: "Dashboard",
      href: `/admin/dashboard`,
    },
  ],
};
