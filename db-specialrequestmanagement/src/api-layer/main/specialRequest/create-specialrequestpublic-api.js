const SpecialRequestManager = require("./SpecialRequestManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { getRedisData } = require("common");
const {
  SpecialrequestpublicCreatedPublisher,
} = require("../../api-events/publishers");

const getIntegrationClient = require("../../integrations");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { dbScriptCreateSpecialrequestpublic } = require("dbLayer");

class CreateSpecialRequestPublicManager extends SpecialRequestManager {
  constructor(request, controllerType) {
    super(request, {
      name: "createSpecialRequestPublic",
      controllerType: controllerType,
      pagination: false,
      crudType: "create",
      loginRequired: true,
    });

    this.dataName = "specialRequest";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.specialRequestId = this.specialRequestId;
    jsonObj.reservationId = this.reservationId;
    jsonObj.guestId = this.guestId;
    jsonObj.requestText = this.requestText;
    jsonObj.status = this.status;
    jsonObj.response = this.response;
  }

  async checkBasicAuth() {
    if (this.checkAbsolute()) return true;
  }

  readRestParameters(request) {
    this.specialRequestId = request.body?.specialRequestId;
    this.reservationId = request.body?.reservationId;
    this.guestId = request.body?.guestId;
    this.requestText = request.body?.requestText;
    this.status = request.body?.status;
    this.response = request.body?.response;
    this.id = request.body?.id ?? request.query?.id ?? request.id;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.specialRequestId = request.mcpParams.specialRequestId;
    this.reservationId = request.mcpParams.reservationId;
    this.guestId = request.mcpParams.guestId;
    this.requestText = request.mcpParams.requestText;
    this.status = request.mcpParams.status;
    this.response = request.mcpParams.response;
    this.id = request.mcpParams?.id;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  // data clause methods

  async buildDataClause() {
    const { newUUID } = require("common");

    const { hashString } = require("common");

    if (this.id) this.specialRequestId = this.id;
    if (!this.specialRequestId) this.specialRequestId = newUUID(false);

    const dataClause = {
      id: this.specialRequestId,
      reservationId: this.reservationId,
      guestId: this.guestId,
      requestText: this.requestText,
      status: this.status,
      response: this.response,
      isActive: true,
    };

    return dataClause;
  }

  checkParameterType_specialRequestId(paramValue) {
    if (!isValidUUID(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_specialRequestId() {
    if (this.specialRequestId == null) return;

    if (Array.isArray(this.specialRequestId)) {
      throw new BadRequestError("errMsg_specialRequestIdMustNotBeAnArray");
    }

    // Parameter Type: ID

    if (!this.checkParameterType_specialRequestId(this.specialRequestId)) {
      throw new BadRequestError("errMsg_specialRequestIdTypeIsNotValid");
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

  checkParameter_requestText() {
    if (this.requestText == null) {
      throw new BadRequestError("errMsg_requestTextisRequired");
    }

    if (Array.isArray(this.requestText)) {
      throw new BadRequestError("errMsg_requestTextMustNotBeAnArray");
    }

    // Parameter Type: String
  }

  checkParameterType_status(paramValue) {
    function isInt(value) {
      return (
        !isNaN(value) &&
        parseInt(Number(value)) == value &&
        !isNaN(parseInt(value, 10))
      );
    }

    const enumOptions = ["pending", "fulfilled", "canceled"];
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

  checkParameter_response() {
    if (this.response == null) return;

    if (Array.isArray(this.response)) {
      throw new BadRequestError("errMsg_responseMustNotBeAnArray");
    }

    // Parameter Type: String
  }

  checkParameters() {
    if (this.specialRequestId) this.checkParameter_specialRequestId();

    if (this.reservationId) this.checkParameter_reservationId();

    if (this.guestId) this.checkParameter_guestId();

    if (this.requestText) this.checkParameter_requestText();

    if (this.status) this.checkParameter_status();

    if (this.response) this.checkParameter_response();
  }

  async doBusiness() {
    const specialrequestpublic = await dbScriptCreateSpecialrequestpublic(this);
    return specialrequestpublic;
  }

  async addToOutput() {}

  async raiseEvent() {
    SpecialrequestpublicCreatedPublisher.Publish(
      this.output,
      this.session,
    ).catch((err) => {
      console.log("Publisher Error in Rest Controller:", err);
      //**errorLog
    });
  }

  // Work Flow

  // Action Store
}

module.exports = CreateSpecialRequestPublicManager;
