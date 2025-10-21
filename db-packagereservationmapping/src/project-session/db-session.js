const { NotAuthenticatedError, ForbiddenError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const HexaAuth = require("./hexa-auth");

class DbSession extends HexaAuth {
  constructor() {
    super();
    this.ROLES = {
      superAdmin: "superAdmin",

      admin: "admin",
      user: "user",
    };

    this.projectName = "db";
    this.projectCodename = "db";
    this.isJWT = true;
    this.isJWTAuthRSA = true;
    this.isRemoteAuth = false;
    this.useRemoteSession = false;
  }

  userHasRole(roleName) {
    const userRoleInSession = this.session?.roleId;
    if (!userRoleInSession) return false;
    return Array.isArray(userRoleInSession)
      ? userRoleInSession.includes(roleName)
      : userRoleInSession == roleName;
  }
}

module.exports = DbSession;
