const express = require('express');
const router = express.Router();
const authController = require("../../controllers/authController");


router.post('/signin', authController.signin);
router.post('/register', authController.signup);
router.post('/googleRegister', authController.googleRegister);
router.get('/signout', authController.signout);


module.exports = router;