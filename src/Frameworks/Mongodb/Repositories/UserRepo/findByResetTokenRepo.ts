import { User } from "../../Database";

export default {
  findByResetToken: async (data: any) => {
    const { token } = data;

    try {
      return await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: new Date() }, // Ensure the token has not expired
      });
    } catch (error) {
      return { status: false, message: `Something Went Wrong..! ${error}` };
    }
  },
};
