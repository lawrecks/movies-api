import { Router } from 'express';
import verifyToken, { canAccess } from '../../middlewares/auth.middlewares';
import createMovie from '../../controllers/movie.controllers';
import validateCreateBody from '../../validators/movie.validators';
import checkCreateLimit from '../../middlewares/movie.middlewares';

const router = Router();

router.post(
  '/',
  verifyToken,
  canAccess('all'),
  validateCreateBody,
  checkCreateLimit,
  createMovie,
);

export default router;
