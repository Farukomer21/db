const { HttpServerError } = require("common");

let { PackageReservation } = require("models");
const { hexaLogger } = require("common");
const { Op } = require("sequelize");

const getPackageReservationById = async (packageReservationId) => {
  try {
    const packageReservation = Array.isArray(packageReservationId)
      ? await PackageReservation.findAll({
          where: {
            id: { [Op.in]: packageReservationId },
            isActive: true,
          },
        })
      : await PackageReservation.findOne({
          where: {
            id: packageReservationId,
            isActive: true,
          },
        });

    if (!packageReservation) {
      return null;
    }
    return Array.isArray(packageReservationId)
      ? packageReservation.map((item) => item.getData())
      : packageReservation.getData();
  } catch (err) {
    console.log(err);
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingPackageReservationById",
      err,
    );
  }
};

module.exports = getPackageReservationById;
