const express = require('express');
const router = express.Router();
const authController = require("../controllers/authController");


router.post('/signin', authController.signin);
router.post('/register', authController.signup);
router.get('/signout', authController.signout);

// router.post('/', saveUser);
// router.get('/current', getCurrent);





module.exports = router;