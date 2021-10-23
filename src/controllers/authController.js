const { User } = require("../models");
const passport = require("passport");
const JWT = require("jsonwebtoken");
const config = require("../config/config");

function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return JWT.sign(user, config.authentication.JwtSecret, {
    expiresIn: ONE_WEEK,
  });
}

module.exports = {
  async register(req, res) {
    try {
      let user = await User.create(req.body);
      res.send(user.toJSON());
    } catch (error) {
      res.status(500).send({
        error: "email are you aleady!!!",
      });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      let user = await User.findOne({
        where: {
          email: email,
        },
      });

      if (!user) {
        return res.status(403).send({
          error: "login incorrect",
        });
      }

      //   const isPassword = await user.comparePassword(password);
      //   if (!isPassword) {
      //     return res.status(403).send({
      //       error: "password incorrect",
      //     });
      //   }

      const userJSON = user.toJSON();
      res.send({
        user: userJSON,
        token: jwtSignUser(userJSON),
      });
    } catch (error) {
      res.status(500).send({
        error: "can not login",
      });
    }
  },
  async index(req, res) {
    try {
      const users = await User.findAll();
      res.send(users);
    } catch (error) {
      res.status(500).send({
        error: "this a information was incorrect",
      });
    }
  },
};
