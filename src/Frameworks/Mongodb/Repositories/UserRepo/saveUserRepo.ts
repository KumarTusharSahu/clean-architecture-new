export default {
  
  save:async(data:any)=>{
      const {user}=data
      
    try {
      return await user.save();

    } catch (error) {
      return {status:false,message:`Something Went Wrong..! ${error}`}
    }
  }
};




