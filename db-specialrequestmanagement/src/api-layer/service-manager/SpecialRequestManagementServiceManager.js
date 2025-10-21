const ApiManager = require("./ApiManager");

const { md5 } = require("common");

class SpecialRequestManagementServiceManager extends ApiManager {
  constructor(request, options) {
    super(request, options);
    this.serviceCodename = "db-specialrequestmanagement-service";
    this.membershipCache = new Map();
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
  }
}

module.exports = SpecialRequestManagementServiceManager;
