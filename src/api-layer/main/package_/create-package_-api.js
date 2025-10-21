const Package_Manager = require("./Package_Manager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { getRedisData } = require("common");
const { Package_CreatedPublisher } = require("../../api-events/publishers");

const getIntegrationClient = require("../../integrations");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { dbScriptCreatePackage_ } = require("dbLayer");

class CreatePackageManager extends Package_Manager {
  constructor(request, controllerType) {
    super(request, {
      name: "createPackage",
      controllerType: controllerType,
      pagination: false,
      crudType: "create",
      loginRequired: true,
    });

    this.dataName = "package_";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.package_Id = this.package_Id;
    jsonObj.name = this.name;
    jsonObj.description = this.description;
    jsonObj.price = this.price;
    jsonObj.duration = this.duration;
    jsonObj.conditions = this.conditions;
  }

  async checkBasicAuth() {
    if (this.checkAbsolute()) return true;
  }

  readRestParameters(request) {
    this.package_Id = request.body?.package_Id;
    this.name = request.body?.name;
    this.description = request.body?.description;
    this.price = request.body?.price;
    this.duration = request.body?.duration;
    this.conditions = request.body?.conditions;
    this.id = request.body?.id ?? request.query?.id ?? request.id;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.package_Id = request.mcpParams.package_Id;
    this.name = request.mcpParams.name;
    this.description = request.mcpParams.description;
    this.price = request.mcpParams.price;
    this.duration = request.mcpParams.duration;
    this.conditions = request.mcpParams.conditions;
    this.id = request.mcpParams?.id;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  // data clause methods

  async buildDataClause() {
    const { newUUID } = require("common");

    const { hashString } = require("common");

    if (this.id) this.package_Id = this.id;
    if (!this.package_Id) this.package_Id = newUUID(false);

    const dataClause = {
      id: this.package_Id,
      name: this.name,
      description: this.description,
      price: this.price,
      duration: this.duration,
      conditions: this.conditions,
      isActive: true,
    };

    return dataClause;
  }

  checkParameterType_package_Id(paramValue) {
    if (!isValidUUID(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_package_Id() {
    if (this.package_Id == null) return;

    if (Array.isArray(this.package_Id)) {
      throw new BadRequestError("errMsg_package_IdMustNotBeAnArray");
    }

    // Parameter Type: ID

    if (!this.checkParameterType_package_Id(this.package_Id)) {
      throw new BadRequestError("errMsg_package_IdTypeIsNotValid");
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

  checkParameter_description() {
    if (this.description == null) {
      throw new BadRequestError("errMsg_descriptionisRequired");
    }

    if (Array.isArray(this.description)) {
      throw new BadRequestError("errMsg_descriptionMustNotBeAnArray");
    }

    // Parameter Type: String
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

  checkParameter_duration() {
    if (this.duration == null) return;

    if (Array.isArray(this.duration)) {
      throw new BadRequestError("errMsg_durationMustNotBeAnArray");
    }

    // Parameter Type: String
  }

  checkParameter_conditions() {
    if (this.conditions == null) return;

    if (Array.isArray(this.conditions)) {
      throw new BadRequestError("errMsg_conditionsMustNotBeAnArray");
    }

    // Parameter Type: String
  }

  checkParameters() {
    if (this.package_Id) this.checkParameter_package_Id();

    if (this.name) this.checkParameter_name();

    if (this.description) this.checkParameter_description();

    if (this.price) this.checkParameter_price();

    if (this.duration) this.checkParameter_duration();

    if (this.conditions) this.checkParameter_conditions();
  }

  async doBusiness() {
    const package_ = await dbScriptCreatePackage_(this);
    return package_;
  }

  async addToOutput() {}

  async raiseEvent() {
    Package_CreatedPublisher.Publish(this.output, this.session).catch((err) => {
      console.log("Publisher Error in Rest Controller:", err);
      //**errorLog
    });
  }

  // Work Flow

  // Action Store
}

module.exports = CreatePackageManager;
