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

const getSpecialRequestByGuestId = async (guestId) => {
  try {
    const specialRequest = await SpecialRequest.findOne({
      where: {
        guestId: guestId,
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
      "errMsg_dbErrorWhenRequestingSpecialRequestByGuestId",
      err,
    );
  }
};

module.exports = getSpecialRequestByGuestId;
