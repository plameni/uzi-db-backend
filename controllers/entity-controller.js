const entityRepository = require('./../repositories/entity-repository');

const getAllEntities = async (req, res) => {
  const results = await entityRepository.getAllEntities();
  res.send({ data: results });
};

const getEntityByID = async (req, res) => {
  const { id } = req.params;
  const result = await entityRepository.getEntityByID(id);
  res.send(result);
};

const getEntitiesPaginated = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;
  const offset = (page - 1) * perPage;

  try {
    const { count, rows } = await entityRepository.getEntitiesPaginated(perPage, offset);
    res.send({
      data: rows,
      totalCount: count
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const insertEntity = async (req, res) => {
  const insertedId = await entityRepository.insertEntity(req.body);
  if (insertedId !== null) {
    res.status(201).send({ id: insertedId });
  } else {
    res.status(500).send({ error: 'Insert failed' });
  }
};

const updateEntity = async (req, res) => {
  const { id } = req.params;
  const success = await entityRepository.updateEntity(id, req.body);
  if (success) {
    res.send({ message: 'Updated successfully' });
  } else {
    res.status(500).send({ error: 'Update failed' });
  }
};

const deleteEntity = async (req, res) => {
  const { id } = req.params;
  const success = await entityRepository.deleteEntity(id);
  if (success) {
    res.send({ message: 'Deleted successfully' });
  } else {
    res.status(500).send({ error: 'Delete failed' });
  }
};


const getEntitiesBySubjectID = async (req, res) => {
  const { subjectId } = req.params;
  const results = await entityRepository.getEntitiesBySubjectID(subjectId);
  if (results !== null) {
    res.send({ data: results });
  } else {
    res.status(500).send({ error: 'Failed to fetch entities' });
  }
};


module.exports = {
  getAllEntities,
  getEntityByID,
  getEntitiesPaginated,
  insertEntity,
  updateEntity,
  deleteEntity,
  getEntitiesBySubjectID
};