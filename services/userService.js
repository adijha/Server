let db = require('../config/database.js')

module.exports.saveOtp = async (phoneno, otp, date) =>{
    const userObj = {
      firstname:'',
      lastname:'',
      photo:'',
      phoneno,
      otp,
      date
    }
    console.log(userObj);
    let data = await db.collection('users').add(userObj).then(res=>{
      console.log("new user add done");
      console.log(res.id);
      return res.id

    })
    return data
}

module.exports.resendOtp = async (phoneno, otp, date, documentKey)=>{
  const userObj = {
    firstname:'',
    lastname:'',
    photo:'',
    phoneno,
    otp,
    date
  }
  await db.collection('users')
  .doc(documentKey)
  .update(userObj).then(res=>{
    console.log(" user update done");
    console.log(res.id);
    return res.id

  })
}
