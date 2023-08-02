import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = Router();

router.post(
  '/create',
  validateRequest(UserValidation.loginRegistrationZodSchema),
  UserController.createUser
);
router.post(
  '/login',
  validateRequest(UserValidation.loginRegistrationZodSchema),
  UserController.loginUser
);
router.post(
  '/refresh-token',
  validateRequest(UserValidation.refreshTokenZodSchema),
  auth(ENUM_USER_ROLE.USER),
  UserController.refreshToken
);

router.post(
  '/wishlist',
   auth(ENUM_USER_ROLE.USER),
   UserController.wishlist
);

router.post(
  '/readinglist',
   auth(ENUM_USER_ROLE.USER),
   UserController.readingList
);
router.post(
  '/finishedBook',
   auth(ENUM_USER_ROLE.USER),
   UserController.finishedBooks
);



router.get(
  '/me',
  auth(ENUM_USER_ROLE.USER),
  UserController.getMe
)

export const UserRoutes = router;
