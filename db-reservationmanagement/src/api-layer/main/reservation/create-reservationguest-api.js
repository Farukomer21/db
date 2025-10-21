const ReservationManager = require("./ReservationManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { getRedisData } = require("common");
const {
  ReservationguestCreatedPublisher,
} = require("../../api-events/publishers");

const getIntegrationClient = require("../../integrations");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { dbScriptCreateReservationguest } = require("dbLayer");

class CreateReservationGuestManager extends ReservationManager {
  constructor(request, controllerType) {
    super(request, {
      name: "createReservationGuest",
      controllerType: controllerType,
      pagination: false,
      crudType: "create",
      loginRequired: true,
    });

    this.dataName = "reservation";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.reservationId = this.reservationId;
    jsonObj.guestId = this.guestId;
    jsonObj.roomId = this.roomId;
    jsonObj.checkInDate = this.checkInDate;
    jsonObj.checkOutDate = this.checkOutDate;
    jsonObj.reservationCode = this.reservationCode;
    jsonObj.packages = this.packages;
    jsonObj.specialRequests = this.specialRequests;
    jsonObj.paymentId = this.paymentId;
    jsonObj.status = this.status;
    jsonObj.numGuests = this.numGuests;
    jsonObj.totalPrice = this.totalPrice;
    jsonObj.notes = this.notes;
  }

  async checkBasicAuth() {
    if (this.checkAbsolute()) return true;
  }

  readRestParameters(request) {
    this.reservationId = request.body?.reservationId;
    this.guestId = request.body?.guestId;
    this.roomId = request.body?.roomId;
    this.checkInDate = request.body?.checkInDate;
    this.checkOutDate = request.body?.checkOutDate;
    this.reservationCode = request.body?.reservationCode;
    this.packages = request.body?.packages;
    this.specialRequests = request.body?.specialRequests;
    this.paymentId = request.body?.paymentId;
    this.status = request.body?.status;
    this.numGuests = request.body?.numGuests;
    this.totalPrice = request.body?.totalPrice;
    this.notes = request.body?.notes;
    this.id = request.body?.id ?? request.query?.id ?? request.id;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.reservationId = request.mcpParams.reservationId;
    this.guestId = request.mcpParams.guestId;
    this.roomId = request.mcpParams.roomId;
    this.checkInDate = request.mcpParams.checkInDate;
    this.checkOutDate = request.mcpParams.checkOutDate;
    this.reservationCode = request.mcpParams.reservationCode;
    this.packages = request.mcpParams.packages;
    this.specialRequests = request.mcpParams.specialRequests;
    this.paymentId = request.mcpParams.paymentId;
    this.status = request.mcpParams.status;
    this.numGuests = request.mcpParams.numGuests;
    this.totalPrice = request.mcpParams.totalPrice;
    this.notes = request.mcpParams.notes;
    this.id = request.mcpParams?.id;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  // data clause methods

  async buildDataClause() {
    const { newUUID } = require("common");

    const { hashString } = require("common");

    if (this.id) this.reservationId = this.id;
    if (!this.reservationId) this.reservationId = newUUID(false);

    const dataClause = {
      id: this.reservationId,
      guestId: this.guestId,
      roomId: this.roomId,
      checkInDate: this.checkInDate,
      checkOutDate: this.checkOutDate,
      reservationCode: this.reservationCode,
      packages: this.packages,
      specialRequests: this.specialRequests,
      paymentId: this.paymentId,
      status: this.status,
      numGuests: this.numGuests,
      totalPrice: this.totalPrice,
      notes: this.notes,
      isActive: true,
    };

    dataClause.reservationCode =
      this.status == "confirmed" || this.status == "completed"
        ? this.reservationCode || LIB.generateReservationCode(this)
        : null;
    this.reservationCode = dataClause.reservationCode;

    return dataClause;
  }

  checkParameterType_reservationId(paramValue) {
    if (!isValidUUID(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_reservationId() {
    if (this.reservationId == null) return;

    if (Array.isArray(this.reservationId)) {
      throw new BadRequestError("errMsg_reservationIdMustNotBeAnArray");
    }

    // Parameter Type: ID

    if (!this.checkParameterType_reservationId(this.reservationId)) {
      throw new BadRequestError("errMsg_reservationIdTypeIsNotValid");
    }
  }

  checkParameterType_guestId(paramValue) {
    if (!isValidUUID(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_guestId() {
    if (this.guestId == null) {
      throw new BadRequestError("errMsg_guestIdisRequired");
    }

    if (Array.isArray(this.guestId)) {
      throw new BadRequestError("errMsg_guestIdMustNotBeAnArray");
    }

    // Parameter Type: ID

    if (!this.checkParameterType_guestId(this.guestId)) {
      throw new BadRequestError("errMsg_guestIdTypeIsNotValid");
    }
  }

  checkParameterType_roomId(paramValue) {
    if (!isValidUUID(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_roomId() {
    if (this.roomId == null) {
      throw new BadRequestError("errMsg_roomIdisRequired");
    }

    if (Array.isArray(this.roomId)) {
      throw new BadRequestError("errMsg_roomIdMustNotBeAnArray");
    }

    // Parameter Type: ID

    if (!this.checkParameterType_roomId(this.roomId)) {
      throw new BadRequestError("errMsg_roomIdTypeIsNotValid");
    }
  }

  checkParameterType_checkInDate(paramValue) {
    const isDate = (timestamp) => new Date(timestamp).getTime() > 0;
    if (!isDate(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_checkInDate() {
    if (this.checkInDate == null) {
      throw new BadRequestError("errMsg_checkInDateisRequired");
    }

    if (Array.isArray(this.checkInDate)) {
      throw new BadRequestError("errMsg_checkInDateMustNotBeAnArray");
    }

    // Parameter Type: Date

    if (!this.checkParameterType_checkInDate(this.checkInDate)) {
      throw new BadRequestError("errMsg_checkInDateTypeIsNotValid");
    }
  }

  checkParameterType_checkOutDate(paramValue) {
    const isDate = (timestamp) => new Date(timestamp).getTime() > 0;
    if (!isDate(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_checkOutDate() {
    if (this.checkOutDate == null) {
      throw new BadRequestError("errMsg_checkOutDateisRequired");
    }

    if (Array.isArray(this.checkOutDate)) {
      throw new BadRequestError("errMsg_checkOutDateMustNotBeAnArray");
    }

    // Parameter Type: Date

    if (!this.checkParameterType_checkOutDate(this.checkOutDate)) {
      throw new BadRequestError("errMsg_checkOutDateTypeIsNotValid");
    }
  }

  checkParameterType_packages(paramValue) {
    if (!isValidUUID(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_packages() {
    if (this.packages == null) return;

    if (!Array.isArray(this.packages)) {
      throw new BadRequestError("errMsg_packagesMustBeAnArray");
    }

    // Parameter Type: ID

    this.packages.forEach((item) => {
      if (!this.checkParameterType_packages(item)) {
        throw new BadRequestError("errMsg_packagesArrayHasAnInvalidItem");
      }
    });
  }

  checkParameterType_specialRequests(paramValue) {
    if (!isValidUUID(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_specialRequests() {
    if (this.specialRequests == null) return;

    if (!Array.isArray(this.specialRequests)) {
      throw new BadRequestError("errMsg_specialRequestsMustBeAnArray");
    }

    // Parameter Type: ID

    this.specialRequests.forEach((item) => {
      if (!this.checkParameterType_specialRequests(item)) {
        throw new BadRequestError(
          "errMsg_specialRequestsArrayHasAnInvalidItem",
        );
      }
    });
  }

  checkParameterType_paymentId(paramValue) {
    if (!isValidUUID(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_paymentId() {
    if (this.paymentId == null) return;

    if (Array.isArray(this.paymentId)) {
      throw new BadRequestError("errMsg_paymentIdMustNotBeAnArray");
    }

    // Parameter Type: ID

    if (!this.checkParameterType_paymentId(this.paymentId)) {
      throw new BadRequestError("errMsg_paymentIdTypeIsNotValid");
    }
  }

  checkParameterType_status(paramValue) {
    function isInt(value) {
      return (
        !isNaN(value) &&
        parseInt(Number(value)) == value &&
        !isNaN(parseInt(value, 10))
      );
    }

    const enumOptions = ["pending", "confirmed", "canceled", "completed"];
    if (typeof paramValue !== "string") {
      if (isInt(paramValue)) {
        paramValue = Number(paramValue);
        if (paramValue >= 0 && paramValue <= enumOptions.length - 1) {
          paramValue = enumOptions[paramValue];
          return paramValue;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
    if (!enumOptions.includes(paramValue.toLowerCase())) {
      return false;
    }

    return true;
  }

  checkParameter_status() {
    if (this.status == null) {
      throw new BadRequestError("errMsg_statusisRequired");
    }

    if (Array.isArray(this.status)) {
      throw new BadRequestError("errMsg_statusMustNotBeAnArray");
    }

    // Parameter Type: Enum

    const enumResult = this.checkParameterType_status(this.status);
    if (enumResult === false) {
      throw new BadRequestError("errMsg_statusTypeIsNotValid");
    } else if (enumResult !== true) {
      this.status = enumResult;
    }
  }

  checkParameterType_numGuests(paramValue) {
    if (isNaN(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_numGuests() {
    if (this.numGuests == null) {
      throw new BadRequestError("errMsg_numGuestsisRequired");
    }

    if (Array.isArray(this.numGuests)) {
      throw new BadRequestError("errMsg_numGuestsMustNotBeAnArray");
    }

    // Parameter Type: Integer

    if (!this.checkParameterType_numGuests(this.numGuests)) {
      throw new BadRequestError("errMsg_numGuestsTypeIsNotValid");
    }
  }

  checkParameterType_totalPrice(paramValue) {
    if (isNaN(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_totalPrice() {
    if (this.totalPrice == null) {
      throw new BadRequestError("errMsg_totalPriceisRequired");
    }

    if (Array.isArray(this.totalPrice)) {
      throw new BadRequestError("errMsg_totalPriceMustNotBeAnArray");
    }

    // Parameter Type: Double

    if (!this.checkParameterType_totalPrice(this.totalPrice)) {
      throw new BadRequestError("errMsg_totalPriceTypeIsNotValid");
    }
  }

  checkParameter_notes() {
    if (this.notes == null) return;

    if (Array.isArray(this.notes)) {
      throw new BadRequestError("errMsg_notesMustNotBeAnArray");
    }

    // Parameter Type: Text
  }

  checkParameters() {
    if (this.reservationId) this.checkParameter_reservationId();

    if (this.guestId) this.checkParameter_guestId();

    if (this.roomId) this.checkParameter_roomId();

    if (this.checkInDate) this.checkParameter_checkInDate();

    if (this.checkOutDate) this.checkParameter_checkOutDate();

    if (this.packages) this.checkParameter_packages();

    if (this.specialRequests) this.checkParameter_specialRequests();

    if (this.paymentId) this.checkParameter_paymentId();

    if (this.status) this.checkParameter_status();

    if (this.numGuests) this.checkParameter_numGuests();

    if (this.totalPrice) this.checkParameter_totalPrice();

    if (this.notes) this.checkParameter_notes();
  }

  async doBusiness() {
    const reservationguest = await dbScriptCreateReservationguest(this);
    return reservationguest;
  }

  async addToOutput() {}

  async raiseEvent() {
    ReservationguestCreatedPublisher.Publish(this.output, this.session).catch(
      (err) => {
        console.log("Publisher Error in Rest Controller:", err);
        //**errorLog
      },
    );
  }

  // Work Flow

  // Action Store
}

module.exports = CreateReservationGuestManager;
