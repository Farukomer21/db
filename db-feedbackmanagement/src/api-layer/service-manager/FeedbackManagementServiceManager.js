const ApiManager = require("./ApiManager");

const { md5 } = require("common");

class FeedbackManagementServiceManager extends ApiManager {
  constructor(request, options) {
    super(request, options);
    this.serviceCodename = "db-feedbackmanagement-service";
    this.membershipCache = new Map();
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
  }
}

module.exports = FeedbackManagementServiceManager;
