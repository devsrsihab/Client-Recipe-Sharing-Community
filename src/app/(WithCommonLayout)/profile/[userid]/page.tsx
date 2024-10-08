import Recipes from "@/src/components/modules/home/Recipes";
import UserProfileCard from "@/src/components/modules/myprofile/UserProfileCard";
import Container from "@/src/components/UI/Container";

const UserProfilePage = ({ params }: { params: { userid: string } }) => {
  const { userid } = params;

  return (
    <Container>
      <div className="flex flex-col gap-8 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <UserProfileCard id={userid} />

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-bold mb-6 text-indigo-600 dark:text-indigo-400">
            User Recipes
          </h2>
          <Recipes isCardHeader={false} />
        </div>
      </div>
    </Container>
  );
};

export default UserProfilePage;
