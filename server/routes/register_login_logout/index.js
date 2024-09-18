// var routes = require('express').Router();
const express = require('express')
const routes = express.Router()
const {
  getRegister,
  getByid,
  createRegister,
  editRegister,
  delByid,
  // login,
  loginv2,
  // loginv3,
  loginmb,
  logout,
  searchUser,
  currentUser,
} = require('./register_login_logout')
const { verifyToken } = require('../../middleware/VerifyToken')

routes.get('/getallregister', verifyToken, getRegister)
routes.get('/getbyid/:id', verifyToken, getByid)
routes.put('/editregister/:id', editRegister)
routes.delete('/delregister/:id', delByid)
routes.post('/searchuser', searchUser)

routes.post('/signup', createRegister)
// routes.post('/signin', login);   //version 1 login OTP หรือ password email ทอ.ได้
routes.post('/signin', loginv2)     //version 2 login ไม่เช็ค email ทอ.
// routes.post('/signin', loginv3)  //version 3 loginOTP เท่านั้น
routes.post('/signinmb', loginmb)  //login on mobile
routes.post('/signout', logout)
routes.post('/current-user', verifyToken, currentUser)

// log login and logout record
// routes.get('/getipaeddr', getiparddr)

module.exports = routes
