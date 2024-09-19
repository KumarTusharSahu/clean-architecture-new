import bcrypt from 'bcrypt';

export const ResetPasswordUseCase = (dependencies: any) => {
  const { findByResetTokenRepo } = dependencies.repository;

  const executeFunction = async (token: string, newPassword: string): Promise<void> => {
    const user = await findByResetTokenRepo.findByResetToken(token);
    console.log(user);

    if (!user) {
      throw new Error('User not found');
    }

    if (!user.resetPasswordExpires || user.resetPasswordExpires < new Date()) {
      throw new Error('Token is invalid or has expired');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save(); // Save the updated user (assuming user is a Mongoose model or similar)
  };

  return { executeFunction };
};
