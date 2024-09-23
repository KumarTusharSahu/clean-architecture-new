import { User } from "../../Database";

export default {
  findById: async (id: string) => {
    try {
      return await User.findById(id);
    } catch (error) {
      return { status: false, message: `Something Went Wrong..! ${error}` };
    }
  },
};
