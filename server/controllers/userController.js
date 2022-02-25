const User = require('../models/userModel');



const userController = {
     getAllUser: async (req, res) => {
          try {
               const users = await User.find({}, { "username": 1, "email": 1 });
               return res.status(200).json(users);
          } catch (error) {
               console.log("Error while login");
               return res.status(500).json({ error: `Server error while getting all user data, ${error.message}` });
          }
     },
     getUserById: async (req, res) => {
          try {
               const { id } = req.params;
               if (!id) {
                    return res.status(400).json({ error: 'Please provide an id' });
               }
               const user = await User.findById(id);
               if (!user) {
                    return res.status(400).json({ error: 'No user found!' });
               }
               return res.status(200).json(user);
          } catch (error) {
               console.log("Error while login");
               return res.status(500).json({ error: `Server error while getting user by ID, ${error.message}` });
          }
     },
     updateUser: async (req, res) => {
          try {
               const { id } = req.params;
               const { firstName, lastName } = req.body;
               const updatedUser = User.findByIdAndUpdate(id, { firstName, lastName, updatedDate: new Date() });
               if (!updatedUser) {
                    return res.status(400).json({ error: "User doesn't exist" });
               }
               return res.status(200).json({ user: updatedUser });
          } catch (error) {
               console.log("Error while login");
               return res.status(500).json({ error: `Server error while updating the user, ${error.message}` });
          }
     },
     deleteUser: async (req, res) => {
          try {
               const { id } = req.params;
               if (!id) {
                    return res.status(400).json({ error: 'Please provide id' });
               }
               await User.findByIdAndDelete(id);
               return res.status(200).json({ msg: 'User successfully deleted' });
          } catch (error) {
               console.log("Error while login");
               return res.status(500).json({ error: `Server error while deleting the user, ${error.message}` });
          }
     },
}


module.exports = userController;