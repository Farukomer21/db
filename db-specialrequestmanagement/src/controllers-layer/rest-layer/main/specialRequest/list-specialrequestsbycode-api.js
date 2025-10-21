const { ListSpecialRequestsByCodeManager } = require("apiLayer");

const SpecialRequestManagementRestController = require("../../SpecialRequestManagementServiceRestController");

class ListSpecialRequestsByCodeRestController extends SpecialRequestManagementRestController {
  constructor(req, res) {
    super("listSpecialRequestsByCode", "listspecialrequestsbycode", req, res);
    this.dataName = "specialRequests";
    this.crudType = "list";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new ListSpecialRequestsByCodeManager(this._req, "rest");
  }
}

const listSpecialRequestsByCode = async (req, res, next) => {
  const controller = new ListSpecialRequestsByCodeRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = listSpecialRequestsByCode;
