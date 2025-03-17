const mongoose = require('mongoose');
const SampleSchema = require('./model/userDetails');

const deleteAllData = async () => {
  try {
    // Delete all documents in the SampleSchema collection
    await SampleSchema.deleteMany({});
    console.log('All documents have been deleted successfully.');
  } catch (error) {
    console.error('Error deleting data:', error);
  }
};

// Connect to the MongoDB and run the function
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    deleteAllData();
  })
  .catch(err => console.error('MongoDB connection error:', err));
