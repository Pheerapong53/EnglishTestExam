/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require('express');
const path = require('path');
const http = require('http');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const cors = require('cors');
const logger = require('morgan');
const { readdirSync } = require("fs");
const app = express();

// let env = process.env.NODE_ENV.trim() || 'production';
// let env = process.env.NODE_ENV || 'production';
// let dotEnv = '.env';

// if (env === 'development') {
//   dotEnv = '.dev-env';
// }


// require('dotenv').config({ path: `./${dotEnv}` });
require("dotenv").config();
// console.log("poecess: ", process.env)

const corsOptions ={
  // origin:'http://localhost:3000', 
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

app.use(cors(corsOptions))

app.use(logger('dev'));
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

readdirSync('./routes').filter((file) => file !== '.DS_Store').map((r) => app.use("/api", require(`./routes/${r}`)));

const server = http.createServer(app);
server.listen(process.env.HTTP_PORT || 7000,()=>{
    console.log(`Server is listening on port ${process.env.HTTP_PORT}`)
});

server.on('error',(error)=>{
  if (error.syscall !== 'listen') {
      throw error;
    }
    console.log('error',error);

    // let port = error.port
  
    // const bind = typeof port === 'string'
    //   ? 'Pipe ' + port
    //   : 'Port ' + port;
  
    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        // console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        // console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
})
