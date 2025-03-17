const mongoose = require('mongoose');
const user = require('./model/userDetailModel');
const dotenv = require('dotenv');

dotenv.config();

const roomDetails = [
  {
    userName: "testUser",
    password: "testPass",
    name: "Test Name",
    email: "test@example.com",
    rollNo: "123456",
    userType: "Student",
  }
];

const insertData = async () => {
  try {
    if (!process.env.CONNECTIONSTRING) {
      throw new Error("MONGO_URI is not defined in .env");
    }

    await mongoose.connect(process.env.CONNECTIONSTRING);
    console.log('Database connected!');

    const result = await user.insertMany(roomDetails);
    console.log('Sample data inserted:', result);

    await mongoose.connection.close();
  } catch (error) {
    console.error('Error inserting data:', error);
    mongoose.connection.close();
  }
};

insertData();
