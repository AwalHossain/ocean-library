import { Model } from 'mongoose';

export type reviews = {
  email: string;
  review: string;
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
  reviews?: reviews[];
  addedBy: string
};

export type IbookFilters = {
  searchTerm?: string;
  genre?: string;
  publicationYear?: string;
};


export type BookModel = Model<IBook, Record<string, unknown>>;
