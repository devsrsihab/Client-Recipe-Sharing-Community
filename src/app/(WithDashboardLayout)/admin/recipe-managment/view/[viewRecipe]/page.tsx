import ViewRecipe from "@/src/components/modules/dashboard/recipe/ViewRecipe";

const RecipeDetailsView = ({ params }: { params: { viewRecipe: string } }) => {
  const { viewRecipe } = params;

  return <ViewRecipe recipeId={viewRecipe} />;
};

export default RecipeDetailsView;
