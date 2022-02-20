const config = require('config.json');
const mongoose = require('mongoose');
const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
mongoose.connect(process.env.MONGODB_URI || config.connectionString, connectionOptions);
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../models/userModel'),
    Company: require('../apis/company/company.model'),
    Project: require('../apis/project/project.model'),
    Bug: require('../apis/bugs/bugs.model'),
    Test: require('../apis/testScripts/testScripts.model')
};