const PersonnelManager = require("./PersonnelManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { getRedisData } = require("common");
const { PersonnelCreatedPublisher } = require("../../api-events/publishers");

const getIntegrationClient = require("../../integrations");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { dbScriptCreatePersonnel } = require("dbLayer");

class CreatePersonnelManager extends PersonnelManager {
  constructor(request, controllerType) {
    super(request, {
      name: "createPersonnel",
      controllerType: controllerType,
      pagination: false,
      crudType: "create",
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
    this.personnelId = request.body?.personnelId;
    this.name = request.body?.name;
    this.jobTitle = request.body?.jobTitle;
    this.department = request.body?.department;
    this.startDate = request.body?.startDate;
    this.endDate = request.body?.endDate;
    this.contactInfo = request.body?.contactInfo;
    this.notes = request.body?.notes;
    this.id = request.body?.id ?? request.query?.id ?? request.id;
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
    this.id = request.mcpParams?.id;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  // data clause methods

  async buildDataClause() {
    const { newUUID } = require("common");

    const { hashString } = require("common");

    if (this.id) this.personnelId = this.id;
    if (!this.personnelId) this.personnelId = newUUID(false);

    const dataClause = {
      id: this.personnelId,
      name: this.name,
      jobTitle: this.jobTitle,
      department: this.department,
      startDate: this.startDate,
      endDate: this.endDate,
      contactInfo: this.contactInfo,
      notes: this.notes,
      isActive: true,
    };

    return dataClause;
  }

  checkParameterType_personnelId(paramValue) {
    if (!isValidUUID(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_personnelId() {
    if (this.personnelId == null) return;

    if (Array.isArray(this.personnelId)) {
      throw new BadRequestError("errMsg_personnelIdMustNotBeAnArray");
    }

    // Parameter Type: ID

    if (!this.checkParameterType_personnelId(this.personnelId)) {
      throw new BadRequestError("errMsg_personnelIdTypeIsNotValid");
    }
  }

  checkParameter_name() {
    if (this.name == null) {
      throw new BadRequestError("errMsg_nameisRequired");
    }

    if (Array.isArray(this.name)) {
      throw new BadRequestError("errMsg_nameMustNotBeAnArray");
    }

    // Parameter Type: String
  }

  checkParameter_jobTitle() {
    if (this.jobTitle == null) {
      throw new BadRequestError("errMsg_jobTitleisRequired");
    }

    if (Array.isArray(this.jobTitle)) {
      throw new BadRequestError("errMsg_jobTitleMustNotBeAnArray");
    }

    // Parameter Type: String
  }

  checkParameter_department() {
    if (this.department == null) {
      throw new BadRequestError("errMsg_departmentisRequired");
    }

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

  checkParameter_contactInfo() {
    if (this.contactInfo == null) {
      throw new BadRequestError("errMsg_contactInfoisRequired");
    }

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

  async doBusiness() {
    const personnel = await dbScriptCreatePersonnel(this);
    return personnel;
  }

  async addToOutput() {}

  async raiseEvent() {
    PersonnelCreatedPublisher.Publish(this.output, this.session).catch(
      (err) => {
        console.log("Publisher Error in Rest Controller:", err);
        //**errorLog
      },
    );
  }

  // Work Flow

  // Action Store
}

module.exports = CreatePersonnelManager;
