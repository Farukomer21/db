module.exports = {
  // main Database Crud Object Routes Manager Layer Classes
  // Payment Db Object
  CreatePaymentManager: require("./payment/create-payment-api"),
  UpdatePaymentManager: require("./payment/update-payment-api"),
  DeletePaymentManager: require("./payment/delete-payment-api"),
  GetPaymentManager: require("./payment/get-payment-api"),
  ListPaymentsManager: require("./payment/list-payments-api"),
};
