import { forgotPasswordUseCase, isVerifiedUserUseCase, loginUserUseCase, protectedRouteUseCase, registerUserUseCase, ResetPasswordUseCase } from "../../Applications/Usecases";

import { createNewUserRepo, findByEmailRepo, findByIdRepo, findByResetTokenRepo, findByUsernameRepo, saveUserRepo } from "../../Frameworks/Mongodb/Repositories";

const useCase:any = {
    registerUserUseCase,
    loginUserUseCase,
    forgotPasswordUseCase,
    ResetPasswordUseCase,
    isVerifiedUserUseCase,
protectedRouteUseCase

}

const repository:any = {
    saveUserRepo,
    findByUsernameRepo,
    findByResetTokenRepo,
    findByEmailRepo,
    createNewUserRepo,
    findByIdRepo
}

export default {
    useCase,repository
}
