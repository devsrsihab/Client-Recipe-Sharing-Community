import Container from "@/src/components/UI/Container";
import CardSkeleton from "@/src/components/UI/LoadingCardSkelton";

const Loading = () => {
  return (
    <Container>
      <div className="section-title my-10">
        <h2 className="mb-2 text-center text-2xl">Recent Found Items</h2>
        <p className="text-center">
          A list of items that have been recently found and reported
        </p>
      </div>
      <div className="my-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 ">
        {[...Array(6)].map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    </Container>
  );
};

export default Loading;
