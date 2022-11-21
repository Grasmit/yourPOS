const mongoose = require('mongoose')
const path = require('path')

require('dotenv').config({path: path.join(__dirname,'../.env')})

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(()=>{

    console.log('DB connected sucessfully')
  }).catch((err)=>{

    console.error(err.message)
  })