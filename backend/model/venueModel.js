const mongoose = require('mongoose');
const venueSchema = mongoose.Schema(
    {
         venueName:{
            type:String,
            required:true,
         },
         venueId:{
            type:Number,
            required:true,
         },
         venueType:{
            type:String,
            required:true,
         },
         max_capacity:{
            type:Number,
            required:true,
         },
         status:{
            type:String,
            default:"available",
            validate:{
                validator : (sam)=>{
                    return ["booked","available","maintenance"].includes(sam);
                },
                message : "invalid status updation for booking"
            }
         }
    },
    {
        timestamps:true
    }
);
module.exports = mongoose.model("Venue",venueSchema);