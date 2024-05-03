var express = require('express');
var router = express.Router();
const User = require("../model/User")
const Friend = require("../model/friend")
const jwtprotect = require('../controllers/protect')
const UserController = require("../controllers/protect")
const multer = require('multer')

////// USER ///////

router.post('/SIGNUP', upload.single('image'), UserController.SIGNUP); //RG

router.post('/login', UserController.LOGIN); //LOGIN

router.get('/find', UserController.protect, UserController.find);  //VIEW

router.delete('/delete', UserController.delete); //DLT

//////////// FRIEND /////////////////

router.post('/ADD', UserController.ADD);

router.get('/ALL', jwtprotect.protect, UserController.ALL)





module.exports = router;
