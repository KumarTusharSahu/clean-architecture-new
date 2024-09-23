import { Request, Response } from 'express';

export default (dependencies: any) => {
  const { registerUserUseCase } = dependencies.useCase;

  const handleRegisterUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, password, email } = req.body;
      console.log(req.body);

      const user = await registerUserUseCase(dependencies).executeFunction(username, password, email);
      res.status(201).json({message: 'verification email sent.',
        user: user});
    } catch (error: any) {
      console.log(error)
      // Check if the error is due to an existing user
      if (error.message === 'User already exists') {
        res.status(409).json({ message: 'User already exists' }); // 409 Conflict status
      } else {
        res.status(400).json({ message: error.message });
      }
    }
  };

  return handleRegisterUser;
};
