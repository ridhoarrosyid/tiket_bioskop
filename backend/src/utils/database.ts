import { error } from 'console';
import mongoose from 'mongoose';

export default function connectDB() {
  const DATABASE_URL = process.env.DATABASE_URL ?? '';

  try {
    mongoose.connect(DATABASE_URL);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }

  const dbConn = mongoose.connection;

  dbConn.on('open', () => {
    console.log(`Database Connected To: ${DATABASE_URL}`);
  });
  dbConn.on('error', (e) => {
    console.log(`DB Connection Error: ${e}`);
  });
}
