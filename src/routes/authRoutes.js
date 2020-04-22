import { Router } from 'express';

const router = Router();

router.post('/signup', (req, res) => {
  return res.json({ message: 'You made a post req' });
});

export default router;
