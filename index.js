const express = require('express')
const app = express()
let userRoute = require('./routes/userRoute.js')
let bodyParser = require('body-parser')
const dotenv = require('dotenv').config();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb'}))

//app.use(express.json());
app.use(express.json({ limit: '50mb' }));



// parse application/json
app.use(bodyParser.json())


//api middleware
app.use('/user', userRoute)





app.listen(process.env.PORT || 5000, ()=>{
  console.log('listen on 5000..');
})
