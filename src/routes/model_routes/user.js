const router = require("express").Router();

//configs
const {mappings}=require("../../config")

// validators
const {userLoginValidator}=require("../../validators")

// models
//const {User}=require('../../models')


// services
const { utilService, userService, globalService,mailService}=require("../../services")

// middlewares
const { authentication}=require("../../middlewares")


// login
router.post("/login",async(req,res,next)=>{

try {
            let {body}=req
            const { errors, isValid } = userLoginValidator(body);
            
            if (!isValid) {
                return res.status(400).json({status:false, errors});
            }
            //user_name,password,app_type
            let { app_type, user_name, password } = body
            let ip= req.headers['x-forwarded-for'] || req.connection.remoteAddress

            let {status,user,...rest}=await userService.login({ user_name, password})
            if(status)
            {
                let {_id,user_name,login_time,first_name,last_name,email }=user

                // ------ we can do here some actions...like updating..user pending tasks

                if (process.env.NOTIFY_ON_LOGIN==='YES')
                    mailService.sendMailFromApp({
                        to: email,
                        subject:"Login Detected in Task Manager App",
                        text: `login is detected in the Task Manager App from the ${ip} IP address at ${new Date().toGMTString()} using ${app_type} app`
                    })
                   


                const payload = {_id, user_name, login_time, first_name, last_name}
              
                let token=utilService.convertToToken(payload)
                 
                return res.set('Authorization', token).json({status:true, token  });
            }
            else {
                return res.status(400).send({status:false,errors:{...rest}})
            }

    } catch (error) 
    {
        next(error)

    }

})

// get all users
router.get(["/"], authentication,  async(req,res,next)=>{
    try {
        
        let {query,user}=req

        let {model}=mappings["user"]

        if(!model)
        {
            next()
            return;
        }

        let options=utilService.parseQueryString(query)

           options.exclude.push("password")


        let data=await globalService.getAll({model,user,...options})
        let {offset,limit}=options

     return res.status(200).send({status:true, data:data["rows"],count:data["count"],offset,limit}) 
       
    } catch (error) {
        next(error)
    }
   
})


// get one user
router.get(["/:id"], authentication,async(req,res,next)=>{
    try {
        

        let {params:{id},query,user}=req

        let {model}=mappings["user"]

        if(!model)
        {
            next()
            return;
        }

        let options=utilService.parseQueryString(query)
      
        options.where._id=id
        options.exclude.push("password") // exclude is not working for getOne

     let data=await globalService.getOne({model,user,...options})

       if(!data)
         return res.status(400).send({status:false,error:"Id doesn't exists"}) 
       res.status(200).send({status:true, data:data})



    } catch (error) {
        next(error)
    }
})


// add one user
router.post("/", authentication,async(req,res,next)=>{

    try {

        let {user,body}=req

        const {model,validator}=mappings["user"]

        if(!model)
          return next()

        let { errors,isValid}=validator(body) 
        if(!isValid)
           return res.status(400).send({status:false,errors})


        let {user_name}=body   
        let oldCount=await globalService.getCount({model,where:{user_name}})   
        if(oldCount>0)
            return res.status(400).send({status:false,errors:{user_name:"Uers Name already exists"}})



       let data=await userService.saveObject({obj:body}) 


        return res.json({status:true,data})
        
    } catch (error) {
        next(error)
    }
   
})

// update one user
router.put(["/:id"], authentication,async(req,res,next)=>{
    try {
        
        let {params:{id},body:obj,user}=req

        

       let [updateCount,data]=await userService.updateOne({obj,where:{_id:id},user})  

       if(updateCount<=0)
         return res.status(400).send({status:false,error:"ID doesn't exists"})

       return res.json({status:true,data,message:`${updateCount} recored(s) updated successfully`})

    } catch (error) {
        next(error)
    }
})

// delete one user ( softdelete)
router.delete(["/:id"], authentication,async(req,res,next)=>{
    try {
        
        let {params:{id},user}=req


        const {model}=mappings["user"]

        if(!model)
          return next()

     
       let updateCount=await globalService.deleteOne({model,where:{_id:id}})  

       if(updateCount<=0)
         return res.status(400).send({status:false,error:"ID doesn't exists"})

       return res.json({status:true,message:`${updateCount} recored(s) deleted successfully`})

    } catch (error) {
        next(error)
    }
})

router.all("*", (req, res,next) => {
    console.log(" no route found in user WHS",req.path)
    next()
});


module.exports =router;
