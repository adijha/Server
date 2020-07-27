const accountSid = 'AC24d03e2eee46781d81ab49e8191562af';
const authToken = '24a04b70bc63f8173413689ba8a3b8cf';
const client = require('twilio')(accountSid, authToken);


module.exports.sentSms = async (phoneno, otp)=>{

  let waitSentSms = await client.messages
    .create({
       body:`Taar App: otp verification code is ${otp}`,
       from: '+17027650689',
       to: `+91${phoneno}`
     })
    .then(message => {
      return message.sid
    });
    return waitSentSms
}
