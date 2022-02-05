const express = require("express");

const ReleaseNoteRouter = express.Router();
const ReleaseNoteController = require("./ReleaseNoteController")


ReleaseNoteRouter.route("/releasenote")
.post(ReleaseNoteController.postReleaseNoteData)
.get(ReleaseNoteController.getAllReleaseNoteData)
.delete(ReleaseNoteController.deleteAllReleaseNoteData)

ReleaseNoteRouter.route("/releasenote/:id")
.get(ReleaseNoteController.getSingleReleaseNoteData)
.put(ReleaseNoteController.updateReleaseNoteData)
.delete(ReleaseNoteController.deleteSingleReleaseNoteData)

module.exports = ReleaseNoteRouter;