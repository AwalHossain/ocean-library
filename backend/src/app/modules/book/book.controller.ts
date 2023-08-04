import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { bookFilterableFields } from './book.constant';
import { bookService } from './book.service';

const addBook = catchAsync(async (req: Request, res: Response) => {
  const book = req.body;
  
  const result = await bookService.addBook(book);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Book added successfully',
    data: result,
  });
});

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  
  const filters = pick(req.query, bookFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  console.log(filters,'che', paginationOptions);
  
  const result = await bookService.getAllBooks(filters, paginationOptions);


  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All books',
    data: result,
  });
}
);

const getSingleBook = catchAsync(async (req: Request, res: Response) => {

    const { id } = req.params;
    const result = await bookService.getSingleBook(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Retrieved single book',
      data: result,
    });

});

const addReview = catchAsync(async (req: Request, res: Response) => {
  const {bookId} = req.params;
  const user = req.user;
  const {review} = req.body;
  const result = await bookService.addReview(review, user, bookId);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Review added successfully',
    data: result,
  });
}
);


export const BookController = {
  addBook,
  getAllBooks,
  getSingleBook,
  addReview
};
