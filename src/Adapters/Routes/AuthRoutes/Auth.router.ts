import { Router } from 'express';
import { ForgotPasswordController, isVerifiedUserController, LoginUserController, protectedRouteController, RegisterUserController, ResetPasswordController } from '../../Controllers/UserControllers';
import validate from '../../../Frameworks/middlewares/validationMiddleware';
import loginSchema from '../../../Frameworks/validations/authValidations/loginValidation';
import resetSchema from '../../../Frameworks/validations/authValidations/resetValidation';
import protectRoute from '../../../Frameworks/middlewares/protectedRouteMiddleware';
import passport from 'passport';


export default (dependencies: any) => {
  const router = Router();

  // Extract controllers from dependencies
  

  // Route to register a new user
  router.post('/register',validate(loginSchema), RegisterUserController(dependencies));

  // Route for user login
  router.post('/login', LoginUserController(dependencies));

  // Route for forgot password
  router.post('/forgot-password', ForgotPasswordController(dependencies));

  // Route for reset password
  router.post('/reset-password/:id', validate(resetSchema), ResetPasswordController(dependencies));

  router.patch('/verified/:id', isVerifiedUserController(dependencies));

  router.get('/protected', protectRoute, protectedRouteController(dependencies));

  router.get(
    "/google",
    passport.authenticate("google", {
      scope: ["profile", "email"], // Specify the scopes you need
    })
  );

  // Callback route that Google redirects to after authentication
  router.get(
    "/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/login", // Redirect to login if authentication fails
    }),
    (req, res) => {
      // Successful authentication, redirect to desired route
      res.send({ message: "login succesfully" ,data:req.user}); // Change to your desired route after login
    }
  );

  return router;
};
