const mongoose = require("mongoose");

const ReleaseNoteSchema =  new mongoose.Schema({
    ReleaseNoteName:{type:String},
    ReleaseNoteContent:{type:String},
    date:{type:Date,default:Date.now()}
});

const ReleaseNoteModel = mongoose.model("ReleaseNoteModel",ReleaseNoteSchema);

module.exports = ReleaseNoteModel;