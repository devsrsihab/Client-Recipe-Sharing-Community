"use client";

import RecipeDetailsLoader from "@/src/components/UI/RecipeDetailsLoader";
import { useUser } from "@/src/context/user.provider";
import {
  useDownvoteRecipeMutation,
  useGetRecipeDetails,
  useUpvoteRecipeMutation,
} from "@/src/hooks/recipe.hook";
import { StarIcon } from "@heroicons/react/20/solid";
import { Button } from "@nextui-org/button";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { DownvotedIcon, UpvotedIcon } from "@/src/config/icons";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

// Add this helper function
function isUserCreator(recipe: any, userId: string | undefined): boolean {
  if (!userId) return false;
  if (Array.isArray(recipe.createdBy)) {
    return recipe.createdBy.includes(userId);
  }
  if (typeof recipe.createdBy === "string") {
    return recipe.createdBy === userId;
  }
  if (typeof recipe.createdBy === "object" && recipe.createdBy !== null) {
    return recipe.createdBy._id === userId;
  }
  return false;
}

export default function RecipeDetails({
  params,
}: {
  params: { recipId: string };
}) {
  const { recipId } = params;
  const { data, isLoading, isError } = useGetRecipeDetails(recipId);
  const { user } = useUser();
  const recipe = data?.data;

  const { mutate: upvoteRecipe, isPending: isUpvoteLoading } =
    useUpvoteRecipeMutation();
  const { mutate: downvoteRecipe, isPending: isDownvoteLoading } =
    useDownvoteRecipeMutation();

  const hasUpvoted = user && recipe?.upvotedBy?.includes(user._id);
  const hasDownvoted = user && recipe?.downvotedBy?.includes(user._id);

  // upvote recipe
  const handleUpvoted = () => {
    upvoteRecipe(recipId);
  };
  // downvoted recipe
  const handleDownvoted = () => {
    downvoteRecipe(recipId);
  };

  if (isLoading)
    return (
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
          <RecipeDetailsLoader />
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="text-center py-10 text-red-500">Error loading recipe</div>
    );
  if (!recipe) return <div className="text-center py-10">Recipe not found</div>;

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* Image */}
          <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="h-full w-full object-cover object-center"
            />
          </div>

          {/* Recipe info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight">
              {recipe.title}
            </h1>

            <div className="mt-3 flex items-center">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={classNames(
                      recipe.ratings.length > rating
                        ? "text-yellow-400"
                        : "text-gray-300 dark:text-gray-600",
                      "h-5 w-5 flex-shrink-0"
                    )}
                  />
                ))}
              </div>
              <p className="ml-3 text-sm">{recipe.ratings.length} ratings</p>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium">Description</h3>
              <div className="mt-2 capitalize text-sm">
                {recipe.description}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium">Category</h3>
              <div className="mt-2 text-sm">{recipe.category.name}</div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium">Preparation Time</h3>
              <div className="mt-2 text-sm">{recipe.prepTime} minutes</div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium">Cooking Time</h3>
              <div className="mt-2 text-sm">{recipe.cookTime} minutes</div>
            </div>

            <section className="mt-12">
              <h2 className="text-lg font-medium">Ingredients</h2>
              <ul className="mt-4 list-disc pl-5 space-y-2">
                {recipe.ingredients.map((ingredient: any, index: any) => (
                  <li key={index} className="text-sm">
                    {ingredient.quantity} {ingredient.name}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-12">
              <h2 className="text-lg font-medium">Instructions</h2>
              <div className="mt-4 text-sm capitalize whitespace-pre-wrap">
                {recipe.instructions}
              </div>
            </section>

            <div className="mt-12 flex gap-4 items-center bg-gray-100 dark:bg-gray-900">
              <Button
                onClick={handleUpvoted}
                isLoading={isUpvoteLoading}
                // isDisabled={isUpvoteLoading || hasUpvoted}
                className={`btn  rounded inline-flex cursor-pointer select-none flex-row
                  items-center border-0 no-underline shadow-none transition
                  duration-200  justify-center font-bold px-3 
                  ${
                    hasUpvoted
                      ? "bg-[#39e58c]/50 text-[#39e58c] "
                      : "bg-transparent text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                aria-label="Upvote"
              >
                <span className="pointer-events-none relative">
                  <UpvotedIcon />
                </span>
                <span className="flex h-5 min-w-[1ch] flex-col overflow-hidden ml-1.5 tabular-nums">
                  {recipe.upvotes}
                </span>
              </Button>

              <Button
                onClick={handleDownvoted}
                isLoading={isDownvoteLoading}
                isDisabled={isDownvoteLoading || hasDownvoted}
                className={`  inline-flex cursor-pointer select-none flex-row
                      items-center border-0 no-underline shadow-none transition
                      duration-200  justify-center font-bold  rounded
                      ${
                        hasDownvoted
                          ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
                          : "bg-transparent text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
                      }`}
                aria-label="Downvote"
              >
                <span className="pointer-events-none relative">
                  <DownvotedIcon />
                </span>
                <span className="flex h-5 min-w-[1ch] flex-col overflow-hidden ml-1.5 tabular-nums">
                  {recipe.downvotes}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
