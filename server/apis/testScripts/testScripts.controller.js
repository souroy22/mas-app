//'use strict';
const express = require('express');
const router = express.Router();
const testService = require('./testScripts.service')

function create(req,res, next) {
  testService.create(req.body)
          .then(tests => res.json(tests))
          .catch(err => next(err));    
}

function getAll(req, res, next) {
  testService.getAll()
          .then(tests => res.json(tests))
          .catch(err => next(err))
}

function getByProjectId(req, res, next) {
  testService.getByProjectId(req.params.id)
          .then(tests => tests ? res.json(tests) : res.sendStatus(404))
          .catch(err => next(err))
}

function getById(req, res, next) {
  testService.getById(req.params.id)
          .then(test => test ? res.json(test) : res.sendStatus(404))
          .catch(err => next(err))
}

function update(req, res, next) {
  testService.update(req.params.id, req.body)
      .then(test => res.json(test))
      .catch(err => next(err));
}

function _delete(req, res, next) {
  userService.delete(req.params.id)
      .then(() => res.json({}))
      .catch(err => next(err));
}

// routes
router.post('/', create);
router.get('/', getAll);
router.get('/:id', getByProjectId);
router.get('/specific/:id', getById)
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

/*

//CODE I HAVE DEVELOPED

var mongoose = require('mongoose'),
  Tests = mongoose.model('testScriptsModel');

exports.allTests = function(req, res) {
  Tests.find({}, function(err, test) {
    if (err)
      res.send(err);
    res.json(test);
  });
};




exports.addTest = function(req, res) {
  var new_TestScript = new Tests(req.body);
  new_TestScript.save(function(err, test) {
    if (err)
      res.send(err);
    res.json(test);
  });
};*/
