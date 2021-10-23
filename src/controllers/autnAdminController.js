const { Admin } = require("../models");
const JWT = require("jsonwebtoken");
const config = require("../config/config");

function jwtSignadmin(admin) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return JWT.sign(admin, config.authentication.JwtSecret, {
    expiresIn: ONE_WEEK,
  });
}

module.exports = {
  async register(req, res) {
    try {
      let admin = await Admin.create(req.body);
      res.send(admin.toJSON());
    } catch (error) {
      res.status(500).send({
        error: "email are you aleady!!!",
      });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      let admin = await Admin.findOne({
        where: {
          email: email,
        },
      });

      if (!admin) {
        return res.status(403).send({
          error: "login incorrect",
        });
      }

      //   const isPassword = await admin.comparePassword(password);
      //   if (!isPassword) {
      //     return res.status(403).send({
      //       error: "password incorrect",
      //     });
      //   }

      const adminJSON = admin.toJSON();
      res.send({
        admin: adminJSON,
        token: jwtSignadmin(adminJSON),
      });
    } catch (error) {
      res.status(500).send({
        error: "can not login",
      });
    }
  },
  async index(req, res) {
    try {
      const admin = await Admin.findAll();
      res.send(admin);
    } catch (error) {
      res.status(500).send({
        error: "this a information was incorrect",
      });
    }
  },
};
