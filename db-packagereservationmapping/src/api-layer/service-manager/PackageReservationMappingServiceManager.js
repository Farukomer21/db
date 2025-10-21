const ApiManager = require("./ApiManager");

const { md5 } = require("common");

class PackageReservationMappingServiceManager extends ApiManager {
  constructor(request, options) {
    super(request, options);
    this.serviceCodename = "db-packagereservationmapping-service";
    this.membershipCache = new Map();
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
  }
}

module.exports = PackageReservationMappingServiceManager;
