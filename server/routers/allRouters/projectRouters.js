const express = require('express');
const projectController = require('../../controllers/projectController');
const router = express.Router();

router.get('/all/:companyId', projectController.getAllCompanyProject);
router.post("/create/:companyId", projectController.createProject);
router.put('/update/:projectId/:companyId', projectController.updateProject);



module.exports = router;