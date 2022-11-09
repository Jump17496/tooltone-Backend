const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.auth = (req,res,next) => {
    try {
        const token = req.headers["authtoken"]

        if(!token){
            return res.status(401).send("no token, authorization denied")
        }
        const decode = jwt.verify(token,'jwtSecret')

        console.log("midleware", decode);
        req.user = decode.user
        next()

    } catch (err) {
        console.log(err)
        res.staus(401).send('Token Invalid!!')
    }
};

exports.adminCheck= async(req,res,next) => {
    try {
        const { username } = req.user
        const adminUser = await User.findOne({ username }).exec()
        if(adminUser.role !== 'admin'){
            res.status(403).send(err,'Admin Acess denied!')
        } else{
            next()
        }

    } catch (err) {
        console.log(err)
        res.status(401).send('Admin Acess denied!')
    }
};