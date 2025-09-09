const roleRepository = require('./../repositories/role-repository');

const getAllRoles = async (req, res) => {
    const results = await roleRepository.getAllRoles();
    res.send(results);
};

const getRoleByID = async (req, res) => {
    const { id } = req.params;
    const result = await roleRepository.getRoleByID(id);
    res.send(result);
};

const getRolePaginated = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const offset = (page - 1) * perPage;

    try {
        const { count, rows } = await roleRepository.getRolePaginated(perPage, offset);
        res.send({
            data: rows,
            totalCount: count
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};


const insertRole = async (req, res) => {
    const insertedId = await roleRepository.insertRole(req.body);
    if (insertedId !== null) {
        res.status(201).send({ id: insertedId });
    } else {
        res.status(500).send({ error: 'Insert failed' });
    }
};

const updateRole = async (req, res) => {
    const { id } = req.params;
    const success = await roleRepository.updateRole(id, req.body);
    if (success) {
        res.send({ message: 'Updated successfully' });
    } else {
        res.status(500).send({ error: 'Update failed' });
    }
};

const deleteRole = async (req, res) => {
    const { id } = req.params;
    const success = await roleRepository.deleteRole(id);
    if (success) {
        res.send({ message: 'Deleted successfully' });
    } else {
        res.status(500).send({ error: 'Delete failed' });
    }
};

module.exports = {
    getRolePaginated,
    getAllRoles,
    getRoleByID,
    insertRole,
    updateRole,
    deleteRole
};
