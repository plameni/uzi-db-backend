const sequelize = require('./../common/db-config');

const getAllMovables = async () => {
  try {
    const [results] = await sequelize.query(`
      SELECT m.*, 
             pt.name AS property_type_name,
             uom.name AS unit_of_measure_name,
             w.name AS warehouse_name,
             a.username AS updated_by_name 
      FROM movable m
      LEFT JOIN property_type pt ON m.property_type_id = pt.id
      LEFT JOIN units_of_measure uom ON m.unit_of_measure_id = uom.id
      LEFT JOIN warehouse w ON m.warehouse_id = w.id
      LEFT JOIN account a ON m.updated_by = a.id
      ORDER BY m.created DESC
    `);
    return results;
  } catch (error) {
    console.error('Error in getAllMovables:', error);
    return null;
  }
};

const getMovablesPaginated = async (limit, offset) => {
  try {
    const [countResult] = await sequelize.query('SELECT COUNT(*) AS total FROM movable');
    const totalCount = countResult[0].total;

    const [results] = await sequelize.query(
      `SELECT m.*, 
              pt.name AS property_type_name,
              uom.name AS unit_of_measure_name,
              w.name AS warehouse_name,
              a.username AS updated_by_name 
       FROM movable m
       LEFT JOIN property_type pt ON m.property_type_id = pt.id
       LEFT JOIN units_of_measure uom ON m.unit_of_measure_id = uom.id
       LEFT JOIN warehouse w ON m.warehouse_id = w.id
       LEFT JOIN account a ON m.updated_by = a.id
       ORDER BY m.created DESC
       LIMIT ? OFFSET ?`,
      { replacements: [limit, offset] }
    );

    return { count: totalCount, rows: results };
  } catch (error) {
    console.error('Error in getMovablesPaginated:', error);
    return null;
  }
};

const getMovableByID = async (id) => {
  try {
    const [results] = await sequelize.query(
      `SELECT m.*, 
              pt.name AS property_type_name,
              uom.name AS unit_of_measure_name,
              w.name AS warehouse_name,
              a.username AS updated_by_name 
       FROM movable m
       LEFT JOIN property_type pt ON m.property_type_id = pt.id
       LEFT JOIN units_of_measure uom ON m.unit_of_measure_id = uom.id
       LEFT JOIN warehouse w ON m.warehouse_id = w.id
       LEFT JOIN account a ON m.updated_by = a.id
       WHERE m.id = ?`,
      { replacements: [id] }
    );
    return results[0];
  } catch (error) {
    console.error('Error in getMovableByID:', error);
    return null;
  }
};

const getMovableBySubjectID = async (id) => {
  try {
    const [results] = await sequelize.query(
      `SELECT m.*, 
              pt.name AS property_type_name,
              uom.name AS unit_of_measure_name,
              w.name AS warehouse_name,
              a.username AS updated_by_name 
       FROM movable m
       LEFT JOIN property_type pt ON m.property_type_id = pt.id
       LEFT JOIN units_of_measure uom ON m.unit_of_measure_id = uom.id
       LEFT JOIN warehouse w ON m.warehouse_id = w.id
       LEFT JOIN account a ON m.updated_by = a.id
       WHERE m.subject_id = ?`,
      { replacements: [id] }
    );
    return results;
  } catch (error) {
    console.error('Error in getMovableByID:', error);
    return null;
  }
};

const insertMovable = async (movable) => {
  try {
    const [results] = await sequelize.query(
      `INSERT INTO movable (property_type_id, unit_of_measure_id, quantity, warehouse_id, created, updated, updated_by, subject_id)
       VALUES (?, ?, ?, ?, NOW(), NOW(), ?, ?)`,
      {
        replacements: [
          movable.property_type_id || null,
          movable.unit_of_measure_id || null,
          movable.quantity || null,
          movable.warehouse_id || null,
          movable.updated_by || null,
          movable.subject_id || null
        ],
      }
    );
    return results.insertId;
  } catch (error) {
    console.error('Error in insertMovable:', error);
    return null;
  }
};

const updateMovable = async (id, movable) => {
  try {
    const [results] = await sequelize.query(
      `UPDATE movable
       SET property_type_id = ?, unit_of_measure_id = ?, quantity = ?, warehouse_id = ?, 
           updated = NOW(), updated_by = ?
       WHERE id = ?`,
      {
        replacements: [
          movable.property_type_id || null,
          movable.unit_of_measure_id || null,
          movable.quantity || null,
          movable.warehouse_id || null,
          movable.updated_by || null,
          id,
        ],
      }
    );
    return results.affectedRows > 0;
  } catch (error) {
    console.error('Error in updateMovable:', error);
    return false;
  }
};

const deleteMovable = async (id) => {
  try {
    const [results] = await sequelize.query('DELETE FROM movable WHERE id = ?', {
      replacements: [id],
    });
    return results.affectedRows > 0;
  } catch (error) {
    console.error('Error in deleteMovable:', error);
    return false;
  }
};

module.exports = {
  getAllMovables,
  getMovablesPaginated,
  getMovableBySubjectID,
  getMovableByID,
  insertMovable,
  updateMovable,
  deleteMovable,
};
