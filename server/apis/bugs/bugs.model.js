const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    subject: { type: String, required: true},
    testSteps: { type: String, required: true},
    description: { type: String, required: true},
    priority: { type: String, required: true},
    classification: { type: String, required: true},
    assignee: { type: Array, required: true},
    tags: { type: Array },
    status: { type: String },
    severity: { type: String },
    plainDescription: { type: String },
    dueDate : { type: Date, required: true },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now},
    createdBy: {type: String, required: true},
    projectId: {type: String, required: true}
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('Bug', schema);