const { ElasticIndexer } = require("serviceCommon");
const { hexaLogger } = require("common");

const guestMapping = {
  id: { type: "keyword" },
  _owner: { type: "keyword" },
  fullname: { type: "keyword", index: true },
  email: { type: "keyword", index: true },
  phoneNumber: { type: "keyword", index: true },
  address: { type: "text", index: true },
  notes: { type: "text", index: false },
  isActive: { type: "boolean" },
  recordVersion: { type: "integer" },
  createdAt: { type: "date" },
  updatedAt: { type: "date" },
};

const updateElasticIndexMappings = async () => {
  try {
    ElasticIndexer.addMapping("guest", guestMapping);
    await new ElasticIndexer("guest").updateMapping(guestMapping);
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
