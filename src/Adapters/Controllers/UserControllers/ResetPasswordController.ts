import { Request, Response } from 'express';

export default (dependencies: any) => {
    const {ResetPasswordUseCase} = dependencies.useCase

  const handleResetPassword = async(req: Request, res: Response): Promise<void> => {
    try {
      const {id} = req.params;
      const {newPassword } = req.body;
      const {confirmPassword } = req.body;
      if(newPassword === confirmPassword){
        await ResetPasswordUseCase(dependencies).executeFunction(id, newPassword);
        res.status(200).json({ message: 'Password reset successful' });
      }
      else{
        res.status(400).json({ "message": "New password and confirm password do not match" });
      }
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
  }

  return handleResetPassword;
}

