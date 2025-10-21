const { ElasticIndexer } = require("serviceCommon");
const { hexaLogger } = require("common");

const personnelMapping = {
  id: { type: "keyword" },
  _owner: { type: "keyword" },
  name: { type: "keyword", index: true },
  jobTitle: { type: "keyword", index: true },
  department: { type: "keyword", index: true },
  startDate: { type: "date", index: true },
  endDate: { type: "date", index: true },
  contactInfo: { type: "keyword", index: true },
  notes: { type: "keyword", index: true },
  isActive: { type: "boolean" },
  recordVersion: { type: "integer" },
  createdAt: { type: "date" },
  updatedAt: { type: "date" },
};

const updateElasticIndexMappings = async () => {
  try {
    ElasticIndexer.addMapping("personnel", personnelMapping);
    await new ElasticIndexer("personnel").updateMapping(personnelMapping);
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
