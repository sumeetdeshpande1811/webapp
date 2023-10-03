const sequelize = require('../utils/config');
const checkHealthEndpoint=(req, res) =>{
  res.setHeader('Cache-control', 'no-cache');
  console.log(req.method);
  if( req.body && Object.keys(req.body).length>0){
    res.status(400).end()
  }
  else if(req.query && Object.keys(req.query).length>0){
    res.status(400).end();
  }
  else if(req.method !=='GET'){
    res.setHeader('Cache-control' ,'no-cache');
    res.status(405).end();
  }
  else{
  sequelize
    .authenticate()
    .then(() => {
      res.status(200).end();
    })
    .catch((error) => {
      res.status(503).end()
    });
  }
}

module.exports = checkHealthEndpoint;
