import { User } from "../../Database";

export default {
  
  createNewUser:async(data:any)=>{
      
      console.log(data)
    try {
      const user = await User.create(data)
      return user
    } catch (error) {
      return {status:false,message:`Something Went Wrong..! ${error}`}
    }
  }
};
