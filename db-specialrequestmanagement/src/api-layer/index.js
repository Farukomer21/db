module.exports = {
  SpecialRequestManagementServiceManager: require("./service-manager/SpecialRequestManagementServiceManager"),
  // main Database Crud Object Routes Manager Layer Classes
  // SpecialRequest Db Object
  CreateSpecialRequestManager: require("./main/specialRequest/create-specialrequest-api"),
  UpdateSpecialRequestManager: require("./main/specialRequest/update-specialrequest-api"),
  GetSpecialRequestManager: require("./main/specialRequest/get-specialrequest-api"),
  DeleteSpecialRequestManager: require("./main/specialRequest/delete-specialrequest-api"),
  ListSpecialRequestsManager: require("./main/specialRequest/list-specialrequests-api"),
  CreateSpecialRequestPublicManager: require("./main/specialRequest/create-specialrequestpublic-api"),
  ListSpecialRequestsByCodeManager: require("./main/specialRequest/list-specialrequestsbycode-api"),
  GetSpecialRequestByCodeManager: require("./main/specialRequest/get-specialrequestbycode-api"),
  CancelSpecialRequestByCodeManager: require("./main/specialRequest/cancel-specialrequestbycode-api"),
  integrationRouter: require("./integrations/testRouter"),
};
