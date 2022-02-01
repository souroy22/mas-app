const express = require('express');
const router = express.Router();
const projectService = require('./project.service');


function create(req,res, next) {
    projectService.create(req.body)
            .then(project => res.json(project))
            .catch(err => next(err));    
}

function getAll(req, res, next) {
    projectService.getAll()
            .then(projects => res.json(projects))
            .catch(err => next(err))
}

function getById(req, res, next) {
    projectService.getByCompanyId(req.params.id)
            .then(projects => projects ? res.json(projects) : res.sendStatus(404))
            .catch(err => next(err))
}

function getBySpecificId(req, res, next) {
    projectService.getById(req.params.id)
            .then(project => project ? res.json(project) : res.sendStatus(404))
            .catch(err => next(err))
}

function update(req, res, next) {
    projectService.update(req.params.id, req.body)
        .then(project => res.json(project))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    companyService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

// routes
router.post('/', create);
router.get('/', getAll);
router.get('/specific/:id', getBySpecificId)
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;