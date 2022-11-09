const express = require("express")
const router = express.Router()
const {login,register,listUser,editUser,deleteUser,currentUser} = require("../controllers/authController")
//midleware
const {auth,adminCheck} = require("../middleware/auth")


router.post('/register',register)
router.post('/login',login)
router.get('/auth',listUser)
router.put('/auth',editUser)
router.delete('/auth',deleteUser)
router.post('/current-user', auth, currentUser)
router.post('/current-admin', auth,adminCheck, currentUser)



module.exports=router