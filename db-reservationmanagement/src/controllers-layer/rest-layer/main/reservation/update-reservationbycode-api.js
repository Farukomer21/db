const { UpdateReservationByCodeManager } = require("apiLayer");

const ReservationManagementRestController = require("../../ReservationManagementServiceRestController");

class UpdateReservationByCodeRestController extends ReservationManagementRestController {
  constructor(req, res) {
    super("updateReservationByCode", "updatereservationbycode", req, res);
    this.dataName = "reservation";
    this.crudType = "update";
    this.status = 200;
    this.httpMethod = "PATCH";
  }

  createApiManager() {
    return new UpdateReservationByCodeManager(this._req, "rest");
  }
}

const updateReservationByCode = async (req, res, next) => {
  const controller = new UpdateReservationByCodeRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = updateReservationByCode;
