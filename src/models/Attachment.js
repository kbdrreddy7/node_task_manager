
const { sequelize, DataTypes, Model } = require('../config/db');

class Attachment extends Model { }

// Extending Model and calling init(attributes, options)

Attachment.init(

    {
        _id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        url: {
            type: DataTypes.STRING
        },
        type: {  // AUDIO, VIDIO, IMAGE, TXT, PDF, DOCX
            type: DataTypes.STRING
        },
        mimetype: {  // video/mp4  , img/png, img/jpg
            type: DataTypes.STRING
        },
        format:{
            type: DataTypes.STRING
        },
        size:{
            type:DataTypes.INTEGER
        },
        belongs_to:{
            type: DataTypes.STRING  // user id or task id
        }


    },
    {
        sequelize,// connect db
        modelName: 'attachment',
        timestamps: false
    }
);


module.exports = Attachment;