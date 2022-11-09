const express = require("express");
const router = express.Router();

const {
  listProvince,
  listAmphure,
  listDistrict,
  createLocation
} = require("../controllers/locationController");

//endpoint /api/province
router.post("/location", createLocation);
router.get("/province", listProvince);
router.get("/province/:id/amphure", listAmphure);
router.get("/amphure/:id", listDistrict);

module.exports = router;
