import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";



const addBook = catchAsync(async (req: Request, res: Response) => {
    const book = await bookService.addBook(req.body);
 
    


    sendResponse(res, {
        status: httpStatus.CREATED,
        success: true,
        message: 'Book added successfully',
        data: book,
    })

    }
);



export const BookController = {
        addBook
}