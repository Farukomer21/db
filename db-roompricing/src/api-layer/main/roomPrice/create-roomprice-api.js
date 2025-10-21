const RoomPriceManager = require("./RoomPriceManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { getRedisData } = require("common");
const { RoompriceCreatedPublisher } = require("../../api-events/publishers");

const getIntegrationClient = require("../../integrations");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { dbScriptCreateRoomprice } = require("dbLayer");

class CreateRoomPriceManager extends RoomPriceManager {
  constructor(request, controllerType) {
    super(request, {
      name: "createRoomPrice",
      controllerType: controllerType,
      pagination: false,
      crudType: "create",
      loginRequired: true,
    });

    this.dataName = "roomPrice";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.roomPriceId = this.roomPriceId;
    jsonObj.roomId = this.roomId;
    jsonObj.startDate = this.startDate;
    jsonObj.endDate = this.endDate;
    jsonObj.price = this.price;
    jsonObj.priceType = this.priceType;
    jsonObj.description = this.description;
  }

  async checkBasicAuth() {
    if (this.checkAbsolute()) return true;
  }

  readRestParameters(request) {
    this.roomPriceId = request.body?.roomPriceId;
    this.roomId = request.body?.roomId;
    this.startDate = request.body?.startDate;
    this.endDate = request.body?.endDate;
    this.price = request.body?.price;
    this.priceType = request.body?.priceType;
    this.description = request.body?.description;
    this.id = request.body?.id ?? request.query?.id ?? request.id;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.roomPriceId = request.mcpParams.roomPriceId;
    this.roomId = request.mcpParams.roomId;
    this.startDate = request.mcpParams.startDate;
    this.endDate = request.mcpParams.endDate;
    this.price = request.mcpParams.price;
    this.priceType = request.mcpParams.priceType;
    this.description = request.mcpParams.description;
    this.id = request.mcpParams?.id;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  // data clause methods

  async buildDataClause() {
    const { newUUID } = require("common");

    const { hashString } = require("common");

    if (this.id) this.roomPriceId = this.id;
    if (!this.roomPriceId) this.roomPriceId = newUUID(false);

    const dataClause = {
      id: this.roomPriceId,
      roomId: this.roomId,
      startDate: this.startDate,
      endDate: this.endDate,
      price: this.price,
      priceType: this.priceType,
      description: this.description,
      isActive: true,
    };

    return dataClause;
  }

  checkParameterType_roomPriceId(paramValue) {
    if (!isValidUUID(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_roomPriceId() {
    if (this.roomPriceId == null) return;

    if (Array.isArray(this.roomPriceId)) {
      throw new BadRequestError("errMsg_roomPriceIdMustNotBeAnArray");
    }

    // Parameter Type: ID

    if (!this.checkParameterType_roomPriceId(this.roomPriceId)) {
      throw new BadRequestError("errMsg_roomPriceIdTypeIsNotValid");
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

  checkParameterType_startDate(paramValue) {
    const isDate = (timestamp) => new Date(timestamp).getTime() > 0;
    if (!isDate(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_startDate() {
    if (this.startDate == null) {
      throw new BadRequestError("errMsg_startDateisRequired");
    }

    if (Array.isArray(this.startDate)) {
      throw new BadRequestError("errMsg_startDateMustNotBeAnArray");
    }

    // Parameter Type: Date

    if (!this.checkParameterType_startDate(this.startDate)) {
      throw new BadRequestError("errMsg_startDateTypeIsNotValid");
    }
  }

  checkParameterType_endDate(paramValue) {
    const isDate = (timestamp) => new Date(timestamp).getTime() > 0;
    if (!isDate(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_endDate() {
    if (this.endDate == null) return;

    if (Array.isArray(this.endDate)) {
      throw new BadRequestError("errMsg_endDateMustNotBeAnArray");
    }

    // Parameter Type: Date

    if (!this.checkParameterType_endDate(this.endDate)) {
      throw new BadRequestError("errMsg_endDateTypeIsNotValid");
    }
  }

  checkParameterType_price(paramValue) {
    if (isNaN(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_price() {
    if (this.price == null) {
      throw new BadRequestError("errMsg_priceisRequired");
    }

    if (Array.isArray(this.price)) {
      throw new BadRequestError("errMsg_priceMustNotBeAnArray");
    }

    // Parameter Type: Double

    if (!this.checkParameterType_price(this.price)) {
      throw new BadRequestError("errMsg_priceTypeIsNotValid");
    }
  }

  checkParameterType_priceType(paramValue) {
    function isInt(value) {
      return (
        !isNaN(value) &&
        parseInt(Number(value)) == value &&
        !isNaN(parseInt(value, 10))
      );
    }

    const enumOptions = ["standard", "promotional", "seasonal"];
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

  checkParameter_priceType() {
    if (this.priceType == null) {
      throw new BadRequestError("errMsg_priceTypeisRequired");
    }

    if (Array.isArray(this.priceType)) {
      throw new BadRequestError("errMsg_priceTypeMustNotBeAnArray");
    }

    // Parameter Type: Enum

    const enumResult = this.checkParameterType_priceType(this.priceType);
    if (enumResult === false) {
      throw new BadRequestError("errMsg_priceTypeTypeIsNotValid");
    } else if (enumResult !== true) {
      this.priceType = enumResult;
    }
  }

  checkParameter_description() {
    if (this.description == null) return;

    if (Array.isArray(this.description)) {
      throw new BadRequestError("errMsg_descriptionMustNotBeAnArray");
    }

    // Parameter Type: String
  }

  checkParameters() {
    if (this.roomPriceId) this.checkParameter_roomPriceId();

    if (this.roomId) this.checkParameter_roomId();

    if (this.startDate) this.checkParameter_startDate();

    if (this.endDate) this.checkParameter_endDate();

    if (this.price) this.checkParameter_price();

    if (this.priceType) this.checkParameter_priceType();

    if (this.description) this.checkParameter_description();
  }

  async doBusiness() {
    const roomprice = await dbScriptCreateRoomprice(this);
    return roomprice;
  }

  async addToOutput() {}

  async raiseEvent() {
    RoompriceCreatedPublisher.Publish(this.output, this.session).catch(
      (err) => {
        console.log("Publisher Error in Rest Controller:", err);
        //**errorLog
      },
    );
  }

  // Work Flow

  // Action Store
}

module.exports = CreateRoomPriceManager;
