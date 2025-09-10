const accountRepository = require('./../repositories/acc-repository');

const getAllAccounts = async (req, res) => {
  const results = await accountRepository.getAllAccounts();
  res.send({ data: results });
};

const getAccountByID = async (req, res) => {
  const { id } = req.params;
  const result = await accountRepository.getAccountByID(id);
  res.send(result);
};

const getAccountsPaginated = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;
  const offset = (page - 1) * perPage;

  try {
    const { count, rows } = await accountRepository.getAccountsPaginated(perPage, offset);
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    
    res.send({ data: rows, totalCount: count });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const insertAccount = async (req, res) => {
  const insertedId = await accountRepository.insertAccount(req.body);
  if (insertedId !== null) {
    res.status(201).send({ id: insertedId });
  } else {
    res.status(500).send({ error: 'Insert failed' });
  }
};

const updateAccount = async (req, res) => {
  const { id } = req.params;
  const success = await accountRepository.updateAccount(id, req.body);
  if (success) {
    res.send({ message: 'Updated successfully' });
  } else {
    res.status(500).send({ error: 'Update failed' });
  }
};

const deleteAccount = async (req, res) => {
  const { id } = req.params;
  const success = await accountRepository.deleteAccount(id);
  if (success) {
    res.send({ message: 'Deleted successfully' });
  } else {
    res.status(500).send({ error: 'Delete failed' });
  }
};

// dodatne
const activateAccount = async (req, res) => {
  const { id } = req.params;
  const success = await accountRepository.activateAccount(id);
  res.send({ success });
};

const deactivateAccount = async (req, res) => {
  const { id } = req.params;
  const success = await accountRepository.deactivateAccount(id);
  res.send({ success });
};

const isAccountActive = async (req, res) => {
  const { id } = req.params;
  const active = await accountRepository.isAccountActive(id);
  res.send({ active });
};

const getActiveAccounts = async (req, res) => {
  const results = await accountRepository.getActiveAccounts();
  res.send({ data: results });
};

const isSuperAdmin = async (req, res) => {
  const { id } = req.params;
  const result = await accountRepository.isSuperAdmin(id);
  res.send({ superAdmin: result });
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