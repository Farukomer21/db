const { HttpServerError, BadRequestError } = require("common");

const { PackageReservation } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getPackageReservationListByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const packageReservation = await PackageReservation.findAll({
      where: { ...query, isActive: true },
    });

    //should i add not found error or only return empty array?
    if (!packageReservation || packageReservation.length === 0) return [];

    //      if (!packageReservation || packageReservation.length === 0) {
    //      throw new NotFoundError(
    //      `PackageReservation with the specified criteria not found`
    //  );
    //}

    return packageReservation.map((item) => item.getData());
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingPackageReservationListByQuery",
      err,
    );
  }
};

module.exports = getPackageReservationListByQuery;
