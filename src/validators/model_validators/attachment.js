const { isEmpty } = require("../util")

let folderDetails

const validator = (data) => {
    if (!folderDetails)
        folderDetails= require('../../config')['attachment']

    let errors = {};
    let { group, subGroup } = data


    let stringFields = { group, subGroup }

    for (let key in stringFields)
        if (isEmpty(stringFields[key]))
            errors[key] = "Field is required"

            
    let groups = Object.keys(folderDetails)
    if (!groups.includes(group))
        errors.group = `${group} group doesn't exist`


    let subGroups = Object.keys(folderDetails[group])
    if (!subGroups.includes(subGroup))
        errors.subGroup = `${subGroup} subGroup doesn't exist`


    return {
        errors,
        isValid: isEmpty(errors)
    };
};

module.exports = validator