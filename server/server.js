require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
// const jwt = require('_helpers/jwt');

const mainRouter = require("./routers");
// const errorHandler = require('_helpers/error-handler');
// const useCaseDocumentRouter = require("./apis/Use_case_document/UseCaseRouter")
// const ReleaseNoteRouter = require("./apis/Release_note/ReleaseNoteRouter")

mongoose
  .connect(process.env.DATABASE, {
    useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDb Connection Error ", err));

const PORT = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 8000;

app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads
app.use(cors());

// main router
app.use('/api', mainRouter);

// start server
app.listen(PORT, (error) => {
    if(error){
        console.log(`Error while listening to the port, ERROR -->  ${error.message}`);
        return;
    }
    console.log(`Server listening on port ${PORT}`);
});
