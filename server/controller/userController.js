const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const db = require('../db')

module.exports.login = async (req,res,next) => {

    const {email,password} = req.body

    const user = await User.findOne({email})

    if(!user) return res.json({"status":false,"data":"","message":"User does not exist"})

    console.log(user)

    const hashedPassword = await bcrypt.hash(password,10)

    const passCheck = await bcrypt.compare(password,hashedPassword)
    console.log(passCheck)
    if(!passCheck){

        return res.json({"status":false,"data":"","message":"Given password is wrong"})
    }

    const userData = {
        id:Date.now(),
        email,
        password
    }

    jwt.sign({user}, '26gk26', (err,token)=>{

        res.json({"status":200,"data":{email,"username":user.username,token},"message":"User loggen in sucessfully"})

    })
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