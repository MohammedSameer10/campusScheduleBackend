const mongoose = require('mongoose');

const mailSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        type: {  // fixed typo from 'typr' to 'type'
            type: String,
            required: true,
        },
        date: {
            type: String, // storing in "dd-mm-yyyy" format, so use String
            required: true,
        },
        startTime: {
            type: String,
            required: true,
        },
        endTime: {
            type: String,
            required: true,
        },
        venue: {
            type: String,
            required: true,
        },
        mail: {
            type: [String], // array of email strings
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Mail", mailSchema);
