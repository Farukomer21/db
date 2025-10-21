const express = require("express");
const router = express.Router();
const { ReservationListSummaryViewService } = require("services");

router.get("/", async (req, res) => {
  const datas =
    await ReservationListSummaryViewService.getAllAggReservationListSummaryView();
  res.json(datas);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const data =
    await ReservationListSummaryViewService.getAggReservationListSummaryView(
      id,
    );
  res.json(data);
});

module.exports = router;
