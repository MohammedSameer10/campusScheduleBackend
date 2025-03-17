const mongoose = require('mongoose');
const idSchema = mongoose.Schema(
    {
         GId:{
            type:Number,
            default:0
         },
         deletedIds:{
            type:[Number],
            default:[]
         }
    },
    {
        timestamps:true
    }
);
module.exports=mongoose.model("IdGeneration",idSchema);