export const isVerifiedUserUseCase = (dependencies : any) => {

    const {findByIdRepo} = dependencies.repository;

    const executeFunction = async(id:string): Promise<void> => {
        const user = await findByIdRepo.findById(id);
        console.log(user);

        if (!user) {
            throw new Error('User not found');
        }

        user.isVerified = true;
        await user.save();
    }
    return { executeFunction };
};



  