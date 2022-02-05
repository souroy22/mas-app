const express = require("express");

const ReleaseNoteRouter = express.Router();
const ReleaseNoteController = require("./ReleaseNoteController")


ReleaseNoteRouter.route("/releasenote")
.post(ReleaseNoteController.postReleaseNoteData)
.get(ReleaseNoteController.getAllReleaseNoteData)

module.exports = ReleaseNoteRouter;