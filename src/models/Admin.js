const Promiose = require("bluebird");
const bcrypt = Promiose.promisifyAll(require("bcrypt-nodejs"));

function hashPassword(admin, options) {
  const SALT_FACTOR = 8;

  if (!admin.changed("password")) {
    return;
  }
  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then((salt) => bcrypt.hashAsync(admin.password, salt, null))
    .then((hash) => {
      admin.setDataValue("password", hash);
    });
}

module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define(
    "Admin",
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: hashPassword,
        beforeUpdate: hashPassword,
        beforeSave: hashPassword,
      },
    }
  );
  Admin.prototype.comparePassword = function (password) {
    return bcrypt.compareAsync(password, this.password);
  };

  return Admin;
};
