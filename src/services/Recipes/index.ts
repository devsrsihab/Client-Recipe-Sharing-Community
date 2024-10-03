"use server";

import axiosInstance from "@/src/lib/AxiosInstance";
import { IRecipe } from "@/src/types";

export const getRecipes = async () => {
  try {
    const res = await axiosInstance.get("/recipes");
    return res.data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw new Error("Failed to fetch data");
  }
};

// create recipe
export const createRecipe = async (recipeData: Partial<IRecipe>) => {
  try {
    const res = await axiosInstance.post("/recipes", recipeData);
    return res.data;
  } catch (error) {
    console.error("Failed to create recipe:", error);
    throw new Error("Failed to create recipe");
  }
};
