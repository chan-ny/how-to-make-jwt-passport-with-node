const passport = require("passport");
const { Admin } = require("./models");

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const config = require("./config/config");

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.authentication.JwtSecret,
    },
    async function (jwtPayload, done) {
      try {
        const admin = await Admin.findOne({
          where: {
            email: jwtPayload.email,
          },
        });
        if (!admin) {
          return done(new Error(), false);
        }
        return done(null, admin);
      } catch (err) {
        return done(new Error(), false);
      }
    }
  )
);

module.exports = null;
