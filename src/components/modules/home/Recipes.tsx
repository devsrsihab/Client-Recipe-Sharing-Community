import { getRecentPosts } from "@/src/services/RecentPosts";
import Card from "../../UI/Card";
import Container from "../../UI/Container";

const Recipes = async () => {
  const { data: posts } = await getRecentPosts();
  await new Promise((resolve) => setTimeout(resolve, 10000));
  return (
    <Container>
      <div className="section-title my-10">
        <h2 className="mb-2 text-center text-2xl">Latest Recipes</h2>
        <p className="text-center">
          Discover our most recent culinary creations and cooking inspirations
        </p>
      </div>
      <div className="my-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 ">
        {posts?.map((post: any) => (
          <Card key={post._id} post={post} />
        ))}
      </div>
    </Container>
  );
};

export default Recipes;
