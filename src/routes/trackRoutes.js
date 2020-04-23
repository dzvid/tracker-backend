import { Router } from 'express';

import Track from '../schemas/Track';

const router = new Router();

// fetch all the tracks a user has created
router.get('/tracks', async (req, res) => {
  const tracks = await Track.find({ userId: req.userId });

  return res.json(tracks);
});

router.post('/tracks', async (req, res) => {
  const { name, locations } = req.body;

  if (!name || !locations) {
    return res
      .status(422)
      .json({ error: 'You must provide a name and locations' });
  }

  try {
    const track = new Track({ userId: req.userId, name, locations });
    await track.save();

    return res.json(track);
  } catch (err) {
    return res.status(422).json({ error: err.message });
  }
});

export default router;
