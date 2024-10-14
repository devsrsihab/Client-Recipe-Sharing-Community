"use client";

import { useCallback, useEffect, useState, useMemo } from "react";
import RecipeDetailsLoader from "@/src/components/UI/RecipeDetailsLoader";
import { useUser } from "@/src/context/user.provider";
import {
  useDownvoteRecipeMutation,
  useGetRecipeDetails,
  useUpvoteRecipeMutation,
} from "@/src/hooks/recipe.hook";
import { Button } from "@nextui-org/button";
import { DownvotedIcon, UpvotedIcon } from "@/src/config/icons";
import { format, isBefore } from "date-fns";
import {
  FlagIcon,
  HandThumbUpIcon,
  StarIcon as OutlineStarIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as FilledStarIcon } from "@heroicons/react/20/solid";
import FXForm from "@/src/components/Form/FXForm";
import { createCommentSchema } from "@/src/schemas/comment.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import FXTextArea from "@/src/components/Form/FXTextArea";
import {
  useGetRecipeComments,
  useMakeRecipeCommentMutation,
  useGetRecipeRating,
  useMakeRecipeRating,
} from "@/src/hooks/comment.hook";
import { toast } from "sonner";
import Link from "next/link";
import {
  LockClosedIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import { useGetUserSingleInfo } from "@/src/hooks/userProfile.hook";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

// Add this new component for half-filled star
const HalfFilledStarIcon = () => (
  <div className="relative">
    <OutlineStarIcon className="h-5 w-5 text-gray-300 dark:text-gray-600" />
    <div className="absolute inset-0 overflow-hidden" style={{ width: "50%" }}>
      <FilledStarIcon className="h-5 w-5 text-yellow-400" />
    </div>
  </div>
);

export default function RecipeDetails({
  params,
}: {
  params: { recipId: string };
}) {
  const { recipId } = params;
  const { data, isLoading, isError } = useGetRecipeDetails(recipId);
  const { user } = useUser();

  const recipe = data?.data;

  const { data: ratingDataRes, isLoading: isRatingLoading } =
    useGetRecipeRating(recipId);
  const { mutate: makeRating, isPending: isMakeRatingLoading } =
    useMakeRecipeRating();

  const ratingData = ratingDataRes?.data;

  const [userRating, setUserRating] = useState<number | null>(null);
  const [userHasRated, setUserHasRated] = useState(false);

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
    const sum = ratings.reduce((acc, curr) => acc + (curr.rating || 0), 0);
    return sum / ratings.length;
  }, [getRatingsArray]);

  // Initialize user rating and check if user has already rated
  useEffect(() => {
    if (user && ratingData) {
      const ratings = getRatingsArray;
      const existingRating = ratings.find((r: any) => r.user._id === user._id);
      if (existingRating) {
        setUserRating(existingRating.rating);
        setUserHasRated(true);
      } else {
        setUserHasRated(false);
      }
    }
  }, [user, ratingData, getRatingsArray]);

  const { data: userData, isLoading: userLoading } = useGetUserSingleInfo(
    user?._id || ""
  );

  const isMembershipExpired = useMemo(() => {
    if (userData?.data?.membershipEnd) {
      return isBefore(new Date(userData.data.membershipEnd), new Date());
    }
    return false;
  }, [userData]);

  const isContentLocked =
    recipe?.isPaid && (!userData?.data?.isPremium || isMembershipExpired);

  const handleRatingSubmit = useCallback(() => {
    if (!user) {
      toast.error("Please log in to rate this recipe");
      return;
    }
    if (userRating === null) {
      toast.error("Please select a rating");
      return;
    }
    makeRating(
      { recipeId: recipId, rating: userRating },
      {
        onSuccess: () => {
          toast.success("Rating submitted successfully");
        },
        onError: (error: any) => {
          toast.error(error.message.replace("Error: ", ""));
        },
      }
    );
  }, [user, userRating, recipId, makeRating]);

  const handleRatingClick = useCallback((rating: number) => {
    setUserRating(rating);
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const { data: commentsData, isLoading: isCommentsLoading } =
    useGetRecipeComments(recipId, currentPage);
  const comments = commentsData?.comments;
  const commentsMeta = commentsData?.meta;

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

  const {
    mutate: handleMakeRecipeComment,
    isPending: isMakeRecipeCommentLoading,
    isSuccess: isMakeRecipeCommentSuccess,
  } = useMakeRecipeCommentMutation();

  const handleCommentSubmit = (data: any) => {
    handleMakeRecipeComment({ recipeId: recipId, comment: data.comment });
  };

  // Render loading state for the entire component
  if (isLoading || isRatingLoading || userLoading) {
    return (
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:py-16">
          <RecipeDetailsLoader />
        </div>
      </div>
    );
  }

  if (isError || !recipe)
    return (
      <div className="text-center py-10 text-red-500">Error loading recipe</div>
    );

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:py-16">
        {/* Recipe header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-x-8">
          {/* Image */}
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          {/* Recipe info */}
          <div className="w-full lg:w-1/2">
            <h1 className="text-2xl capitalize sm:text-3xl font-bold tracking-tight mb-4">
              {recipe.title}
            </h1>

            {/* Add creator information here */}
            <div className="mb-6 flex items-center">
              <Link
                href={`/profile/${recipe.createdBy._id}`}
                className="flex items-center group"
              >
                <img
                  src={
                    recipe.createdBy.profilePicture ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      recipe.createdBy.name.firstName +
                        " " +
                        recipe.createdBy.name.lastName
                    )}&background=random`
                  }
                  alt={`${recipe.createdBy.name.firstName} ${recipe.createdBy.name.lastName}`}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {recipe.createdBy.name.firstName}{" "}
                    {recipe.createdBy.name.lastName}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                    {recipe.createdBy.role}
                  </p>
                </div>
              </Link>
            </div>

            <div className="mt-3 flex items-center">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => {
                  const difference = averageRating - star;
                  return (
                    <span key={star}>
                      {difference >= 0 ? (
                        <StarIcon className="h-5 w-5 text-yellow-400" />
                      ) : difference > -1 && difference < 0 ? (
                        <HalfFilledStarIcon />
                      ) : (
                        <OutlineStarIcon className="h-5 w-5 text-gray-300 dark:text-gray-600" />
                      )}
                    </span>
                  );
                })}
              </div>
              <p className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                {averageRating > 0
                  ? averageRating.toFixed(1)
                  : "No ratings yet"}{" "}
                ({getRatingsArray.length} ratings)
              </p>
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

            <div className="mt-8 flex gap-4 items-center bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
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

        {/* Rich text content */}
        <div className="mt-12 space-y-8 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">
              Description
            </h2>
            {isContentLocked ? (
              <div className="flex flex-col items-center justify-center p-8 text-center bg-gray-100 dark:bg-gray-700 rounded-lg">
                <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-full mb-4">
                  {isMembershipExpired ? (
                    <ExclamationTriangleIcon className="w-12 h-12 text-yellow-600 dark:text-yellow-400" />
                  ) : (
                    <LockClosedIcon className="w-12 h-12 text-yellow-600 dark:text-yellow-400" />
                  )}
                </div>
                <h3 className="text-xl font-bold mb-2 dark:text-white">
                  Premium Content
                </h3>
                {isMembershipExpired ? (
                  <p className="text-sm text-red-600 dark:text-red-400 mb-4">
                    Your premium membership has expired.
                  </p>
                ) : (
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    This content is exclusive to premium members.
                  </p>
                )}
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {isMembershipExpired
                    ? "Renew your membership to regain access to premium recipes and features."
                    : "Upgrade your account to unlock this recipe and many more premium features."}
                </p>
                <Button
                  as={Link}
                  href="/membership"
                  color="primary"
                  variant="solid"
                  className="font-semibold px-6 py-2"
                >
                  {isMembershipExpired
                    ? "Renew Membership"
                    : "Upgrade to Premium"}
                </Button>
              </div>
            ) : (
              <div
                className="prose prose-sm sm:prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: recipe.description }}
              />
            )}
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">
              Instructions
            </h2>
            {isContentLocked ? (
              <div className="flex flex-col items-center justify-center p-8 text-center bg-gray-100 dark:bg-gray-700 rounded-lg">
                <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-full mb-4">
                  {isMembershipExpired ? (
                    <ExclamationTriangleIcon className="w-12 h-12 text-yellow-600 dark:text-yellow-400" />
                  ) : (
                    <LockClosedIcon className="w-12 h-12 text-yellow-600 dark:text-yellow-400" />
                  )}
                </div>
                <h3 className="text-xl font-bold mb-2 dark:text-white">
                  Premium Content
                </h3>
                {isMembershipExpired ? (
                  <p className="text-sm text-red-600 dark:text-red-400 mb-4">
                    Your premium membership has expired.
                  </p>
                ) : (
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    This content is exclusive to premium members.
                  </p>
                )}
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {isMembershipExpired
                    ? "Renew your membership to regain access to premium recipes and features."
                    : "Upgrade your account to unlock this recipe and many more premium features."}
                </p>
                <Button
                  as={Link}
                  href="/membership"
                  color="primary"
                  variant="solid"
                  className="font-semibold px-6 py-2"
                >
                  {isMembershipExpired
                    ? "Renew Membership"
                    : "Upgrade to Premium"}
                </Button>
              </div>
            ) : (
              <div
                className="prose prose-sm sm:prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: recipe.instructions }}
              />
            )}
          </div>
        </div>

        {/* Ratings and Comments Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Ratings and Comments</h2>

          {/* Rating Statistics */}
          <div className="mb-8 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div className="flex items-center mb-4 sm:mb-0">
                <span className="text-5xl font-bold mr-2">
                  {averageRating > 0 ? averageRating.toFixed(1) : "N/A"}
                </span>
                <div className="flex flex-col">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FilledStarIcon
                        key={star}
                        className={classNames(
                          star <= Math.round(averageRating)
                            ? "text-yellow-400"
                            : "text-gray-300 dark:text-gray-600",
                          "h-5 w-5 flex-shrink-0"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Based on {getRatingsArray.length} ratings
                  </span>
                </div>
              </div>

              {/* Star rating statistics */}
              <div className="w-full sm:w-1/2">
                {[5, 4, 3, 2, 1].map((star) => {
                  const ratings = getRatingsArray;
                  const count = ratings.filter(
                    (r: any) => Math.floor(r.rating) === star
                  ).length;
                  const percentage =
                    ratings.length > 0 ? (count / ratings.length) * 100 : 0;
                  return (
                    <div key={star} className="flex items-center mb-1">
                      <span className="text-sm w-2 mr-2">{star}</span>
                      <StarIcon className="h-4 w-4 text-yellow-400 mr-2" />
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm ml-2">
                        {percentage.toFixed(1)}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {isContentLocked ? (
            <div className="mb-8 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="flex flex-col items-center justify-center p-8 text-center bg-gray-100 dark:bg-gray-700 rounded-lg">
                <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-full mb-4">
                  {isMembershipExpired ? (
                    <ExclamationTriangleIcon className="w-12 h-12 text-yellow-600 dark:text-yellow-400" />
                  ) : (
                    <LockClosedIcon className="w-12 h-12 text-yellow-600 dark:text-yellow-400" />
                  )}
                </div>
                <h3 className="text-xl font-bold mb-2 dark:text-white">
                  Premium Content
                </h3>
                {isMembershipExpired ? (
                  <p className="text-sm text-red-600 dark:text-red-400 mb-4">
                    Your premium membership has expired.
                  </p>
                ) : (
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    This content is exclusive to premium members.
                  </p>
                )}
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {isMembershipExpired
                    ? "Renew your membership to regain access to premium recipes and features."
                    : "Upgrade your account to rate and comment on this recipe."}
                </p>
                <Button
                  as={Link}
                  href="/membership"
                  color="primary"
                  variant="solid"
                  className="font-semibold px-6 py-2"
                >
                  {isMembershipExpired
                    ? "Renew Membership"
                    : "Upgrade to Premium"}
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Add rating form or display user's rating */}
              <div className="mb-8 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-4">
                  {userHasRated ? "Your Rating" : "Rate this Recipe"}
                </h3>
                <div className="space-y-4">
                  {userHasRated ? (
                    <div>
                      <p>You have rated this recipe:</p>
                      <div className="flex items-center mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FilledStarIcon
                            key={star}
                            className={classNames(
                              star <= (userRating || 0)
                                ? "text-yellow-400"
                                : "text-gray-300 dark:text-gray-600",
                              "h-8 w-8"
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Your Rating
                        </label>
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => handleRatingClick(star)}
                              className="focus:outline-none"
                            >
                              {star <= (userRating || 0) ? (
                                <FilledStarIcon className="h-8 w-8 text-yellow-400" />
                              ) : (
                                <OutlineStarIcon className="h-8 w-8 text-gray-300 dark:text-gray-600" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={handleRatingSubmit}
                        disabled={isMakeRatingLoading || userRating === null}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isMakeRatingLoading
                          ? "Submitting..."
                          : "Confirm Rating"}
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Add comment form */}
              <div className="mb-8 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Add Your Comment</h3>
                <div className="space-y-4">
                  <FXForm
                    isReset={isMakeRecipeCommentSuccess}
                    onSubmit={handleCommentSubmit}
                    resolver={zodResolver(createCommentSchema)}
                  >
                    <div>
                      <FXTextArea name="comment" label="Your Comment" />
                    </div>
                    <Button
                      isLoading={isMakeRecipeCommentLoading}
                      type="submit"
                    >
                      Submit Comment
                    </Button>
                  </FXForm>
                </div>
              </div>
            </>
          )}

          {/* Ratings and comments list */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-6">User Reviews</h3>
            {isCommentsLoading ? (
              <div className="text-center">Loading comments...</div>
            ) : comments && comments.length > 0 ? (
              <div className="space-y-8">
                {comments.map((comment: any) => (
                  <div
                    key={comment._id}
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm"
                  >
                    <div className="flex items-start space-x-4">
                      <img
                        className="h-12 w-12 rounded-full object-cover"
                        src={
                          comment.user.profilePicture ||
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            comment.user.name.firstName +
                              " " +
                              comment.user.name.lastName
                          )}&background=random`
                        }
                        alt={`${comment.user.name.firstName} ${comment.user.name.lastName}`}
                      />
                      <div className="flex-grow">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-lg capitalize">
                            {`${comment.user.name.firstName} ${comment.user.name.lastName}`}
                          </h4>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {format(
                              new Date(comment.createdAt),
                              "MMMM d, yyyy"
                            )}
                          </span>
                        </div>
                        {/* Note: Rating is not provided in the comment data, so we'll omit it for now */}
                        <p className="mt-3 text-gray-700 dark:text-gray-300 capitalize">
                          {comment.comment}
                        </p>
                        <div className="mt-4 flex items-center space-x-4">
                          <button className="flex items-center text-sm text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-150">
                            <HandThumbUpIcon className="h-4 w-4 mr-1" />
                            Helpful
                          </button>
                          <button className="flex items-center text-sm text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-150">
                            <FlagIcon className="h-4 w-4 mr-1" />
                            Report
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center">No comments yet.</div>
            )}
          </div>

          {/* Pagination */}
          {commentsMeta && commentsMeta.totalPage > 1 && (
            <div className="mt-12 flex justify-center">
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                {Array.from(
                  { length: commentsMeta.totalPage },
                  (_, i) => i + 1
                ).map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium
                      ${
                        currentPage === pageNumber
                          ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
                          : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                  >
                    {pageNumber}
                  </button>
                ))}
                <button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(prev + 1, commentsMeta.totalPage)
                    )
                  }
                  disabled={currentPage === commentsMeta.totalPage}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
