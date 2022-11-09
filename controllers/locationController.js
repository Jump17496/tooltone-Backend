const Province = require("../models/Province");
const Amphure = require("../models/Amphure");
const District = require("../models/District");

const Location = require("../models/Location");

exports.createLocation = async (req, res) => {
  try {
    const dataLocation = await Location(req.body).save();
    res.send(dataLocation);
  } catch (err) {
    console.log(err);
    res.status(500).send("createLocation Server Error!!");
  }
};

exports.listProvince = async (req, res) => {
  try {
    const dataProvince = await Province.find({});
    res.json(dataProvince);
  } catch (err) {
    console.log(err);
    res.status(500).send("listProvince Server Error!!");
  }
};
exports.listAmphure = async (req, res) => {
  try {
    const id = req.params.id;
    const dataAumphure = await Amphure.find({ province_id: id });
    res.json(dataAumphure);
  } catch (err) {
    console.log(err);
    res.status(500).send("listProvince Server Error!!");
  }
};
exports.listDistrict = async (req, res) => {
  try {
    const id = req.params.id;
    const dataDistrict = await District.find({ amphure_id: id });
    res.json(dataDistrict);
  } catch (err) {
    console.log(err);
    res.status(500).send("listDistrict Server Error!!");
  }
};
