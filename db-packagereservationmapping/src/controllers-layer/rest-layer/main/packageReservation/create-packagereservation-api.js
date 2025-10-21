const { CreatePackageReservationManager } = require("apiLayer");

const PackageReservationMappingRestController = require("../../PackageReservationMappingServiceRestController");

class CreatePackageReservationRestController extends PackageReservationMappingRestController {
  constructor(req, res) {
    super("createPackageReservation", "createpackagereservation", req, res);
    this.dataName = "packageReservation";
    this.crudType = "create";
    this.status = 201;
    this.httpMethod = "POST";
  }

  createApiManager() {
    return new CreatePackageReservationManager(this._req, "rest");
  }
}

const createPackageReservation = async (req, res, next) => {
  const controller = new CreatePackageReservationRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = createPackageReservation;
