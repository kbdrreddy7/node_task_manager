const { isEmpty } = require("../util")

const validator = (data) => {
    let errors = {};
    let { category_, task_ } = data


    let stringFields = { category_, task_ }

    for (let key in stringFields)
        if (isEmpty(stringFields[key]))
            errors[key] = "Field is required"


    return {
        errors,
        isValid: isEmpty(errors)
    };
};

module.exports = validator