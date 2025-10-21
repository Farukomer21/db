const { ListPersonnelsManager } = require("apiLayer");

const PersonnelManagementRestController = require("../../PersonnelManagementServiceRestController");

class ListPersonnelsRestController extends PersonnelManagementRestController {
  constructor(req, res) {
    super("listPersonnels", "listpersonnels", req, res);
    this.dataName = "personnels";
    this.crudType = "list";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new ListPersonnelsManager(this._req, "rest");
  }
}

const listPersonnels = async (req, res, next) => {
  const controller = new ListPersonnelsRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = listPersonnels;
