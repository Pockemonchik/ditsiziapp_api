const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    voa: {
        type: String,
        required: false
    },
    year: {
        type: Date
    },
    table1: [
        {
            par1: String,
            par2: String,
            par3: String
        }
    ],

});


const Report = mongoose.model('Report', ReportSchema);

module.exports = Report;