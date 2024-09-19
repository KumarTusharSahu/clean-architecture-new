import { Request, Response } from 'express';

export default (dependencies: any) => {
  const { loginUserUseCase } = dependencies.useCase;

  const handleUserLogin = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      const { token } = await loginUserUseCase(dependencies).executeFunction(username, password);
      res.status(200).json({ token });
    } catch (error: any) {
      // Send specific error message back to the client
      res.status(401).json({ message: error.message }); // 401 Unauthorized for invalid login
    }
  };

  return handleUserLogin;
};
