const express = require("express");

// SpecialRequest Db Object Rest Api Router
const specialRequestRouter = express.Router();

// add SpecialRequest controllers

// createSpecialRequest controller
specialRequestRouter.post(
  "/v1/specialrequests",
  require("./create-specialrequest-api"),
);
// updateSpecialRequest controller
specialRequestRouter.patch(
  "/v1/specialrequests/:specialRequestId",
  require("./update-specialrequest-api"),
);
// getSpecialRequest controller
specialRequestRouter.get(
  "/v1/specialrequests/:specialRequestId",
  require("./get-specialrequest-api"),
);
// deleteSpecialRequest controller
specialRequestRouter.delete(
  "/v1/specialrequests/:specialRequestId",
  require("./delete-specialrequest-api"),
);
// listSpecialRequests controller
specialRequestRouter.get(
  "/v1/specialrequests",
  require("./list-specialrequests-api"),
);
// createSpecialRequestPublic controller
specialRequestRouter.post(
  "/v1/specialrequestpublic",
  require("./create-specialrequestpublic-api"),
);
// listSpecialRequestsByCode controller
specialRequestRouter.get(
  "/v1/specialrequestsbycode",
  require("./list-specialrequestsbycode-api"),
);
// getSpecialRequestByCode controller
specialRequestRouter.get(
  "/v1/specialrequestbycode/:specialRequestId",
  require("./get-specialrequestbycode-api"),
);
// cancelSpecialRequestByCode controller
specialRequestRouter.patch(
  "/v1/cancelspecialrequestbycode/:specialRequestId",
  require("./cancel-specialrequestbycode-api"),
);

module.exports = specialRequestRouter;
