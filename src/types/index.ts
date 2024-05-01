import { IReview } from "../redux/api/types";

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
  userPreference?: IItem[];
  _id: string;
};

export type IItem = {
  status: string;
  user: string;
};

export interface IUser {
  name?: string;
  email: string;
  password: string;
  wishlist?: string[];
  readingList?: string[];
  finishedList?: string[];
  _id: string;
}
