const fs=require("fs")
const router = require("express").Router();

//configs
const { mappings } = require("../../config")

// validators
const { userLoginValidator } = require("../../validators")

// models
//const {User}=require('../../models')


// services
const {  globalService, attachmentService } = require("../../services")


// middlewares
const { authentication } = require("../../middlewares");
const attachment = require("../../services/model_services/attachment");



// get attachment
router.get(["/:group/:subGroup/:name"], authentication, async (req, res, next) => {
    try {
        let { params: { group, subGroup, name} } = req

        const { validator } = mappings["attachment"]
        let { errors, isValid } = validator(req.params)
        if (!isValid)
            return res.status(400).send({ status: false, errors })
        let result=attachmentService.getFilePath({group,subGroup,name})   
        if (!result.status)
           return res.status(400).send(result)
        return res.sendFile(result.filePath) 

    } catch (error) {
        next(error)
    }

})



// upload one
router.post(["/:group/:subGroup/:name?"], authentication, async (req, res, next) => {

    try {
        let { params: { group, subGroup, name } } = req

        if ((!req.files) || Object.keys(req.files).length === 0 )
            return res.status(400).send({ status: false, error: "Please attach a file" });
        let file = req.files.file

        if(!file)
            return res.status(400).send({ status: false, error: "Please attach a file with key 'file' " });

        const {  validator } = mappings["attachment"]
        let { errors, isValid } = validator(req.params)
        if (!isValid)
            return res.status(400).send({ status: false, errors })

        return attachment.uploadFile({ group, subGroup, name,file},(result)=>{
            if (!result.status)
                res.status(400).send(result)

            return res.json({ ...result, status: true })
        })   

    } catch (error) {
        next(error)
    }

})

// update one with url
router.put(["/:group/:subGroup/:name"], authentication, async (req, res, next) => {
    try {

        let { params: { group, subGroup, name } } = req

        if (!req.files || Object.keys(req.files).length === 0)
            return res.status(400).send({ status: false, error: "Please attach a file" });
        let file = req.files.file

        const { validator } = mappings["attachment"]
        let { errors, isValid } = validator(req.params)
        if (!isValid)
            return res.status(400).send({ status: false, errors })

       return attachmentService.editFile({ group, subGroup, name,file},(result)=>{
           if (!result.status)
               return res.status(400).send(result)

           return res.json({ ...result, status: true })
       })

    } catch (error) {
        next(error)
    }
})

// delete one user ( softdelete)
router.delete(["/:group/:subGroup/:name"], authentication, async (req, res, next) => {
    try {

        let { params: { group, subGroup, name } } = req

        const { validator } = mappings["attachment"]
        let { errors, isValid } = validator(req.params)
        if (!isValid)
            return res.status(400).send({ status: false, errors })

        return attachmentService.deleteFile({ group, subGroup, name },(result)=>{
            if (!result.status)
                return res.status(400).send(result)
            return res.json({ ...result, status: true })
        })
        

    } catch (error) {
        next(error)
    }
})

router.all("*", (req, res, next) => {
    console.log(" no route found in attachment WHS", req.path)
    next()
});


module.exports = router;
