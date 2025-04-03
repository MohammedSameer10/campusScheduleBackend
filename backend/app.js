const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const connectDb = require('./config/dbConnection');
connectDb();
const loginRouter = require('./route/loginRoute');
const venueRouter = require('./route/venueRoute');
const userRouter = require('./route/userDetailRoute');
const groupRouter = require('./route/groupRoute');
app.use(express.json())

app.use('/api/v1',loginRouter);
app.use('/api/v1/venue',venueRouter);
app.use('/api/v1/user',userRouter);
app.use('/api/v1/group',groupRouter);
app.listen(process.env.PORT || 8000,()=>{
    console.log(`server is running on port : ${process.env.PORT}`);
})