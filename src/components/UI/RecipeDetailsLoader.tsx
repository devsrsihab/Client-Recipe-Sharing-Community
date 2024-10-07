import { Skeleton } from "@nextui-org/skeleton";

const RecipeDetailsLoader = () => {
  return (
    <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
      {/* Image Skeleton */}
      <div className="w-full relative pb-[75%] overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700">
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Recipe info Skeleton */}
      <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
        <Skeleton className="h-8 w-3/4 mb-4" />

        <div className="mt-3 flex items-center">
          <div className="flex items-center">
            {[0, 1, 2, 3, 4].map((rating) => (
              <Skeleton key={rating} className="h-5 w-5 mr-1" />
            ))}
          </div>
          <Skeleton className="ml-3 h-4 w-24" />
        </div>

        {["Description", "Category", "Preparation Time", "Cooking Time"].map(
          (item, index) => (
            <div key={index} className="mt-6">
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-4 w-full" />
            </div>
          )
        )}

        <div className="mt-12">
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="space-y-2">
            {[1, 2, 3, 4].map((item) => (
              <Skeleton key={item} className="h-4 w-full" />
            ))}
          </div>
        </div>

        <div className="mt-12">
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((item) => (
              <Skeleton key={item} className="h-4 w-full" />
            ))}
          </div>
        </div>

        <div className="mt-12 flex items-center">
          <Skeleton className="h-12 w-32" />
          <Skeleton className="h-12 w-32 ml-4" />
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailsLoader;
