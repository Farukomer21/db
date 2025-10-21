const utils = require("./utils");
const dbApiScripts = require("./dbApiScripts");

module.exports = {
  createSpecialRequest: utils.createSpecialRequest,
  getIdListOfSpecialRequestByField: utils.getIdListOfSpecialRequestByField,
  getSpecialRequestById: utils.getSpecialRequestById,
  getSpecialRequestAggById: utils.getSpecialRequestAggById,
  getSpecialRequestListByQuery: utils.getSpecialRequestListByQuery,
  getSpecialRequestStatsByQuery: utils.getSpecialRequestStatsByQuery,
  getSpecialRequestByQuery: utils.getSpecialRequestByQuery,
  updateSpecialRequestById: utils.updateSpecialRequestById,
  updateSpecialRequestByIdList: utils.updateSpecialRequestByIdList,
  updateSpecialRequestByQuery: utils.updateSpecialRequestByQuery,
  deleteSpecialRequestById: utils.deleteSpecialRequestById,
  deleteSpecialRequestByQuery: utils.deleteSpecialRequestByQuery,
  getSpecialRequestByReservationId: utils.getSpecialRequestByReservationId,
  getSpecialRequestByGuestId: utils.getSpecialRequestByGuestId,
  dbScriptCreateSpecialrequest: dbApiScripts.dbScriptCreateSpecialrequest,
  dbScriptUpdateSpecialrequest: dbApiScripts.dbScriptUpdateSpecialrequest,
  dbScriptGetSpecialrequest: dbApiScripts.dbScriptGetSpecialrequest,
  dbScriptDeleteSpecialrequest: dbApiScripts.dbScriptDeleteSpecialrequest,
  dbScriptListSpecialrequests: dbApiScripts.dbScriptListSpecialrequests,
  dbScriptCreateSpecialrequestpublic:
    dbApiScripts.dbScriptCreateSpecialrequestpublic,
  dbScriptListSpecialrequestsbycode:
    dbApiScripts.dbScriptListSpecialrequestsbycode,
  dbScriptGetSpecialrequestbycode: dbApiScripts.dbScriptGetSpecialrequestbycode,
  dbScriptCancelSpecialrequestbycode:
    dbApiScripts.dbScriptCancelSpecialrequestbycode,
};
