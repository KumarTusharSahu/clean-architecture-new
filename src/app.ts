import express, { Request, Response } from 'express';
import connectDB from './config/db.connect';
// import userRoutes from './routes/userRoutes';
import dotenv from 'dotenv';
import { routes } from './Adapters/Routes';
import Dependencies from './Frameworks/Config/Dependencies';
import './config/passportConfig'
import passport from 'passport';
import session from "express-session";
dotenv.config(); // Load environment variables

const app = express();
connectDB();
app.use(
  session({
    secret: "your_secret_key", // Change to your secret key
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());



const PORT = process.env.PORT || 5000;
connectDB();
app.use('/api',routes(Dependencies))
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//IMPLEMENT FOLLOWING: 
  //PROTECTED ROUTE
  //MULTER