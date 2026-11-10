import mongoose from 'mongoose';
import env from './env.js';

let isConnected = false;

export async function connectDB(customUri = null) {
  if (isConnected && mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  const uri = customUri || env.MONGODB_URI;

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log(`[Database] MongoDB Connected successfully to: ${conn.connection.host}`);
    return conn.connection;
  } catch (error) {
    console.error(`[Database Error] Connection failed: ${error.message}`);
    // If not in testing mode, log warning
    if (env.NODE_ENV !== 'test') {
      console.warn('[Database] Note: Ensure MongoDB is running locally (mongodb://localhost:27017) or set MONGODB_URI in .env.');
    }
    throw error;
  }
}

export async function disconnectDB() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
    isConnected = false;
  }
}

