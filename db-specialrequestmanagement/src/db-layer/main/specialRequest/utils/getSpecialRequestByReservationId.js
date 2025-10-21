const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");
const { hexaLogger } = require("common");
const { SpecialRequest } = require("models");
const { Op } = require("sequelize");

const getSpecialRequestByReservationId = async (reservationId) => {
  try {
    const specialRequest = await SpecialRequest.findOne({
      where: {
        reservationId: reservationId,
        isActive: true,
      },
    });

    if (!specialRequest) {
      return null;
    }
    return specialRequest.getData();
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingSpecialRequestByReservationId",
      err,
    );
  }
};

module.exports = getSpecialRequestByReservationId;
