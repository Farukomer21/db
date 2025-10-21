const express = require("express");

// Room Db Object Rest Api Router
const roomRouter = express.Router();

// add Room controllers

// updateRoom controller
roomRouter.patch("/v1/rooms/:roomId", require("./update-room-api"));
// getRoom controller
roomRouter.get("/v1/rooms/:roomId", require("./get-room-api"));
// deleteRoom controller
roomRouter.delete("/v1/rooms/:roomId", require("./delete-room-api"));
// listRooms controller
roomRouter.get("/v1/rooms", require("./list-rooms-api"));
// listAvailableRooms controller
roomRouter.get("/v1/availablerooms", require("./list-availablerooms-api"));

module.exports = roomRouter;
