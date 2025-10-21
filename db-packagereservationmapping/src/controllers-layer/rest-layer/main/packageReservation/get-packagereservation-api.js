const { GetPackageReservationManager } = require("apiLayer");

const PackageReservationMappingRestController = require("../../PackageReservationMappingServiceRestController");

class GetPackageReservationRestController extends PackageReservationMappingRestController {
  constructor(req, res) {
    super("getPackageReservation", "getpackagereservation", req, res);
    this.dataName = "packageReservation";
    this.crudType = "get";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new GetPackageReservationManager(this._req, "rest");
  }
}

const getPackageReservation = async (req, res, next) => {
  const controller = new GetPackageReservationRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = getPackageReservation;
