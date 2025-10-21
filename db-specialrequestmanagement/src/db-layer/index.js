const mainFunctions = require("./main");

module.exports = {
  // main Database
  createSpecialRequest: mainFunctions.createSpecialRequest,
  getIdListOfSpecialRequestByField:
    mainFunctions.getIdListOfSpecialRequestByField,
  getSpecialRequestById: mainFunctions.getSpecialRequestById,
  getSpecialRequestAggById: mainFunctions.getSpecialRequestAggById,
  getSpecialRequestListByQuery: mainFunctions.getSpecialRequestListByQuery,
  getSpecialRequestStatsByQuery: mainFunctions.getSpecialRequestStatsByQuery,
  getSpecialRequestByQuery: mainFunctions.getSpecialRequestByQuery,
  updateSpecialRequestById: mainFunctions.updateSpecialRequestById,
  updateSpecialRequestByIdList: mainFunctions.updateSpecialRequestByIdList,
  updateSpecialRequestByQuery: mainFunctions.updateSpecialRequestByQuery,
  deleteSpecialRequestById: mainFunctions.deleteSpecialRequestById,
  deleteSpecialRequestByQuery: mainFunctions.deleteSpecialRequestByQuery,
  getSpecialRequestByReservationId:
    mainFunctions.getSpecialRequestByReservationId,
  getSpecialRequestByGuestId: mainFunctions.getSpecialRequestByGuestId,
  dbScriptCreateSpecialrequest: mainFunctions.dbScriptCreateSpecialrequest,
  dbScriptUpdateSpecialrequest: mainFunctions.dbScriptUpdateSpecialrequest,
  dbScriptGetSpecialrequest: mainFunctions.dbScriptGetSpecialrequest,
  dbScriptDeleteSpecialrequest: mainFunctions.dbScriptDeleteSpecialrequest,
  dbScriptListSpecialrequests: mainFunctions.dbScriptListSpecialrequests,
  dbScriptCreateSpecialrequestpublic:
    mainFunctions.dbScriptCreateSpecialrequestpublic,
  dbScriptListSpecialrequestsbycode:
    mainFunctions.dbScriptListSpecialrequestsbycode,
  dbScriptGetSpecialrequestbycode:
    mainFunctions.dbScriptGetSpecialrequestbycode,
  dbScriptCancelSpecialrequestbycode:
    mainFunctions.dbScriptCancelSpecialrequestbycode,
};
