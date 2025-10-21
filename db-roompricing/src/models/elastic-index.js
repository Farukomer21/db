const { ElasticIndexer } = require("serviceCommon");
const { hexaLogger } = require("common");

const roomPriceMapping = {
  id: { type: "keyword" },
  _owner: { type: "keyword" },
  roomId: { type: "keyword", index: true },
  startDate: { type: "date", index: true },
  endDate: { type: "date", index: true },
  price: { type: "double", index: true },
  priceType: { type: "keyword", index: true },
  priceType_: { type: "keyword" },
  description: { type: "keyword", index: true },
  isActive: { type: "boolean" },
  recordVersion: { type: "integer" },
  createdAt: { type: "date" },
  updatedAt: { type: "date" },
};

const updateElasticIndexMappings = async () => {
  try {
    ElasticIndexer.addMapping("roomPrice", roomPriceMapping);
    await new ElasticIndexer("roomPrice").updateMapping(roomPriceMapping);
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
