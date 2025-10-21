module.exports = {
  createSession: () => {
    const SessionManager = require("./db-login-session");
    return new SessionManager();
  },
};
