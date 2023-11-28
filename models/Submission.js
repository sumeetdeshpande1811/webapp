const { DataTypes } = require('sequelize');
const sequelize = require('../utils/config'); 

const Submission = sequelize.define('submissions', {
    id : {
    type : DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      readOnly: true,
      primaryKey: true
    },
    assignment_id: {
        type: DataTypes.UUID,
        readOnly: true,
        allowNull: false,
        
    },
    user_id: {
      type: DataTypes.UUID,
      readOnly: true,
      allowNull: false
  },
    submission_url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'submission_url cannot be an empty string.',
              },
              isUrl:{
                args: true,
                msg: 'submission_url is invalid',
              }
          },
    },
    
    submission_date:{
        type:DataTypes.DATE,
        readOnly: true,
        validate: {
            isDate: {
              args: true,
              msg: 'Invalid date format.Please use format (e.g., "2016-08-29T09:12:33.001Z").',
            },
          },
    },
    assignment_updated:{
        type:DataTypes.DATE,
        readOnly: true,
        validate: {
            isDate: {
              args: true,
              msg: 'Invalid date format.Please use format (e.g., "2016-08-29T09:12:33.001Z").',
            },
          },
    },
    
    
   },
{
    createdAt: 'submission_date',
  updatedAt: 'assignment_updated'
}
);

module.exports={Submission};