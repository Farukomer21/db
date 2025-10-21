const express = require("express");
const router = express.Router();
const { ReservationDetailsViewService } = require("services");

router.get("/", async (req, res) => {
  const datas =
    await ReservationDetailsViewService.getAllAggReservationDetailsView();
  res.json(datas);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const data =
    await ReservationDetailsViewService.getAggReservationDetailsView(id);
  res.json(data);
});

module.exports = router;
