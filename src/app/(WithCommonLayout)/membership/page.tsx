import UserMembershipComponent from "@/src/components/modules/membership";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Membership Plans | SRS RecipeX",
    template: `%s | Membership - SRS RecipeX`,
  },
  description:
    "Explore our exclusive membership plans and benefits. Join our community to access premium features, special discounts, and more.",
  keywords: "membership, plans, benefits, premium access, community, discounts",
  openGraph: {
    title: "Exclusive Membership Plans | SRS RecipeX",
    description:
      "Join our community and unlock premium features, special discounts, and more with our exclusive membership plans.",
    type: "website",
    url: "https://srsrecipex.com/membership",
    siteName: "SRS RecipeX",
    images: [
      {
        url: "https://i.ibb.co.com/rxLqsPL/Untitled-design.jpg",
        width: 1200,
        height: 630,
        alt: "SRS RecipeX Membership Plans",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Exclusive Membership Plans | SRS RecipeX",
    description:
      "Join our community and unlock premium features, special discounts, and more with our exclusive membership plans.",
    site: "@SRSRecipeX",
    images: ["https://srsrecipex.com/images/membership-twitter.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const MembershipPage = () => {
  return <UserMembershipComponent />;
};

export default MembershipPage;
