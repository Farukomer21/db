const { DataTypes } = require("sequelize");
const { getEnumValue } = require("serviceCommon");
const { ElasticIndexer } = require("serviceCommon");
const updateElasticIndexMappings = require("./elastic-index");
const { hexaLogger } = require("common");

const Payment = require("./payment");

Payment.prototype.getData = function () {
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
  const paymentStatusOptions = ["pending", "successful", "failed", "refunded"];
  const dataTypepaymentStatusPayment = typeof data.paymentStatus;
  const enumIndexpaymentStatusPayment =
    dataTypepaymentStatusPayment === "string"
      ? paymentStatusOptions.indexOf(data.paymentStatus)
      : data.paymentStatus;
  data.paymentStatus_idx = enumIndexpaymentStatusPayment;
  data.paymentStatus =
    enumIndexpaymentStatusPayment > -1
      ? paymentStatusOptions[enumIndexpaymentStatusPayment]
      : null;
  // set enum Index and enum value
  const paymentMethodOptions = ["external_gateway", "cash", "card"];
  const dataTypepaymentMethodPayment = typeof data.paymentMethod;
  const enumIndexpaymentMethodPayment =
    dataTypepaymentMethodPayment === "string"
      ? paymentMethodOptions.indexOf(data.paymentMethod)
      : data.paymentMethod;
  data.paymentMethod_idx = enumIndexpaymentMethodPayment;
  data.paymentMethod =
    enumIndexpaymentMethodPayment > -1
      ? paymentMethodOptions[enumIndexpaymentMethodPayment]
      : null;

  data._iPublic = true;

  return data;
};

module.exports = {
  Payment,
  updateElasticIndexMappings,
};
