import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IBook } from './book.interface';
import { Book } from './book.model';

const addBook = async (data: IBook) => {
  try {
    const result = await Book.create(data);

    return result;
  } catch (err) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Book already exists');
  }
};

const getAllBooks = async () => {
  const result = await Book.find({});

  return result;
};

const getSingleBook = async (id: string) => {
  const book = await Book.findById(id);

  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  }

  return book;
};

export const bookService = {
  addBook,
  getAllBooks,
  getSingleBook,
};
