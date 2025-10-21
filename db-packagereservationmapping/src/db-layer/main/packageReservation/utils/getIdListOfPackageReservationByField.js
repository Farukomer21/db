const { HttpServerError, NotFoundError, BadRequestError } = require("common");

const { PackageReservation } = require("models");
const { Op } = require("sequelize");

const getIdListOfPackageReservationByField = async (
  fieldName,
  fieldValue,
  isArray,
) => {
  try {
    const options = {
      where: { isActive: true },
      attributes: ["id"],
    };
    if (fieldName) {
      options.where = isArray
        ? { [fieldName]: { [Op.contains]: [fieldValue] }, isActive: true }
        : { [fieldName]: fieldValue, isActive: true };
    }

    let packageReservationIdList = await PackageReservation.findAll(options);

    if (!packageReservationIdList) {
      throw new NotFoundError(
        `PackageReservation with the specified criteria not found`,
      );
    }

    packageReservationIdList = packageReservationIdList.map((item) => item.id);
    return packageReservationIdList;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingPackageReservationIdListByField",
      err,
    );
  }
};

module.exports = getIdListOfPackageReservationByField;
