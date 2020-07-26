const express = require('express')
const app = express()
let userRoute = require('./routes/userRoute.js')
let bodyParser = require('body-parser')
const dotenv = require('dotenv').config();

// //middleware
// app.use(express.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


//api middleware
app.use('/user', userRoute)





app.listen(5000, ()=>{
  console.log('listen on 5000..');
})
