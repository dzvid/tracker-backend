import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';

import authRoutes from './routes/authRoutes';

const app = express();

// Parses incoming requests with JSON payloads
app.use(express.json());

// Setup app routes
app.use(authRoutes);

const port = process.env.PORT || 3000;

const mongoURL = process.env.MONGO_URL;

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

app.get('/', (req, res) => {
  return res.json({ message: 'ok' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
