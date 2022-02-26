const Bug = require("../models/bugsModel");
const Company = require("../models/companyModel");
const Project = require("../models/projectModel");
const moment = require("moment");
const User = require("../models/userModel");

const projectController = {
  createProject: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ error: "Please provide company id" });
      }
      const { projectName, description = "", companyId } = req.body;
      if (!(projectName.trim() && companyId)) {
        return res
          .status(400)
          .json({ error: "Please provide all the required fileds" });
      }
      const company = await User.findById(companyId);
      if (!company) {
        return res
          .status(401)
          .json({ error: "Please try to add project from a valid company" });
      }
      const createdTime = moment().format("DD/MM/YYYY");
      const newProject = new Project({
        projectName,
        description,
        createdTime,
        updatedDate: createdTime,
        createdBy: req.user,
        company,
      });
      newProject = await newProject.save();
      return res.status(200).json(newProject);
    } catch (error) {
      console.log("Error while creating project", error.message);
      return res
        .status(500)
        .json({ error: `Error while creating project, ${error.message}` });
    }
  },
  updateProject: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ error: "Please provide company id" });
      }
      const { projectName, description = "", companyId, projectId } = req.body;
      if (!(projectName.trim() && createdBy && companyId && projectId)) {
        return res
          .status(400)
          .json({ error: "Please provide all the required fileds" });
      }
      const company = await User.findById(companyId);
      if (!company) {
        return res
          .status(401)
          .json({ error: "Please try to add project from a valid company" });
      }
      const updatedDate = moment().format("DD/MM/YYYY");
      const updatedProjectData = {
        projectName,
        description,
        updatedDate,
      };
      const updatedProject = await Project.findByIdAndUpdate(projectId, updatedProjectData);
      if(!updatedProject){
           return res.status(400).json({error: "Error while saving data"});
      }
      return res.status(200).json(updatedProject);
    } catch (error) {
      console.log("Error while updating project", error.message);
      return res
        .status(500)
        .json({ error: `Error while updating project, ${error.message}` });
    }
  },
};

module.exports = projectController;
