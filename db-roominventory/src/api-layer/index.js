module.exports = {
  RoomInventoryServiceManager: require("./service-manager/RoomInventoryServiceManager"),
  // main Database Crud Object Routes Manager Layer Classes
  // Room Db Object
  CreateRoomManager: require("./main/room/create-room-api"),
  UpdateRoomManager: require("./main/room/update-room-api"),
  GetRoomManager: require("./main/room/get-room-api"),
  DeleteRoomManager: require("./main/room/delete-room-api"),
  ListRoomsManager: require("./main/room/list-rooms-api"),
  ListAvailableRoomsManager: require("./main/room/list-availablerooms-api"),
  integrationRouter: require("./integrations/testRouter"),
};
