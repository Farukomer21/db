const { HttpServerError, BadRequestError } = require("common");

const { PackageReservation } = require("models");
const { Op } = require("sequelize");

const updatePackageReservationByQuery = async (dataClause, query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }
    let rowsCount = null;
    let rows = null;

    const options = { where: { query, isActive: true }, returning: true };

    [rowsCount, rows] = await PackageReservation.update(dataClause, options);

    if (!rowsCount) return [];
    return rows.map((item) => item.getData());
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenUpdatingPackageReservationByQuery",
      err,
    );
  }
};

module.exports = updatePackageReservationByQuery;
