const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const saltRounds = process.env.SALTROUNDS || 10;
const validator = require("email-validator");

const userController = {
     signup: async (req, res) => {
          try {
               const {username, firstName, middleName, lastName, userEmail, password} = req.body;
               if(!(username.trim() && firstName.trim() && lastName.trim() && userEmail.trim() && password.trim())){
                    return res.status(400).json({error: 'Please fill all required fields'});
               }
               const isAlreadyExist = await User.findOne({ username, userEmail });
               if(isAlreadyExist){
                    return res.status(400).json({error: 'This user already exists'});
               }
               const isValidEmail = validator.validate(userEmail);
               if(!isValidEmail){
                    return res.status(400).json({error: 'Please enter a valid email'});
               }
               const hashingPassword = await bcrypt.hash(password, saltRounds);
               let newUser = new User({
                    username,
                    firstName,
                    middleName: middleName ? middleName : '',
                    lastName,
                    email: userEmail,
                    password: hashingPassword
               });
               newUser = await newUser.save();
               if(!newUser){
                    return res.status(400).json({error: "Failed to save user"});
               }
               return res.status(200).json({user: newUser});
          } catch (error) {
               console.log("Error while login");
               return res.status(500).json({error: `Server error while logged in, ${error.message}`});
          }
     },
     signin: async (req, res) => {
          try {
               const {useremail, password} = req.body;
               if(!(useremail.trim() && password.trim())){
                    return res.status(400).json({error: "Please provide all the details"});
               }
               const user = await User.findOne({email: userEmail});
               if(!user){
                    return res.status(400).json({error: 'Not exists. Please signup'});
               }
               const checkPassword = await bcrypt.compare(password, user.password);
               if(!checkPassword){
                    return res.status(401).json({error: 'EmailId or password does not match'});
               }
               // generate a token
               const token = jwt.sign({ password: user.password }, process.env.SECRET_KEY);
               if(!token){
                    return res.status(500).json({error: 'Server issue. Token is not enerated'});
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
               return res.status(500).json({error: `Server error while sign up, ${error.message}`});
          }
     },
     getAllUser: async (req, res) => {
          try {
               const users = await User.find({}, {"username": 1, "email": 1});
               return res.status(200).json(users);
          } catch (error) {
               console.log("Error while login");
               return res.status(500).json({error: `Server error while getting all user data, ${error.message}`});
          }
     },
     getUserById: async (req, res) => {
          try {
               const {id} = req.params;
               if(!id){
                    return res.status(400).json({error: 'Please provide an id'});
               }
               const user = await User.findById(id);
               if(!user){
                    return res.status(400).json({error: 'No user found!'});
               }
               return res.status(200).json(user);
          } catch (error) {
               console.log("Error while login");
               return res.status(500).json({error: `Server error while getting user by ID, ${error.message}`});
          }
     },
     updateUser: async (req, res) => {
          try {
               const {id} = req.params;
               User.findByIdAndUpdate(id, {username, email})
          } catch (error) {
               console.log("Error while login");
               return res.status(500).json({error: `Server error while updating the user, ${error.message}`});
          }
     },
     deleteUser: async (req, res) => {
          try {
               
          } catch (error) {
               console.log("Error while login");
               return res.status(500).json({error: `Server error while deleting the user, ${error.message}`});
          }
     }
}

module.exports = userController;