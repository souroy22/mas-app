const express = require('express');
const router = express.Router();
const companyService = require('./company.service');
const transporter = require('../../_helpers/mail');
  
function create(req,res, next) {
    companyService.create(req.body)
            .then(company => {
                const mailOptions = {
                    from: 'lamngo@lamngo.work',
                    to: company.email,
                    subject: 'Company created'
                }
                transporter.sendMail(mailOptions)
                res.json(company)
            })
            .catch(err => next(err));    
}

function getAll(req, res, next) {
    companyService.getAll()
            .then(companies => res.json(companies))
            .catch(err => next(err))
}

function getById(req, res, next) {
    companyService.getByUserId(req.params.id)
            .then(companies => companies ? res.json(companies) : res.sendStatus(404))
            .catch(err => next(err))
}

function getBySpecificId(req, res, next) {
    companyService.getById(req.params.id)
            .then(company => company ? res.json(company) : res.sendStatus(404))
            .catch(err => next(err))
}

function update(req, res, next) {
    companyService.update(req.params.id, req.body)
        .then(company => res.json(company))
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