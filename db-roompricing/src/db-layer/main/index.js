const roomPriceFunctions = require("./roomPrice");

module.exports = {
  // main Database
  createRoomPrice: roomPriceFunctions.createRoomPrice,
  getIdListOfRoomPriceByField: roomPriceFunctions.getIdListOfRoomPriceByField,
  getRoomPriceById: roomPriceFunctions.getRoomPriceById,
  getRoomPriceAggById: roomPriceFunctions.getRoomPriceAggById,
  getRoomPriceListByQuery: roomPriceFunctions.getRoomPriceListByQuery,
  getRoomPriceStatsByQuery: roomPriceFunctions.getRoomPriceStatsByQuery,
  getRoomPriceByQuery: roomPriceFunctions.getRoomPriceByQuery,
  updateRoomPriceById: roomPriceFunctions.updateRoomPriceById,
  updateRoomPriceByIdList: roomPriceFunctions.updateRoomPriceByIdList,
  updateRoomPriceByQuery: roomPriceFunctions.updateRoomPriceByQuery,
  deleteRoomPriceById: roomPriceFunctions.deleteRoomPriceById,
  deleteRoomPriceByQuery: roomPriceFunctions.deleteRoomPriceByQuery,
  dbScriptCreateRoomprice: roomPriceFunctions.dbScriptCreateRoomprice,
  dbScriptUpdateRoomprice: roomPriceFunctions.dbScriptUpdateRoomprice,
  dbScriptDeleteRoomprice: roomPriceFunctions.dbScriptDeleteRoomprice,
  dbScriptGetRoomprice: roomPriceFunctions.dbScriptGetRoomprice,
  dbScriptListRoomprices: roomPriceFunctions.dbScriptListRoomprices,
};
