const express = require('express')
const app = express()
let userRoute = require('./routes/userRoute.js')


//middleware
app.use(express())

//api middleware
app.use('/user', userRoute)





app.listen(5000, ()=>{
  console.log('listen on 5000..');
})
