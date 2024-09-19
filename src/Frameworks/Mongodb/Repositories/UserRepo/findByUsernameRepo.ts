import { User } from "../../Database";

export default {
  findByUsername: async (username: string) => {
    try {
      return await User.findOne({ username });
    } catch (error) {
      return { status: false, message: `Something Went Wrong..! ${error}` };
    }
  },
};
