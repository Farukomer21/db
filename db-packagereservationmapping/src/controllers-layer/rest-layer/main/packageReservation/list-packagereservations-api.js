const { ListPackageReservationsManager } = require("apiLayer");

const PackageReservationMappingRestController = require("../../PackageReservationMappingServiceRestController");

class ListPackageReservationsRestController extends PackageReservationMappingRestController {
  constructor(req, res) {
    super("listPackageReservations", "listpackagereservations", req, res);
    this.dataName = "packageReservations";
    this.crudType = "list";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new ListPackageReservationsManager(this._req, "rest");
  }
}

const listPackageReservations = async (req, res, next) => {
  const controller = new ListPackageReservationsRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = listPackageReservations;
