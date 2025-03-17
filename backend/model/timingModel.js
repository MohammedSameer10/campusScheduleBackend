const mongoose = require('mongoose');
const timingSchema = mongoose.Schema(
    {
        userId:{
            type:String,
            required:true,
        }
        ,
        timing:{
            type:[ 
                {
                   planId:{
                    type:Number,
                    required:true,
                   },
                   startTime:{
                    type:Number,
                    required:true,
                   },
                   endTime:{
                    type:Number,
                    required:true,
                   }
                }
            ],
            required:true
        }
    },
    {
        timestamps:true
    }
);
module.exports = mongoose.model("Timings",timingSchema);