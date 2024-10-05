export interface IRecipe {
  comments: any[];
  _id: string;
  title: string;
  image: string;
  description: string;
  ingredients: IIngredient[];
  instructions: string;
  category: ICategory;
  prepTime: number;
  cookTime: number;
  upvotes: number;
  downvotes: number;
  ratings: string[];
  upvotedBy: string[];
  downvotedBy: string[];
  createdBy: ICreatedBy;
  isPaid: boolean;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface ICategory {
  _id: string;
  name: string;
  recipeCount: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IIngredient {
  name: string;
  quantity: string;
  _id: string;
}

export interface ICreatedBy {
  _id: string;
  id: string;
  email: string;
  name: Name;
  password: string;
  username: string;
  profilePicture: string;
  bio: string;
  followers: string[];
  following: any[];
  isPremium: boolean;
  needPasswordChange: boolean;
  role: string;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Name {
  firstName: string;
  lastName: string;
  _id: string;
}
