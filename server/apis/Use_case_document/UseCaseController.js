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
    static getSingleUseCaseData = async(req,res)=>{
        try {
            const getsingleUseCaseData = await UseCaseDocumentModel.findOne();
            res.json({data:getsingleUseCaseData});
        } catch (error) {
            res.json({message:error.message})
        }
    }
    static DeleteSingleUseCaseData = async(req,res)=>{
        try {
            await UseCaseDocumentModel.findByIdAndDelete(req.params.id);
            res.json({data:"SucessFully single Deleted Data"});
        } catch (error) {
            res.json({message:error.message})
        }
    }
    static deleteAllUseCaseData = async(req,res)=>{
        try {
            await UseCaseDocumentModel.deleteMany();
            res.json({data:"SucessFully Deleted Data"});
        } catch (error) {
            res.json({message:error.message})
        }
    }
    static updateUseCaseData = async(req,res)=>{
        try {
            const updatedUseCaseData = await UseCaseDocumentModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
            res.json({data:updatedUseCaseData});
        } catch (error) {
            res.json({message:error.message})
        }
    }
}


module.exports = UseCaseDocumentController;