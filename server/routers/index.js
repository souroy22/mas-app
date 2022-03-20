const express = require('express');
const router = express.Router();

// importing all the routers
const bugsRouter = require("./allRouters/bugsRouters");
const userRouter = require("./allRouters/userRouters");
const companyRouter = require("./allRouters/companyRouters");
const projectRouter = require("./allRouters/projectRouters");
const testRouter = require("./allRouters/testRouters");
const authRouter = require("./allRouters/authRouters");

// using routers
router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/bugs', bugsRouter);
router.use('/company', companyRouter);
router.use('/project', projectRouter);
router.use('/tests', testRouter);
// app.use("/",useCaseDocumentRouter);
// app.use("/",ReleaseNoteRouter);





module.exports = router;