const { isEmpty, isNumber } = require("../util")

const validator = (data) => {
    let errors = {};
    let { name } = data


    let stringFields = { name }

    for (let key in stringFields)
        if (isEmpty(stringFields[key]))
            errors[key] = "Field is required"


    let numberFields = {}


    for (let key in numberFields)
        if (isEmpty(numberFields[key]))
            errors[key] = "Number is required"
        else if (!isNumber(numberFields[key]))
            errors[key] = "only Number is allowed"



    return {
        errors,
        isValid: isEmpty(errors)
    };
};

module.exports = validator