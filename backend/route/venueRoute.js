const express = require('express');
const venueRouter = express.Router();
const venueModel = require('../model/venueModel');
const idGenerationModel = require('../model/idGenerationModel');
const tokenAuthenticator = require('../middleware/tokenAuthentication');


//Post - Creation of venues
const createVenue = async (req,res)=>{
    try {     
        const {name,type,max_capacity,status="available"} = req.body;
        if(!(name && type && max_capacity)){
            console.log(`missing required fields name:${name} type:${type} maxCapacity:${max_capacity} }`);
            return res.json({code:0,msg:"Validation error : missing fields"})
        }
        const id = await idGenerationModel.findOne();
        if(!id){
            console.log(`No id schema Found in venue creation route`);
            return res.status(400).json({code:0,msg:"validation error(id Generation schema missing ) in sameers(Goat's) code"})
        }
        let newId=0;
        const arr = id.deletedIds;
          console.log(`hi`)
        if(arr.length>0){
            newId=arr.shift();
        }
        else  {
            newId = id.GId + 1 ;
            id.GId = newId;
        }
        await id.save();
        console.log(`id saved ${id.GId}`);
        const newVenue = new venueModel(
            {
                venueName:name,
                venueId:newId,
                venueType:type,
                max_capacity,
                status,
            }
        );
        console.log(`new venue obj:${newVenue}`)
        await newVenue.save();
        return res.status(200).json({code:1,msg:"succesfully created new venues"})
    } catch (error) {
       console.log(`error in creating new venue ${error}`) ;
       return res.status(500).json({code:-1,msg:"Internel server error while creating new venue"});
    }
    }

    //getting all the venues  
    const getAllVenue =async (req,res)=>{
        try {
            const venues = await venueModel.find();
            if(venues.length===0){
                console.log(`cant find any venues . its empty`);
                return res.status(400).json({code:0,msg:"No venues found"});
            }
            const arr = venues.map(venue => (
                {
                    id: venue.venueId,
                    name: venue.venueName,
                    type:venue.venueType,
                    max_capacity: venue.max_oombucapacity,
                    status: venue.status
                }
            )); 
            return res.status(200).json({code:1,msg:"Succesfully sent all avaliable venues as array",arr})
        } catch (error) {
            console.log(`Internel Server error : getAllVenue Route`);
            return res.status(500).json({code:-1,msg:"Internel Server error : getAllVenue Route"})
        }
    }
 
      //get venue with id
  const getVenueWithId = async (req,res)=>{
    try {
        const id = req.params.id;
        const venue = await venueModel.findOne({venueId:id})
        console.log(`hi`);
        if(!venue){
            console.log(`validation error : while getting no venues found for the matching id:${id}`);
            return  res.status(400).json({code:0,msg:"while getting, no venue found for the matching id"});
        }
        console.log(`hi`);
        const response = {
            id: venue.venueId,
            name: venue.venueName,
            type:venue.venueType,
            max_capacity: venue.max_capacity,
            status: venue.status
        }
        console.log(`hi`);
        return res.status(200).json({code:1,msg:"succesfully fetched venue details for the venue id",response});
    } catch (error) {
        console.log(`Internel Server error : while getting the venue via Id:${error}`)
        return res.status(500).json({code:-1,msg:"Internel Server error : while getting the venue via Id"})
    }
  }

  //edit the venue
  const editVenueWIthId = async (req,res)=>{
    try {
        
        const id = req.params.id;
        const {name,type,max_capacity,status}=req.body;
        const venue = await venueModel.findOne({venueId:id});
        if(!venue){
            console.log(`no venues found, while updating the venue via Id:${id}}`)
            return res.status(400).json({code:0,msg:"no venues found, while updating the venue via Id"})
        }
        if(name)venue.venueName=name;
        if(type)venue.venueType=type;
        if(max_capacity)venue.max_capacity=max_capacity;
        if(status)venue.status=status;
        await venue.save();
        console.log(`updated venue succesfully`)
        return res.status(200).json({code:1,msg:"succesfully updated the venue details"});
    } catch (error) {
        console.log(`Internel Server error : while updating the venue via Id: ${error}`)
        return res.status(500).json({code:-1,msg:"Internel Server error : while updating the venue via Id"})
    }
  }
    
  //delete the venue

  const deleteVenueWithId = async (req,res)=>{
    try {
        const id = req.params.id;
        const delet = await venueModel.deleteOne({venueId:id});
         if(delet.deletedCount  === 0){
            console.log(`Validation Server Error in deleting the venue No document found`);
            return res.status(400).json({code:0,msg:"Validation error : no matching document found"});
         }
         console.log(`succesfully deleted the venue`);
         return res.status(200).json({code:1,msg:"Succesfully deleted the venue"});

    } catch (error) {
        console.log(`Internel Server error : while deleting venue error : ${error} `);
        return res.status(500).json({code:-1,msg:"Internel server error : while deleting venue",error});
    }
  }


venueRouter.post('/',tokenAuthenticator,createVenue);
venueRouter.get('/',tokenAuthenticator,getAllVenue);
venueRouter.get('/:id',tokenAuthenticator,getVenueWithId);
venueRouter.put('/:id',tokenAuthenticator,editVenueWIthId);
venueRouter.delete('/:id',tokenAuthenticator,deleteVenueWithId);
module.exports = venueRouter;