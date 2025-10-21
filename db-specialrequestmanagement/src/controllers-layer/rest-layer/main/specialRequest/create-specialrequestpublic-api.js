const { CreateSpecialRequestPublicManager } = require("apiLayer");

const SpecialRequestManagementRestController = require("../../SpecialRequestManagementServiceRestController");

class CreateSpecialRequestPublicRestController extends SpecialRequestManagementRestController {
  constructor(req, res) {
    super("createSpecialRequestPublic", "createspecialrequestpublic", req, res);
    this.dataName = "specialRequest";
    this.crudType = "create";
    this.status = 201;
    this.httpMethod = "POST";
  }

  createApiManager() {
    return new CreateSpecialRequestPublicManager(this._req, "rest");
  }
}

const createSpecialRequestPublic = async (req, res, next) => {
  const controller = new CreateSpecialRequestPublicRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = createSpecialRequestPublic;
