export interface IQuestion {
  value: string;
}

export interface IFormData {
  title: string;
  dateFound: string;
  user: string;
  location: string;
  city: string;
  category: string;
  description: string;
  questions: string[]; // Changed to string[] after mapping
  itemImages: File[];
}
