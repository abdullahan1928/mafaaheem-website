import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI!;
if (!MONGO_URI) throw new Error("Please define the MONGO_URI environment variable.");

const globalForMongoose = globalThis as unknown as {
  mongoose?: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
};

if (!globalForMongoose.mongoose) {
  globalForMongoose.mongoose = { conn: null, promise: null };
}

export default async function connectDB() {
  if (globalForMongoose.mongoose!.conn) {
    return globalForMongoose.mongoose!.conn;
  }

  if (!globalForMongoose.mongoose!.promise) {
    globalForMongoose.mongoose!.promise = mongoose.connect(MONGO_URI, {
      bufferCommands: false,
    });
  }

  try {
    globalForMongoose.mongoose!.conn = await globalForMongoose.mongoose!.promise;
    console.log("✅ MongoDB connected");
  } catch (err) {
    globalForMongoose.mongoose!.promise = null;
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }

  return globalForMongoose.mongoose!.conn;
}
