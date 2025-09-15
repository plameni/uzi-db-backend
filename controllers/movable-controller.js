const movableRepository = require('./../repositories/movable-repository');

const getAllMovables = async (req, res) => {
  const results = await movableRepository.getAllMovables();
  res.send(results);
};

const getAllMovablesPaginated = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;
  const offset = (page - 1) * perPage;

  try {
    const { count, rows } = await movableRepository.getMovablesPaginated(perPage, offset);
    res.send({ data: rows, totalCount: count });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getMovableByID = async (req, res) => {
  const { id } = req.params;
  const result = await movableRepository.getMovableByID(id);
  res.send(result);
};

const getMovableBySubjectID = async (req, res) => {
  const { id } = req.params;
  const result = await movableRepository.getMovableBySubjectID(id);
  res.send(result);
};

const insertMovable = async (req, res) => {
  try {
    const insertedId = await movableRepository.insertMovable(req.body);
    if (insertedId !== null) {
      res.status(201).send({ id: insertedId });
    } else {
      res.status(500).send({ error: 'Insert failed' });
    }
  } catch (error) {
    console.error('Error in insertMovable:', error);
    res.status(500).send({ error: error.message });
  }
};

const updateMovable = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await movableRepository.updateMovable(id, req.body);
    if (success) {
      res.send({ message: 'Updated successfully' });
    } else {
      res.status(500).send({ error: 'Update failed' });
    }
  } catch (error) {
    console.error('Error in updateMovable:', error);
    res.status(500).send({ error: error.message });
  }
};

const deleteMovable = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await movableRepository.deleteMovable(id);
    if (success) {
      res.send({ message: 'Deleted successfully' });
    } else {
      res.status(500).send({ error: 'Delete failed' });
    }
  } catch (error) {
    console.error('Error in deleteMovable:', error);
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  getAllMovables,
  getAllMovablesPaginated,
  getMovableBySubjectID,
  getMovableByID,
  insertMovable,
  updateMovable,
  deleteMovable,
};
