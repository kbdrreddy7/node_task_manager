
const {sequelize, DataTypes,Model} = require('../config/db');


class User extends Model {}



// Extending Model and calling init(attributes, options)

 User.init(
  
  {
    _id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING
    },
    last_name: {
      type: DataTypes.STRING
    },
    // used for login
    user_name: {
      type: DataTypes.STRING,
      unique:true
    },
    password: {
      type: DataTypes.STRING
    },
    mobile_no: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.STRING
    },
    gender: {
      type: DataTypes.STRING
    },
    birth_date: {
      type: DataTypes.DATEONLY
    },
    login_time: {
      type: DataTypes.DATE // date time
      },
    profile_img_url:{
    type: DataTypes.STRING
    }
  },
  {
    sequelize,// connect db
    modelName:'user',
    timestamps: false
  }
);


module.exports=User;