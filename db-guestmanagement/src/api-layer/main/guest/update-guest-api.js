const GuestManager = require("./GuestManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { getRedisData } = require("common");
const { GuestUpdatedPublisher } = require("../../api-events/publishers");

const getIntegrationClient = require("../../integrations");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { dbScriptUpdateGuest } = require("dbLayer");

class UpdateGuestManager extends GuestManager {
  constructor(request, controllerType) {
    super(request, {
      name: "updateGuest",
      controllerType: controllerType,
      pagination: false,
      crudType: "update",
      loginRequired: true,
    });

    this.dataName = "guest";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.guestId = this.guestId;
    jsonObj.fullname = this.fullname;
    jsonObj.email = this.email;
    jsonObj.phoneNumber = this.phoneNumber;
    jsonObj.address = this.address;
    jsonObj.notes = this.notes;
  }

  async checkBasicAuth() {
    if (this.checkAbsolute()) return true;
  }

  readRestParameters(request) {
    this.guestId = request.params?.guestId;
    this.fullname = request.body?.fullname;
    this.email = request.body?.email;
    this.phoneNumber = request.body?.phoneNumber;
    this.address = request.body?.address;
    this.notes = request.body?.notes;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.guestId = request.mcpParams.guestId;
    this.fullname = request.mcpParams.fullname;
    this.email = request.mcpParams.email;
    this.phoneNumber = request.mcpParams.phoneNumber;
    this.address = request.mcpParams.address;
    this.notes = request.mcpParams.notes;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  // where clause methods

  async getRouteQuery() {
    return { $and: [{ id: this.guestId }, { isActive: true }] };

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
      fullname: this.fullname,
      email: this.email,
      phoneNumber: this.phoneNumber,
      address: this.address,
      notes: this.notes,
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
    const { getGuestByQuery } = require("dbLayer");
    this.guest = await getGuestByQuery(this.whereClause);
    if (!this.guest) {
      throw new NotFoundError("errMsg_RecordNotFound");
    }
    this._instance = this.guest;
  }

  async checkInstance() {
    if (!this.guest) {
      throw new NotFoundError("errMsg_RecordNotFound");
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

  checkParameter_fullname() {
    if (this.fullname == null) return;

    if (Array.isArray(this.fullname)) {
      throw new BadRequestError("errMsg_fullnameMustNotBeAnArray");
    }

    // Parameter Type: String
  }

  checkParameter_email() {
    if (this.email == null) return;

    if (Array.isArray(this.email)) {
      throw new BadRequestError("errMsg_emailMustNotBeAnArray");
    }

    // Parameter Type: String
  }

  checkParameter_phoneNumber() {
    if (this.phoneNumber == null) return;

    if (Array.isArray(this.phoneNumber)) {
      throw new BadRequestError("errMsg_phoneNumberMustNotBeAnArray");
    }

    // Parameter Type: String
  }

  checkParameter_address() {
    if (this.address == null) return;

    if (Array.isArray(this.address)) {
      throw new BadRequestError("errMsg_addressMustNotBeAnArray");
    }

    // Parameter Type: Text
  }

  checkParameter_notes() {
    if (this.notes == null) return;

    if (Array.isArray(this.notes)) {
      throw new BadRequestError("errMsg_notesMustNotBeAnArray");
    }

    // Parameter Type: Text
  }

  checkParameters() {
    if (this.guestId) this.checkParameter_guestId();

    if (this.fullname) this.checkParameter_fullname();

    if (this.email) this.checkParameter_email();

    if (this.phoneNumber) this.checkParameter_phoneNumber();

    if (this.address) this.checkParameter_address();

    if (this.notes) this.checkParameter_notes();
  }

  setOwnership() {
    this.isOwner = false;
    if (!this.session || !this.session.userId) return;

    this.isOwner = this.guest?._owner === this.session.userId;
  }

  async doBusiness() {
    const guest = await dbScriptUpdateGuest(this);
    return guest;
  }

  async addToOutput() {}

  async raiseEvent() {
    GuestUpdatedPublisher.Publish(this.output, this.session).catch((err) => {
      console.log("Publisher Error in Rest Controller:", err);
      //**errorLog
    });
  }

  // Work Flow

  // Action Store
}

module.exports = UpdateGuestManager;
