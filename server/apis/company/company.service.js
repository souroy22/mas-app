const db = require('_helpers/db');
const Company = db.Company;
const { nanoid } = require('nanoid');

module.exports = {
    create,
    update,
    getAll, 
    getById,
    getByUserId,
    delete: _delete
};

async function create(companyParam) {
    const findCompany = await Company.findOne({ companyName: companyParam.companyName, createdBy: companyParam.createdBy })

    if (findCompany) {
        throw "Company name already existed"
    }

    let key = nanoid(10);

    while (await Company.findOne({ key })) {
        key = nanoid(10);
    }

    const company = new Company({...companyParam, key })
    await company.save();
    return company;
}

async function update(id, companyParam) {
    let company = await Company.findById(id)

    if (!company) throw 'Company not found'

    Object.assign(company, companyParam);

    await company.save();

    return company;
}

async function getAll() {
    return await Company.find();
}

async function getById(id) {
    return await Company.findById(id);
}

async function getByUserId(id) {
    const companies = await Company.find({createdBy: `${id}`})

    return companies;
}

async function _delete(id) {
    await Company.findByIdAndRemove(id);
}