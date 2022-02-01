const express = require('express');
const router = express.Router();
const bugService = require('./bugs.service');

function create(req,res, next) {
    bugService.create(req.body)
            .then(bugs => res.json(bugs))
            .catch(err => next(err));    
}

function getAll(req, res, next) {
    bugService.getAll()
            .then(bugs => res.json(bugs))
            .catch(err => next(err))
}

function getByProjectId(req, res, next) {
    bugService.getByProjectId(req.params.id)
            .then(bugs => bugs ? res.json(bugs) : res.sendStatus(404))
            .catch(err => next(err))
}

function getById(req, res, next) {
    bugService.getById(req.params.id)
            .then(bug => bug ? res.json(bug) : res.sendStatus(404))
            .catch(err => next(err))
}

function update(req, res, next) {
    bugService.update(req.params.id, req.body)
        .then(bug => res.json(bug))
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