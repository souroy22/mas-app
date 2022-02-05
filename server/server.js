require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');
const useCaseDocumentRouter = require("./apis/Use_case_document/UseCaseRouter")
app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/users', require('./apis/users/users.controller'));
app.use('/bugs', require('./apis/bugs/bugs.controller'));
app.use('/company', require('./apis/company/company.controller'));
app.use('/project', require('./apis/project/project.controller'));
app.use('/tests',require('./apis/testScripts/testScripts.model'));
app.use("/",useCaseDocumentRouter)

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
