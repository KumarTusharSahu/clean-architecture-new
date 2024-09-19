import { forgotPasswordUseCase, loginUserUseCase, registerUserUseCase, ResetPasswordUseCase } from "../../Applications/Usecases";
import { createNewUserRepo, findByEmailRepo, findByResetTokenRepo, findByUsernameRepo, saveUserRepo } from "../../Frameworks/Mongodb/Repositories";


const useCase:any = {
    registerUserUseCase,
    loginUserUseCase,
    forgotPasswordUseCase,
    ResetPasswordUseCase
}

const repository:any = {
    saveUserRepo,
    findByUsernameRepo,
    findByResetTokenRepo,
    findByEmailRepo,
    createNewUserRepo
}

export default {
    useCase,repository
}
