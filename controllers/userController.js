let {generate} = require('../utils/generateOtp');
let moment = require('moment');
let {saveOtp, verifyOtp, userByPhone} = require('../services/userService')
let text = require('textbelt');
const jwt = require('jsonwebtoken');


exports.sendOtp = async (req, res)=>{


  let phoneNo = req.body.phoneno
  let gen_otp = await generate(phoneNo)

  let date =   new moment(new Date()).format('DD-MM-YYYY hh:mm:s')


  let saveUser = await saveOtp(phoneNo, gen_otp, date)

  console.log(saveUser, "saveUser");
  res.send({otp: gen_otp, phone:phoneNo})

}

exports.verify = async (req, res)=>{
  let phoneNo = await req.body.phoneno
  let otp = await req.body.otp

  let saveUser = await verifyOtp(phoneNo)

  if (saveUser.length>0) {
    let userdata = saveUser[0].data()
    let userId = saveUser[0].id

    let previousDate = userdata.date
    let currentDate = new moment(new Date()).format('DD-MM-YYYY hh:mm:s')

    let minutes = moment.utc(moment(currentDate,"DD/MM/YYYY HH:mm:ss").diff(moment(previousDate,"DD/MM/YYYY HH:mm:ss"))).format("mm")

    if (minutes<=30  ) {

      if (userdata.otp===otp) {
        let userInfo = {
          id: userId,
          data: userdata,

        };
          const token = jwt.sign(userInfo, process.env.TOKEN_SECRET);
          console.log("otp match");
          res.send(token);
      }
      else {
        res.send("otp not match")
      }
    }
    else {
      res.send("Timeout, Please try again");
    }

  }
  else {
    res.send("No phoneno otp found")
  }

}

exports.user = async (req, res)=>{
  let phoneNo = '7988783588'

  let showUser = await userByPhone(phoneNo)

  res.send(showUser)


}
