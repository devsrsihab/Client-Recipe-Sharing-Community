"use client";

import Card from "../../UI/Card";
import { useGetRecipes } from "@/src/hooks/recipe.hook";
import LoadingSpinner from "../../UI/LoadingSpinner";
import { IRecipe } from "@/src/types";

const Recipes = ({ isCardHeader = true }: { isCardHeader?: boolean }) => {
  const { data, isLoading, isError } = useGetRecipes();
  const recipes = data?.data;

  // loading state
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // error state
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3  ">
        {recipes?.map((recipe: IRecipe) => (
          <Card key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Recipes;
