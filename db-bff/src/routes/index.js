const express = require("express");
const router = express.Router();

const httpLogsRoute = require("./httpLogs.route.js");
router.use("/logs", httpLogsRoute);

const AvailableRoomsWithPricesViewRoute = require("./AvailableRoomsWithPricesView.route.js");
router.use("/AvailableRoomsWithPricesView", AvailableRoomsWithPricesViewRoute);

const ReservationDetailsViewRoute = require("./ReservationDetailsView.route.js");
router.use("/ReservationDetailsView", ReservationDetailsViewRoute);

const SpecialRequestDetailsViewRoute = require("./SpecialRequestDetailsView.route.js");
router.use("/SpecialRequestDetailsView", SpecialRequestDetailsViewRoute);

const GuestFeedbackViewRoute = require("./GuestFeedbackView.route.js");
router.use("/GuestFeedbackView", GuestFeedbackViewRoute);

const ReservationListSummaryViewRoute = require("./ReservationListSummaryView.route.js");
router.use("/ReservationListSummaryView", ReservationListSummaryViewRoute);

const dynamicRoute = require("./dynamic.route.js");
router.use("/", dynamicRoute);

module.exports = router;
