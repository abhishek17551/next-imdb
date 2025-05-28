import mongoose from 'mongoose';

let initialized = false;

export const connect = async (): Promise<void> => {
  mongoose.set('strictQuery', true);
  
  if (initialized) {
    console.log('MongoDB already connected');
    return;
  }
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI environment variable is not defined');
    }
    await mongoose.connect(uri, {
      dbName: 'DevTinder',
    });
    initialized = true;
    console.log('MongoDB connected');
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log('MongoDB connection error:', error.message);
    } else {
      console.log('MongoDB connection error:', error);
    }
  }
}