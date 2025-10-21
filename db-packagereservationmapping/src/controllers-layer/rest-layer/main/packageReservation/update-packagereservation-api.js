const { UpdatePackageReservationManager } = require("apiLayer");

const PackageReservationMappingRestController = require("../../PackageReservationMappingServiceRestController");

class UpdatePackageReservationRestController extends PackageReservationMappingRestController {
  constructor(req, res) {
    super("updatePackageReservation", "updatepackagereservation", req, res);
    this.dataName = "packageReservation";
    this.crudType = "update";
    this.status = 200;
    this.httpMethod = "PATCH";
  }

  createApiManager() {
    return new UpdatePackageReservationManager(this._req, "rest");
  }
}

const updatePackageReservation = async (req, res, next) => {
  const controller = new UpdatePackageReservationRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = updatePackageReservation;
