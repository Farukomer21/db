module.exports = {
  // main Database Crud Object Routes Manager Layer Classes
  // RoomPrice Db Object
  CreateRoomPriceManager: require("./roomPrice/create-roomprice-api"),
  UpdateRoomPriceManager: require("./roomPrice/update-roomprice-api"),
  DeleteRoomPriceManager: require("./roomPrice/delete-roomprice-api"),
  GetRoomPriceManager: require("./roomPrice/get-roomprice-api"),
  ListRoomPricesManager: require("./roomPrice/list-roomprices-api"),
};
