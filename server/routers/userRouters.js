const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");


router.post('/signin', userController.signin);
router.post('/register', userController.signup);
router.get('/all', userController.getAllUser);
// router.post('/', saveUser);
// router.get('/current', getCurrent);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);





module.exports = router;