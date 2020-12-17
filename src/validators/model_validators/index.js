const categoryValidator = require("./category")
const taskValidator = require("./task")
const userValidator=require("./user")
const categoryTaskValidator = require("./categoryTask")
const attachmentValidator = require("./attachment")



module.exports = { 
    categoryValidator,
    taskValidator,
    userValidator,
    categoryTaskValidator,
    attachmentValidator
}