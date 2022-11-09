const express = require("express")
const router = express.Router()

//midleware
const {auth,adminCheck} = require("../middleware/auth")

//controllers
const {
    changeOderStatus,
    getOrderAdmin
} =  require('../controllers/adminController')

router.put('/admin/order-status', auth, changeOderStatus)
router.get('/admin/orders', auth, getOrderAdmin)


module.exports=router