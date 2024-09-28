"use server";

import envConfig from "@/src/config/envConfig";

export const getRecentPosts = async () => {
  const fetchOptions = { next: { tags: ["GET_POSTS"] } };
  const res = await fetch(
    `${envConfig.baseApi}/items?sortBy=-createdAt`,
    fetchOptions
  );
  return res.json();
};
