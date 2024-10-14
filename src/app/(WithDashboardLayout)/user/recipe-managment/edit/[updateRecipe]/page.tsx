import EditRecipe from "@/src/components/modules/dashboard/recipe/EditRecipe";

const UserRecipeUpdate = ({ params }: { params: { updateRecipe: string } }) => {
  const { updateRecipe } = params;

  return <EditRecipe recipeId={updateRecipe} />;
};

export default UserRecipeUpdate;
