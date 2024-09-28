import Container from "@/src/components/UI/Container";
import Post from "@/src/components/UI/Post";
import { getSinglePost } from "@/src/services/Post";


interface IProps {
  params: {
    itemId: string;
  };
}

const FoundItemDetails = async ({ params: { itemId } }: IProps) => {
  const { data: post } = await getSinglePost(itemId);

  return (
    <Container>
      <div className="mx-auto my-3 max-w-[720px]">
        <Post key={post?._id} post={post} />
      </div>
    </Container>
  );
};

export default FoundItemDetails;