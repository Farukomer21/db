const { ConfirmReservationPaymentManager } = require("apiLayer");

const ReservationManagementRestController = require("../../ReservationManagementServiceRestController");

class ConfirmReservationPaymentRestController extends ReservationManagementRestController {
  constructor(req, res) {
    super("confirmReservationPayment", "confirmreservationpayment", req, res);
    this.dataName = "reservation";
    this.crudType = "update";
    this.status = 200;
    this.httpMethod = "PATCH";
  }

  createApiManager() {
    return new ConfirmReservationPaymentManager(this._req, "rest");
  }
}

const confirmReservationPayment = async (req, res, next) => {
  const controller = new ConfirmReservationPaymentRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = confirmReservationPayment;
