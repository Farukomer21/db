module.exports = {
  CreateSpecialRequestManager: require("./create-specialrequest-api"),
  UpdateSpecialRequestManager: require("./update-specialrequest-api"),
  GetSpecialRequestManager: require("./get-specialrequest-api"),
  DeleteSpecialRequestManager: require("./delete-specialrequest-api"),
  ListSpecialRequestsManager: require("./list-specialrequests-api"),
  CreateSpecialRequestPublicManager: require("./create-specialrequestpublic-api"),
  ListSpecialRequestsByCodeManager: require("./list-specialrequestsbycode-api"),
  GetSpecialRequestByCodeManager: require("./get-specialrequestbycode-api"),
  CancelSpecialRequestByCodeManager: require("./cancel-specialrequestbycode-api"),
};
