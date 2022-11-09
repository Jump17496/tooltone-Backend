const express = require("express");
const router = express.Router();
//Controller
const {
  create,
  list,
  remove,
  read,
  update,
  listBy,
  searchFilters
} = require("../controllers/productController");
//midleware
const { auth, adminCheck } = require("../middleware/auth");

//endpoint http://localhost:5500/api/product
router.post("/product", auth, adminCheck, create);
router.get("/product/:count", list);
router.delete("/product/:id", auth, adminCheck, remove);

//update 
//endpoint http://localhost:5500/api/products/
router.get("/products/:id", read);
router.put("/product/:id", auth, adminCheck, update);

//listBy
router.post("/productby", listBy);

//search http://localhost:5500/api/search/filters
router.post('/search/filters',searchFilters)

module.exports = router;
