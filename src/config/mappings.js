
//models
const {
    Category,Task,User,CategoryTask,Attachment
}=require("../models")

//validators
const {categoryValidator,taskValidator,
     userValidator,categoryTaskValidator,attachmentValidator
    }=require("../validators")

// key is route name 
const mappings={
    [Category.tableName]: { model: Category,validator:categoryValidator,idPrefix:"CT",
                            include:[
                                        {
                                            model: Task, attributes: ['_id', "title"],include:[]
                                        }
                                    ]
                          },
    [Task.tableName]: { model: Task, validator:taskValidator,  idPrefix:"TA",
                        include: [
                                    {
                                        model: Category, attributes: ['_id', "name"]
                                    }
                                ]
                      },
    [CategoryTask.tableName]: { model: CategoryTask, validator: categoryTaskValidator, idPrefix: "CAT" },
    [User.tableName]: { model: User,validator:userValidator,idPrefix:"US"},
    [Attachment.tableName]: { model: Attachment, validator: attachmentValidator, idPrefix: "AT" },


   
  
    
}
module.exports=mappings