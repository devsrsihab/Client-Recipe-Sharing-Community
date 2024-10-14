"use client";

import { useState, useEffect, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import Card from "../../UI/Card";

import { useGetRecipeFeeds } from "@/src/hooks/recipe.hook";
import { IRecipe } from "@/src/types";
import CardSkeleton from "../../UI/LoadingCardSkelton";
const Recipes = ({ isCardHeader = true }: { isCardHeader?: boolean }) => {
  // 1. State management
  const [recipeList, setRecipeList] = useState<IRecipe[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // 2. Fetch recipe data
  const { isLoading, isError, refetch } = useGetRecipeFeeds(page);

  // 3. Load recipes function
  const loadRecipes = useCallback(() => {
    refetch().then((result) => {
      if (result.data) {
        setRecipeList((prevList) => {
          const newRecipes = result.data.data.filter(
            (newRecipe: IRecipe) =>
              !prevList.some(
                (existingRecipe) => existingRecipe._id === newRecipe._id
              )
          );
          return [...prevList, ...newRecipes];
        });
        setHasMore(page < result.data.meta.totalPage);
      }
    });
  }, [refetch, page]);

  // 4. Initial load and updates
  useEffect(() => {
    loadRecipes();
  }, [loadRecipes]);

  // 5. Fetch more data for infinite scroll
  const fetchMoreData = () => {
    if (hasMore && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // 7. Render component
  return (
    <div>
      {/* 7a. Improved section title rendering */}
      {isCardHeader && (
        <div className="section-title mt-12 mb-8">
          <h2 className="mb-3 text-center text-3xl font-semibold text-gray-800 dark:text-gray-100">
            Latest Recipes
          </h2>
          <p className="text-center text-lg text-gray-600 dark:text-gray-300">
            Discover our most recent culinary creations and cooking inspirations
          </p>
        </div>
      )}

      {/* 7b. Conditional rendering for loading state */}
      {isLoading && page === 1 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      ) : isError ? (
        <div>Error fetching recipes</div>
      ) : (
        /* 7c. Infinite scroll implementation */
        <InfiniteScroll
          dataLength={recipeList.length} // Length of the current recipes array
          endMessage={
            <p className="text-center my-4 text-gray-500">
              <b>You have seen it all, No more recipes to show</b>
            </p>
          }
          hasMore={hasMore} // Boolean to trigger further fetching
          loader={
            <div className="flex justify-center items-center my-4">
              <div className="w-6 h-6 border-2 border-gray-900 dark:border-gray-100 border-t-transparent dark:border-t-transparent rounded-full animate-spin" />
            </div>
          }
          next={fetchMoreData} // Function to fetch more data when scrolled down
        >
          {/* 7d. Recipe grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {recipeList.map((recipe: IRecipe) => (
              <Card key={recipe._id} recipe={recipe} />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default Recipes;
