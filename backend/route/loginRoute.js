const express = require('express')
const loginRouter = express.Router();
const userDetailModel = require('../model/userDetailModel')
const jwt=require('jsonwebtoken')

const login = async (req,res)=>{
   try {
        const {loginType} = req.body;

       if(loginType=="OAuth"){
             const {email} = req.body;
             if(!email){
                console.log(`validation error : missing email feild`);
                return res.status(400).json({code:0,msg:"validation error : missing email field"});
             }
             const user = await userDetailModel.findOne({email});
             if(!user){
                console.log("validation error : No User Found");
               return res.status(400).json({code:0,msg:"validation error : No User Found for this email"});
            }
            const token = jwt.sign(
                {email:user.email},
                process.env.SECRETKEY,
                {expiresIn:"1h"}
            );
            console.log(`token generated jwt:${token}`);
            return  res.status(200).json({code:1,msg:"login Succesfull",jwt:token,userType:user.userType})
       }
       else{  
        const {userName,password}=req.nody;
        if(!userName || !password){
            console.log("validation error : missing fields");
            return  res.status(400).json({code:0,msg:"validation error : missing field"});
        }
        const user = await userDetailModel.findOne({userName});

        if(!user){
            console.log("validation error : No User Found");
           return res.status(400).json({code:0,msg:"validation error : No User Found"});
        }

        if(password!==user.password){
            console.log("validation error : Incorrect PassWord");
           return res.status(400).json({code:0,msg:"validation error : Incorrect PassWord"});
        }

        const token = jwt.sign(
            { userName: user.userName },
             process.env.SECRETKEY,
            { expiresIn:"1h"}
        );
        user.password = undefined;
        console.log(`Token generated : jwt : ${token}`);
         return  res.status(200).json({code:1,msg:"login Succesfull",jwt:token,userType:user.userType})
    }
   } catch (error) {
    console.log(`Internel server error during login ${error}`)
    return res.status(500).json({code:-1,msg:"Internel server error during login"});
   }
}
loginRouter.post('/login',login);
module.exports=loginRouter;