const { DataTypes } = require('sequelize');
const sequelize = require('../utils/config'); 

const {hash,genSalt}=require('bcrypt');

const Account = sequelize.define('accounts', {
  id : {
      type : DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      readOnly: true,
      primaryKey: true
  },
  first_name: {
      type: DataTypes.STRING,
      allowNull: false
  },
  last_name: {
      type: DataTypes.STRING,
      allowNull: false
  },
  email : {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
      validate: {
        isEmail: {
          args: true,
          msg: 'User name should be a valid email address!',
        },
      },
  },
  password : {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [5, 15],
          msg: 'Password should be between 5 and 15 characters',
        },
      },
  },
},
{
  createdAt: 'account_created',
  updatedAt: 'account_updated'
}
);

Account.beforeCreate( async  (acc) => {
try {
  const salt = await genSalt()
  console.log(Date().toString() + ' :: Hashing password')
  const hashedPassword = await hash(acc.password, salt)
  acc.password = hashedPassword
} catch (e) {
  console.log(e)
}
})




module.exports = Account;

// const Account = sequelize.define('accounts', {
//   id: {
//     type: DataTypes.UUID,
//     defaultValue: DataTypes.UUIDV4,
//     primaryKey: true,
//     allowNull: false,
//     readOnly: true,
//   },
//   first_name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   last_name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     writeOnly: true,
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//     validate: {
//       isEmail: true,
//     },
//   },
//   account_created: {
//     type: DataTypes.DATE,
//     allowNull: false,
//     defaultValue: DataTypes.NOW,
//     readOnly: true,
//   },
//   account_updated: {
//     type: DataTypes.DATE,
//     allowNull: false,
//     defaultValue: DataTypes.NOW,
//     readOnly: true,
//   },
// }, {
//     // freezeTableName: true,
//     // tableName: "Account",
//     updatedAt: 'account_updated',
//     createdAt: 'account_created',
// });

// try {
//   await sequelize.authenticate();
//   console.log('Database connection has been established successfully.');
//   await Account.sync({ alter: true })
//   console.log("Account model was synchronized successfully.");
// } catch (error) {
//   console.error('Unable to connect to the database:', error);
// }


// module.exports = Account;
