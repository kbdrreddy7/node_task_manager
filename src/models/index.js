const Category=require("./Category")
const CategoryTask=require("./CategoryTask")
const User=require("./User")
const Task=require("./Task")
const Attachment = require("./Attachment")

/* 
  1) 
  belongsTo and hasOne
  ---------------------

  source.belongsTo(Target,{foreignKey:"target_id",targetKey:"id"})
  // in source forign key field will be created
  // eg: Audit.belongsTo(User, { foreignKey: 'created_by_',targetKey: '_id' });
  // in Audit 'created_by_' will be created and referenced (foreign key )on '_id' from User


  source.hasOne(Target,{foreignKey:"target_id",targetKey:"id"})
  // in Target forign key field will be created
  // Profile.hasOne(User,{ foreignKey: 'profile_',targetKey: '_id' })
  // in User 'profile_' will be created and referenced (foreign key )on '_id' from Profile


  2)
   while creating bi-directionality association, it is giving error
   (e.g User, Profile), so create association in db, and assign manually in program


*/


//---------------------Associations---------------------


User.hasMany(Task, { foreignKey: 'owner_',targetKey: '_id' });

//https://sequelize.org/master/manual/advanced-many-to-many.html
// m:n bi-direction
Task.belongsToMany(Category,{through:CategoryTask,foreignKey:'task_',otherKey:'category_'})
Category.belongsToMany(Task, { through: CategoryTask, foreignKey: 'category_', otherKey: 'task_' })


module.exports={
  Category, CategoryTask, Task, User, Attachment
}
