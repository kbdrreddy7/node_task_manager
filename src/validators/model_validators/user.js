const { isEmpty, isNumber,isDate,isBoolean } = require("../util")

const validator=(data)=> {
    let errors = {};
    let {
        first_name, last_name, user_name, password, mobile_no, email,
        address, gender, birth_date
     
    } = data


    //==================================================
    let stringFields = {
        first_name, last_name, user_name, password, mobile_no, email,
        address, gender
      
    }
    for (let key in stringFields)
        if (isEmpty(stringFields[key]))
            errors[key] = "Field is required"

    //==================================================

     let numberFields={}
    for (let key in numberFields)
        if (isEmpty(numberFields[key]))
            errors[key] = "Number is required"
        else if(!isNumber(numberFields[key]))
            errors[key] = "only Number is allowed"
    //==================================================


    let dateFields = { birth_date}

    for (let key in dateFields)
        if (isEmpty(dateFields[key]))
            errors[key] = "Date( Date-Time) is required"
        else if (!isDate(dateFields[key]))
            errors[key] = "only Date( Date-Time) is allowed"
    //==================================================



    let booleanFields = {  }

    for (let key in booleanFields)
        if (isEmpty(booleanFields[key]))
            errors[key] = "Boolean is required"
        else if (!isDate(booleanFields[key]))
            errors[key] = "only true/false is allowed"
    //==================================================


    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = validator