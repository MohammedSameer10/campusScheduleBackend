const express = require('express');
const groupRouter = express.Router();
const groupModel = require('../model/groupModel')
const idGenerationModel = require('../model/idGenerationModel')
const tokenAuthentication = require('../middleware/tokenAuthentication');

const createGroup = async (req,res)=>{
    try {
        const {groupName,studentArray} = req.body;
        if(!(groupName && studentArray.length !== 0)){
            console.log(`Validation error : missing parameters`);
            return res.status(400).json({code:0,msg:"Validation error : missing parameters ."});
        }
        const id = await idGenerationModel.findOne();
            if(!id){
                console.log(`error while generating  id`)
               return res.status(400).json({code:0,msg:"Validation error: error in Goats code. nothing wrong in ur side ."})
            }
            const arr = id.deletedIds;
            let newId;
        if(arr.length>0){
                newId=arr.shift();
        }
        else{
            newId = id.GId + 1 ;
            id.GId = newId;
        }
        const newGroup = new groupModel({
            groupName,
            groupId:newId,
            studentArray
        }
        );
        console.log(`new Group : ${createGroup}`);
        await createGroup.save();
        return res.status(200).json({code:1,msg:"Succesfully created group",newGroup})
         
    } catch (error) {
        console.log(`Internel server error while creating group error : ${error}`);
        return res.status(500).json({code:-1,msg:"Internel server error : while creating group",error})
    }
}

//getAllVenue
 
const getAllGroups = async (req,res)=>{
    try {
     const groups = groupModel.find();
    if(groups.length===0){
        console.log(`no groups found`)
        return res.status(400).json({code:0,msg:"No groups found"});
    }
    const arr = groups.map(({groupName,groupId,studentArray}) => ({groupName,groupId,studentArray}));
    console.log(arr);
     return  res.status(200).json({code:1,msg:"Succesfully retrieved all groups",arr});
    } catch (error) {
        console.log(`Internel server error :  ${error}`)
        return res.status(500).json({code:-1,msg:"Internel server error",error})
    }
}

//get group with Id

const getGroupWithId = async (req,res)=>{
    try {
        const {id} = req.params;
        const grp = await groupModel.findOne({groupId:id});
        if(!grp){
            console.log(`no matching group found for the id`);
            return res.status(400).json({code:0,msg:"Validation error : no group found for this id"});
        }
        const group = {
            groupName:grp.groupName,
            groupId:grp.groupId,
            studentArray:grp.studentArray
        }
        return res.code(200).json({code:1,msg:"Succesfull sended group with matching id",group})
    } catch (error) {
        console.log(`validation error: ${error}`);
        return res.status(500).jsoN({code:-1,msg:"Internel server error",error})
    }
}

const editGroupWithId = async (req,res)=>{
     try {
         const id = req.params.id;
         const{groupName,studentArray} = req.body;
          const group = await  groupModel.findOne({groupId:id});
          if(!group){
            console.log(`No groups found for this id`);
            return res.status(400).json({code:0,msg:"Validation error : no groups found for this is"})
          }
         if(groupName){
            group.groupName=groupName;
         } 
         if(studentArray.length>0){
           group.studentArray=studentArray;
         }
        await group.save();
        console.log(`updated group ${group}`);
      return res.status(200).json({code:1,msg:"Succesfully modified group with id"},group);
          
     } catch (error) {
        console.log(`internel server error : ${error}`);
        return res.status(500).json({code:-1,msg:"Internel server error",error})
     }
}
  
const deleteGroupWithid = async (req,res)=>{
    try {
        const {id} = req.params;
        const group =  await groupModel.deleteOne({groupId:id});
        if(group.deletedCount===0){
            console.log(`No group found for the id`);
            return res.status(400).json({code:0,msg:"Validation error : No group found for the id"});
        }
        console.log(`succesfully deleted the group : ${group}`);
        return res.status(200).json({code:1,msg:"Succesfully deleted the group with the id"});
    } catch (error) {
        console.log(`Internel server error : ${error}`);
        return res.status(500).json({code:-1,msg:"Internel server error",error});
    }
}
groupRouter.post('/',tokenAuthentication,createGroup);
groupRouter.get('/',tokenAuthentication,getAllGroups);
groupRouter.get('/:id',tokenAuthentication,getGroupWithId);
groupRouter.put('/:id',tokenAuthentication,editGroupWithId);
groupRouter.delete('/:id',tokenAuthentication,deleteGroupWithid);
module.exports = groupRouter;