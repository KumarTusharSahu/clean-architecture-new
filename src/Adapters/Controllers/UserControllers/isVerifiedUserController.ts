import { Request, Response } from 'express';

export default (dependencies: any) => {
    const {isVerifiedUserUseCase} = dependencies.useCase

    const handleIsUserVeried = async(req: Request, res: Response): Promise<void> => {
        try {
            const {id} = req.params;
            const response = await isVerifiedUserUseCase(dependencies).executeFunction(id);
            res.status(200).json({ message: 'Verified Successfully', res:response });    
        } catch (error:any) {
            res.status(500).json({ message: error.message });
        }
    }
    return handleIsUserVeried;
}