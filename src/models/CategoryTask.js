
const {sequelize, DataTypes,Model} = require('../config/db');

class CategoryTask extends Model {}


// Extending Model and calling init(attributes, options)
// this is ternary(3) table  of Category and Task (m:n relation)
 CategoryTask.init(
  
  {
    _id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    category_: {
      type: DataTypes.STRING
    },
    task_: {
      type:DataTypes.STRING
    },

  },
  {
    sequelize,// connect db
    modelName:'_category_task_',
    timestamps: false
  }
);



module.exports=CategoryTask;