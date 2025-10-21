const { HttpServerError, BadRequestError } = require("common");

const { PackageReservation } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getPackageReservationByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const packageReservation = await PackageReservation.findOne({
      where: query,
    });

    if (!packageReservation) return null;
    return packageReservation.getData();
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingPackageReservationByQuery",
      err,
    );
  }
};

module.exports = getPackageReservationByQuery;
