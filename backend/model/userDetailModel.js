const mongoose = require('mongoose');
const userSchema =  mongoose.Schema(
    {
        userName:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        name:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
        },
        rollNo:{
            type:String,
            required:true,
        },
        userType:{
            type:String,
            required:true,
            validate:{
                validator: (val)=>{
                    return ["Student","Staff","Admin"].includes(val);
                },
                message:"userType is Invalid"

            }
        }
    },
    {
        timestamps:true
    } 
);
module.exports = mongoose.model("UserDetails",userSchema)