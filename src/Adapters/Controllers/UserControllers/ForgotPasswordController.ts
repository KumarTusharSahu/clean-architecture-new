import { Request, Response } from 'express';

export default (dependencies: any) => {
  const { forgotPasswordUseCase } = dependencies.useCase;

  const handleForgotPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email } = req.body;
      await forgotPasswordUseCase(dependencies).executeFunction(email); // Call the injected use case
      res.status(200).json({ message: 'Password reset email sent' });
    } catch (error: any) {
      res.status(400).json({ message: error.message || 'An error occurred' });
    }
  };

  return handleForgotPassword;
};
