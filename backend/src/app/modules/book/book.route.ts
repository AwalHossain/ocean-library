import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BookController } from './book.controller';
import { bookValidation } from './book.validation';

const router = Router();


router.post('/add',
auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
validateRequest(bookValidation.bookZodSchema),
BookController.addBook);


export const BookRoutes = router;