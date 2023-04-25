const db = require("../../data/db-config");

const getAll = () => {
  return db("accounts");
};

const getById = (id) => {
  return db("accounts").where("id", id).first();
};

const create = (account) => {
  const insertedAccount = db("account")
    .insert(account)
    .then((ids) => {
      return getById(ids[0]);
    });
  return insertedAccount;
};

const updateById = (id, account) => {
  return db("account")
    .where("id", id)
    .update(account)
    .then((affectedRows) => {
      return getById(id);
    });
};

const deleteById = (id) => {
  return db("accounts").where("id", id).del();
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
