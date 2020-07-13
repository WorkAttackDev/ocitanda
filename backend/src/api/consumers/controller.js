const User = require("../users/model");
const Consumer = require("./model");

const clearPrivateFilds = (consumer) => {
  delete consumer.user.password;
  delete consumer.user.reset_password_token;
  delete consumer.user.reset_password_expires_date;
};

const getByUserId = async (userId) => {
  const consumer = await Consumer.query()
    .where({ user_id: userId })
    .withGraphFetched("user")
    .first();

  if (!consumer) return null;

  clearPrivateFilds(consumer);

  return consumer;
};

const getById = async (id) => {
  const consumer = await Consumer.query().findById(id).withGraphFetched("user");

  if (!consumer) return null;

  clearPrivateFilds(consumer);

  return consumer;
};

const getByEmail = async (email) => {
  const user = await User.query().where({ email }).first();
  if (!user) return null;
  const consumer = await getByUserId(user.id);

  if (!consumer) return null;

  clearPrivateFilds(consumer);

  return consumer;
};

module.exports = {
  getByEmail,
  getById,
  getByUserId,
};
