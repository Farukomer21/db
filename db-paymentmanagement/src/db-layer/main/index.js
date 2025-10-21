const paymentFunctions = require("./payment");

module.exports = {
  // main Database
  createPayment: paymentFunctions.createPayment,
  getIdListOfPaymentByField: paymentFunctions.getIdListOfPaymentByField,
  getPaymentById: paymentFunctions.getPaymentById,
  getPaymentAggById: paymentFunctions.getPaymentAggById,
  getPaymentListByQuery: paymentFunctions.getPaymentListByQuery,
  getPaymentStatsByQuery: paymentFunctions.getPaymentStatsByQuery,
  getPaymentByQuery: paymentFunctions.getPaymentByQuery,
  updatePaymentById: paymentFunctions.updatePaymentById,
  updatePaymentByIdList: paymentFunctions.updatePaymentByIdList,
  updatePaymentByQuery: paymentFunctions.updatePaymentByQuery,
  deletePaymentById: paymentFunctions.deletePaymentById,
  deletePaymentByQuery: paymentFunctions.deletePaymentByQuery,
  dbScriptCreatePayment: paymentFunctions.dbScriptCreatePayment,
  dbScriptUpdatePayment: paymentFunctions.dbScriptUpdatePayment,
  dbScriptDeletePayment: paymentFunctions.dbScriptDeletePayment,
  dbScriptGetPayment: paymentFunctions.dbScriptGetPayment,
  dbScriptListPayments: paymentFunctions.dbScriptListPayments,
};
