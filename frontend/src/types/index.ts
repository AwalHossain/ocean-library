export type IBook = {
  title: string;
  author: string;
  thumbnail: string;
  price: string;
  rating: string;
  featured: boolean;
  genre: string;
  publicationYear: string;
  reviews?: string[];
  _id: string;
};

  export interface IUser{
    name?: string;
    email: string ;
    password: string;
    wishlist?: string[];
    readingList?: string[];
    finishedList?: string[];
  } 