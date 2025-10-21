const startBaseListeners = require("./base");
const reservationConfirmedListeners = require("./reservationConfirmed.listener");
const reservationCancelledListeners = require("./reservationCancelled.listener");
const specialRequestStatusChangedListeners = require("./specialRequestStatusChanged.listener");
const specialRequestCreatedForStaffListeners = require("./specialRequestCreatedForStaff.listener");
const incomingFeedbackForStaffListeners = require("./incomingFeedbackForStaff.listener");
const reservationUpdatedListeners = require("./reservationUpdated.listener");
const paymentFailedListeners = require("./paymentFailed.listener");
const userVerificationListeners = require("./userVerification.listener");
const userResetPasswordListeners = require("./userResetPassword.listener");

const startListener = async () => {
  try {
    await startBaseListeners();
    await reservationConfirmedListeners();
    await reservationCancelledListeners();
    await specialRequestStatusChangedListeners();
    await specialRequestCreatedForStaffListeners();
    await incomingFeedbackForStaffListeners();
    await reservationUpdatedListeners();
    await paymentFailedListeners();
    await userVerificationListeners();
    await userResetPasswordListeners();
  } catch (error) {
    //**errorLog
  }
};

module.exports = startListener;
