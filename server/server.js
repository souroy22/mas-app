require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('_helpers/jwt');

const mainRouter = require("./routers");
// const errorHandler = require('_helpers/error-handler');
// const useCaseDocumentRouter = require("./apis/Use_case_document/UseCaseRouter")
// const ReleaseNoteRouter = require("./apis/Release_note/ReleaseNoteRouter")
const PORT = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/api', mainRouter);


// global error handler
// app.use(errorHandler);

// start server
app.listen(PORT, (error) => {
    if(error){
        console.log(`Error while listening to the port, ERROR -->  ${error.message}`);
        return;
    }
    console.log(`Server listening on port ${PORT}`);
});
