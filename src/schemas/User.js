import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;

    return next();
  } catch (error) {
    return next(error);
  }
});

UserSchema.methods.checkPassword = function (candidatePassword) {
  const user = this;

  return bcrypt.compare(candidatePassword, user.password);
};

export default mongoose.model('User', UserSchema);
