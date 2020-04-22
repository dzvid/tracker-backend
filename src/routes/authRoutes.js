import jwt from 'jsonwebtoken';
import { Router } from 'express';

import User from '../schemas/User';

import authConfig from '../config/auth';

const router = new Router();

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(422).json({ error: 'User already exists' });
    }

    const user = new User({ email, password });
    await user.save();

    const token = jwt.sign({ userId: user._id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    return res.status(201).json({ token });
  } catch (err) {
    return res.status(422).json({ message: err.message });
  }
});

export default router;
