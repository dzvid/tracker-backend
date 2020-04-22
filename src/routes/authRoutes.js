import jwt from 'jsonwebtoken';
import { Router } from 'express';

import User from '../schemas/User';

import authConfig from '../config/auth';

const router = new Router();

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: 'Must provide email and password' });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(422).json({ error: 'User already exists' });
    }

    const user = new User({ email, password });
    await user.save();

    return res.status(201).json();
  } catch (err) {
    return res.status(422).json({ message: err.message });
  }
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: 'Must provide email and password' });
  }

  const user = await User.findOne({ email });

  if (!user) {
    // user not found
    return res.status(422).json({ error: 'Invalid email or password' });
  }

  try {
    if (!(await user.checkPassword(password))) {
      // Invalid password
      return res.status(422).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    return res.status(200).json({ token });
  } catch (error) {
    // Error on password comparison
    return res.status(422).json({ error: 'Invalid email or password' });
  }
});

export default router;
