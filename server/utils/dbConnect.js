import dotenv from 'dotenv';
import { connect } from 'mongoose';
dotenv.config();

const db =
  `mongodb+srv://${process.env.USER_PASSWORD}:${process.env.MONGO_URI}@cluster0-pimzw.mongodb.net/${process.env.PROJECT_NAME}?retryWrites=true&w=majority` || {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

const dbConnect = async () => {
  try {
    const conn = await connect(db);
    await connect(db);
    console.info(`MongoDB Connected... ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // Exit process with failure
    process.exit(1);
  }
};

export default dbConnect;
