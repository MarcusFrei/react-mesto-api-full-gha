const {
  PORT = 3000,
  MONGO_DB = 'mongodb://127.0.0.1:27017/mestodb',
  JWT_SECRET,
  NODE_ENV,
} = process.env;

module.exports = {
  PORT,
  MONGO_DB,
  JWT_SECRET,
  NODE_ENV,
};
