const db = require('_helpers/db');
const { nanoid } = require('nanoid');
const Test = db.Test;

module.exports = {
  create,
  update,
  getAll, 
  getById,
  getByProjectId,
  delete: _delete
};

async function create(testParam) {
  const test = new Test(testParam)

  await test.save();
}

async function update(id, testParam) {
  let test = await Test.findById(id)

  if (!test) throw 'Test not found'

  Object.assign(test, testParam);

  await test.save();

  return test;
}

async function getAll() {
  return await Test.find();
}

async function getById(id) {
  return await Test.findById(id)
}

async function getByProjectId(id) {
  const tests = await Test.find({projectId: id})

  return tests;
}

async function _delete(id) {
  await Test.findByIdAndRemove(id);
}







/*
CODE DONE BY ME

'use strict';
module.exports = function(app) {
  var tests = require('./testScripts.controller');

  // todoList Routes
  app.route('/tests')
    .get(tests.allTests)
    .post(tests.addTest);


  /*app.route('/tasks/:taskId')
    .get(todoList.read_a_task)
    .put(todoList.update_a_task)
    .delete(todoList.delete_a_task);*/
//};
