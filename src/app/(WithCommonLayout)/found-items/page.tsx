import Filtering from "@/src/components/modules/found-items/Filtering";
import Container from "@/src/components/UI/Container";
import Post from "@/src/components/UI/Post";
import axiosInstance from "@/src/lib/AxiosInstance";

const Page = async ({ searchParams }: { searchParams: { query: string } }) => {

  const params = new URLSearchParams(searchParams)
  const { data } = await axiosInstance.get("/items", {
    params: {
      searchTerm: params.get("query"  ),
      category: params.get("category")
    }
  });

  console.log(params.get("query"))

  
  return (
    <Container>
      <Filtering />
      <div className="mx-auto my-5 space-y-10 max-w-[720px]">
        {data?.data?.map((post: any) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </Container>
  );
};

export default Page;
