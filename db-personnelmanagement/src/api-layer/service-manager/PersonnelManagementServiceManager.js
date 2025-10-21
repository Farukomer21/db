const ApiManager = require("./ApiManager");

const { md5 } = require("common");

class PersonnelManagementServiceManager extends ApiManager {
  constructor(request, options) {
    super(request, options);
    this.serviceCodename = "db-personnelmanagement-service";
    this.membershipCache = new Map();
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
  }
}

module.exports = PersonnelManagementServiceManager;
