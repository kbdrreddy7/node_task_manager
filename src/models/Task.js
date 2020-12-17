
const {sequelize, DataTypes,Model} = require('../config/db');

class Task extends Model {}

// Extending Model and calling init(attributes, options)

 Task.init(
  
  {
    _id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING
    },
    sub_title:{
      type: DataTypes.STRING
    },
    description:{
      type: DataTypes.STRING
    },
    priority:{
      type: DataTypes.INTEGER 
    },
    start_date:{
      type: DataTypes.DATE // date time
    },
    end_date:{
      type: DataTypes.DATE // date time
    },
    status:{
      type: DataTypes.STRING //["NOT_STARTED","STARTED","COMPLETED","PENDING"]
    },
    task_img_url:{
      type: DataTypes.STRING
    },
     task_geo_loc: {
       type: DataTypes.STRING
     },
    owner_:{
      type: DataTypes.STRING
    }

  },
  {
    sequelize,// connect db
    modelName:'task',
    timestamps: false
  }
);


module.exports=Task;