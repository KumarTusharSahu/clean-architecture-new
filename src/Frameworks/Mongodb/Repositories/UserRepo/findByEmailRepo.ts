import { User } from "../../Database";

export default {
  
  findByEmail:async(email: string)=>{
      
    try {
      return await User.findOne({ email });

    } catch (error) {
      return {status:false,message:`Something Went Wrong..! ${error}`}
    }
  }
};
