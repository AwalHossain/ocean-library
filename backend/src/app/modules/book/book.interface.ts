import { Model, Schema } from "mongoose";



export type reviews = {
    userId: Schema.Types.ObjectId;
    review: string;
}


export type IBook = {
    title: string;
    author: string;
    thumbnail: string;
    price: string;
    rating: string;
    featured: boolean;
    id?: number;
    genre: string;
    publicationYear: string;
    reviews?: reviews[];
    wishlist?: Schema.Types.ObjectId[];
    readingList?: Schema.Types.ObjectId[];
    finishedList?: Schema.Types.ObjectId[];

}


export type BookModel= Model<IBook, Record<string, unknown>>;
  