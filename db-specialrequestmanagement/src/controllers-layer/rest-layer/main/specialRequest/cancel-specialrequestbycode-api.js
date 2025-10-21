const { CancelSpecialRequestByCodeManager } = require("apiLayer");

const SpecialRequestManagementRestController = require("../../SpecialRequestManagementServiceRestController");

class CancelSpecialRequestByCodeRestController extends SpecialRequestManagementRestController {
  constructor(req, res) {
    super("cancelSpecialRequestByCode", "cancelspecialrequestbycode", req, res);
    this.dataName = "specialRequest";
    this.crudType = "update";
    this.status = 200;
    this.httpMethod = "PATCH";
  }

  createApiManager() {
    return new CancelSpecialRequestByCodeManager(this._req, "rest");
  }
}

const cancelSpecialRequestByCode = async (req, res, next) => {
  const controller = new CancelSpecialRequestByCodeRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = cancelSpecialRequestByCode;
