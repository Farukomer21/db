const { DataTypes } = require("sequelize");
const { getEnumValue } = require("serviceCommon");
const { ElasticIndexer } = require("serviceCommon");
const updateElasticIndexMappings = require("./elastic-index");
const { hexaLogger } = require("common");

const RoomPrice = require("./roomPrice");

RoomPrice.prototype.getData = function () {
  const data = this.dataValues;

  for (const key of Object.keys(data)) {
    if (key.startsWith("json_")) {
      data[key] = JSON.parse(data[key]);
      const newKey = key.slice(5);
      data[newKey] = data[key];
      delete data[key];
    }
  }

  // set enum Index and enum value
  const priceTypeOptions = ["standard", "promotional", "seasonal"];
  const dataTypepriceTypeRoomPrice = typeof data.priceType;
  const enumIndexpriceTypeRoomPrice =
    dataTypepriceTypeRoomPrice === "string"
      ? priceTypeOptions.indexOf(data.priceType)
      : data.priceType;
  data.priceType_idx = enumIndexpriceTypeRoomPrice;
  data.priceType =
    enumIndexpriceTypeRoomPrice > -1
      ? priceTypeOptions[enumIndexpriceTypeRoomPrice]
      : null;

  data._iPublic = true;

  return data;
};

module.exports = {
  RoomPrice,
  updateElasticIndexMappings,
};
