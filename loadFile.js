const express= require('express');
const app = express();
const cors=require('cors');
const csv = require('csv-parser');
const fs = require('fs');
const Account =require('./models/Account');

const loadUsersFromCSV = async () => {
    try {
         Account.sequelize.sync();
      // Load the CSV file at application startup
      fs.createReadStream('./users.csv')
        .pipe(csv())
        .on('data', async (row) => {
          const useremail = row.email;
          console.log(row)
          const existingUser = await Account.findOne({
            where: { email: useremail },
          });
         
         if(!existingUser){ 
          try {
              const user = {
                  first_name : row.first_name,
                  last_name : row.last_name,
                  email : row.email,
                  password : row.password
              }
              const acc =  await Account.create(user);
              console.log(acc);
  
          } catch (e) {
            console.log(e);
          }
        }
        
         
        })
        .on('end', () => {
          console.log('CSV file successfully loaded.');
        
          app.get('/', (req, res) => {
            res.send('Hello, World!');
          });
  
         
        });
    } catch (error) {
     console.log(error);
    }
  };

  //loadUsersFromCSV();