"use client";

import Card from "../../UI/Card";
import { useGetRecipeFeeds } from "@/src/hooks/recipe.hook";
import LoadingSpinner from "../../UI/LoadingSpinner";
import { IRecipe } from "@/src/types";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect, useCallback } from "react";

const Recipes = ({ isCardHeader = true }: { isCardHeader?: boolean }) => {
  // 1. State management
  const [recipeList, setRecipeList] = useState<IRecipe[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // 2. Fetch recipe data
  const { data, isLoading, isError, refetch } = useGetRecipeFeeds(page);

  // 3. Load recipes function
  const loadRecipes = useCallback(() => {
    refetch().then((result) => {
      if (result.data) {
        setRecipeList((prevList) => [...prevList, ...result.data.data]);
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

  // 6. Conditional rendering
  if (isLoading && page === 1) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <div>Error fetching recipes</div>;
  }

  // 7. Render component
  return (
    <div>
      {/* 7a. Conditional header rendering */}
      {isCardHeader && (
        <div className="section-title my-10">
          <h2 className="mb-2 text-center text-2xl">Latest Recipes</h2>
          <p className="text-center">
            Discover our most recent culinary creations and cooking inspirations
          </p>
        </div>
      )}

      {/* 7b. Infinite scroll implementation */}
      <InfiniteScroll
        dataLength={recipeList.length} // Length of the current recipes array
        next={fetchMoreData} // Function to fetch more data when scrolled down
        hasMore={hasMore} // Boolean to trigger further fetching
        loader={
          <div className="flex justify-center items-center my-4">
            <div className="w-6 h-6 border-2 border-gray-900 dark:border-gray-100 border-t-transparent dark:border-t-transparent rounded-full animate-spin"></div>
          </div>
        }
        endMessage={
          <p className="text-center my-4 text-gray-500">
            <b>You have seen it all, No more recipes to show</b>
          </p>
        }
      >
        {/* 7c. Recipe grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {recipeList.map((recipe: IRecipe) => (
            <Card key={recipe._id} recipe={recipe} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Recipes;
