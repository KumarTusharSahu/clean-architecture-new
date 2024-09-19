import bcrypt from 'bcrypt';

export const registerUserUseCase = (dependencies: any) => {
  console.log(dependencies)
  const { findByUsernameRepo,createNewUserRepo  } = dependencies.repository;

  const executeFunction = async (username: string, password: string, email: string) => {
    const existingUser = await findByUsernameRepo.findByUsername(username);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user =  {
      username,
      password: hashedPassword,
      email,
    }
    console.log(user)
    return await createNewUserRepo.createNewUser(user);
  };

  return { executeFunction };
};
