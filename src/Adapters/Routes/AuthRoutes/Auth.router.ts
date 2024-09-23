import { Router } from 'express';
import { ForgotPasswordController, isVerifiedUserController, LoginUserController, protectedRouteController, RegisterUserController, ResetPasswordController } from '../../Controllers/UserControllers';
import validate from '../../../Frameworks/middlewares/validationMiddleware';
import loginSchema from '../../../Frameworks/validations/authValidations/loginValidation';
import resetSchema from '../../../Frameworks/validations/authValidations/resetValidation';
import protectRoute from '../../../Frameworks/middlewares/protectedRouteMiddleware';


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

  return router;
};
