const { HttpServerError, BadRequestError } = require("common");

const { ElasticIndexer } = require("serviceCommon");

const { PackageReservation } = require("models");
const { hexaLogger, newUUID } = require("common");

const indexDataToElastic = async (data) => {
  const elasticIndexer = new ElasticIndexer("packageReservation");
  await elasticIndexer.indexData(data);
};

const validateData = (data) => {
  const requiredFields = ["reservationId", "packageId", "priceAtBooking"];

  requiredFields.forEach((field) => {
    if (data[field] === null || data[field] === undefined) {
      throw new BadRequestError(
        `Field "${field}" is required and cannot be null or undefined.`,
      );
    }
  });

  if (!data.id) {
    data.id = newUUID();
  }
};

const createPackageReservation = async (data) => {
  try {
    validateData(data);

    const current_packageReservation = data.id
      ? await PackageReservation.findByPk(data.id)
      : null;
    let newpackageReservation = null;

    if (current_packageReservation) {
      delete data.id;
      data.isActive = true;
      await current_packageReservation.update(data);
      newpackageReservation = current_packageReservation;
    }

    if (!newpackageReservation) {
      newpackageReservation = await PackageReservation.create(data);
    }

    const _data = newpackageReservation.getData();
    await indexDataToElastic(_data);
    return _data;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenCreatingPackageReservation",
      err,
    );
  }
};

module.exports = createPackageReservation;
