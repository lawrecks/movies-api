import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res
    .status(200)
    .json({ status: 'success', code: 200, message: 'Welcome to Movies API!' });
});

export default router;
