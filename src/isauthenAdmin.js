const passport = require("passport");

module.exports = function (req, res, next) {
  passport.authenticate("jwt", function (err, admin) {
    if (err || !admin) {
      res.status(403).send({
        error: "not access",
      });
    } else {
      req.admin = admin;
      next();
    }
  })(req, res, next);
};
