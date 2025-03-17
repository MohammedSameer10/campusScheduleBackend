const mongoose = require('mongoose');
const groupSchema = mongoose.Schema(
    {
         groupName:{
            type:String,
            required:true,
         },
         groupId:{
            type:String,
            required:true,
         },
         studentArray:{
            type:[String],
            required:true,
            default:[],
         }
    },
    {
        timestamps:true
    }
);
module.exports = mongoose.model("Group",groupSchema);