const subjectTypeRepository = require('./../repositories/subject-type-repository');

const getAllSubjectTypes = async (req, res) => {
    const results = await subjectTypeRepository.getAllSubjectTypes();
    res.send(results);
};

const getSubjectTypeByID = async (req, res) => {
    const { id } = req.params;
    const result = await subjectTypeRepository.getSubjectTypeByID(id);
    res.send(result);
};

const getSubjectTypesPaginated = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const offset = (page - 1) * perPage;

    try {
        const { count, rows } = await subjectTypeRepository.getSubjectTypesPaginated(perPage, offset);
        res.send({
            data: rows,
            totalCount: count
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const insertSubjectType = async (req, res) => {
    const insertedId = await subjectTypeRepository.insertSubjectType(req.body);
    if (insertedId !== null) {
        res.status(201).send({ id: insertedId });
    } else {
        res.status(500).send({ error: 'Insert failed' });
    }
};

const updateSubjectType = async (req, res) => {
    const { id } = req.params;
    const success = await subjectTypeRepository.updateSubjectType(id, req.body);
    if (success) {
        res.send({ message: 'Updated successfully' });
    } else {
        res.status(500).send({ error: 'Update failed' });
    }
};

const deleteSubjectType = async (req, res) => {
    const { id } = req.params;
    const success = await subjectTypeRepository.deleteSubjectType(id);
    if (success) {
        res.send({ message: 'Deleted successfully' });
    } else {
        res.status(500).send({ error: 'Delete failed' });
    }
};

module.exports = {
    getAllSubjectTypes,
    getSubjectTypeByID,
    getSubjectTypesPaginated,
    insertSubjectType,
    updateSubjectType,
    deleteSubjectType
};