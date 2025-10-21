const { CreateFeedbackGuestManager } = require("apiLayer");

const FeedbackManagementRestController = require("../../FeedbackManagementServiceRestController");

class CreateFeedbackGuestRestController extends FeedbackManagementRestController {
  constructor(req, res) {
    super("createFeedbackGuest", "createfeedbackguest", req, res);
    this.dataName = "feedback";
    this.crudType = "create";
    this.status = 201;
    this.httpMethod = "POST";
  }

  createApiManager() {
    return new CreateFeedbackGuestManager(this._req, "rest");
  }
}

const createFeedbackGuest = async (req, res, next) => {
  const controller = new CreateFeedbackGuestRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = createFeedbackGuest;
