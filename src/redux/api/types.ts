export type IUser = {
  name: string;
  email: string;
  password: string;
  role: string;
  _id: string;
};

export type IBook = {
  title: string;
  author: string;
  thumbnail: string;
  price: string;
  rating: string;
  featured: boolean;
  genre: string;
  publicationYear: string;
  reviews?: IReview[];
  wishlist?: string[];
  readingList?: string[];
  finishedList?: string[];
  addedBy?: string;
  userPreference?: {
    status: string;
    user: string;
  }[];
  _id: string;
};

export type IReview = {
  userId?: {
    email: string;
    name: string;
  };
  rating: number;
  description: string;
};
