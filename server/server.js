const { json } = require('express')
const express = require('express')
const app = express()
const path = require('path')

require('dotenv').config({path: path.join(__dirname,'../') + '/.env'})

app.use(json())

const PORT = process.env.PORT

console.log(process.env.PORT)
console.log(path.join(__dirname,'../'))

app.listen(PORT,()=>{

    console.log(`Server is running on ${PORT}`)
})