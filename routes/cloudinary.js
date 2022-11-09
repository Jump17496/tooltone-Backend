const express = require("express");
const router = express.Router();
//Controller
const { createImage, removeImage } = require("../controllers/cloudinaryController");
//midleware
const { auth, adminCheck } = require("../middleware/auth");

//Endpoint /api/images
router.post("/images", auth, createImage);
router.post("/removeimages", auth, removeImage);

module.exports = router;
