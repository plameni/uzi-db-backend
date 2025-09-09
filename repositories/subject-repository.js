const sequelize = require('./../common/db-config');

const getAllSubjects = async () => {
  try {
    const [results] = await sequelize.query('SELECT * FROM subject');
    return results;
  } catch (error) {
    console.error('Error in getAllSubjects:', error);
    return null;
  }
};

const getSubjectByID = async (id) => {
  try {
    const [results] = await sequelize.query(
      'SELECT * FROM subject WHERE id = ?',
      { replacements: [id] }
    );
    return results[0];
  } catch (error) {
    console.error('Error in getSubjectByID:', error);
    return null;
  }
};

const getSubjectsPaginated = async (limit, offset) => {
  try {
    const [countResult] = await sequelize.query(
      'SELECT COUNT(*) as total FROM subject'
    );
    const totalCount = countResult[0].total;

    const [results] = await sequelize.query(
      'SELECT * FROM subject ORDER BY id DESC LIMIT ? OFFSET ?',
      { replacements: [limit, offset] }
    );

    return {
      count: totalCount,
      rows: results
    };
  } catch (error) {
    console.error('Error in getSubjectsPaginated:', error);
    return null;
  }
};

const insertSubject = async (subject) => {
  try {
    console.log('Inserting subject with data:', subject);
    
    
    const [results] = await sequelize.query(
      `INSERT INTO subject (
        subject_type_id, criminal_act_id, pdf_path, city_id,
        decision_number, date_of_decision, court_id, effective_date,
        processed_by, proceedings_against, date_of_takeover
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      {
        replacements: [
          subject.subjectTypeId || null,
          subject.criminalActId || null,
          subject.pdfPath || null, // Ovo je sada popunjeno
          subject.cityId || null,
          subject.decisionNumber || null,
          subject.dateOfDecision || null,
          subject.courtId || null,
          subject.effectiveDate || null,
          subject.processedBy || null,
          subject.proceedingsAgainst || null,
          subject.dateOfTakeover || null
        ]
      }
    );
    return results;
  } catch (error) {
    console.error('Error in insertSubject:', error);
    return null;
  }
};

const updateSubject = async (id, subject) => {
  try {
    await sequelize.query(
      `UPDATE subject SET 
        subject_type_id = ?, criminal_act_id = ?, pdf_path = ?, city_id = ?,
        decision_number = ?, date_of_decision = ?, court_id = ?, effective_date = ?,
        processed_by = ?, proceedings_against = ?, date_of_takeover = ?
      WHERE id = ?`,
      {
        replacements: [
          subject.subjectTypeId || null,
          subject.criminalActId || null,
          subject.pdfPath || null,
          subject.cityId || null,
          subject.decisionNumber || null,
          subject.dateOfDecision || null,
          subject.courtId || null,
          subject.effectiveDate || null,
          subject.processedBy || null,
          subject.proceedingsAgainst || null,
          subject.dateOfTakeover || null,
          id
        ]
      }
    );
    return true;
  } catch (error) {
    console.error('Error in updateSubject:', error);
    return null;
  }
};

const deleteSubject = async (id) => {
  try {
    await sequelize.query('DELETE FROM subject WHERE id = ?', {
      replacements: [id]
    });
    return true;
  } catch (error) {
    console.error('Error in deleteSubject:', error);
    return null;
  }
};

module.exports = {
  getAllSubjects,
  getSubjectByID,
  getSubjectsPaginated,
  insertSubject,
  updateSubject,
  deleteSubject
};