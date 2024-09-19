import { Router } from 'express';
import { ForgotPasswordController, LoginUserController, RegisterUserController, ResetPasswordController } from '../../Controllers/UserControllers';


export default (dependencies: any) => {
  const router = Router();

  // Extract controllers from dependencies
  

  // Route to register a new user
  router.post('/register', RegisterUserController(dependencies));

  // Route for user login
  router.post('/login', LoginUserController(dependencies));

  // Route for forgot password
  router.post('/forgot-password', ForgotPasswordController(dependencies));

  // Route for reset password
  router.post('/reset-password/:id', ResetPasswordController(dependencies));

  return router;
};
