
/*
request:
{jwt: "_"}
response:
in case of token expired
{auth: false,
  msg: "Token expired. Login again !"}

in case of success
{username: content['username'],
                    userType: content.userType,
                    auth: true}
               */
const jwt = require('jsonwebtoken');
const userDetailModel = require('../model/userDetailModel');
const key = "stop yor usless talk and learn to use your brain bro, you could have debug this but you did't do it and waste in talking";
const authenticator = async (req,res)=>{
    try{
        const token  =req.body.jwt ||   req.headers.authorization?.split(" ")[1] || req.cookies.token;
        if(!token){
            console.log(`token didnt fetched jwt : ${jwt}`);
            return res.status(400).json({code:0,msg:"token authenticator error : token didnt fetched"});
        }
        let decoded;
        try {
            decoded = jwt.verify(token, key);
        } catch (err) {
            console.log("Invalid or expired token");
            return res.status(401).json({ auth: false, msg: "Token expired. Login again !" });
        }
      
           let  user = await userDetailModel.findOne({email:decoded.email});  
           if(!user)   user = await userDetailModel.findOne({userName:decoded.userName});
             console.log(`user : ${user}`);
        if(!user){
            return res.status(400).json({code:0,msg:"token Authentication failed : no user founf for this token"});
        }
        console.log("user is verified  ",user);
        return res.status(200).json({userName:user.userName,userType:user.userType,auth:true});
    }
    catch(err){
        console.log(`token authenticator error : token got expired`)
        res.status(500).json({code:-1,auth:false,msg:"token authenticator error : token got expired"})
    }
}
module.exports = authenticator;