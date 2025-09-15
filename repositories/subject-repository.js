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


const searchSubjects = async (filters) => {
  try {
    let query = `
      SELECT s.*, 
        st.name as subject_type_name,
        ca.name as criminal_act_name,
        c.name as city_name,
        ct.name as court_name
      FROM subject s
      LEFT JOIN subject_type st ON s.subject_type_id = st.id
      LEFT JOIN criminal_acts ca ON s.criminal_act_id = ca.id
      LEFT JOIN city c ON s.city_id = c.id
      LEFT JOIN courts ct ON s.court_id = ct.id
    `;

    const conditions = [];
    const replacements = [];

    if (filters.subjectTypeId) {
      conditions.push('s.subject_type_id = ?');
      replacements.push(filters.subjectTypeId);
    }

    if (filters.criminalActId) {
      conditions.push('s.criminal_act_id = ?');
      replacements.push(filters.criminalActId);
    }

    if (filters.cityId) {
      conditions.push('s.city_id = ?');
      replacements.push(filters.cityId);
    }

    if (filters.caseNumber) {
      conditions.push('s.decision_number LIKE ?');
      replacements.push(`%${filters.caseNumber}%`);
    }

    if (filters.dateFrom) {
      conditions.push('s.date_of_decision >= ?');
      replacements.push(filters.dateFrom);
    }

    if (filters.dateTo) {
      conditions.push('s.date_of_decision <= ?');
      replacements.push(filters.dateTo);
    }

    if (filters.movable) {
      conditions.push('s.movable = ?');
      replacements.push(filters.movable);
    }

    if (filters.propertyTypeId) {
      conditions.push('s.property_type_id = ?');
      replacements.push(filters.propertyTypeId);
    }

    // Ako postoje filteri, dodaj WHERE
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY s.id DESC';

    const [results] = await sequelize.query(query, { replacements });
    return results;
  } catch (error) {
    console.error('Error in searchSubjects:', error);
    return null;
  }
};



module.exports = {
  getAllSubjects,
  getSubjectByID,
  getSubjectsPaginated,
  insertSubject,
  searchSubjects, 
  updateSubject,
  deleteSubject
};