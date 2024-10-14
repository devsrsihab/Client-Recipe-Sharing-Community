import { useMemo } from "react";
import { useGetRecipeRating } from "../hooks/comment.hook";
import { StarIcon as FilledStarIcon } from "@heroicons/react/20/solid";
import { Skeleton } from "@nextui-org/skeleton";

const GetAverageRating = ({ recipeId }: { recipeId: string }) => {
  const { data: ratingDataRes, isLoading } = useGetRecipeRating(recipeId);
  const ratingData = ratingDataRes?.data;

  // classNames
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  // Helper function to safely get ratings array
  const getRatingsArray = useMemo(() => {
    if (Array.isArray(ratingData)) return ratingData;
    if (typeof ratingData === "object" && ratingData !== null)
      return Object.values(ratingData);
    return [];
  }, [ratingData]);

  // Calculate average rating
  const averageRating = useMemo(() => {
    const ratings = getRatingsArray;
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce(
      (acc: number, curr: any) => acc + (curr.rating || 0),
      0
    );
    return sum / ratings.length;
  }, [getRatingsArray]);

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <Skeleton
              key={star}
              className="h-4 w-4 rounded-full sm:h-5 sm:w-5"
            />
          ))}
        </div>
        <Skeleton className="h-5 w-8 rounded" />
        <Skeleton className="h-4 w-6 rounded" />
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <FilledStarIcon
            key={star}
            className={classNames(
              star <= Math.round(averageRating)
                ? "text-yellow-400"
                : "text-gray-300 dark:text-gray-600",
              "h-4 w-4 flex-shrink-0 sm:h-5 sm:w-5"
            )}
          />
        ))}
      </div>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {averageRating > 0 ? averageRating.toFixed(1) : "N/A"}
      </span>
      <span className="text-xs text-gray-500 dark:text-gray-400">
        ({getRatingsArray.length})
      </span>
    </div>
  );
};

export default GetAverageRating;
