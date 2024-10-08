import Landing from "@/src/components/modules/home/Landing";
import Recipes from "@/src/components/modules/home/Recipes";
import Container from "@/src/components/UI/Container";

export default function Home() {
  return (
    <>
      <Container>
        <Recipes />
      </Container>
    </>
  );
}
