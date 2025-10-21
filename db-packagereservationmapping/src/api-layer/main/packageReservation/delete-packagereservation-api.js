const PackageReservationManager = require("./PackageReservationManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { getRedisData } = require("common");
const {
  PackagereservationDeletedPublisher,
} = require("../../api-events/publishers");

const getIntegrationClient = require("../../integrations");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { dbScriptDeletePackagereservation } = require("dbLayer");

class DeletePackageReservationManager extends PackageReservationManager {
  constructor(request, controllerType) {
    super(request, {
      name: "deletePackageReservation",
      controllerType: controllerType,
      pagination: false,
      crudType: "delete",
      loginRequired: true,
    });

    this.dataName = "packageReservation";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.packageReservationId = this.packageReservationId;
  }

  async checkBasicAuth() {
    if (this.checkAbsolute()) return true;
  }

  readRestParameters(request) {
    this.packageReservationId = request.params?.packageReservationId;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.packageReservationId = request.mcpParams.packageReservationId;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  // where clause methods

  async getRouteQuery() {
    return { $and: [{ id: this.packageReservationId }, { isActive: true }] };

    // handle permission filter later
  }

  async buildWhereClause() {
    const { convertUserQueryToSequelizeQuery } = require("common");

    const routeQuery = await this.getRouteQuery();

    return convertUserQueryToSequelizeQuery(routeQuery);
  }

  async fetchInstance() {
    const { getPackageReservationByQuery } = require("dbLayer");
    this.packageReservation = await getPackageReservationByQuery(
      this.whereClause,
    );
    if (!this.packageReservation) {
      throw new NotFoundError("errMsg_RecordNotFound");
    }
    this._instance = this.packageReservation;
  }

  async checkInstance() {
    if (!this.packageReservation) {
      throw new NotFoundError("errMsg_RecordNotFound");
    }
  }

  checkParameterType_packageReservationId(paramValue) {
    if (!isValidUUID(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_packageReservationId() {
    if (this.packageReservationId == null) {
      throw new BadRequestError("errMsg_packageReservationIdisRequired");
    }

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

  checkParameters() {
    if (this.packageReservationId) this.checkParameter_packageReservationId();
  }

  setOwnership() {
    this.isOwner = false;
    if (!this.session || !this.session.userId) return;

    this.isOwner = this.packageReservation?._owner === this.session.userId;
  }

  async doBusiness() {
    const packagereservation = await dbScriptDeletePackagereservation(this);
    return packagereservation;
  }

  async addToOutput() {}

  async raiseEvent() {
    PackagereservationDeletedPublisher.Publish(this.output, this.session).catch(
      (err) => {
        console.log("Publisher Error in Rest Controller:", err);
        //**errorLog
      },
    );
  }

  // Work Flow

  // Action Store
}

module.exports = DeletePackageReservationManager;
