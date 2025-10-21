const ApiManager = require("./ApiManager");

const { md5 } = require("common");

class GuestManagementServiceManager extends ApiManager {
  constructor(request, options) {
    super(request, options);
    this.serviceCodename = "db-guestmanagement-service";
    this.membershipCache = new Map();
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
  }
}

module.exports = GuestManagementServiceManager;
