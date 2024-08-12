import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGODB_URI);
    return res;
  } catch (err) {
    console.error(err);
  }
};
