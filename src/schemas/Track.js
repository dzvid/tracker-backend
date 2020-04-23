import mongoose from 'mongoose';

const PointSchema = new mongoose.Schema({
  timestamp: Number,
  coords: {
    latitude: Number,
    longitude: Number,
    altitude: Number,
    accuracy: Number,
    heading: Number,
    speed: Number,
  },
});

const TrackSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      default: '',
    },
    locations: [PointSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Track', TrackSchema);
