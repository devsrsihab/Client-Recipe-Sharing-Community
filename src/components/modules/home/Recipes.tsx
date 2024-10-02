import { getRecentPosts } from "@/src/services/RecentPosts";
import Card from "../../UI/Card";

const Recipes = async ({ isCardHeader = true }: { isCardHeader?: boolean }) => {
  const { data: posts } = await getRecentPosts();
  await new Promise((resolve) => setTimeout(resolve, 10000));
  return (
    <div>
      {
        isCardHeader && (
          <div className="section-title my-10">
            <h2 className="mb-2 text-center text-2xl">Latest Recipes</h2>
            <p className="text-center">
              Discover our most recent culinary creations and cooking inspirations
            </p>
          </div>
        )
      }
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 ">
        {posts?.map((post: any) => (
          <Card key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Recipes;
