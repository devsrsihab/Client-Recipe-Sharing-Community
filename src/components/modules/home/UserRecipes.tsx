"use client";

import Card from "../../UI/Card";
import LoadingSpinner from "../../UI/LoadingSpinner";
import { IRecipe } from "@/src/types";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect, useCallback } from "react";
import { useGetUserRecipes } from "@/src/hooks/userProfile.hook";
import LoadingSpinnerMini from "../../UI/LoadingSpinnerMini";

const UserRecipes = ({ userId }: { userId?: string }) => {
  const [recipeList, setRecipeList] = useState<IRecipe[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { isLoading, isError, refetch } = useGetUserRecipes(
    userId as string,
    page
  );

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
      <InfiniteScroll
        dataLength={recipeList.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<LoadingSpinnerMini />}
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

export default UserRecipes;
