import crypto from 'crypto';
import nodemailer from 'nodemailer';

export const forgotPasswordUseCase = (dependencies: any) => {
  // console.log(dependencies);
  const { findByEmailRepo } = dependencies.repository;

  const executeFunction = async (email: string): Promise<void> => {
    const user = await findByEmailRepo.findByEmail(email);
    console.log(user)
    if (!user) {
      throw new Error('User not found');
    }

    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour expiration

    await user.save(); // Save the updated user (assuming user is a Mongoose model or similar)

    const resetUrl = `http://localhost:5000/api/auth/reset-password/${token}`;

    await transporter.sendMail({
      to: user.email, // Send to user's registered email
      from: "Paradoxstudy5@gmail.com",
      subject: 'Password Reset',
      text: `You requested a password reset. Click the link to reset your password: ${resetUrl}`,
    });
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
