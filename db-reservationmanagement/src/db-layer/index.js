const mainFunctions = require("./main");

module.exports = {
  // main Database
  createReservation: mainFunctions.createReservation,
  getIdListOfReservationByField: mainFunctions.getIdListOfReservationByField,
  getReservationById: mainFunctions.getReservationById,
  getReservationAggById: mainFunctions.getReservationAggById,
  getReservationListByQuery: mainFunctions.getReservationListByQuery,
  getReservationStatsByQuery: mainFunctions.getReservationStatsByQuery,
  getReservationByQuery: mainFunctions.getReservationByQuery,
  updateReservationById: mainFunctions.updateReservationById,
  updateReservationByIdList: mainFunctions.updateReservationByIdList,
  updateReservationByQuery: mainFunctions.updateReservationByQuery,
  deleteReservationById: mainFunctions.deleteReservationById,
  deleteReservationByQuery: mainFunctions.deleteReservationByQuery,
  getReservationByReservationCode:
    mainFunctions.getReservationByReservationCode,
  dbScriptCreateReservation: mainFunctions.dbScriptCreateReservation,
  dbScriptUpdateReservation: mainFunctions.dbScriptUpdateReservation,
  dbScriptGetReservation: mainFunctions.dbScriptGetReservation,
  dbScriptDeleteReservation: mainFunctions.dbScriptDeleteReservation,
  dbScriptListReservations: mainFunctions.dbScriptListReservations,
  dbScriptCreateReservationguest: mainFunctions.dbScriptCreateReservationguest,
  dbScriptConfirmReservationpayment:
    mainFunctions.dbScriptConfirmReservationpayment,
  dbScriptGetReservationbycode: mainFunctions.dbScriptGetReservationbycode,
  dbScriptUpdateReservationbycode:
    mainFunctions.dbScriptUpdateReservationbycode,
  dbScriptCancelReservationbycode:
    mainFunctions.dbScriptCancelReservationbycode,
};
