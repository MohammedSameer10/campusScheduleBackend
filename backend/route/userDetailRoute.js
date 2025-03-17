const express = require('express');
const userDetailRouter = express.Router();
const userModel = require('../model/userDetailModel');
const tokenAuthenticator = require('../middleware/tokenAuthentication');
const userDetailModel = require('../model/userDetailModel');
const venueModel = require('../model/venueModel');

//CREATE USER METHOD

const createUser = async (req,res)=>{
    try {
          const {userName,password,name,email,rollNo,userType} = req.body;
          if(!(userName && password && email && rollNo && userType)){
            console.log(`missing some fields in required userName : ${userName}, password : ${password},  email : ${email}, rolNo : ${rollNo}, userType : ${userType}`)
            return res.status(400).json({code:0,msg:"Validation error : missing some fields in req body"})
          }
          const findUser = await userModel.findOne({rollNo});
          if(findUser){
            console.log(`user already exist for this RollNo:${rollNo}`);
            res.status(400).json({code:0,msg:"Validation Server error: user alread exist"});
          }
          console.log(`hi`)
          const newUser = new userModel({
            userName,
            password,
            name,
            email,
            rollNo,
            userType,
            }
          );
          console.log(`hi`)
          await newUser.save();
          console.log(`hi`)
          return res.status(200).json({code:1,msg:"Succesfullly created user"});
    } catch (error) {
        console.log(`Internel server error in creating User : ${error}`);
        return res.status(500).json({code:-1,msg:"Intenel Server Error: in creating user",error})
    }
}

// GET ALL USER 
const getAlluser = async (req,res)=>{
  try {
    const findUser = await userDetailModel.find();
    if(!findUser){
      console.log(`user list is empty`);
      res.staus(400).json({code:0,msg:"Validation error : No users found"});
    }
    const users = findUser.map(user =>(
      {
          name: user.name,
          email:user.email,
          rollNo:user.rollNo,
          userType:user.userType,
      }
  ))
   res.status(200).json({code:1,msg:"succesfully fetched user data",users})
  } catch (error) {
    console.log(`Internel server error: while getting All user error:${error}`);
    res.staus(500).json({code:-1,msg:"Internel server error: while getting All user",error})
  }
}

// GET USER BY ID 
const getuserById = async (req,res)=>{
  try {
    const rollNo = req.params.id;
    const user = await userDetailModel.findOne({rollNo});
    if(!user){
      console.log(`No user found for this id`);
      res.status(400).json({code:0,msg:"Validation error : No users found for this id"});
    }
    console.log("hi")
    const userDetail = 
      {
        name: user.name,
        email:user.email,
        rollNo:user.rollNo,
        userType:user.userType,
    }
    console.log(`userdetails for this id is `, userDetail);
    res.status(200).json({code:1,msg:"Succesfull sended user data with the particular id",user})
  } catch (error) {
    console.log(`Internel server error: while getting user via id error:${error}`);
    res.status(500).json({code:-1,msg:"Internel server error: while getting user via id",error})
  }
}


// UPDATE USER BY ID 
const updateUser = async (req,res)=>{
  try {
    const id = req.params.id;
    const {name,userName,email,password,userType,rollNo} =req.body;
    const findUser = await userDetailModel.findOne({rollNo:id});
    if(!findUser){
      console.log(`No user found for this id`);
      return res.status(400).json({code:0,msg:"Validation error : No users found for this id while updating"});
    }
    if(name)findUser.name=name;
    if(userName)findUser.userName=userName;
    if(email)findUser.email=email;
    if(password)findUser.password=password;
    if(userType)findUser.userType=userType;
    if(rollNo)findUser.rollNo=rollNo; 
    await findUser.save();
    console.log(`succesfully updated userdata : ${findUser}`);
    return res.status(200).json({code:1,msg:"Succesfully updated user data with the corresponding rollNo"})
    
  } catch (error) {
    console.log(`Internel server error: while getting All user error:${error}`);
    return res.staus(500).json({code:-1,msg:"Internel server error: while updating user",error})
  }
}

//delete user with id
const deleteUserWithId = async (req,res)=>{
  try {
    const id = req.params;
    if(!id){
     console.log(`Vaildation error : misiing id field`);
     return res.status(400).json({code:0,msg:"Validation error : missing id field in the parameter"});
    }
    const user = await venueModel.deleteOne({rollNo:id});
    if(user==0){
     console.log(`No matching user documengt found  for this id`);
     return res.status(400).json({code:0,msg:"Validatrion error : no user document found to delete for this id"});
    }
    console.log(`Succesfully deleted the user `); 
    return res.status(200).json({code:1,msg:"Succesfully deleted the user"});
  } 
  catch (error) {
    console.log(`Internel server error while deleting the user error : ${error}`);
    return res.status(500).json({code:-1,msg:"Internel server error while deleting user",error});
  }
}

userDetailRouter.post('/',tokenAuthenticator,createUser);
userDetailRouter.get('/',tokenAuthenticator,getAlluser);
userDetailRouter.get('/:id',tokenAuthenticator,getuserById);
userDetailRouter.put('/:id',tokenAuthenticator,updateUser);
userDetailRouter.delete(':/id',tokenAuthenticator,deleteUserWithId);
module.exports=userDetailRouter;