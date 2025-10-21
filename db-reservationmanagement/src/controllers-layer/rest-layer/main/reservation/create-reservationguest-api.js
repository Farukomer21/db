const { CreateReservationGuestManager } = require("apiLayer");

const ReservationManagementRestController = require("../../ReservationManagementServiceRestController");

class CreateReservationGuestRestController extends ReservationManagementRestController {
  constructor(req, res) {
    super("createReservationGuest", "createreservationguest", req, res);
    this.dataName = "reservation";
    this.crudType = "create";
    this.status = 201;
    this.httpMethod = "POST";
  }

  createApiManager() {
    return new CreateReservationGuestManager(this._req, "rest");
  }
}

const createReservationGuest = async (req, res, next) => {
  const controller = new CreateReservationGuestRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = createReservationGuest;
