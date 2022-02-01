const db = require('_helpers/db');
const { nanoid } = require('nanoid');
const Bug = db.Bug;

module.exports = {
    create,
    update,
    getAll, 
    getById,
    getByProjectId,
    delete: _delete
};

async function create(bugParam) {
    const bug = new Bug(bugParam)

    await bug.save();
}

async function update(id, bugParam) {
    let bug = await Bug.findById(id)

    if (!bug) throw 'Bug not found'

    Object.assign(bug, bugParam);

    await bug.save();

    return bug;
}

async function getAll() {
    return await Bug.find();
}

async function getById(id) {
    return await Bug.findById(id)
}

async function getByProjectId(id) {
    const bugs = await Bug.find({projectId: id})

    return bugs;
}

async function _delete(id) {
    await Bug.findByIdAndRemove(id);
}