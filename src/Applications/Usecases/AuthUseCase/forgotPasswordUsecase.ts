import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { User } from '../../../Frameworks/Mongodb/Database';

export const forgotPasswordUseCase = (dependencies:any) => {
    const { findByEmailRepo } = dependencies.repository;

  return async (email: string): Promise<void> => {
    const user = await findByEmailRepo(email); 
    if (!user) {
      throw new Error('User not found');
    }

    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour expiration

    await user.save(); // Save the updated user (assuming user is a Mongoose model or similar)

    const resetUrl = `http://localhost:5000/api/users/reset-password/${token}`;

    await transporter.sendMail({
      to: user.email, // Send to user's registered email
      from: "Paradoxstudy5@gmail.com",
      subject: 'Password Reset',
      text: `You requested a password reset. Click the link to reset your password: ${resetUrl}`,
    });
  };
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

