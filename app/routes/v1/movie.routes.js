import { Router } from 'express';
import verifyToken, { canAccess } from '../../middlewares/auth.middlewares';
import * as controller from '../../controllers/movie.controllers';
import * as validator from '../../validators/movie.validators';
import checkCreateLimit from '../../middlewares/movie.middlewares';

const router = Router();

router.post(
  '/',
  verifyToken,
  canAccess('all'),
  validator.validateCreateBody,
  checkCreateLimit,
  controller.createMovie,
);

router.get(
  '/:userId',
  verifyToken,
  canAccess('all'),
  validator.validateFetchParams,
  controller.fetchMovies,
);

export default router;
