const express = require("express");

const useCaseDocumentRouter = express.Router();
const UseCaseDocumentController = require("./UseCaseController")


useCaseDocumentRouter.route("/usecasedocument")
.post(UseCaseDocumentController.postUseCaseData)
.get(UseCaseDocumentController.getAllUseCaseData)
.delete(UseCaseDocumentController.deleteAllUseCaseData)


useCaseDocumentRouter.route("/usecasedocument/:id")
.get(UseCaseDocumentController.getSingleUseCaseData)
.put(UseCaseDocumentController.updateUseCaseData)
.delete(UseCaseDocumentController.DeleteSingleUseCaseData)



module.exports = useCaseDocumentRouter;
