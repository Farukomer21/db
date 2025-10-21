module.exports = {
  CreateReservationManager: require("./create-reservation-api"),
  UpdateReservationManager: require("./update-reservation-api"),
  GetReservationManager: require("./get-reservation-api"),
  DeleteReservationManager: require("./delete-reservation-api"),
  ListReservationsManager: require("./list-reservations-api"),
  CreateReservationGuestManager: require("./create-reservationguest-api"),
  ConfirmReservationPaymentManager: require("./confirm-reservationpayment-api"),
  GetReservationByCodeManager: require("./get-reservationbycode-api"),
  UpdateReservationByCodeManager: require("./update-reservationbycode-api"),
  CancelReservationByCodeManager: require("./cancel-reservationbycode-api"),
};
