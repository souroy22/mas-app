const express = require('express');
const router = express.Router();

// importing all the routers
const bugsRouter = require("./bugsRouters");
const userRouter = require("./userRouters");
const companyRouter = require("./companyRouters");
const projectRouter = require("./projectRouters");
const testRouter = require("./testRouters");

// using routers
app.use('/user', userRouter);
app.use('/bugs', bugsRouter);
app.use('/company', companyRouter);
app.use('/project', projectRouter);
app.use('/tests', testRouter);
// app.use("/",useCaseDocumentRouter);
// app.use("/",ReleaseNoteRouter);





module.exports = router;