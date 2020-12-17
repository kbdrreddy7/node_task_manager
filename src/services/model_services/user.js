
// models
const {User}=require("../../models")
const {comparePassswords,hashPassword,generateObjectId}=require("../util")

// services
const globalService=require("./global")

const login=async({ user_name, password})=>{

   let user=await User.findOne({where: { user_name}})   
  
   if(!user)
     return ({status:false,user_name:"User Name doesn't exist"})

   if (comparePassswords(password, user.password)) {

    //----------need to upadte login_time
      await globalService.updateOne({ obj:{login_time:new Date()},
                                      model:User,
                                      where:{user_name,_id:user._id}
                                    })
     return ({status:true,user})
   }
   
   return ({status:false,password:"Password is not matching"})

}

// save user object
const saveObject=async({obj})=>{

  obj._id=generateObjectId(User)
  obj.password=hashPassword(obj.password)

  return User.create(obj)

}


const updateOne=({obj,where={}})=>{

  delete obj.user_name // no update  ( fix )

  if(obj.password)
  obj.password=hashPassword(obj.password)

  return globalService.updateOne({obj,model:User,where})  

}

module.exports={
    login,
    saveObject,
    updateOne
}