const RoomManager = require("./RoomManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { getRedisData } = require("common");
const { RoomCreatedPublisher } = require("../../api-events/publishers");

const getIntegrationClient = require("../../integrations");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { dbScriptCreateRoom } = require("dbLayer");

class CreateRoomManager extends RoomManager {
  constructor(request, controllerType) {
    super(request, {
      name: "createRoom",
      controllerType: controllerType,
      pagination: false,
      crudType: "create",
      loginRequired: true,
    });

    this.dataName = "room";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.roomId = this.roomId;
    jsonObj.roomNumber = this.roomNumber;
    jsonObj.floor = this.floor;
    jsonObj.type = this.type;
    jsonObj.capacity = this.capacity;
    jsonObj.bedType = this.bedType;
    jsonObj.amenities = this.amenities;
    jsonObj.status = this.status;
    jsonObj.description = this.description;
    jsonObj.images = this.images;
  }

  async checkBasicAuth() {
    if (this.checkAbsolute()) return true;
  }

  async transformParameters() {}

  // data clause methods

  async buildDataClause() {
    const { newUUID } = require("common");

    const { hashString } = require("common");

    if (this.id) this.roomId = this.id;
    if (!this.roomId) this.roomId = newUUID(false);

    const dataClause = {
      id: this.roomId,
      roomNumber: this.roomNumber,
      floor: this.floor,
      type: this.type,
      capacity: this.capacity,
      bedType: this.bedType,
      amenities: this.amenities,
      status: this.status,
      description: this.description,
      images: this.images,
      isActive: true,
    };

    return dataClause;
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

  checkParameter_roomNumber() {
    if (this.roomNumber == null) {
      throw new BadRequestError("errMsg_roomNumberisRequired");
    }

    if (Array.isArray(this.roomNumber)) {
      throw new BadRequestError("errMsg_roomNumberMustNotBeAnArray");
    }

    // Parameter Type: String
  }

  checkParameterType_floor(paramValue) {
    if (isNaN(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_floor() {
    if (this.floor == null) {
      throw new BadRequestError("errMsg_floorisRequired");
    }

    if (Array.isArray(this.floor)) {
      throw new BadRequestError("errMsg_floorMustNotBeAnArray");
    }

    // Parameter Type: Integer

    if (!this.checkParameterType_floor(this.floor)) {
      throw new BadRequestError("errMsg_floorTypeIsNotValid");
    }
  }

  checkParameterType_type(paramValue) {
    function isInt(value) {
      return (
        !isNaN(value) &&
        parseInt(Number(value)) == value &&
        !isNaN(parseInt(value, 10))
      );
    }

    const enumOptions = ["single", "double", "suite"];
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

  checkParameter_type() {
    if (this.type == null) {
      throw new BadRequestError("errMsg_typeisRequired");
    }

    if (Array.isArray(this.type)) {
      throw new BadRequestError("errMsg_typeMustNotBeAnArray");
    }

    // Parameter Type: Enum

    const enumResult = this.checkParameterType_type(this.type);
    if (enumResult === false) {
      throw new BadRequestError("errMsg_typeTypeIsNotValid");
    } else if (enumResult !== true) {
      this.type = enumResult;
    }
  }

  checkParameterType_capacity(paramValue) {
    if (isNaN(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_capacity() {
    if (this.capacity == null) {
      throw new BadRequestError("errMsg_capacityisRequired");
    }

    if (Array.isArray(this.capacity)) {
      throw new BadRequestError("errMsg_capacityMustNotBeAnArray");
    }

    // Parameter Type: Integer

    if (!this.checkParameterType_capacity(this.capacity)) {
      throw new BadRequestError("errMsg_capacityTypeIsNotValid");
    }
  }

  checkParameter_bedType() {
    if (this.bedType == null) {
      throw new BadRequestError("errMsg_bedTypeisRequired");
    }

    if (Array.isArray(this.bedType)) {
      throw new BadRequestError("errMsg_bedTypeMustNotBeAnArray");
    }

    // Parameter Type: String
  }

  checkParameter_amenities() {
    if (this.amenities == null) return;

    if (!Array.isArray(this.amenities)) {
      throw new BadRequestError("errMsg_amenitiesMustBeAnArray");
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

    const enumOptions = ["available", "occupied", "under_maintenance"];
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

  checkParameter_description() {
    if (this.description == null) return;

    if (Array.isArray(this.description)) {
      throw new BadRequestError("errMsg_descriptionMustNotBeAnArray");
    }

    // Parameter Type: Text
  }

  checkParameter_images() {
    if (this.images == null) return;

    if (!Array.isArray(this.images)) {
      throw new BadRequestError("errMsg_imagesMustBeAnArray");
    }

    // Parameter Type: String
  }

  checkParameters() {
    if (this.roomId) this.checkParameter_roomId();

    if (this.roomNumber) this.checkParameter_roomNumber();

    if (this.floor) this.checkParameter_floor();

    if (this.type) this.checkParameter_type();

    if (this.capacity) this.checkParameter_capacity();

    if (this.bedType) this.checkParameter_bedType();

    if (this.amenities) this.checkParameter_amenities();

    if (this.status) this.checkParameter_status();

    if (this.description) this.checkParameter_description();

    if (this.images) this.checkParameter_images();
  }

  async doBusiness() {
    const room = await dbScriptCreateRoom(this);
    return room;
  }

  async addToOutput() {}

  async raiseEvent() {
    RoomCreatedPublisher.Publish(this.output, this.session).catch((err) => {
      console.log("Publisher Error in Rest Controller:", err);
      //**errorLog
    });
  }

  // Work Flow

  // Action Store
}

module.exports = CreateRoomManager;
