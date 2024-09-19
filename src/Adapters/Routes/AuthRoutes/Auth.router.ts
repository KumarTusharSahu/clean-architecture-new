import { Router } from 'express';
import { LoginUserController, RegisterUserController } from '../../Controllers/UserControllers';


export default (dependencies: any) => {
  const router = Router();

  // Extract controllers from dependencies
  

  // Route to register a new user
  router.post('/register', RegisterUserController(dependencies));

  // Route for user login
  router.post('/login', LoginUserController(dependencies));

  return router;
};
