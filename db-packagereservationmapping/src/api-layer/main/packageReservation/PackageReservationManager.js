const { HttpServerError, HttpError, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");

const PackageReservationMappingServiceManager = require("../../service-manager/PackageReservationMappingServiceManager");

/* Base Class For the Crud Routes Of DbObject PackageReservation */
class PackageReservationManager extends PackageReservationMappingServiceManager {
  constructor(request, options) {
    super(request, options);
    this.objectName = "packageReservation";
    this.modelName = "PackageReservation";
  }

  toJSON() {
    const jsonObj = super.toJSON();

    return jsonObj;
  }
}

module.exports = PackageReservationManager;
