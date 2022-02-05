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
}

module.exports = ReleaseNoteController;