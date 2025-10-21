const { HttpServerError } = require("common");

const { PackageReservation } = require("models");
const { Op } = require("sequelize");

const updatePackageReservationByIdList = async (idList, dataClause) => {
  try {
    let rowsCount = null;
    let rows = null;

    const options = {
      where: { id: { [Op.in]: idList }, isActive: true },
      returning: true,
    };

    [rowsCount, rows] = await PackageReservation.update(dataClause, options);
    const packageReservationIdList = rows.map((item) => item.id);
    return packageReservationIdList;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenUpdatingPackageReservationByIdList",
      err,
    );
  }
};

module.exports = updatePackageReservationByIdList;
