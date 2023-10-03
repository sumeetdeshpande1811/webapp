const Account = require("../models/Account")
const { getUserPasswordAuth, comparePassword } = require('../utils/auth')

const authorizeToken = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res.status(401).json({
        message: 'Missing authorization header',
      })
    }
    const { username, password } = getUserPasswordAuth(authHeader)
    //console.log("aanajnjnajnajkn"+username,password);
    const user = await Account.findOne({
      where: {
        email:username,
      },
    })
    if (!user) {
      return res.status(401).json({
        message: 'Unauthorized: Invalid username or password',
      })
    }
    const isPasswordMatch = await comparePassword(password, user.password)
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: 'Unauthorized: Invalid username or password',
      })
    }
    global.email=username;
    next()
  }

 module.exports={authorizeToken}