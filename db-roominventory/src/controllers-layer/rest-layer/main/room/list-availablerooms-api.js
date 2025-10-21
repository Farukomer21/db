const { ListAvailableRoomsManager } = require("apiLayer");

const RoomInventoryRestController = require("../../RoomInventoryServiceRestController");

class ListAvailableRoomsRestController extends RoomInventoryRestController {
  constructor(req, res) {
    super("listAvailableRooms", "listavailablerooms", req, res);
    this.dataName = "rooms";
    this.crudType = "list";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new ListAvailableRoomsManager(this._req, "rest");
  }
}

const listAvailableRooms = async (req, res, next) => {
  const controller = new ListAvailableRoomsRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = listAvailableRooms;
