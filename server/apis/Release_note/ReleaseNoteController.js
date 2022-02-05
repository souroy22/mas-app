const ReleaseNoteModel = require("./ReleaseNoteModel");

class ReleaseNoteController{

    static postReleaseNoteData = async(req,res)=>{
        try {
            const saveReleaseNoteData = await ReleaseNoteModel(req.body);
            await saveReleaseNoteData.save();
            res.json({data:"Data Successfully Saved..."});
        } catch (error) {
            res.json({message:error.message})
        }
    }
    static getAllReleaseNoteData = async(req,res)=>{
        try {
            const getallReleaseNoteData = await ReleaseNoteModel.find();
            res.json({data:getallReleaseNoteData});
        } catch (error) {
            res.json({message:error.message})
        }
    }

    static deleteAllReleaseNoteData = async(req,res)=>{
        try {
            await ReleaseNoteModel.deleteMany();
            res.json({data:"Deleeted Sucessfully"});
        } catch (error) {
            res.json({message:error.message})
        }
    }
    static getSingleReleaseNoteData = async(req,res)=>{
        try {
            const getsingleReleaseNoteData = await ReleaseNoteModel.findOne();
            res.json({data:getsingleReleaseNoteData});
        } catch (error) {
            res.json({message:error.message})
        }
    }
    static deleteSingleReleaseNoteData = async(req,res)=>{
        try {
            await ReleaseNoteModel.findByIdAndDelete(req.params.id);
            res.json({data:"Single Data Deleted"});
        } catch (error) {
            res.json({message:error.message})
        }
    }
    static updateReleaseNoteData = async(req,res)=>{
        try {
            const updatedReleaseNoteData = await ReleaseNoteModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
            res.json({data:updatedReleaseNoteData});
        } catch (error) {
            res.json({message:error.message})
        }
    }
}

module.exports = ReleaseNoteController;