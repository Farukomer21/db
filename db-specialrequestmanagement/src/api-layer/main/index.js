module.exports = {
  // main Database Crud Object Routes Manager Layer Classes
  // SpecialRequest Db Object
  CreateSpecialRequestManager: require("./specialRequest/create-specialrequest-api"),
  UpdateSpecialRequestManager: require("./specialRequest/update-specialrequest-api"),
  GetSpecialRequestManager: require("./specialRequest/get-specialrequest-api"),
  DeleteSpecialRequestManager: require("./specialRequest/delete-specialrequest-api"),
  ListSpecialRequestsManager: require("./specialRequest/list-specialrequests-api"),
  CreateSpecialRequestPublicManager: require("./specialRequest/create-specialrequestpublic-api"),
  ListSpecialRequestsByCodeManager: require("./specialRequest/list-specialrequestsbycode-api"),
  GetSpecialRequestByCodeManager: require("./specialRequest/get-specialrequestbycode-api"),
  CancelSpecialRequestByCodeManager: require("./specialRequest/cancel-specialrequestbycode-api"),
};
