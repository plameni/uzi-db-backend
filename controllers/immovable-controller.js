const immovableRepository = require('./../repositories/immovable-repository');

const getAllImmovables = async (req, res) => {
  const results = await immovableRepository.getAllImmovables();
  res.send(results);
};

const getAllImmovablesPaginated = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;
  const offset = (page - 1) * perPage;

  try {
    const { count, rows } = await immovableRepository.getImmovablesPaginated(perPage, offset);
    res.send({ data: rows, totalCount: count });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getImmovableByID = async (req, res) => {
  const { id } = req.params;
  const result = await immovableRepository.getImmovableByID(id);
  res.send(result);
};

const getImmovableBySubjectID = async (req, res) => {
  const { id } = req.params;
  const result = await immovableRepository.getImmovableBySubjectID(id);
  res.send(result);
};

const insertImmovable = async (req, res) => {
  try {
    const insertedId = await immovableRepository.insertImmovable(req.body);
    if (insertedId !== null) {
      res.status(201).send({ id: insertedId });
    } else {
      res.status(500).send({ error: 'Insert failed' });
    }
  } catch (error) {
    console.error('Error in insertImmovable:', error);
    res.status(500).send({ error: error.message });
  }
};

const updateImmovable = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await immovableRepository.updateImmovable(id, req.body);
    if (success) {
      res.send({ message: 'Updated successfully' });
    } else {
      res.status(500).send({ error: 'Update failed' });
    }
  } catch (error) {
    console.error('Error in updateImmovable:', error);
    res.status(500).send({ error: error.message });
  }
};

const deleteImmovable = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await immovableRepository.deleteImmovable(id);
    if (success) {
      res.send({ message: 'Deleted successfully' });
    } else {
      res.status(500).send({ error: 'Delete failed' });
    }
  } catch (error) {
    console.error('Error in deleteImmovable:', error);
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  getAllImmovables,
  getAllImmovablesPaginated,
  getImmovableBySubjectID,
  getImmovableByID,
  insertImmovable,
  updateImmovable,
  deleteImmovable,
};
