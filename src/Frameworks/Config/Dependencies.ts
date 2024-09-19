import { loginUserUseCase, registerUserUseCase } from "../../Applications/Usecases";
import { createNewUserRepo, findByEmailRepo, findByResetTokenRepo, findByUsernameRepo, saveUserRepo } from "../../Frameworks/Mongodb/Repositories";




const useCase:any = {
    registerUserUseCase,
    loginUserUseCase
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
