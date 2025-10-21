const specialRequestFunctions = require("./specialRequest");

module.exports = {
  // main Database
  createSpecialRequest: specialRequestFunctions.createSpecialRequest,
  getIdListOfSpecialRequestByField:
    specialRequestFunctions.getIdListOfSpecialRequestByField,
  getSpecialRequestById: specialRequestFunctions.getSpecialRequestById,
  getSpecialRequestAggById: specialRequestFunctions.getSpecialRequestAggById,
  getSpecialRequestListByQuery:
    specialRequestFunctions.getSpecialRequestListByQuery,
  getSpecialRequestStatsByQuery:
    specialRequestFunctions.getSpecialRequestStatsByQuery,
  getSpecialRequestByQuery: specialRequestFunctions.getSpecialRequestByQuery,
  updateSpecialRequestById: specialRequestFunctions.updateSpecialRequestById,
  updateSpecialRequestByIdList:
    specialRequestFunctions.updateSpecialRequestByIdList,
  updateSpecialRequestByQuery:
    specialRequestFunctions.updateSpecialRequestByQuery,
  deleteSpecialRequestById: specialRequestFunctions.deleteSpecialRequestById,
  deleteSpecialRequestByQuery:
    specialRequestFunctions.deleteSpecialRequestByQuery,
  getSpecialRequestByReservationId:
    specialRequestFunctions.getSpecialRequestByReservationId,
  getSpecialRequestByGuestId:
    specialRequestFunctions.getSpecialRequestByGuestId,
  dbScriptCreateSpecialrequest:
    specialRequestFunctions.dbScriptCreateSpecialrequest,
  dbScriptUpdateSpecialrequest:
    specialRequestFunctions.dbScriptUpdateSpecialrequest,
  dbScriptGetSpecialrequest: specialRequestFunctions.dbScriptGetSpecialrequest,
  dbScriptDeleteSpecialrequest:
    specialRequestFunctions.dbScriptDeleteSpecialrequest,
  dbScriptListSpecialrequests:
    specialRequestFunctions.dbScriptListSpecialrequests,
  dbScriptCreateSpecialrequestpublic:
    specialRequestFunctions.dbScriptCreateSpecialrequestpublic,
  dbScriptListSpecialrequestsbycode:
    specialRequestFunctions.dbScriptListSpecialrequestsbycode,
  dbScriptGetSpecialrequestbycode:
    specialRequestFunctions.dbScriptGetSpecialrequestbycode,
  dbScriptCancelSpecialrequestbycode:
    specialRequestFunctions.dbScriptCancelSpecialrequestbycode,
};
