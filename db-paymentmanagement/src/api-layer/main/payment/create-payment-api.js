const PaymentManager = require("./PaymentManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { getRedisData } = require("common");
const { PaymentCreatedPublisher } = require("../../api-events/publishers");

const getIntegrationClient = require("../../integrations");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { dbScriptCreatePayment } = require("dbLayer");

class CreatePaymentManager extends PaymentManager {
  constructor(request, controllerType) {
    super(request, {
      name: "createPayment",
      controllerType: controllerType,
      pagination: false,
      crudType: "create",
      loginRequired: true,
    });

    this.dataName = "payment";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.paymentId = this.paymentId;
    jsonObj.reservationId = this.reservationId;
    jsonObj.amount = this.amount;
    jsonObj.paymentStatus = this.paymentStatus;
    jsonObj.paymentMethod = this.paymentMethod;
    jsonObj.gatewayReference = this.gatewayReference;
    jsonObj.processedAt = this.processedAt;
  }

  async checkBasicAuth() {
    if (this.checkAbsolute()) return true;
  }

  readRestParameters(request) {
    this.paymentId = request.body?.paymentId;
    this.reservationId = request.body?.reservationId;
    this.amount = request.body?.amount;
    this.paymentStatus = request.body?.paymentStatus;
    this.paymentMethod = request.body?.paymentMethod;
    this.gatewayReference = request.body?.gatewayReference;
    this.processedAt = request.body?.processedAt;
    this.id = request.body?.id ?? request.query?.id ?? request.id;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.paymentId = request.mcpParams.paymentId;
    this.reservationId = request.mcpParams.reservationId;
    this.amount = request.mcpParams.amount;
    this.paymentStatus = request.mcpParams.paymentStatus;
    this.paymentMethod = request.mcpParams.paymentMethod;
    this.gatewayReference = request.mcpParams.gatewayReference;
    this.processedAt = request.mcpParams.processedAt;
    this.id = request.mcpParams?.id;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  // data clause methods

  async buildDataClause() {
    const { newUUID } = require("common");

    const { hashString } = require("common");

    if (this.id) this.paymentId = this.id;
    if (!this.paymentId) this.paymentId = newUUID(false);

    const dataClause = {
      id: this.paymentId,
      reservationId: this.reservationId,
      amount: this.amount,
      paymentStatus: this.paymentStatus,
      paymentMethod: this.paymentMethod,
      gatewayReference: this.gatewayReference,
      processedAt: this.processedAt,
      isActive: true,
    };

    return dataClause;
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

  checkParameterType_amount(paramValue) {
    if (isNaN(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_amount() {
    if (this.amount == null) {
      throw new BadRequestError("errMsg_amountisRequired");
    }

    if (Array.isArray(this.amount)) {
      throw new BadRequestError("errMsg_amountMustNotBeAnArray");
    }

    // Parameter Type: Double

    if (!this.checkParameterType_amount(this.amount)) {
      throw new BadRequestError("errMsg_amountTypeIsNotValid");
    }
  }

  checkParameterType_paymentStatus(paramValue) {
    function isInt(value) {
      return (
        !isNaN(value) &&
        parseInt(Number(value)) == value &&
        !isNaN(parseInt(value, 10))
      );
    }

    const enumOptions = ["pending", "successful", "failed", "refunded"];
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

  checkParameter_paymentStatus() {
    if (this.paymentStatus == null) {
      throw new BadRequestError("errMsg_paymentStatusisRequired");
    }

    if (Array.isArray(this.paymentStatus)) {
      throw new BadRequestError("errMsg_paymentStatusMustNotBeAnArray");
    }

    // Parameter Type: Enum

    const enumResult = this.checkParameterType_paymentStatus(
      this.paymentStatus,
    );
    if (enumResult === false) {
      throw new BadRequestError("errMsg_paymentStatusTypeIsNotValid");
    } else if (enumResult !== true) {
      this.paymentStatus = enumResult;
    }
  }

  checkParameterType_paymentMethod(paramValue) {
    function isInt(value) {
      return (
        !isNaN(value) &&
        parseInt(Number(value)) == value &&
        !isNaN(parseInt(value, 10))
      );
    }

    const enumOptions = ["external_gateway", "cash", "card"];
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

  checkParameter_paymentMethod() {
    if (this.paymentMethod == null) {
      throw new BadRequestError("errMsg_paymentMethodisRequired");
    }

    if (Array.isArray(this.paymentMethod)) {
      throw new BadRequestError("errMsg_paymentMethodMustNotBeAnArray");
    }

    // Parameter Type: Enum

    const enumResult = this.checkParameterType_paymentMethod(
      this.paymentMethod,
    );
    if (enumResult === false) {
      throw new BadRequestError("errMsg_paymentMethodTypeIsNotValid");
    } else if (enumResult !== true) {
      this.paymentMethod = enumResult;
    }
  }

  checkParameter_gatewayReference() {
    if (this.gatewayReference == null) return;

    if (Array.isArray(this.gatewayReference)) {
      throw new BadRequestError("errMsg_gatewayReferenceMustNotBeAnArray");
    }

    // Parameter Type: String
  }

  checkParameterType_processedAt(paramValue) {
    const isDate = (timestamp) => new Date(timestamp).getTime() > 0;
    if (!isDate(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_processedAt() {
    if (this.processedAt == null) return;

    if (Array.isArray(this.processedAt)) {
      throw new BadRequestError("errMsg_processedAtMustNotBeAnArray");
    }

    // Parameter Type: Date

    if (!this.checkParameterType_processedAt(this.processedAt)) {
      throw new BadRequestError("errMsg_processedAtTypeIsNotValid");
    }
  }

  checkParameters() {
    if (this.paymentId) this.checkParameter_paymentId();

    if (this.reservationId) this.checkParameter_reservationId();

    if (this.amount) this.checkParameter_amount();

    if (this.paymentStatus) this.checkParameter_paymentStatus();

    if (this.paymentMethod) this.checkParameter_paymentMethod();

    if (this.gatewayReference) this.checkParameter_gatewayReference();

    if (this.processedAt) this.checkParameter_processedAt();
  }

  async doBusiness() {
    const payment = await dbScriptCreatePayment(this);
    return payment;
  }

  async addToOutput() {}

  async raiseEvent() {
    PaymentCreatedPublisher.Publish(this.output, this.session).catch((err) => {
      console.log("Publisher Error in Rest Controller:", err);
      //**errorLog
    });
  }

  // Work Flow

  // Action Store
}

module.exports = CreatePaymentManager;
