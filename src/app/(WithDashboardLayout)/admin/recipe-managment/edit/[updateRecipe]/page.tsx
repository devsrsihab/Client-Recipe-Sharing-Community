import EditRecipe from "@/src/components/modules/dashboard/recipe/EditRecipe";

const RecipeUpdate = ({ params }: { params: { updateRecipe: string } }) => {
  const { updateRecipe } = params;
  return <EditRecipe recipeId={updateRecipe} />;
};

export default RecipeUpdate;
