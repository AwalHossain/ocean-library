import { IReview } from "../redux/api/types";

export type IBook = {
  addedBy?: string;
  title: string;
  author: string;
  thumbnail: string;
  price: string;
  rating: string;
  featured: boolean;
  genre: string;
  publicationYear: string;
  reviews?: IReview[];
  _id: string;
  // addedby: string;
};

  export interface IUser{
    name?: string;
    email: string ;
    password: string;
    wishlist?: string[];
    readingList?: string[];
    finishedList?: string[];
  } 