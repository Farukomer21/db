const { ElasticIndexer } = require("serviceCommon");
const { hexaLogger } = require("common");

const roomMapping = {
  id: { type: "keyword" },
  _owner: { type: "keyword" },
  roomNumber: { type: "keyword", index: true },
  floor: { type: "integer", index: true },
  type: { type: "keyword", index: true },
  type_: { type: "keyword" },
  capacity: { type: "integer", index: true },
  bedType: { type: "keyword", index: true },
  amenities: { type: "keyword", index: true },
  status: { type: "keyword", index: true },
  status_: { type: "keyword" },
  description: { type: "text", index: true },
  images: { type: "keyword", index: false },
  isActive: { type: "boolean" },
  recordVersion: { type: "integer" },
  createdAt: { type: "date" },
  updatedAt: { type: "date" },
};

const updateElasticIndexMappings = async () => {
  try {
    ElasticIndexer.addMapping("room", roomMapping);
    await new ElasticIndexer("room").updateMapping(roomMapping);
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
