const UseCaseDocumentModel = require("./useCaseModel");

class UseCaseDocumentController{

    static postUseCaseData = async(req,res)=>{
        try {
            const SavePostUseCaseData = await UseCaseDocumentModel(req.body);
            await SavePostUseCaseData.save();
            res.json({data:"Data Successfully Saved..."});
        } catch (error) {
            res.json({message:error.message})
        }
    }
    static getAllUseCaseData = async(req,res)=>{
        try {
            const getallUseCaseData = await UseCaseDocumentModel.find();
            res.json({data:getallUseCaseData});
        } catch (error) {
            res.json({message:error.message})
        }
    }
}


module.exports = UseCaseDocumentController;