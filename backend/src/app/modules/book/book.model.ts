import { Schema, model } from 'mongoose';
import { BookModel, IBook } from './book.interface';

const BookSchema = new Schema<IBook>({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  publicationYear: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  reviews: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      review: {
        type: String,
        required: true,
      },
    },
  ],
  addedBy: {
    type: String,
    ref: 'User',
    required: true,
  }
    
});

export const Book = model<IBook, BookModel>('Book', BookSchema);
