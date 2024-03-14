require('dotenv').config();
module.exports = {
  "development": {
    "username": process.env.USER_DB,
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE,
    "host": process.env.HOST,
    "port": process.env.DB_PORT,
    "dialect": "mysql",
    // "dialectOptions": {
    //   "connectTimeout": 60000, // 60 seconds
    // },
    // "pool": {
    //   "max": 5,
    //   "min": 0,
    //   "acquire": 30000,
    //   "idle": 10000,
    // },
    "logging": false,
    "_comment": "logging: false //ปิด Executing (default)" 
  },
  // "test": {
  //   "username": process.env.USER,
  //   "password": process.env.PASSWORD,
  //   "database": process.env.DATABASE,
  //   "host": process.env.HOST,
  //   // "port": process.env.DB_PORT,
  //   "dialect": "mysql",
  //   "logging": false,
  //   "_comment": "logging: false //ปิด Executing (default)" 
  // },
  // "production": {
  //   "username": process.env.USER,
  //   "password": process.env.PASSWORD,
  //   "database": process.env.DATABASE,
  //   "host": process.env.HOST,
  //   // "port": process.env.DB_PORT,
  //   "dialect": "mysql",
  //   "logging": false,
  //   "_comment": "logging: false //ปิด Executing (default)" 
  // }
};