const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    createdDate: { type: Date, default: new Date() },
    updatedDate: {type: Date, default: new Date() },
    role: { type: String, default: "User" },
    status: {type: String, default: "active"},
    licenseInfo: {type: String, default: "unpaid"},
    allowedApps: {type: Array, default: []},
    credits: {type: Number, default: 0},
    accountType: {type: String, default: "secondary"},
    phone: {type: String},
    daysRemaining: {type: Date, default: null},
    email: {type: String, required: true, unique: true}
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('User', userSchema);