const db = require('_helpers/db');
const Project = db.Project;
const Company = db.Company;
const { nanoid } = require('nanoid');

module.exports = {
    create,
    update,
    getAll, 
    getById,
    getByCompanyId,
    delete: _delete
};

async function create(projectParam) {
    const findProject = await Project.findOne({ projectName: projectParam.projectName, companyId: projectParam.companyId })

    if (findProject) {
        throw "Company name already existed"
    }

    let key = nanoid(10);

    while (await Company.findOne({ key })) {
        key = nanoid(10);
    }

    const project = new Project({...projectParam, key })
    await project.save();

    // let company = await Company.findById(projectParam.companyId)
    // if (!company) throw 'Company not found'
    // let updatedCompany = {...company._doc}
    // updatedCompany.projects.push(project.id)

    // Object.assign(company, updatedCompany)
    // await company.save();
    
    return project;
}

async function update(id, projectParam) {
    let project = await Project.findById(id)

    if (!project) throw 'Project not found'

    Object.assign(project, projectParam);

    await project.save();

    return project;
}

async function getAll() {
    return await Project.find();
}

async function getById(id) {
    return await Project.findById(id);
}

async function getByCompanyId(id) {
    const projects = await Project.find({companyId: `${id}`})

    return projects;
}

async function _delete(id) {
    await Project.findByIdAndRemove(id);

    let company = await Company.findById(projectParam.companyId)
    if (!company) throw 'Company not found'
    let updatedCompany = {...company._doc}

    updatedCompany.projects = updatedCompany.projects.filter(entry => entry.id !== id)

    Object.assign(company, updatedCompany)
    await company.save();
}