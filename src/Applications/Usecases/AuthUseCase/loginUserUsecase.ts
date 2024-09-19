import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginUserUseCase = (dependencies: any) => {
  // console.log(dependencies)
  const { findByUsernameRepo } = dependencies.repository;
  const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

  const executeFunction = async (username: string, password: string): Promise<{ token: string }> => {
    const user = await findByUsernameRepo.findByUsername(username);
    if (!user) {
      throw new Error('Invalid username or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid username or password');
    }

    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    return { token };
  };

  return { executeFunction };
};
