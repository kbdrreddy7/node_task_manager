const path = require("path")
const folderDetails = {
    user: {
        profile_images: path.resolve(__dirname, "../../data_container/attachments/user/profile_images/"),
        images: path.resolve(__dirname, "../../data_container/attachments/user/images/"),
        videos: path.resolve(__dirname, "../../data_container/attachments/user/videos/"),
        others: path.resolve(__dirname, "../../data_container/attachments/user/others/")

    },
    task: {
        images: path.resolve(__dirname, "../../data_container/attachments/task/images/"),
        videos: path.resolve(__dirname, "../../data_container/attachments/task/videos/"),
        others: path.resolve(__dirname, "../../data_container/attachments/task/others/")

    }

}

module.exports = folderDetails
