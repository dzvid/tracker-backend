import 'dotenv/config';

import express from 'express';
import mongoose from 'mongoose';

import authRoutes from './routes/authRoutes';
import trackRoutes from './routes/trackRoutes';

import requireAuth from './middlewares/requireAuth';

const app = express();
const port = process.env.PORT || 3000;
const mongoURL = process.env.MONGO_URL;

// Setup mongo
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to mongo instance!');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to mongo', err);
});

// Parses incoming requests with JSON payloads
app.use(express.json());

// Setup app routes
app.use(authRoutes);

// Setup middlewares
app.use(requireAuth);

// Setup authenticated app routes
app.use(trackRoutes);

app.get('/', (req, res) => {
  return res.json({ user: req.userId });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
