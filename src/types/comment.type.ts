import { IUser } from "./post.type";
import { IRecipe } from "./recipe.type";

export interface IComment {
  _id: string;
  user: IUser;
  recipe: IRecipe;
  text: string;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
