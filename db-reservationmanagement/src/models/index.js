const { DataTypes } = require("sequelize");
const { getEnumValue } = require("serviceCommon");
const { ElasticIndexer } = require("serviceCommon");
const updateElasticIndexMappings = require("./elastic-index");
const { hexaLogger } = require("common");

const Reservation = require("./reservation");

Reservation.prototype.getData = function () {
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
  const statusOptions = ["pending", "confirmed", "canceled", "completed"];
  const dataTypestatusReservation = typeof data.status;
  const enumIndexstatusReservation =
    dataTypestatusReservation === "string"
      ? statusOptions.indexOf(data.status)
      : data.status;
  data.status_idx = enumIndexstatusReservation;
  data.status =
    enumIndexstatusReservation > -1
      ? statusOptions[enumIndexstatusReservation]
      : null;

  data._iPublic = true;

  return data;
};

module.exports = {
  Reservation,
  updateElasticIndexMappings,
};
