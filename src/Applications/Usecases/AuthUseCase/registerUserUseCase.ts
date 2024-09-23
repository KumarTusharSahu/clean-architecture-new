import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';

export const registerUserUseCase = (dependencies: any) => {
  console.log(dependencies)
  const { findByUsernameRepo, createNewUserRepo  } = dependencies.repository;

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

    const userData = await createNewUserRepo.createNewUser(user);


    const userVerificationUrl = `http://localhost:5000/api/auth/verified/${userData._id}`;

        await transporter.sendMail({
            to: user.email, // Send to user's registered email
            from: "Paradoxstudy5@gmail.com",
            subject: 'Password Reset',
            text: `You requested a Verification. Click the link to verify: ${userVerificationUrl}`,
          });
       return userData
  };

  return { executeFunction };
};


// Create the transporter (dependency)
const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "Paradoxstudy5@gmail.com",
    pass: "fmciylyqpbyvflnj",
  },
});