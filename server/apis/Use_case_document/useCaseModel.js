const mongoose = require("mongoose");

const useCaseDocumentSchema =  new mongoose.Schema({
    useCaseDocumentName:{type:String},
    useCaseDocumentTextContent:{type:String},
    date:{type:Date,default:Date.now()}
});

const UseCaseDocumentModel = mongoose.model("UseCaseDocumentModel",useCaseDocumentSchema);

module.exports = UseCaseDocumentModel;

