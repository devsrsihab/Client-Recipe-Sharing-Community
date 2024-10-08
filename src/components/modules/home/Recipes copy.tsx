"use client";

import Card from "../../UI/Card";
import { useGetRecipeFeeds } from "@/src/hooks/recipe.hook";
import LoadingSpinner from "../../UI/LoadingSpinner";
import { IRecipe } from "@/src/types";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect, useCallback } from "react";

const Recipes = ({ isCardHeader = true }: { isCardHeader?: boolean }) => {
  const [recipeList, setRecipeList] = useState<IRecipe[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { data, isLoading, isError, refetch } = useGetRecipeFeeds(page);

  const loadRecipes = useCallback(() => {
    refetch().then((result) => {
      if (result.data) {
        setRecipeList((prevList) => [...prevList, ...result.data.data]);
        const { page: currentPage, totalPage } = result.data.meta;
        setHasMore(currentPage < totalPage);
      }
    });
  }, [refetch]);

  useEffect(() => {
    loadRecipes();
  }, [loadRecipes]);

  const fetchMoreData = () => {
    if (hasMore && !isLoading) {
      setPage((prevPage) => prevPage + 1);
      loadRecipes();
    }
  };

  if (isLoading && page === 1) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <div>Error fetching recipes</div>;
  }

  return (
    <div>
      {isCardHeader && (
        <div className="section-title my-10">
          <h2 className="mb-2 text-center text-2xl">Latest Recipes</h2>
          <p className="text-center">
            Discover our most recent culinary creations and cooking inspirations
          </p>
        </div>
      )}

      <InfiniteScroll
        dataLength={recipeList.length} // Length of the current recipes array
        next={fetchMoreData} // Function to fetch more data when scrolled down
        hasMore={hasMore} // Boolean to trigger further fetching
        loader={<LoadingSpinner />} // Loader while fetching new recipes
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
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
