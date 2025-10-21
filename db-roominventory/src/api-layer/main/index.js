module.exports = {
  // main Database Crud Object Routes Manager Layer Classes
  // Room Db Object
  CreateRoomManager: require("./room/create-room-api"),
  UpdateRoomManager: require("./room/update-room-api"),
  GetRoomManager: require("./room/get-room-api"),
  DeleteRoomManager: require("./room/delete-room-api"),
  ListRoomsManager: require("./room/list-rooms-api"),
  ListAvailableRoomsManager: require("./room/list-availablerooms-api"),
};
