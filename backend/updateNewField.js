const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// Import the schema
const HostelDetails = require("./model/hostelDetails");

// Connect to MongoDB
const updateData = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");

        // Fetch all documents in the hostelDetails collection
        const hostels = await HostelDetails.find();

        // Iterate over documents and update each with a roomId
        let roomIdCounter = 1;
        for (let hostel of hostels) {
            hostel.roomId = roomIdCounter++; // Assign unique roomId
            await hostel.save(); // Save the updated document
            console.log(`Updated Room ID for document: ${hostel._id}`);
        }

        console.log("All documents updated successfully!");
        mongoose.connection.close();
    } catch (error) {
        console.error("Error updating documents:", error);
        mongoose.connection.close();
    }
};

updateData();
