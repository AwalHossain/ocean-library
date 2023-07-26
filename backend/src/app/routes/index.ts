import express from 'express';
import { BookRoutes } from '../modules/book/book.route';
import { UserRoutes } from '../modules/users/user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/book',
    route: BookRoutes,
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
