const { ElasticIndexer } = require("serviceCommon");
const { hexaLogger } = require("common");

const reservationMapping = {
  id: { type: "keyword" },
  _owner: { type: "keyword" },
  guestId: { type: "keyword", index: true },
  roomId: { type: "keyword", index: true },
  checkInDate: { type: "date", index: true },
  checkOutDate: { type: "date", index: true },
  reservationCode: { type: "keyword", index: true },
  packages: { type: "keyword", index: true },
  specialRequests: { type: "keyword", index: false },
  paymentId: { type: "keyword", index: true },
  status: { type: "keyword", index: true },
  status_: { type: "keyword" },
  numGuests: { type: "integer", index: true },
  totalPrice: { type: "double", index: true },
  notes: { type: "text", index: false },
  isActive: { type: "boolean" },
  recordVersion: { type: "integer" },
  createdAt: { type: "date" },
  updatedAt: { type: "date" },
};

const updateElasticIndexMappings = async () => {
  try {
    ElasticIndexer.addMapping("reservation", reservationMapping);
    await new ElasticIndexer("reservation").updateMapping(reservationMapping);
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
