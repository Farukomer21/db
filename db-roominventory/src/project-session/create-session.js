module.exports = {
  createSession: () => {
    const SessionManager = require("./db-session");
    return new SessionManager();
  },
};
