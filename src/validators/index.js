const utilValidator=require("./util")
const userLoginValidator=require("./userLogin")



//------------
const modelValidators=require("./model_validators")


module.exports={
    utilValidator,userLoginValidator,

    //---------------
    ...modelValidators
}