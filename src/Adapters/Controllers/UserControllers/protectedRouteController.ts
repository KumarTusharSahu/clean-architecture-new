import { Request, Response } from 'express';


export default (dependencies: any) => {
    const { protectedRouteUseCase } = dependencies.useCase;

  const handleProtectedRoute = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, username } = (req as any).user; // Accessing userId and username
        const user = await protectedRouteUseCase(dependencies).executeFunction(username);
        res.json({ message: user });  
    } catch (error: any) {
      console.log(error)
    }
  };

  return handleProtectedRoute;
};
