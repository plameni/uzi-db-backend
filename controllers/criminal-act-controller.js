const criminalActRepository = require('./../repositories/criminal-act-repository');

const getAllCriminalActs = async (req, res) => {
  const results = await criminalActRepository.getAllCriminalActs();
  res.send(results);
};

const getAllCriminalActsPaginated = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;
  const offset = (page - 1) * perPage;

  try {
    const { count, rows } = await criminalActRepository.getCriminalActsPaginated(perPage, offset);
    res.send({ data: rows, totalCount: count });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getCriminalActByID = async (req, res) => {
  const { id } = req.params;
  const result = await criminalActRepository.getCriminalActByID(id);
  res.send(result);
};

const insertCriminalAct = async (req, res) => {
  try {
    const insertedId = await criminalActRepository.insertCriminalAct(req.body);
    if (insertedId !== null) {
      res.status(201).send({ id: insertedId });
    } else {
      res.status(500).send({ error: 'Insert failed' });
    }
  } catch (error) {
    console.error('Error in insertCriminalAct:', error);
    res.status(500).send({ error: error.message });
  }
};

const updateCriminalAct = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await criminalActRepository.updateCriminalAct(id, req.body);
    if (success) {
      res.send({ message: 'Updated successfully' });
    } else {
      res.status(500).send({ error: 'Update failed' });
    }
  } catch (error) {
    console.error('Error in updateCriminalAct:', error);
    res.status(500).send({ error: error.message });
  }
};

const deleteCriminalAct = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await criminalActRepository.deleteCriminalAct(id);
    if (success) {
      res.send({ message: 'Deleted successfully' });
    } else {
      res.status(500).send({ error: 'Delete failed' });
    }
  } catch (error) {
    console.error('Error in deleteCriminalAct:', error);
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  getAllCriminalActs,
  getAllCriminalActsPaginated,
  getCriminalActByID,
  insertCriminalAct,
  updateCriminalAct,
  deleteCriminalAct,
};