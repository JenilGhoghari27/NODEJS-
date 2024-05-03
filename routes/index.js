var express = require('express');
var router = express.Router();
const User = require("../model/User")
// const joi= require("joi");
const Friend = require("../model/friend")
// const bcrypt = require("bcrypt")
// const jwt = require('jsonwebtoken');
const jwtprotect = require('../controllers/protect')
const UserController = require("../controllers/protect")
const multer = require('multer')



/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


////// USER ///////

router.post('/SIGNUP', upload.single('image'), UserController.SIGNUP); //RG

router.post('/login', UserController.LOGIN); //LOGIN

router.get('/find', UserController.protect, UserController.find);  //VIEW

router.delete('/delete', UserController.delete); //DLT




//////////// FRIEND /////////////////
router.post('/ADD', UserController.ADD);

router.get('/ALL', jwtprotect.protect, UserController.ALL)





module.exports = router;
