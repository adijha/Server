let db = require('../config/database.js')

module.exports.saveOtp = async (phoneno, otp, date, smsId) =>{
    const userObj = {
      gender:'',

      firstname:'',
      lastname:'',
      photo:'',
      phoneno,
      otp,
      date,
      smsId
    }


    let datas = await db.collection('users')
    .where('phoneno', '==', phoneno)
    .get().then(async querySnapshot=>{
      const datass = await querySnapshot.docs.map(doc =>  doc.id);

      return datass

    })

    if (datas.length>0) {

      let data =   await db.collection('users')
        .doc(datas[0])
        .update(userObj).then(res=>{
          return res

        })
    }
    else {
      let data = await db.collection('users').add(userObj).then(res=>{
        console.log("new user add done");
        // console.log(res.id);
        return res.id
    })



    return data
}
}


module.exports.verifyOtp = async (phoneno)=>{

  let datas = await db.collection('users')
  .where('phoneno', '==', phoneno)
  .get().then(async querySnapshot=>{
    const userData = await querySnapshot.docs.map(doc =>  doc);
    // const userId = await querySnapshot.docs.map(doc =>  doc.id);

    return (userData)

  })
  return datas

}


module.exports.saveProfile = async ({firstname, lastname, photo, phoneno, id}) =>{
  try {
    let userObj = {}
    if (photo===""||null||undefined) {
       console.log(photo===""||null||undefined)
      userObj = {firstname, lastname, phoneno}
    }
    else {
      userObj = {firstname, lastname, photo, phoneno}
    }

    let data=   await db.collection('users')
      .doc(id)
      .update(userObj).then(res=>{
        return res

      })

      return true
  } catch (e) {
    return false
  }

}

module.exports.userById = async (id)=>{

  let data = await db.collection('users')
  .doc(id)
  .get().then(async querySnapshot=>{
    //const datass = await querySnapshot.docs.map(doc => doc.data());
    return querySnapshot;


  })
  return data
}

module.exports.userByPhone = async (phoneno)=>{

  let data = await db.collection('users')
  .where('phoneno', '==', phoneno)
  .get().then(async querySnapshot=>{
    const datass = await querySnapshot.docs.map(doc => doc.data());

    return datass

  })
  return data
}
