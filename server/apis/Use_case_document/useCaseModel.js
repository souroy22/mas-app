const mongoose = require("mongoose");

const useCaseDocumentSchema =  new mongoose.Schema({
    useCaseDocumentName:{type:String},
    useCaseDocumentTextContent:{type:String}
});

const UseCaseDocumentModel = mongoose.model("UseCaseDocumentModel",useCaseDocumentSchema);

module.exports = UseCaseDocumentModel;

