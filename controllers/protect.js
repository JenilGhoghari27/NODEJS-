
const User = require("../model/User")
const Friend = require('../model/friend')
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer");
// const joi= require("joi");
// const passwordRegEx =require("passwordRegEx");


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "MAIL ID",
    pass: "", //[GoogleAccount => AppPasswords => Enter your MailId Password => Create App Name => Generated App password => Copy and Paste in Code => Remove Spaces] ]
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main(email) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'jenilleptop27@gmail.com', // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    // text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);

}

exports.protect = async function (req, res, next) {
  try {
    console.log(req.headers.authorization);
    const token = req.headers.authorization
    if (!token) {
      throw new Error("PLEASE ATTACH TOKEN")
    }
    var decoded = jwt.verify(token, 'JENIL');
    console.log(decoded);
    const checkUser = await User.findById(decoded.id)
    if (!checkUser) {
      throw new Error("USER NOT FOUND")
    }
    req.userId = decoded.id
    next()
  } catch (Error) {
    res.status(404).json({
      status: "faill",
      message: Error.message
    })
  }
}


//// USER ////
exports.SIGNUP = async function (req, res, next) {
  try {
    // req.body.image = req.file.filename
    req.body.password = await bcrypt.hash(req.body.password, 10)
    await User.create(req.body)
    await main(req.body.email)
    res.status(200).json({
      status: "✅",
      message: "signup succsessfully",
    })
  } catch (Error) {
    res.status(404).json({
      status: "fail",
      message: Error.message
    })
  }
}
exports.LOGIN = async function (req, res, next) {
  try {
    console.log(req.body);
    if (!req.body.email) {
      throw new Error("Please Enter E-mail")
    }
    var checkUser = await User.findOne({ email: req.body.email })
    if (!checkUser) {
      throw new Error("Check E-mail")
    }
    var checkpass = await bcrypt.compare(req.body.password, checkUser.password)
    if (!checkpass) {
      throw new Error("Check Pass")
    }
    var token = jwt.sign({ id: checkUser._id }, 'JENIL');

    res.status(200).json({
      status: " login",
      message: "login successfully",
      token
    })
  } catch (Error) {
    res.status(404).json({
      status: "fail",
      message: Error.message
    })
  }
}
exports.find = async function (req, res, next) {
  try {
    const data = await User.find()       //  ById(req.userId)
    res.status(201).json({
      status: "finded ✅",
      message: "FIND SUCCESSFULLY ✅",
      data
    })
  } catch (Error) {
    res.status(404).json({
      status: "fail",
      message: Error.message
    })
  }
}

/// FRIEND ///
exports.ADD = async function (req, res, next) {
  try {
    if (!req.body.send_id || !req.body.recive_id) {
      throw new Error("USER NOT FOUND")
    }
    if (req.body.send_id == req.body.recive_id) {
      throw new Error("REQUEST NOT SENT ")
    }
    const checkreq = await Friend.findOne({ $or: [{ send_id: req.body.send_id, recive_id: req.body.recive_id }, { send_id: req.body.recive_id, recive_id: req.body.send_id }] })
    console.log(checkreq);

    if (checkreq) {
      throw new Error("ALREDY REQUESTED")
    }

    await Friend.create(req.body)
    res.status(201).json({
      status: "ADDED ✅",
      message: "ADD SUCCESSFULLY ✅",

    })
  } catch (Error) {
    res.status(404).json({
      status: "fail",
      message: Error.message
    })
  }
}
exports.delete = async function (req, res, next) {
  try {
    const data = await User.findByIdAndDelete(req.query.id)
    res.status(201).json({
      status: "deleted ✅",
      message: "delete SUCCESSFULLY ✅",
      data
    })
  } catch (Error) {
    res.status(404).json({
      status: "fail",
      message: Error.message
    })
  }
}
exports.ALL = async function (req, res, next) {
  try {
    const data = await Friend.find({}, {}, {
      populate: {
        path: "send_id"
      }
    })
    // populate : {path : "send_id",select: "username" })
    // .populate({path :"recive_id",select: "username"}).exec();
    console.log("data ===", data);
    res.status(201).json({
      status: "ADDED",
      message: "DATA FIND SUCCSESSFULLY",
      data
    })

  } catch (Error) {
    res.status(404).json({
      status: "NOT FOUND",
      message: Error.message
    })
  }
}

