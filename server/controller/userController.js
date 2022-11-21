const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const db = require('../db')

module.exports.login = function (req,res) {

    res.json({"status":200,"data":"function linked ...","message":"sucessfully login function linked "})
}

module.exports.register = async (req,res,next) =>{

    //res.json({"status":200,"data":"registert function linked ...","message":"sucessfully register function linked "})

    try{

        const {username,email,password} = req.body

        const usernameCheck = await User.findOne({username})

        if(usernameCheck){
            return res.json({"status":false,"data":"","message":"Username is already exist"})
        }

        const emailCheck = await User.findOne({email})

        if(emailCheck){
            return res.json({"status":false,"data":"","message":"Email is linked with another account"})
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const user = await User.create({
            username,
            email,
            password:hashedPassword
        })

        delete user.password

        return res.json({"status":false,"data":user,"message":"user register sucessfully"})

    }   catch(err) {

        next(err)
    }
}