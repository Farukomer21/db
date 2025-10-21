const { DeletePackageReservationManager } = require("apiLayer");

const PackageReservationMappingRestController = require("../../PackageReservationMappingServiceRestController");

class DeletePackageReservationRestController extends PackageReservationMappingRestController {
  constructor(req, res) {
    super("deletePackageReservation", "deletepackagereservation", req, res);
    this.dataName = "packageReservation";
    this.crudType = "delete";
    this.status = 200;
    this.httpMethod = "DELETE";
  }

  createApiManager() {
    return new DeletePackageReservationManager(this._req, "rest");
  }
}

const deletePackageReservation = async (req, res, next) => {
  const controller = new DeletePackageReservationRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = deletePackageReservation;
