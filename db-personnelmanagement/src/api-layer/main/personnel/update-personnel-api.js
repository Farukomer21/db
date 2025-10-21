const PersonnelManager = require("./PersonnelManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { getRedisData } = require("common");
const { PersonnelUpdatedPublisher } = require("../../api-events/publishers");

const getIntegrationClient = require("../../integrations");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { dbScriptUpdatePersonnel } = require("dbLayer");

class UpdatePersonnelManager extends PersonnelManager {
  constructor(request, controllerType) {
    super(request, {
      name: "updatePersonnel",
      controllerType: controllerType,
      pagination: false,
      crudType: "update",
      loginRequired: true,
    });

    this.dataName = "personnel";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.personnelId = this.personnelId;
    jsonObj.name = this.name;
    jsonObj.jobTitle = this.jobTitle;
    jsonObj.department = this.department;
    jsonObj.startDate = this.startDate;
    jsonObj.endDate = this.endDate;
    jsonObj.contactInfo = this.contactInfo;
    jsonObj.notes = this.notes;
  }

  async checkBasicAuth() {
    if (this.checkAbsolute()) return true;
  }

  readRestParameters(request) {
    this.personnelId = request.params?.personnelId;
    this.name = request.body?.name;
    this.jobTitle = request.body?.jobTitle;
    this.department = request.body?.department;
    this.startDate = request.body?.startDate;
    this.endDate = request.body?.endDate;
    this.contactInfo = request.body?.contactInfo;
    this.notes = request.body?.notes;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.personnelId = request.mcpParams.personnelId;
    this.name = request.mcpParams.name;
    this.jobTitle = request.mcpParams.jobTitle;
    this.department = request.mcpParams.department;
    this.startDate = request.mcpParams.startDate;
    this.endDate = request.mcpParams.endDate;
    this.contactInfo = request.mcpParams.contactInfo;
    this.notes = request.mcpParams.notes;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  // where clause methods

  async getRouteQuery() {
    return { $and: [{ id: this.personnelId }, { isActive: true }] };

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
      name: this.name,
      jobTitle: this.jobTitle,
      department: this.department,
      startDate: this.startDate,
      endDate: this.endDate,
      contactInfo: this.contactInfo,
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
    const { getPersonnelByQuery } = require("dbLayer");
    this.personnel = await getPersonnelByQuery(this.whereClause);
    if (!this.personnel) {
      throw new NotFoundError("errMsg_RecordNotFound");
    }
    this._instance = this.personnel;
  }

  async checkInstance() {
    if (!this.personnel) {
      throw new NotFoundError("errMsg_RecordNotFound");
    }
  }

  checkParameterType_personnelId(paramValue) {
    if (!isValidUUID(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_personnelId() {
    if (this.personnelId == null) {
      throw new BadRequestError("errMsg_personnelIdisRequired");
    }

    if (Array.isArray(this.personnelId)) {
      throw new BadRequestError("errMsg_personnelIdMustNotBeAnArray");
    }

    // Parameter Type: ID

    if (!this.checkParameterType_personnelId(this.personnelId)) {
      throw new BadRequestError("errMsg_personnelIdTypeIsNotValid");
    }
  }

  checkParameter_name() {
    if (this.name == null) return;

    if (Array.isArray(this.name)) {
      throw new BadRequestError("errMsg_nameMustNotBeAnArray");
    }

    // Parameter Type: String
  }

  checkParameter_jobTitle() {
    if (this.jobTitle == null) return;

    if (Array.isArray(this.jobTitle)) {
      throw new BadRequestError("errMsg_jobTitleMustNotBeAnArray");
    }

    // Parameter Type: String
  }

  checkParameter_department() {
    if (this.department == null) return;

    if (Array.isArray(this.department)) {
      throw new BadRequestError("errMsg_departmentMustNotBeAnArray");
    }

    // Parameter Type: String
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

  checkParameter_contactInfo() {
    if (this.contactInfo == null) return;

    if (Array.isArray(this.contactInfo)) {
      throw new BadRequestError("errMsg_contactInfoMustNotBeAnArray");
    }

    // Parameter Type: String
  }

  checkParameter_notes() {
    if (this.notes == null) return;

    if (Array.isArray(this.notes)) {
      throw new BadRequestError("errMsg_notesMustNotBeAnArray");
    }

    // Parameter Type: String
  }

  checkParameters() {
    if (this.personnelId) this.checkParameter_personnelId();

    if (this.name) this.checkParameter_name();

    if (this.jobTitle) this.checkParameter_jobTitle();

    if (this.department) this.checkParameter_department();

    if (this.startDate) this.checkParameter_startDate();

    if (this.endDate) this.checkParameter_endDate();

    if (this.contactInfo) this.checkParameter_contactInfo();

    if (this.notes) this.checkParameter_notes();
  }

  setOwnership() {
    this.isOwner = false;
    if (!this.session || !this.session.userId) return;

    this.isOwner = this.personnel?._owner === this.session.userId;
  }

  async doBusiness() {
    const personnel = await dbScriptUpdatePersonnel(this);
    return personnel;
  }

  async addToOutput() {}

  async raiseEvent() {
    PersonnelUpdatedPublisher.Publish(this.output, this.session).catch(
      (err) => {
        console.log("Publisher Error in Rest Controller:", err);
        //**errorLog
      },
    );
  }

  // Work Flow

  // Action Store
}

module.exports = UpdatePersonnelManager;
