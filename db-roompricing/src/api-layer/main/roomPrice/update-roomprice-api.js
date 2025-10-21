const RoomPriceManager = require("./RoomPriceManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { getRedisData } = require("common");
const { RoompriceUpdatedPublisher } = require("../../api-events/publishers");

const getIntegrationClient = require("../../integrations");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { dbScriptUpdateRoomprice } = require("dbLayer");

class UpdateRoomPriceManager extends RoomPriceManager {
  constructor(request, controllerType) {
    super(request, {
      name: "updateRoomPrice",
      controllerType: controllerType,
      pagination: false,
      crudType: "update",
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
    this.roomPriceId = request.params?.roomPriceId;
    this.roomId = request.body?.roomId;
    this.startDate = request.body?.startDate;
    this.endDate = request.body?.endDate;
    this.price = request.body?.price;
    this.priceType = request.body?.priceType;
    this.description = request.body?.description;
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
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  // where clause methods

  async getRouteQuery() {
    return { $and: [{ id: this.roomPriceId }, { isActive: true }] };

    // handle permission filter later
  }

  async buildWhereClause() {
    const { convertUserQueryToSequelizeQuery } = require("common");

    const routeQuery = await this.getRouteQuery();

    return convertUserQueryToSequelizeQuery(routeQuery);
  }

  // data clause methods

  async buildDataClause() {
    const { hashString } = require("common");

    const dataClause = {
      roomId: this.roomId,
      startDate: this.startDate,
      endDate: this.endDate,
      price: this.price,
      priceType: this.priceType,
      description: this.description,
    };

    let isEmpty = true;
    for (const key of Object.keys(dataClause)) {
      if (dataClause[key] !== undefined) {
        isEmpty = false;
        break;
      }
    }

    if (isEmpty) {
      throw new BadRequestError("errMsg_UpdateDataClauseCanNotBeEmpty");
    }

    return dataClause;
  }

  async fetchInstance() {
    const { getRoomPriceByQuery } = require("dbLayer");
    this.roomPrice = await getRoomPriceByQuery(this.whereClause);
    if (!this.roomPrice) {
      throw new NotFoundError("errMsg_RecordNotFound");
    }
    this._instance = this.roomPrice;
  }

  async checkInstance() {
    if (!this.roomPrice) {
      throw new NotFoundError("errMsg_RecordNotFound");
    }
  }

  checkParameterType_roomPriceId(paramValue) {
    if (!isValidUUID(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_roomPriceId() {
    if (this.roomPriceId == null) {
      throw new BadRequestError("errMsg_roomPriceIdisRequired");
    }

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
    if (this.roomId == null) return;

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
    if (this.startDate == null) return;

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
    if (this.price == null) return;

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
    if (this.priceType == null) return;

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

  setOwnership() {
    this.isOwner = false;
    if (!this.session || !this.session.userId) return;

    this.isOwner = this.roomPrice?._owner === this.session.userId;
  }

  async doBusiness() {
    const roomprice = await dbScriptUpdateRoomprice(this);
    return roomprice;
  }

  async addToOutput() {}

  async raiseEvent() {
    RoompriceUpdatedPublisher.Publish(this.output, this.session).catch(
      (err) => {
        console.log("Publisher Error in Rest Controller:", err);
        //**errorLog
      },
    );
  }

  // Work Flow

  // Action Store
}

module.exports = UpdateRoomPriceManager;
