const utils = require("./utils");
const dbApiScripts = require("./dbApiScripts");

module.exports = {
  createPayment: utils.createPayment,
  getIdListOfPaymentByField: utils.getIdListOfPaymentByField,
  getPaymentById: utils.getPaymentById,
  getPaymentAggById: utils.getPaymentAggById,
  getPaymentListByQuery: utils.getPaymentListByQuery,
  getPaymentStatsByQuery: utils.getPaymentStatsByQuery,
  getPaymentByQuery: utils.getPaymentByQuery,
  updatePaymentById: utils.updatePaymentById,
  updatePaymentByIdList: utils.updatePaymentByIdList,
  updatePaymentByQuery: utils.updatePaymentByQuery,
  deletePaymentById: utils.deletePaymentById,
  deletePaymentByQuery: utils.deletePaymentByQuery,
  dbScriptCreatePayment: dbApiScripts.dbScriptCreatePayment,
  dbScriptUpdatePayment: dbApiScripts.dbScriptUpdatePayment,
  dbScriptDeletePayment: dbApiScripts.dbScriptDeletePayment,
  dbScriptGetPayment: dbApiScripts.dbScriptGetPayment,
  dbScriptListPayments: dbApiScripts.dbScriptListPayments,
};
