const sequelize = require('./../common/db-config');

const getAllEntities = async () => {
  try {
    const [results] = await sequelize.query(`
      SELECT 
        id,
        name,
        surname,
        JMBG as jmbg,
        city_id as cityId,
        street_id as streetId,
        legal_entity_name as legalEntityName,
        legal_entity_number as legalEntityNumber,
        residence,
        created,
        updated,
        updated_by as updatedBy,
        subject_id as subjectId
      FROM entity
    `);
    return results;
  } catch (error) {
    console.error('Error in getAllEntities:', error);
    return null;
  }
};

const getEntityByID = async (id) => {
  try {
    const [results] = await sequelize.query(
      `SELECT 
        id,
        name,
        surname,
        JMBG as jmbg,
        city_id as cityId,
        street_id as streetId,
        legal_entity_name as legalEntityName,
        legal_entity_number as legalEntityNumber,
        residence,
        created,
        updated,
        updated_by as updatedBy,
        subject_id as subjectId
      FROM entity WHERE id = ?`,
      { replacements: [id] }
    );
    return results[0];
  } catch (error) {
    console.error('Error in getEntityByID:', error);
    return null;
  }
};

const getEntitiesPaginated = async (limit, offset) => {
  try {
    const [countResult] = await sequelize.query(
      'SELECT COUNT(*) as total FROM entity'
    );
    const totalCount = countResult[0].total;

    const [results] = await sequelize.query(
      `SELECT 
        id,
        name,
        surname,
        JMBG as jmbg,
        city_id as cityId,
        street_id as streetId,
        legal_entity_name as legalEntityName,
        legal_entity_number as legalEntityNumber,
        residence,
        created,
        updated,
        updated_by as updatedBy,
        subject_id as subjectId
      FROM entity ORDER BY created DESC LIMIT ? OFFSET ?`,
      { replacements: [limit, offset] }
    );

    return {
      count: totalCount,
      rows: results
    };
  } catch (error) {
    console.error('Error in getEntitiesPaginated:', error);
    return null;
  }
};

const insertEntity = async (entity) => {
  try {
    const [results] = await sequelize.query(
      `INSERT INTO entity (
        name, surname, JMBG, city_id, street_id,
        legal_entity_name, legal_entity_number, residence,
        created, updated, updated_by, subject_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), ?, ?);`,
      {
        replacements: [
          entity.name,
          entity.surname,
          entity.jmbg,
          entity.cityId,
          entity.streetId,
          entity.legalEntityName,
          entity.legalEntityNumber,
          entity.residence,
          entity.updatedBy,
          entity.subjectId
        ]
      }
    );
    return results;
  } catch (error) {
    console.error('Error in insertEntity:', error);
    return null;
  }
};

const getEntitiesBySubjectID = async (subjectId) => {
  try {
    const [results] = await sequelize.query(
      `SELECT 
        id,
        name,
        surname,
        JMBG as jmbg,
        city_id as cityId,
        street_id as streetId,
        legal_entity_name as legalEntityName,
        legal_entity_number as legalEntityNumber,
        residence,
        created,
        updated,
        updated_by as updatedBy,
        subject_id as subjectId
      FROM entity WHERE subject_id = ? ORDER BY created DESC`,
      { replacements: [subjectId] }
    );
    return results;
  } catch (error) {
    console.error('Error in getEntitiesBySubjectID:', error);
    return null;
  }
};

const updateEntity = async (id, entity) => {
  try {
    await sequelize.query(
      `UPDATE entity SET 
        name = ?, surname = ?, JMBG = ?, city_id = ?, street_id = ?,
        legal_entity_name = ?, legal_entity_number = ?, residence = ?,
        updated = NOW(), updated_by = ?
      WHERE id = ?`,
      {
        replacements: [
          entity.name,
          entity.surname,
          entity.jmbg,
          entity.cityId,
          entity.streetId,
          entity.legalEntityName,
          entity.legalEntityNumber,
          entity.residence,
          entity.updatedBy,
          id
        ]
      }
    );
    return true;
  } catch (error) {
    console.error('Error in updateEntity:', error);
    return null;
  }
};

const deleteEntity = async (id) => {
  try {
    await sequelize.query('DELETE FROM entity WHERE id = ?', {
      replacements: [id]
    });
    return true;
  } catch (error) {
    console.error('Error in deleteEntity:', error);
    return null;
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