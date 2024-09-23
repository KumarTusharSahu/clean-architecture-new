export const protectedRouteUseCase = (dependencies : any) => {

    const {findByUsernameRepo} = dependencies.repository;

    const executeFunction = async(username:string): Promise<void> => {
        const user = await findByUsernameRepo.findByUsername(username);
        return user;
    }
    return { executeFunction };
};



  