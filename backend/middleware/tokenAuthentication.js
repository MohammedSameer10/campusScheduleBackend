const jwt = require('jsonwebtoken');
const userDetailModel = require('../model/userDetailModel');
const authenticator = async (req,res,next)=>{
    try{
        const token  =req.body.jwt ||   req.headers.authorization?.split(" ")[1] || req.cookies.token;
        if(!token){
            console.log(`token didnt fetched jwt : ${jwt}`);
            return res.status(400).json({code:0,msg:"token authenticator error : token didnt fetched"});
        }
        const decoded = jwt.verify(token,process.env.SECRETKEY);
        if(!decoded){
            console.log(`invalid token`);
            return res.status(400).json({code:0,msg:"Invalid token"});
        }
        const {loginType} = req.body;
         
           let  user = await userDetailModel.findOne({email:decoded.email});  
           if(!user)   user = await userDetailModel.findOne({userName:decoded.userName});
             console.log(`user : ${user}`);
        if(!user){
            return res.status(400).json({code:0,msg:"token Authentication failed"});
        }
        console.log("user is verified  ",user);
        return  next();
    }
    catch(err){
        console.log(`token authenticator error : token got expired`)
        res.status(500).json({code:-1,msg:"token authenticator error : token got expired"})
    }
}
module.exports = authenticator;