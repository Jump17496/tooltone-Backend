const express = require("express")
const router = express.Router()
//controller
const {
    listUsers,
    readUsers,
    updateUsers,
    removeUsers,
    changeStatus,
    changeRole,
    userCart,
    getUserCart,
    saveAddress,
    saveOrder,
    getAddress,
    emptyCart,
    addTowishList,
    getWishList,
    removeWishList,
    getOrder,
    readOrder,
    updateSlipOrder
} = require('../controllers/usersController')
//midleware
const {auth,adminCheck} = require("../middleware/auth")


router.get('/users',auth,adminCheck,listUsers)
router.get('/users/:id',readUsers)
router.put('/users/:id',auth,adminCheck,updateUsers)
router.delete('/users/:id',removeUsers)
router.post('/change-status',auth,adminCheck,changeStatus)
router.post('/change-role',auth,adminCheck,changeRole)

router.post('/user/cart',auth,userCart)
router.get('/user/cart',auth,getUserCart)
router.delete('/user/cart',auth,emptyCart)
//address
router.post('/user/address',auth,saveAddress)
router.get('/user/address',auth,getAddress)
//order
router.post('/user/order',auth,saveOrder)
router.get('/user/orders',auth,getOrder)
router.get('/user/read-orders/:id',readOrder)
router.put('/user/slip-orders/:id',updateSlipOrder)

//wishlist
router.post('/user/wishlist',auth,addTowishList)
router.get('/user/wishlist',auth,getWishList)
router.put('/user/wishlist/:productId',auth,removeWishList)



module.exports=router