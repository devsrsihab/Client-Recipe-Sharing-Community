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

// get recipe details
export const getRecipeDetails = async (recipeId: string) => {
  try {
    const res = await axiosInstance.get(`/recipes/${recipeId}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch recipe details:", error);
    throw new Error("Failed to fetch recipe details");
  }
};

// update recipe
export const updateRecipe = async (
  recipeId: string,
  recipeData: Partial<IRecipe>
) => {
  try {
    const res = await axiosInstance.put(`/recipes/${recipeId}`, recipeData);
    return res.data;
  } catch (error) {
    console.error("Failed to update recipe:", error);
    throw new Error("Failed to update recipe");
  }
};
