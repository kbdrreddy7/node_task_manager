
// services
const utilService=require("../util")


/** 
 * @param {Object} obj 
 * @param {Object} user
 * @returns {Object} data base modal object with id and default fields
  */
const createObject=(model,obj)=>{
 obj._id=utilService.generateObjectId(model)
 /* 
  here we can set some other default values
  ..like domain..division.. createdBy, modifiedBy
  */
 return obj
}
 
const createObjects = (model, objArray) => objArray.map((obj) => createObject(model, obj))

/** 
 * @param {Object} obj 
 * @param {Object} model
 * @returns {Promise} data base modal object with id and default fields
  */
const saveObject=({obj,model})=>{
    return model.create(obj)
}

const saveObjects=({objArray,model})=>{
  return model.bulkCreate(objArray, {returning: true})
}

const updateOne=async({ obj,model,where={}}={})=>{

  if(!(where&& Object.keys(where).length))
      throw "Conditions are required for update"

  let count=await model.update(obj,{where});

  return [count, obj]

}

const deleteOne=async({model,where={}}={})=>{

  if(!(where&& Object.keys(where).length))
  throw "Conditions are required for update"

  return model.destroy({ where }) // we can do soft delete...with paranoid in model options

}

/** 
 * @param {Object} model 
 * @returns {Promise} data base modal object with id and default fields
*/

const getAll=({model, where={},attributes=[],exclude=[],offset=0,limit=100,order=[],raw=true,include=[],group=[]}={} )=>{

  let queryObj=utilService.convertDbQueryObject({ where,attributes,exclude,offset,limit,order,raw,include,group})
  return model.findAndCountAll(queryObj)

}

const getOne=({model, where={},attributes=[],exclude=[],raw=true,include=[]}={} )=>{

  let options={where,attributes,raw,include}

  if(exclude&&exclude.length>0)
      options.attributes={exclude} // exclude is not working

   if(Array.isArray(attributes)&&attributes.length==0)
      delete options.attributes
          
     
  return model.findOne(options)

}


// returns [obj,created]-> i.e [objecteInstace,boolean]
const upsertObj=async({model,obj})=>{

  if(!obj._id)
     throw 'Id is required for upsert'


   // https://sequelize.org/master/class/lib/model.js~Model.html#static-method-upsert
    let [result,created]=await model.upsert(obj,{returning:true}) // won't support for all DBs
  return [result, created] // Postgres/SQLite alwsys returns --> null ( not true or false) 

  /*
    // https://sequelize.org/v3/docs/models-usage/
          let [result, created]=await model.findOrCreate({where:{_id:obj._id},defaults:obj})
          if(!created){
            await model.update(obj,{where:{_id:obj._id}})

            return [result,created]
          }
  */


}

//generally for mobile(offiline) Api s---> should send Id also 
const upsertObjs=async({ model,objArray})=>{

  /* 
      bulk upsert won't support for all databases by sequelize,
      so if there is no support for our db
           use normalUpsertObjs
        else specialUpsertObjs
  */

  //let resposes=await normalUpsertObjs({model,objArray,user,ingnoreAudit:true})

  //  postgresql supports bulk upsert
  let resposes =await specialUpsertObjs({model,objArray})

  return resposes


}


// this bulk upsert will work for all the data bases
const normalUpsertObjs=async({model,objArray})=>{

    let resposes=[]

    for(let obj of objArray){

      let [respose]=await upsertObj({model,obj})
      resposes.push(respose)

    }

    return resposes


}

// this bulk upsert will work with only few data base
const specialUpsertObjs=async({model,objArray})=>{
/* 
  ref 
     https://stackoverflow.com/questions/48124949/nodejs-sequelize-bulk-upsert
     https://sequelize.org/master/class/lib/model.js~Model.html#static-method-bulkCreate
*/


    let attributes=Object.keys(model["rawAttributes"])

//  let resposes= await model.bulkCreate(objArray,{updateOnDuplicate:true}) // is not working
    let resposes= await model.bulkCreate(objArray,{updateOnDuplicate:attributes})

    return resposes


}

const getCount=({model, where={},attributes=[],exclude=[],offset=0,limit=100,order=[],raw=true,include=[],group=[]}={} )=>{

    let queryObj=utilService.convertDbQueryObject({ where,attributes,exclude,offset,limit,order,raw,include,group})
   
  return model.count(queryObj)

}



module.exports={
    createObject,createObjects,
    saveObject,saveObjects,
    updateOne,
    getAll,
    getOne,
    deleteOne,
    upsertObj,
    upsertObjs,
    normalUpsertObjs,
    specialUpsertObjs,
    getCount

}