let {generate} = require('../utils/generateOtp');
let moment = require('moment');
let {saveOtp, verifyOtp, saveProfile, userById,userByPhone} = require('../services/userService')
let text = require('textbelt');
const jwt = require('jsonwebtoken');
let {sentSms} = require('../utils/sms')

exports.sendOtp = async (req, res)=>{


  let phoneNo = req.body.phoneno
  let gen_otp = await generate(phoneNo)

  let date =   new moment(new Date()).format('DD-MM-YYYY hh:mm:s')

  // let sentMessage = await sentSms(phoneNo, gen_otp)
  let saveUser = await saveOtp(phoneNo, gen_otp, date, sentMessage)

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


exports.profile = async (req, res)=>{
// console.log(req.body);
  let obj = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    photo: req.body.photo,
    phoneno: req.body.phoneno,
    id: req.body.id,
    gender:req.body.gender
  }

  let saveProfileResponse = await saveProfile(obj)
  if (saveProfileResponse===true) {
    let showUser = await userById(req.body.id)

    let userdata = showUser.data()
    let userId = showUser.id

    let userInfo = {
      id: userId,
      data: userdata,

    };
      const token = jwt.sign(userInfo, process.env.TOKEN_SECRET);



    res.status(200).send(token)
  }
  else {
    res.send("something wrong")
  }
console.log(req.files);
console.log(req.body);
}

exports.user = async (req, res)=>{
  let phoneNo = '7988783588'

  let showUser = await userByPhone(phoneNo)
  console.log(showUser, "showUser");

  res.send(showUser)


}
