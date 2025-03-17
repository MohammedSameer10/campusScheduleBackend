const mongoose = require('mongoose');
const connectDb = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.CONNECTIONSTRING);
        console.log(`mongo db connected succesfully ${conn.connection.name}`);
    }
    catch(err){
        console.log(`error occured while db connection message :  ${err.message}`);
        process.exit(1);
    }
}
module.exports = connectDb;