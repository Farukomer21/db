const express = require("express");

// Reservation Db Object Rest Api Router
const reservationRouter = express.Router();

// add Reservation controllers

// createReservation controller
reservationRouter.post("/v1/reservations", require("./create-reservation-api"));
// updateReservation controller
reservationRouter.patch(
  "/v1/reservations/:reservationId",
  require("./update-reservation-api"),
);
// getReservation controller
reservationRouter.get(
  "/v1/reservations/:reservationId",
  require("./get-reservation-api"),
);
// deleteReservation controller
reservationRouter.delete(
  "/v1/reservations/:reservationId",
  require("./delete-reservation-api"),
);
// listReservations controller
reservationRouter.get("/v1/reservations", require("./list-reservations-api"));
// createReservationGuest controller
reservationRouter.post(
  "/v1/reservationguest",
  require("./create-reservationguest-api"),
);
// confirmReservationPayment controller
reservationRouter.patch(
  "/v1/confirmreservationpayment/:reservationId",
  require("./confirm-reservationpayment-api"),
);
// getReservationByCode controller
reservationRouter.get(
  "/v1/reservationbycode/:reservationId",
  require("./get-reservationbycode-api"),
);
// updateReservationByCode controller
reservationRouter.patch(
  "/v1/reservationbycode/:reservationId",
  require("./update-reservationbycode-api"),
);
// cancelReservationByCode controller
reservationRouter.patch(
  "/v1/cancelreservationbycode/:reservationId",
  require("./cancel-reservationbycode-api"),
);

module.exports = reservationRouter;
