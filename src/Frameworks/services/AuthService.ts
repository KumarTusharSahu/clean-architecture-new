import bcrypt from 'bcrypt';
import { User } from '../Mongodb/Database';

export const userService = (dependencies: any) => {
  const { findByEmailRepo } = dependencies.repository;

  const register = async (username: string, password: string, email: string) => {
    const existingUser = await findByEmailRepo(email); // Check if email already exists
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: hashedPassword,
      email,
    });

   
     await user.save(); 
     
  };

  return  register ;
};
