
const {sequelize, DataTypes,Model} = require('../config/db');

class Category extends Model {}


// Extending Model and calling init(attributes, options)

 Category.init(
  {
    _id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING
    }

  },
  {
    sequelize,// connect db
    modelName:'category',
    timestamps: false,
  
  }
);




module.exports=Category;