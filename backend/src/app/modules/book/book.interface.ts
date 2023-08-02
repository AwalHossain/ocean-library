import { Model, Schema, Types } from 'mongoose';

export type reviews = {
  userId: Schema.Types.ObjectId;
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
  bookAddedBy: Types.ObjectId;
};

export type IbookFilters = {
  searchTerm?: string;
  genre?: string;
  publicationYear?: string;
};


export type BookModel = Model<IBook, Record<string, unknown>>;
