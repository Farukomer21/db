module.exports = (headers) => {
  // Room Db Object Rest Api Router
  const roomMcpRouter = [];

  // updateRoom controller
  roomMcpRouter.push(require("./update-room-api")(headers));
  // getRoom controller
  roomMcpRouter.push(require("./get-room-api")(headers));
  // deleteRoom controller
  roomMcpRouter.push(require("./delete-room-api")(headers));
  // listRooms controller
  roomMcpRouter.push(require("./list-rooms-api")(headers));
  // listAvailableRooms controller
  roomMcpRouter.push(require("./list-availablerooms-api")(headers));

  return roomMcpRouter;
};
