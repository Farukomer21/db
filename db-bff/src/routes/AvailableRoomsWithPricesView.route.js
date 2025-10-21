const express = require("express");
const router = express.Router();
const { AvailableRoomsWithPricesViewService } = require("services");

router.get("/", async (req, res) => {
  const datas =
    await AvailableRoomsWithPricesViewService.getAllAggAvailableRoomsWithPricesView();
  res.json(datas);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const data =
    await AvailableRoomsWithPricesViewService.getAggAvailableRoomsWithPricesView(
      id,
    );
  res.json(data);
});

module.exports = router;
