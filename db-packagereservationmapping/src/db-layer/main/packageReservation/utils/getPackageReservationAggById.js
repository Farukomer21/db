const { HttpServerError, NotFoundError } = require("common");
const { hexaLogger } = require("common");

const { PackageReservation } = require("models");
const { Op } = require("sequelize");

const getPackageReservationAggById = async (packageReservationId) => {
  try {
    const forWhereClause = false;
    const includes = [];

    const packageReservation = Array.isArray(packageReservationId)
      ? await PackageReservation.findAll({
          where: {
            id: { [Op.in]: packageReservationId },
            isActive: true,
          },
          include: includes,
        })
      : await PackageReservation.findOne({
          where: {
            id: packageReservationId,
            isActive: true,
          },
          include: includes,
        });

    if (!packageReservation) {
      return null;
    }

    const packageReservationData =
      Array.isArray(packageReservationId) && packageReservationId.length > 0
        ? packageReservation.map((item) => item.getData())
        : packageReservation.getData();
    await PackageReservation.getCqrsJoins(packageReservationData);
    return packageReservationData;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingPackageReservationAggById",
      err,
    );
  }
};

module.exports = getPackageReservationAggById;
