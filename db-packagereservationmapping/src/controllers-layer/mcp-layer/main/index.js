module.exports = (headers) => {
  // main Database Crud Object Mcp Api Routers
  return {
    packageReservationMcpRouter: require("./packageReservation")(headers),
  };
};
