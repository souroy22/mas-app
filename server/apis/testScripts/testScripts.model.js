'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var schema = new Schema({
  name: {type: String, required: true},
  testScriptCode: {type : String,required :true},
  createdDate: {type: Date,default: Date.now},
  updatedDate: { type: Date, default: Date.now},
  createdBy: {type: String,
    // required: true
  },
  projectId: {type: String, 
    //required: true
  }
});

module.exports = mongoose.model('testScripts', schema);