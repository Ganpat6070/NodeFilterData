const mongoose = require("mongoose");

const modelSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the name"]
    },
    age: {
        type: Number,
        required: true
    },
    bloodGroup: {
        type: String,
        required: true
    }
});

const BloodTable = mongoose.model('BloodTable', modelSchema);
module.exports = BloodTable;
