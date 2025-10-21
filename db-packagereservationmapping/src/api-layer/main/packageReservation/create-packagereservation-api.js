const PackageReservationManager = require("./PackageReservationManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { getRedisData } = require("common");
const {
  PackagereservationCreatedPublisher,
} = require("../../api-events/publishers");

const getIntegrationClient = require("../../integrations");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { dbScriptCreatePackagereservation } = require("dbLayer");

class CreatePackageReservationManager extends PackageReservationManager {
  constructor(request, controllerType) {
    super(request, {
      name: "createPackageReservation",
      controllerType: controllerType,
      pagination: false,
      crudType: "create",
      loginRequired: true,
    });

    this.dataName = "packageReservation";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.packageReservationId = this.packageReservationId;
    jsonObj.reservationId = this.reservationId;
    jsonObj.packageId = this.packageId;
    jsonObj.priceAtBooking = this.priceAtBooking;
    jsonObj.notes = this.notes;
  }

  async checkBasicAuth() {
    if (this.checkAbsolute()) return true;
  }

  readRestParameters(request) {
    this.packageReservationId = request.body?.packageReservationId;
    this.reservationId = request.body?.reservationId;
    this.packageId = request.body?.packageId;
    this.priceAtBooking = request.body?.priceAtBooking;
    this.notes = request.body?.notes;
    this.id = request.body?.id ?? request.query?.id ?? request.id;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.packageReservationId = request.mcpParams.packageReservationId;
    this.reservationId = request.mcpParams.reservationId;
    this.packageId = request.mcpParams.packageId;
    this.priceAtBooking = request.mcpParams.priceAtBooking;
    this.notes = request.mcpParams.notes;
    this.id = request.mcpParams?.id;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  // data clause methods

  async buildDataClause() {
    const { newUUID } = require("common");

    const { hashString } = require("common");

    if (this.id) this.packageReservationId = this.id;
    if (!this.packageReservationId) this.packageReservationId = newUUID(false);

    const dataClause = {
      id: this.packageReservationId,
      reservationId: this.reservationId,
      packageId: this.packageId,
      priceAtBooking: this.priceAtBooking,
      notes: this.notes,
      isActive: true,
    };

    return dataClause;
  }

  checkParameterType_packageReservationId(paramValue) {
    if (!isValidUUID(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_packageReservationId() {
    if (this.packageReservationId == null) return;

    if (Array.isArray(this.packageReservationId)) {
      throw new BadRequestError("errMsg_packageReservationIdMustNotBeAnArray");
    }

    // Parameter Type: ID

    if (
      !this.checkParameterType_packageReservationId(this.packageReservationId)
    ) {
      throw new BadRequestError("errMsg_packageReservationIdTypeIsNotValid");
    }
  }

  checkParameterType_reservationId(paramValue) {
    if (!isValidUUID(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_reservationId() {
    if (this.reservationId == null) {
      throw new BadRequestError("errMsg_reservationIdisRequired");
    }

    if (Array.isArray(this.reservationId)) {
      throw new BadRequestError("errMsg_reservationIdMustNotBeAnArray");
    }

    // Parameter Type: ID

    if (!this.checkParameterType_reservationId(this.reservationId)) {
      throw new BadRequestError("errMsg_reservationIdTypeIsNotValid");
    }
  }

  checkParameterType_packageId(paramValue) {
    if (!isValidUUID(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_packageId() {
    if (this.packageId == null) {
      throw new BadRequestError("errMsg_packageIdisRequired");
    }

    if (Array.isArray(this.packageId)) {
      throw new BadRequestError("errMsg_packageIdMustNotBeAnArray");
    }

    // Parameter Type: ID

    if (!this.checkParameterType_packageId(this.packageId)) {
      throw new BadRequestError("errMsg_packageIdTypeIsNotValid");
    }
  }

  checkParameterType_priceAtBooking(paramValue) {
    if (isNaN(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_priceAtBooking() {
    if (this.priceAtBooking == null) {
      throw new BadRequestError("errMsg_priceAtBookingisRequired");
    }

    if (Array.isArray(this.priceAtBooking)) {
      throw new BadRequestError("errMsg_priceAtBookingMustNotBeAnArray");
    }

    // Parameter Type: Double

    if (!this.checkParameterType_priceAtBooking(this.priceAtBooking)) {
      throw new BadRequestError("errMsg_priceAtBookingTypeIsNotValid");
    }
  }

  checkParameter_notes() {
    if (this.notes == null) return;

    if (Array.isArray(this.notes)) {
      throw new BadRequestError("errMsg_notesMustNotBeAnArray");
    }

    // Parameter Type: String
  }

  checkParameters() {
    if (this.packageReservationId) this.checkParameter_packageReservationId();

    if (this.reservationId) this.checkParameter_reservationId();

    if (this.packageId) this.checkParameter_packageId();

    if (this.priceAtBooking) this.checkParameter_priceAtBooking();

    if (this.notes) this.checkParameter_notes();
  }

  async doBusiness() {
    const packagereservation = await dbScriptCreatePackagereservation(this);
    return packagereservation;
  }

  async addToOutput() {}

  async raiseEvent() {
    PackagereservationCreatedPublisher.Publish(this.output, this.session).catch(
      (err) => {
        console.log("Publisher Error in Rest Controller:", err);
        //**errorLog
      },
    );
  }

  // Work Flow

  // Action Store
}

module.exports = CreatePackageReservationManager;
