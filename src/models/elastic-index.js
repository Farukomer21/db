const { ElasticIndexer } = require("serviceCommon");
const { hexaLogger } = require("common");

const package_Mapping = {
  id: { type: "keyword" },
  _owner: { type: "keyword" },
  name: { type: "keyword", index: true },
  description: { type: "keyword", index: true },
  price: { type: "double", index: false },
  duration: { type: "keyword", index: false },
  conditions: { type: "keyword", index: false },
  isActive: { type: "boolean" },
  recordVersion: { type: "integer" },
  createdAt: { type: "date" },
  updatedAt: { type: "date" },
};

const updateElasticIndexMappings = async () => {
  try {
    ElasticIndexer.addMapping("package_", package_Mapping);
    await new ElasticIndexer("package_").updateMapping(package_Mapping);
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
