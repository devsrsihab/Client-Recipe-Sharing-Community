"use server";

import axiosInstance from "@/src/lib/AxiosInstance";
import { IRecipe } from "@/src/types";

export const getRecipes = async () => {
  try {
    const res = await axiosInstance.get("/recipes");
    return res.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// create recipe
export const createRecipe = async (recipeData: Partial<IRecipe>) => {
  try {
    const res = await axiosInstance.post("/recipes", recipeData);
    return res.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// get recipe details
export const getRecipeDetails = async (recipeId: string) => {
  try {
    const res = await axiosInstance.get(`/recipes/${recipeId}`);
    return res.data;
  } catch (error: any) {
    throw new Error(error);
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
  } catch (error: any) {
    throw new Error(error);
  }
};

// delete recipe
export const deleteRecipe = async (recipeId: string) => {
  try {
    const res = await axiosInstance.delete(`/recipes/${recipeId}`);
    return res.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// upvote recipe
export const upvoteRecipe = async (recipeId: string) => {
  try {
    const res = await axiosInstance.post(`/recipes/${recipeId}/upvote`);
    return res.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// downvote recipe
export const downvoteRecipe = async (recipeId: string) => {
  try {
    const res = await axiosInstance.post(`/recipes/${recipeId}/downvote`);
    return res.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// make recipe comment
export const makeRecipeComment = async (recipeId: string, comment: string) => {
  try {
    const res = await axiosInstance.post(`/comments`, {
      recipeId,
      comment,
    });
    return res.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// get recipe comments
export const getRecipeComments = async (
  recipeId: string,
  page: number = 1,
  limit: number = 10
) => {
  try {
    const res = await axiosInstance.get(`/comments/recipe/${recipeId}`, {
      params: { page, limit },
    });
    return {
      data: res.data.data,
      meta: res.data.meta,
    };
  } catch (error: any) {
    throw new Error(error);
  }
};

// make recipe rating
export const makeRecipeRating = async (recipeId: string, rating: number) => {
  try {
    const res = await axiosInstance.post(`/ratings`, {
      recipeId,
      rating,
    });
    return res.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// get recipe rating
export const getRecipeRating = async (recipeId: string) => {
  try {
    const res = await axiosInstance.get(`/ratings/recipe/${recipeId}`);
    return res.data;
  } catch (error: any) {
    throw new Error(error);
  }
};
