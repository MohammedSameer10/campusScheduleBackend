const mongoose = require('mongoose');
const planSchema = mongoose.Schema(
    {
       planId:{
        type:String,
        required:true,
       },
       venueId:{
        type:String,
        required:true,
       },
       groupArray:{
        type:[String],
        required:true,
        default:[],
       },
       studentArray:{
        type:[String],
        required:true,
        default:[],
       },
       staffArray:{
        type:[String],
        required:true,
        default:[],
       },
       startDate:{
        type:Number,
        required:true,
       },
       endDate:{
        type:Number,
        required:true,
       }

    },
    {
              timestamps:true
    }
);
module.exports = mongoose.model("Plan",planSchema);