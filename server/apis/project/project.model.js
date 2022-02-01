const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    key: { type: String, unique: true},
    projectName: { type: String, required: true},
    description: { type: String, default: "" },
    createdTime: { type: Date, default: new Date() },
    updatedDate: {type: Date, default: new Date() },
    createdBy: {type: String, required: true},
    companyId: {type: String, required: true},
    bugs: {type: Array, default: []}
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('Project', schema);