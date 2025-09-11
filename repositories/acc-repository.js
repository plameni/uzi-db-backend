const sequelize = require('./../common/db-config');
const bcrypt = require('bcrypt');

const getAllAccounts = async () => {
  try {
    const [results] = await sequelize.query(`
      SELECT 
        id,
        role_id as roleId,
        email,
        username,
        name,
        surname,
        hashed_password as hashedPassword,
        updated,
        created,
        updated_by as updatedBy,
        active
      FROM account
    `);
    return results;
  } catch (error) {
    console.error('Error in getAllAccounts:', error);
    return null;
  }
};

const getAccountByID = async (id) => {
  try {
    const [results] = await sequelize.query(
      `SELECT 
        id,
        role_id as roleId,
        email,
        username,
        name,
        surname,
        hashed_password as hashedPassword,
        updated,
        created,
        updated_by as updatedBy,
        active
      FROM account WHERE id = ?`,
      { replacements: [id] }
    );
    return results[0];
  } catch (error) {
    console.error('Error in getAccountByID:', error);
    return null;
  }
};

const getAccountsPaginated = async (limit, offset) => {
  try {
    const [countResult] = await sequelize.query(
      'SELECT COUNT(*) as total FROM account'
    );
    const totalCount = countResult[0].total;

    const [results] = await sequelize.query(
      `SELECT 
        id,
        role_id as roleId,
        email,
        username,
        name,
        surname,
        hashed_password as hashedPassword,
        updated,
        created,
        updated_by as updatedBy,
        active
      FROM account ORDER BY created DESC LIMIT ? OFFSET ?`,
      { replacements: [limit, offset] }
    );

    return { count: totalCount, rows: results };
  } catch (error) {
    console.error('Error in getAccountsPaginated:', error);
    return null;
  }
};

const insertAccount = async (account) => {
  try {
    const hashed = await bcrypt.hash(account.hashedPassword, 10);
    const [results] = await sequelize.query(
      `INSERT INTO account (
        role_id, email, username, name, surname, hashed_password,
        updated, created, updated_by, active
      ) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW(), ?, 0);`,
      {
        replacements: [
          account.roleId,
          account.email,
          account.username,
          account.name,
          account.surname,
          hashed,
          account.updatedBy,
          account.active
        ]
      }
    );
    return results;
  } catch (error) {
    console.error('Error in insertAccount:', error);
    return null;
  }
};

const updateAccount = async (id, account) => {
  try {
    await sequelize.query(
      `UPDATE account SET 
        role_id = ?, email = ?, username = ?, name = ?, surname = ?,
        hashed_password = ?, updated = NOW(), updated_by = ?, active = ?
      WHERE id = ?`,
      {
        replacements: [
          account.roleId,
          account.email,
          account.username,
          account.name,
          account.surname,
          account.hashedPassword,
          account.updatedBy,
          account.active,
          id
        ]
      }
    );
    return true;
  } catch (error) {
    console.error('Error in updateAccount:', error);
    return null;
  }
};

const deleteAccount = async (id) => {
  try {
    await sequelize.query('DELETE FROM account WHERE id = ?', {
      replacements: [id]
    });
    return true;
  } catch (error) {
    console.error('Error in deleteAccount:', error);
    return null;
  }
};

// --- dodatne funkcije ---
const activateAccount = async (id) => {
  try {
    await sequelize.query('UPDATE account SET active = 0, updated = NOW() WHERE id = ?', {
      replacements: [id]
    });
    return true;
  } catch (error) {
    console.error('Error in activateAccount:', error);
    return null;
  }
};

const deactivateAccount = async (id) => {
  try {
    await sequelize.query('UPDATE account SET active = 1, updated = NOW() WHERE id = ?', {
      replacements: [id]
    });
    return true;
  } catch (error) {
    console.error('Error in deactivateAccount:', error);
    return null;
  }
};

const isAccountActive = async (id) => {
  try {
    const [results] = await sequelize.query(
      'SELECT active FROM account WHERE id = ?',
      { replacements: [id] }
    );
    return results[0]?.active === 1;
  } catch (error) {
    console.error('Error in isAccountActive:', error);
    return false;
  }
};

const getActiveAccounts = async () => {
  try {
    const [results] = await sequelize.query(
      `SELECT 
        id, role_id as roleId, email, username, name, surname, active
      FROM account WHERE active = 0`
    );
    return results;
  } catch (error) {
    console.error('Error in getActiveAccounts:', error);
    return null;
  }
};

const isSuperAdmin = async (id) => {
  try {
    const [results] = await sequelize.query(
      `SELECT r.name as roleName
       FROM account a
       INNER JOIN role r ON a.role_id = r.id
       WHERE a.id = ?`,
      { replacements: [id] }
    );
    return results[0]?.roleName === 'super-admin';
  } catch (error) {
    console.error('Error in isSuperAdmin:', error);
    return false;
  }
};

module.exports = {
  getAllAccounts,
  getAccountByID,
  getAccountsPaginated,
  insertAccount,
  updateAccount,
  deleteAccount,
  activateAccount,
  deactivateAccount,
  isAccountActive,
  getActiveAccounts,
  isSuperAdmin
};