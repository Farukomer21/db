const express = require("express");

// PackageReservation Db Object Rest Api Router
const packageReservationRouter = express.Router();

// add PackageReservation controllers

// createPackageReservation controller
packageReservationRouter.post(
  "/v1/packagereservations",
  require("./create-packagereservation-api"),
);
// updatePackageReservation controller
packageReservationRouter.patch(
  "/v1/packagereservations/:packageReservationId",
  require("./update-packagereservation-api"),
);
// deletePackageReservation controller
packageReservationRouter.delete(
  "/v1/packagereservations/:packageReservationId",
  require("./delete-packagereservation-api"),
);
// getPackageReservation controller
packageReservationRouter.get(
  "/v1/packagereservations/:packageReservationId",
  require("./get-packagereservation-api"),
);
// listPackageReservations controller
packageReservationRouter.get(
  "/v1/packagereservations",
  require("./list-packagereservations-api"),
);

module.exports = packageReservationRouter;
