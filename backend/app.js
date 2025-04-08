const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const app = express();
const connectDb = require('./config/dbConnection');
connectDb();
const loginRouter = require('./route/loginRoute');
const venueRouter = require('./route/venueRoute');
const userRouter = require('./route/userDetailRoute');
const groupRouter = require('./route/groupRoute');
const tokenAuthenticator = require('./middleware/tokenAuthentication');
app.use(express.json())
app.use(cors());
app.use('/api/v1',loginRouter);
app.use('/api/v1/verify',tokenAuthenticator);
app.use('/api/v1/venue',venueRouter);
app.use('/api/v1/user',userRouter);
app.use('/api/v1/group',groupRouter);
app.listen(process.env.PORT || 8000,"0.0.0.0",()=>{
    console.log(`server is running on port : ${process.env.PORT}`);
})