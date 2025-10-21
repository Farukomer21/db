const express = require("express");
const router = express.Router();
const { GuestFeedbackViewService } = require("services");

router.get("/", async (req, res) => {
  const datas = await GuestFeedbackViewService.getAllAggGuestFeedbackView();
  res.json(datas);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const data = await GuestFeedbackViewService.getAggGuestFeedbackView(id);
  res.json(data);
});

module.exports = router;
