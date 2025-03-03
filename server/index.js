import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import userRoutes from './routes/userRoutes.js';
import dbConnect from './utils/dbConnect.js';

dotenv.config();
const port = process.env.PORT || 5000;

dbConnect();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users', userRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
