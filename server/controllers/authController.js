const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const saltRounds = process.env.SALTROUNDS || 10;
const validator = require("email-validator");
const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const Company = require("../models/companyModel");
const {nanoid} = require("nanoid");

const authController = {
     signup: async (req, res) => {
          try {
               const { username, firstName, lastName, email, phone, password } = req.body;
               if (!(firstName.trim() && email && phone && password)) {
                    return res.status(400).json({ error: 'Please fill all required fields' });
               }
               const isAlreadyExist = await User.findOne({ email, username });
               if (isAlreadyExist) {
                    return res.status(400).json({ error: 'This user already exists' });
               }
               const isValidEmail = validator.validate(email);
               if (!isValidEmail) {
                    return res.status(400).json({ error: 'Please enter a valid email' });
               }
               const id = nanoid();
               const salt = await bcrypt.genSaltSync(parseInt(saltRounds));
               const hashingPassword = await bcrypt.hash(password, salt);
               const createdDate = moment().format("DD/MM/YYYY");
               let newUser = new User({
                    id,
                    firstName,
                    lastName,
                    username,
                    email,
                    phone,
                    password: hashingPassword,
                    createdDate,
                    updatedDate: createdDate,
               });
               newUser = await newUser.save();
               if (!newUser) {
                    return res.status(400).json({ error: "Failed to save user" });
               }
               return res.status(200).json({ user: newUser });
          } catch (error) {
               console.log("Error while while sign up");
               return res.status(500).json({ error: `Server error while sign up, ${error.message}` });
          }
     },
     signin: async (req, res) => {
          try {
               const { useremail, password } = req.body;
               if (!(useremail.trim() && password.trim())) {
                    return res.status(400).json({ error: "Please provide all the details" });
               }
               const user = await User.findOne({ email: useremail });
               if (!user) {
                    return res.status(400).json({ error: 'Not exists. Please signup' });
               }
               const checkPassword = await bcrypt.compare(password, user.password);
               console.log("user ->", user);
               if (!checkPassword) {
                    return res.status(401).json({ error: 'EmailId or password does not match' });
               }
               // generate a token
               const token = jwt.sign({ password: user.password }, process.env.SECRET_KEY);
               if (!token) {
                    return res.status(500).json({ error: 'Server issue. Token is not enerated' });
               }
               res.cookie("token", token, {
                    expire: new Date() + 60 * 60 * 24 * 30,
                    path: '/'
               });
               const data = {
                    username: user.username,
                    useremail: user.email
               }
               return res.status(200).json(data);
          } catch (error) {
               console.log("Error while login");
               return res.status(500).json({ error: `Server error while sign up, ${error.message}` });
          }
     },
     signout: async (req, res) => {
          try {
               res.clearCookie("token");
               return res.json({
                    msg: "User signout successfully",
               });
          } catch (error) {
               return res.status(500).json({ error: error.message });
          }
     },
     isSignedIn: expressJwt({
          secret: process.env.SECRET_KEY,
          algorithms: ["HS256"],
          userProperty: "auth",
     }),
     isAdmin: async (req, res, next) => {
          try {
               const {userId} = req.params;
               if(!userId){
                    return res.status(401).json({error: "No user id found"});
               }
               const user = await User.findById(userId);
               if(!user){
                    return res.status(401).json({error: "No user found"});
               }
               if(user.role === 'ADMIN'){
                    next();
               }else{
                    return res.status(401).json({error: "Unauthorised access"});
               }
          } catch (error) {
               console.log("Error while checking isAdmin");
               return res.status(500).json({error: `Server error while checking authorization`});
          }

     }
}

module.exports = authController;