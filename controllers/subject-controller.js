const subjectRepository = require('./../repositories/subject-repository');
const upload = require('./../middleware/upload-middleware'); // Ako imate upload middleware

const getAllSubjects = async (req, res) => {
  const results = await subjectRepository.getAllSubjects();
  res.send(results);
};

const getSubjectByID = async (req, res) => {
  const { id } = req.params;
  const result = await subjectRepository.getSubjectByID(id);
  res.send(result);
};

const getSubjectsPaginated = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;
  const offset = (page - 1) * perPage;

  try {
    const { count, rows } = await subjectRepository.getSubjectsPaginated(perPage, offset);
    res.send({
      data: rows,
      totalCount: count
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const insertSubject = async (req, res) => {
  try {
    let subjectData;
    
    console.log("kkk", req)
    // Proverite da li je zahtev FormData (ima fajlove) ili JSON
    if (req.file && req.file.filename) {
      // Ako ima fajlova, koristite kombinaciju body i files
      subjectData = {
        subjectTypeId: req.body.subjectTypeId,
        criminalActId: req.body.criminalActId || null,
        cityId: req.body.cityId || null,
        decisionNumber: req.body.decisionNumber || null,
        dateOfDecision: req.body.dateOfDecision || null,
        courtId: req.body.courtId || null,
        effectiveDate: req.body.effectiveDate || null,
        processedBy: req.body.processedBy || null,
        proceedingsAgainst: req.body.proceedingsAgainst || null,
        dateOfTakeover: req.body.dateOfTakeover || null,
        pdfPath: req.file.filename ? `/uploads/${req.file.filename}` : null
      };
      
      // Ovde možete dodati logiku za čuvanje fajla na disk
    } else {
      // Ako nema fajlova, koristite regularni body
      subjectData = req.body;
    }

    const insertedId = await subjectRepository.insertSubject(subjectData);
    if (insertedId !== null) {
      res.status(201).send({ id: insertedId });
    } else {
      res.status(500).send({ error: 'Insert failed' });
    }
  } catch (error) {
    console.error('Error in insertSubject controller:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
};

const updateSubject = async (req, res) => {
  const { id } = req.params;
  const success = await subjectRepository.updateSubject(id, req.body);
  if (success) {
    res.send({ message: 'Updated successfully' });
  } else {
    res.status(500).send({ error: 'Update failed' });
  }
};

const deleteSubject = async (req, res) => {
  const { id } = req.params;
  const success = await subjectRepository.deleteSubject(id);
  if (success) {
    res.send({ message: 'Deleted successfully' });
  } else {
    res.status(500).send({ error: 'Delete failed' });
  }
};

const searchSubjects = async (req, res) => {
  try {
    const {
      subjectTypeId,
      criminalActId,
      movable,
      propertyTypeId,
      cityId,
      dateFrom,
      dateTo,
      caseNumber
    } = req.query;
    
    // Priprema filter objekta
    const filters = {};
    
    if (subjectTypeId) filters.subjectTypeId = subjectTypeId;
    if (criminalActId) filters.criminalActId = criminalActId;
    if (movable) filters.movable = movable;
    if (propertyTypeId) filters.propertyTypeId = propertyTypeId;
    if (cityId) filters.cityId = cityId;
    if (dateFrom) filters.dateFrom = dateFrom;
    if (dateTo) filters.dateTo = dateTo;
    if (caseNumber) filters.caseNumber = caseNumber;
    
    const results = await subjectRepository.searchSubjects(filters);
    
    if (results !== null) {
      res.send(results);
    } else {
      res.status(500).send({ error: 'Search failed' });
    }
  } catch (error) {
    console.error('Error in searchSubjects controller:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
};


module.exports = {
  getAllSubjects,
  getSubjectByID,
  getSubjectsPaginated,
  insertSubject,
  updateSubject,
  deleteSubject,
  searchSubjects
};