const express = require("express");

const useCaseDocumentRouter = express.Router();
const UseCaseDocumentController = require("./UseCaseController")


useCaseDocumentRouter.route("/usecasedocument")
.post(UseCaseDocumentController.postUseCaseData)
.get(UseCaseDocumentController.getAllUseCaseData)

module.exports = useCaseDocumentRouter;
