const sequelize = require('./../common/db-config');

const getAllImmovables = async () => {
  try {
    const [results] = await sequelize.query(`
      SELECT i.*,
             pt.name AS property_type_name,
             a.username AS updated_by_name
      FROM immovable i
      LEFT JOIN property_type pt ON i.property_type_id = pt.id
      LEFT JOIN account a ON i.updated_by = a.id
      ORDER BY i.created DESC
    `);
    return results;
  } catch (error) {
    console.error('Error in getAllImmovables:', error);
    return null;
  }
};

const getImmovablesPaginated = async (limit, offset) => {
  try {
    const [countResult] = await sequelize.query('SELECT COUNT(*) AS total FROM immovable');
    const totalCount = countResult[0].total;

    const [results] = await sequelize.query(
      `SELECT i.*,
              pt.name AS property_type_name,
              a.username AS updated_by_name 
       FROM immovable i
       LEFT JOIN property_type pt ON i.property_type_id = pt.id
       LEFT JOIN account a ON i.updated_by = a.id
       ORDER BY i.created DESC
       LIMIT ? OFFSET ?`,
      { replacements: [limit, offset] }
    );

    return { count: totalCount, rows: results };
  } catch (error) {
    console.error('Error in getImmovablesPaginated:', error);
    return null;
  }
};

const getImmovableByID = async (id) => {
  try {
    const [results] = await sequelize.query(
      `SELECT i.*,
              pt.name AS property_type_name,
              a.username AS updated_by_name
       FROM immovable i
       LEFT JOIN property_type pt ON i.property_type_id = pt.id
       LEFT JOIN account a ON i.updated_by = a.id
       WHERE i.id = ?`,
      { replacements: [id] }
    );
    return results[0];
  } catch (error) {
    console.error('Error in getImmovableByID:', error);
    return null;
  }
};

const getImmovableBySubjectID = async (id) => {
  try {
    const [results] = await sequelize.query(
      `SELECT i.*,
              pt.name AS property_type_name,
              a.username AS updated_by_name 
       FROM immovable i
       LEFT JOIN property_type pt ON i.property_type_id = pt.id
       LEFT JOIN account a ON i.updated_by = a.id
       WHERE i.subject_id = ?`,
      { replacements: [id] }
    );
    return results;
  } catch (error) {
    console.error('Error in getImmovableByID:', error);
    return null;
  }
};

const insertImmovable = async (immovable) => {
  try {
    const [results] = await sequelize.query(
      `INSERT INTO immovable (LN, KO, parcel, property_type_id, square_footage, created, updated, updated_by, subject_id)
       VALUES (?, ?, ?, ?, ?, NOW(), NOW(), ?, ?)`,
      {
        replacements: [
          immovable.LN || null,
          immovable.KO || null,
          immovable.parcel || null,
          immovable.property_type_id || null,
          immovable.square_footage || null,
          immovable.updated_by || null,
        immovable.subject_id || null,
        ],
      }
    );
    return results.insertId;
  } catch (error) {
    console.error('Error in insertImmovable:', error);
    return null;
  }
};

const updateImmovable = async (id, immovable) => {
  try {
    const [results] = await sequelize.query(
      `UPDATE immovable
       SET LN = ?, KO = ?, parcel = ?, property_type_id = ?, square_footage = ?,
           updated = NOW(), updated_by = ?
       WHERE id = ?`,
      {
        replacements: [
          immovable.LN || null,
          immovable.KO || null,
          immovable.parcel || null,
          immovable.property_type_id || null,
          immovable.square_footage || null,
          immovable.updated_by || null,
          id,
        ],
      }
    );
    return results.affectedRows > 0;
  } catch (error) {
    console.error('Error in updateImmovable:', error);
    return false;
  }
};

const deleteImmovable = async (id) => {
  try {
    const [results] = await sequelize.query('DELETE FROM immovable WHERE id = ?', {
      replacements: [id],
    });
    return results.affectedRows > 0;
  } catch (error) {
    console.error('Error in deleteImmovable:', error);
    return false;
  }
};

module.exports = {
  getAllImmovables,
  getImmovablesPaginated,
  getImmovableBySubjectID,
  getImmovableByID,
  insertImmovable,
  updateImmovable,
  deleteImmovable,
};
