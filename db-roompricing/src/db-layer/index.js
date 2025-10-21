const mainFunctions = require("./main");

module.exports = {
  // main Database
  createRoomPrice: mainFunctions.createRoomPrice,
  getIdListOfRoomPriceByField: mainFunctions.getIdListOfRoomPriceByField,
  getRoomPriceById: mainFunctions.getRoomPriceById,
  getRoomPriceAggById: mainFunctions.getRoomPriceAggById,
  getRoomPriceListByQuery: mainFunctions.getRoomPriceListByQuery,
  getRoomPriceStatsByQuery: mainFunctions.getRoomPriceStatsByQuery,
  getRoomPriceByQuery: mainFunctions.getRoomPriceByQuery,
  updateRoomPriceById: mainFunctions.updateRoomPriceById,
  updateRoomPriceByIdList: mainFunctions.updateRoomPriceByIdList,
  updateRoomPriceByQuery: mainFunctions.updateRoomPriceByQuery,
  deleteRoomPriceById: mainFunctions.deleteRoomPriceById,
  deleteRoomPriceByQuery: mainFunctions.deleteRoomPriceByQuery,
  dbScriptCreateRoomprice: mainFunctions.dbScriptCreateRoomprice,
  dbScriptUpdateRoomprice: mainFunctions.dbScriptUpdateRoomprice,
  dbScriptDeleteRoomprice: mainFunctions.dbScriptDeleteRoomprice,
  dbScriptGetRoomprice: mainFunctions.dbScriptGetRoomprice,
  dbScriptListRoomprices: mainFunctions.dbScriptListRoomprices,
};
