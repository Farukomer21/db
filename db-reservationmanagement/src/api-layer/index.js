module.exports = {
  ReservationManagementServiceManager: require("./service-manager/ReservationManagementServiceManager"),
  // main Database Crud Object Routes Manager Layer Classes
  // Reservation Db Object
  CreateReservationManager: require("./main/reservation/create-reservation-api"),
  UpdateReservationManager: require("./main/reservation/update-reservation-api"),
  GetReservationManager: require("./main/reservation/get-reservation-api"),
  DeleteReservationManager: require("./main/reservation/delete-reservation-api"),
  ListReservationsManager: require("./main/reservation/list-reservations-api"),
  CreateReservationGuestManager: require("./main/reservation/create-reservationguest-api"),
  ConfirmReservationPaymentManager: require("./main/reservation/confirm-reservationpayment-api"),
  GetReservationByCodeManager: require("./main/reservation/get-reservationbycode-api"),
  UpdateReservationByCodeManager: require("./main/reservation/update-reservationbycode-api"),
  CancelReservationByCodeManager: require("./main/reservation/cancel-reservationbycode-api"),
  integrationRouter: require("./integrations/testRouter"),
};
