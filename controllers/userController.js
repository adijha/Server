let {generate} = require('../utils/generateOtp');
let moment = require('moment');
let {saveOtp, resaveOtp} = require('../services/userService')
let text = require('textbelt');



exports.sendOtp = async (req, res)=>{
  let phoneNo = req.body.phoneno
  let gen_otp = await generate(phoneNo)

  let date =  new Date()


  let saveUser = await saveOtp(phoneNo, gen_otp, date)

  console.log(saveUser, "saveUser");
  console.log({phoneno, gen_otp});
}

exports.resendOtp = async (req, res)=>{
  let phoneNo = await req.body.phoneno
  let gen_otp = await generate(phoneNo)
  let documentKey = await req.body.id
  let date =  new Date()


  let saveUser = await resaveOtp(phoneNo, gen_otp, date)

  console.log(saveUser, "saveUser");
  console.log({phoneno, gen_otp});
}
