const Bug = require("../models/bugsModel");
const Company = require("../models/companyModel");
const Project = require("../models/projectModel");
const { nanoid } = require("nanoid");
const moment = require("moment");

const bugsController = {
  createBug: async (req, res) => {
    try {
      let {
        subject,
        testSteps,
        description,
        priority,
        classification,
        assignee,
        dueDate,
        createdBy,
        projectId,
        tags = "",
        status = "",
        severity = "",
        plainDescription = "",
      } = req.body;
      if (
        !(
          subject &&
          testSteps &&
          description &&
          priority &&
          classification &&
          assignee &&
          dueDate &&
          createdBy &&
          projectId
        )
      ) {
        return res
          .status(400)
          .json({ error: "Please fill all the required fields" });
      }
      const isValidDate =
        moment(dueDate, "DD/MM/YYYY", true).isValid() &&
        moment().isSameOrAfter(dueDate);
      if (!isValidDate) {
        return res
          .status(400)
          .json({ error: "Please provide a correct due date format" });
      }
      const bugId = nanoid();
      const newBug = new Bug({
        id: bugId,
        subject,
        testSteps,
        description,
        priority,
        classification,
        assignee,
        dueDate,
        createdBy,
        tags,
        status,
        severity,
        plainDescription,
      });
      newBug = await newBug.save();
      if (!newBug) {
        return res
          .status(500)
          .json({ error: "Failed to save new bug. Please try again" });
      }
      const updatedProject = await Project.findByIdAndUpdate(projectId, {
        $push: { bugs: newBug },
      });
      if (!updatedProject) {
        return res
          .status(400)
          .json({ error: "Error while saving bugs in the project" });
      }
      return res.status(200).json(newBug, updatedProject);
    } catch (error) {
      console.log("Error while creating new bug", error.message);
      return res
        .status(500)
        .json({ error: `Error while creating new bug, ${error.message}` });
    }
  },
  updateBug: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ error: "Please provide the bug ID" });
      }
      let {
        subject,
        testSteps,
        description,
        priority,
        classification,
        assignee,
        dueDate,
        createdBy,
        projectId,
        tags = "",
        status = "",
        severity = "",
        plainDescription = "",
      } = req.body;
      if (
        !(
          subject &&
          testSteps &&
          description &&
          priority &&
          classification &&
          assignee &&
          dueDate &&
          createdBy &&
          projectId
        )
      ) {
        return res
          .status(400)
          .json({ error: "Please fill all the required fields" });
      }
      const isValidDate =
        moment(dueDate, "DD/MM/YYYY", true).isValid() &&
        moment().isSameOrAfter(dueDate);
      if (!isValidDate) {
        return res
          .status(400)
          .json({ error: "Please provide a correct due date format" });
      }
      const updatedBug = await Bug.findByIdAndUpdate(id, {
        subject,
        testSteps,
        description,
        priority,
        classification,
        assignee,
        dueDate,
        createdBy,
        projectId,
        tags,
        status,
        severity,
        plainDescription,
      });
      if (updateBug) {
        return res.status(400).json({ error: "Couldn't find bug" });
      }
      return res.status(200).json(updatedBug);
    } catch (error) {
      console.log("Error while updating bug", error.message);
      return res
        .status(500)
        .json({ error: `Error while updating bug, ${error.message}` });
    }
  },

  getAllBugs: async (req, res) => {
    try {
      const { companyId, projectId } = req.params;
      if (!(companyId && projectId)) {
        return res
          .status(400)
          .json({ error: "Please provide company id and project id" });
      }

      const bugs = await Company.findById(companyId)
        .populate("projects")
        .populate("bugs");
      if (!bugs) {
        return res.status(400).json({ error: "Unable to find any bug" });
      }
      return res.status(200).json(bugs);
    } catch (error) {
      console.log("Error while fetching bugs", error.message);
      return res
        .status(500)
        .json({ error: `Error while fetching bugs, ${error.message}` });
    }
  },

  getBugById: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ error: "Please provide some id" });
      }
      const bug = await Bug.findById(id);
      if (!bug) {
        return res.status(400).json({ error: "Could not find bug" });
      }
      return res.status(200).json(bug);
    } catch (error) {
      console.log("Error while fetching bug by id", error.message);
      return res
        .status(500)
        .json({ error: `Error while fetching bug by id, ${error.message}` });
    }
  },

  deleteBug: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ error: "Please provide bug id" });
      }
      await Bug.findByIdAndDelete(id);
      return res.status(200).json({ msg: "Bug deleted successfully" });
    } catch (error) {
      console.log("Error while deleting bug", error.message);
      return res
        .status(500)
        .json({ error: `Error while deleting bug, ${error.message}` });
    }
  },
};

module.exports = bugsController;
