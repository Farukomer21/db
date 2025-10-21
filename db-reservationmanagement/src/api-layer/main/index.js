module.exports = {
  // main Database Crud Object Routes Manager Layer Classes
  // Reservation Db Object
  CreateReservationManager: require("./reservation/create-reservation-api"),
  UpdateReservationManager: require("./reservation/update-reservation-api"),
  GetReservationManager: require("./reservation/get-reservation-api"),
  DeleteReservationManager: require("./reservation/delete-reservation-api"),
  ListReservationsManager: require("./reservation/list-reservations-api"),
  CreateReservationGuestManager: require("./reservation/create-reservationguest-api"),
  ConfirmReservationPaymentManager: require("./reservation/confirm-reservationpayment-api"),
  GetReservationByCodeManager: require("./reservation/get-reservationbycode-api"),
  UpdateReservationByCodeManager: require("./reservation/update-reservationbycode-api"),
  CancelReservationByCodeManager: require("./reservation/cancel-reservationbycode-api"),
};
