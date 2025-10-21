const { GetReservationManager } = require("apiLayer");

const ReservationManagementRestController = require("../../ReservationManagementServiceRestController");

class GetReservationRestController extends ReservationManagementRestController {
  constructor(req, res) {
    super("getReservation", "getreservation", req, res);
    this.dataName = "reservation";
    this.crudType = "get";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new GetReservationManager(this._req, "rest");
  }
}

const getReservation = async (req, res, next) => {
  const controller = new GetReservationRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = getReservation;
