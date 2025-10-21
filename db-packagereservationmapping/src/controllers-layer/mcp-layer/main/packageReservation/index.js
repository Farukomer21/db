module.exports = (headers) => {
  // PackageReservation Db Object Rest Api Router
  const packageReservationMcpRouter = [];

  // createPackageReservation controller
  packageReservationMcpRouter.push(
    require("./create-packagereservation-api")(headers),
  );
  // updatePackageReservation controller
  packageReservationMcpRouter.push(
    require("./update-packagereservation-api")(headers),
  );
  // deletePackageReservation controller
  packageReservationMcpRouter.push(
    require("./delete-packagereservation-api")(headers),
  );
  // getPackageReservation controller
  packageReservationMcpRouter.push(
    require("./get-packagereservation-api")(headers),
  );
  // listPackageReservations controller
  packageReservationMcpRouter.push(
    require("./list-packagereservations-api")(headers),
  );

  return packageReservationMcpRouter;
};
