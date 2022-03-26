import { Router } from 'express';
import movieRoutes from './movie.routes';

const router = Router();

router.get('/', (req, res) => {
  res
    .status(200)
    .json({ status: 'success', code: 200, message: 'Welcome to Movies API!' });
});
router.use('/movie', movieRoutes);

export default router;
