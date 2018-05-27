const mongoose = require("mongoose");
const mongoUrl = require("./mongoCredentials");

mongoose.Promise = Promise;

mongoose.connect(mongoUrl);

const reqString = { type: String, required: true };
const itemSchema = mongoose.Schema({
    type: reqString,
    category: reqString,
    title: reqString,
    amount: {
        type: Number,
        required: true
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    extraInfo: String,
    userName: {
        type: String,
        required: true,
        default: "Admin"
    },
    isRecurring: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = mongoose.model("IncomeExpense", itemSchema);