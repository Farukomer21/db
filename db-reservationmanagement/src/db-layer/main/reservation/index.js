const utils = require("./utils");
const dbApiScripts = require("./dbApiScripts");

module.exports = {
  createReservation: utils.createReservation,
  getIdListOfReservationByField: utils.getIdListOfReservationByField,
  getReservationById: utils.getReservationById,
  getReservationAggById: utils.getReservationAggById,
  getReservationListByQuery: utils.getReservationListByQuery,
  getReservationStatsByQuery: utils.getReservationStatsByQuery,
  getReservationByQuery: utils.getReservationByQuery,
  updateReservationById: utils.updateReservationById,
  updateReservationByIdList: utils.updateReservationByIdList,
  updateReservationByQuery: utils.updateReservationByQuery,
  deleteReservationById: utils.deleteReservationById,
  deleteReservationByQuery: utils.deleteReservationByQuery,
  getReservationByReservationCode: utils.getReservationByReservationCode,
  dbScriptCreateReservation: dbApiScripts.dbScriptCreateReservation,
  dbScriptUpdateReservation: dbApiScripts.dbScriptUpdateReservation,
  dbScriptGetReservation: dbApiScripts.dbScriptGetReservation,
  dbScriptDeleteReservation: dbApiScripts.dbScriptDeleteReservation,
  dbScriptListReservations: dbApiScripts.dbScriptListReservations,
  dbScriptCreateReservationguest: dbApiScripts.dbScriptCreateReservationguest,
  dbScriptConfirmReservationpayment:
    dbApiScripts.dbScriptConfirmReservationpayment,
  dbScriptGetReservationbycode: dbApiScripts.dbScriptGetReservationbycode,
  dbScriptUpdateReservationbycode: dbApiScripts.dbScriptUpdateReservationbycode,
  dbScriptCancelReservationbycode: dbApiScripts.dbScriptCancelReservationbycode,
};
