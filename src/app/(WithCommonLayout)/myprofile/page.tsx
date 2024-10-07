import Recipes from "@/src/components/modules/home/Recipes";
import UserProfileCard from "@/src/components/modules/myprofile/UserProfileCard";
import Container from "@/src/components/UI/Container";

const MyProfile = () => {
  return (
    <Container>
      <div className="flex gap-8 h-screen">
        <UserProfileCard />

        {/* recipes list */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4">My Recipes</h2>
          <Recipes isCardHeader={false} />
        </div>
      </div>
    </Container>
  );
};

export default MyProfile;
