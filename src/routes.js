const authUser = require("./controllers/authController");
const authAdmin = require("./controllers/autnAdminController");
const isAuthPassport = require("./isAuthen");

const isAuthPassportAdmin = require("./isauthenAdmin");

module.exports = (app) => {
  app.post("/register", authUser.register);
  app.post("/login", authUser.login);
  app.get("/users", isAuthPassport, authUser.index);
  app.post("/logout", (req, res) => {
    res.clearCookie("user");
    req.session.destroy();
  });
  // app.post("/adminregister", authAdmin.register);
  // app.post("/adminlogin", authAdmin.login);
  // app.get("/admins", isAuthPassportAdmin, authAdmin.index);
};
