let {generate} = require('../utils/generateOtp');
let moment = require('moment');
let {saveOtp} = require('../services/userService')
let text = require('textbelt');



exports.sendOtp = async (req, res)=>{
  let phoneNo = '7988783588'
  let gen_otp = await generate(phoneNo)

  let date =  new Date()
  let sendSms = await
text.send('7988783588', 'A sample text message!', 'india', function(err) {
  if (err) {
    console.log(err);
  }
});
  console.log(sendSms);
  let saveUser = await saveOtp(phoneNo, gen_otp, date)

  console.log(saveUser, "saveUser");
}

exports.verifyOtp = async (req, res)=>{

}
