const express = require("express");
const router = express.Router();
const { SpecialRequestDetailsViewService } = require("services");

router.get("/", async (req, res) => {
  const datas =
    await SpecialRequestDetailsViewService.getAllAggSpecialRequestDetailsView();
  res.json(datas);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const data =
    await SpecialRequestDetailsViewService.getAggSpecialRequestDetailsView(id);
  res.json(data);
});

module.exports = router;
