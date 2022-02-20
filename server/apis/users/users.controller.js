const express = require('express');
const router = express.Router();
const userService = require('./user.service');
const db = require('_helpers/db');
const User = db.User;

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAll);
router.post('/', saveUser);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

async function saveUser (req, res) {
    try {
        const {username, role, email} = req.body;
        if(!(username && role && email)){
            return res.status(400).json({error: "Please fill all fields"});
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.json({ error: "Email id is already exist!" });
        }
        const newUser = new User({
            username,
            email,
            role,
        });
        await newUser.save();
        return res.status(200).json({ data: { role, email, username } });
    } catch (error) {
        res.status(500).json({error: `Error while saving new user ${error.message}`})
        console.log("Error while saving new user", error.message);
    }
}

function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then((user) => res.json(user))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}