const express = require('express');
const bugsController = require('../controllers/bugsController');
const router = express.Router();

router.post("/create", bugsController.createBug);
router.put("/update/:id", bugsController.updateBug);
router.get("/delete/:id", bugsController.deleteBug);
router.get("/all", bugsController.getAllBugs);
router.get("/:id", bugsController.getBugById);


module.exports = router;
