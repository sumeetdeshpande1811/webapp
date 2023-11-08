const Account = require("../models/Account")
const { getUserPasswordAuth, comparePassword } = require('../utils/auth')
const { logger } = require("../utils/utils")
const statsd = require('node-statsd')
const client = new statsd({
  host: process.env.stathost || 'localhost',
  port: process.env.statport || 8125,
})

const authorizeToken = async (req, res, next) => {
    const authHeader = req.headers.authorization
    logger.info("Authorize Token");
    const metric_name= `${req.method}.${req.baseUrl}${req.route?.path}`.replace(/[^a-zA-Z0-9/]+/g, "");
    console.log("#####@#@#@!#!@#!@#@!#@!",metric_name);
    client.increment(metric_name);
    if (!authHeader) {
      logger.warn("Invalid Authorize Header");
      return res.status(401).json({
        message: 'Missing authorization header',
      })
    }
    const { username, password } = getUserPasswordAuth(authHeader)
    const user = await Account.findOne({
      where: {
        email:username,
      },
    })
    if (!user) {
      logger.warn("Unauthorized: Invalid username or password");
      return res.status(401).json({
        message: 'Unauthorized: Invalid username or password',
      })
    }
    const isPasswordMatch = await comparePassword(password, user.password)
    if (!isPasswordMatch) {
      logger.warn("Unauthorized: Invalid username or password");
      return res.status(401).json({
        message: 'Unauthorized: Invalid username or password',
      })
    }
    global.email=username;
    next()
  }

 module.exports={authorizeToken}