module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "db_multiple_user",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  authentication: {
    JwtSecret: process.env.JWT_SECRET || "secret",
  },
};
