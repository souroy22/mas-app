const Bug = require("../models/bugsModel");
const Company = require("../models/companyModel");
const User = require("../models/userModel");
const moment = require("moment");

const companyController = {
     createCompany: async (req, res) => {
          try {
               const { companyName, email, phone, userId } = req.body;
               if (!(companyName.trim() && email && phone && userId)) {
                    return res.status(400).json({ error: 'Please fill all required fields' });
               }
               const isAlreadyExist = await User.findOne({ email });
               if (isAlreadyExist) {
                    return res.status(400).json({ error: 'This company mail id is already exists' });
               }
               const isValidEmail = validator.validate(email);
               if (!isValidEmail) {
                    return res.status(400).json({ error: 'Please enter a valid email' });
               }
               const id = nanoid();
               const salt = await bcrypt.genSaltSync(parseInt(saltRounds));
               const hashingPassword = await bcrypt.hash(password, salt);
               const createdTime = moment().format("DD/MM/YYYY");
               let newCompany = new Company({
                    id,
                    email,
                    phone,
                    password: hashingPassword,
                    createdTime,
                    updatedDate: createdTime
               });
               newCompany = await newCompany.save();
               if (!newCompany) {
                    return res.status(400).json({ error: "Failed to save user" });
               }
               const updatedUser = await User.findByIdAndUpdate(userId, {$set: {company: newCompany}});
               if(!updatedUser){
                    return res.status(400).json({error: "Failed to add company"});
               }
               return res.status(200).json({ user: updatedUser });
          } catch (error) {
               console.log("Error while while sign up");
               return res.status(500).json({ error: `Server error while sign up, ${error.message}` });
          }
     }
}

module.exports = companyController;