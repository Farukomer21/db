const { GetSpecialRequestByCodeManager } = require("apiLayer");

const SpecialRequestManagementRestController = require("../../SpecialRequestManagementServiceRestController");

class GetSpecialRequestByCodeRestController extends SpecialRequestManagementRestController {
  constructor(req, res) {
    super("getSpecialRequestByCode", "getspecialrequestbycode", req, res);
    this.dataName = "specialRequest";
    this.crudType = "get";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new GetSpecialRequestByCodeManager(this._req, "rest");
  }
}

const getSpecialRequestByCode = async (req, res, next) => {
  const controller = new GetSpecialRequestByCodeRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = getSpecialRequestByCode;
