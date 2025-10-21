const { ElasticIndexer } = require("serviceCommon");
const { hexaLogger } = require("common");

const packageReservationMapping = {
  id: { type: "keyword" },
  _owner: { type: "keyword" },
  reservationId: { type: "keyword", index: true },
  packageId: { type: "keyword", index: true },
  priceAtBooking: { type: "double", index: true },
  notes: { type: "keyword", index: true },
  isActive: { type: "boolean" },
  recordVersion: { type: "integer" },
  createdAt: { type: "date" },
  updatedAt: { type: "date" },
};

const updateElasticIndexMappings = async () => {
  try {
    ElasticIndexer.addMapping("packageReservation", packageReservationMapping);
    await new ElasticIndexer("packageReservation").updateMapping(
      packageReservationMapping,
    );
  } catch (err) {
    hexaLogger.insertError(
      "UpdateElasticIndexMappingsError",
      { function: "updateElasticIndexMappings" },
      "elastic-index.js->updateElasticIndexMappings",
      err,
    );
  }
};

module.exports = updateElasticIndexMappings;
