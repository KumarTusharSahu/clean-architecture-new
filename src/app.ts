import express, { Request, Response } from 'express';
import connectDB from './config/db.connect';
// import userRoutes from './routes/userRoutes';
import dotenv from 'dotenv';
import { routes } from './Adapters/Routes';
import Dependencies from './Frameworks/Config/Dependencies';

dotenv.config(); // Load environment variables

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;
connectDB();
app.use('/api',routes(Dependencies))
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//IMPLEMENT FOLLOWING: 
  //PROTECTED ROUTE
  //MULTER