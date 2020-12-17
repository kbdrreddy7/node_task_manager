const { isEmpty, isNumber,isDate } = require("../util")

const validator = (data) => {
    let errors = {};
    let {
        title, start_date, end_date, status, owner_, priority

    } = data

    //==================================================

    let stringFields = {
        title, status, owner_
    }

    for (let key in stringFields)
        if (isEmpty(stringFields[key]))
            errors[key] = "Field is required"

    //==================================================

    let numberFields = { priority}
    for (let key in numberFields)
        if (isEmpty(numberFields[key]))
            errors[key] = "Number is required"
        else if (!isNumber(numberFields[key]))
            errors[key] = "only Number is allowed"
    //==================================================

    let dateFields = { start_date, end_date }

    for (let key in dateFields)
        if (isEmpty(dateFields[key]))
            errors[key] = "Date( Date-Time) is required"
        else if (!isDate(dateFields[key]))
            errors[key] = "only Date( Date-Time) is allowed"      
    //==================================================


    return {
        errors,
        isValid: isEmpty(errors)
    };
};

module.exports = validator