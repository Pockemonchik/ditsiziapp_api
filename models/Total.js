const mongoose = require('mongoose');

const TotalSchema = new mongoose.Schema(
  {
    "period": {
      "type": "Number"
    },
    "tableOne": {
      "type": [
        "Mixed"
      ]
    },
    "tableTwo": {
      "type": [
        "Mixed"
      ]
    },
    "tableThree": {
      "type": [
        "Mixed"
      ]
    },
    "tableFourOne": {
      "type": [
        "Mixed"
      ]
    },
    "tableSix": {
      "type": [
        "Mixed"
      ]
    },
    "tableEight": {
      "type": [
        "Mixed"
      ]
    },
    "tableNineOne": {
      "type": [
        "Mixed"
      ]
    },
    "tableNineTwo": {
      "type": [
        "Mixed"
      ]
    },
    "tableTen": {
      "type": [
        "Mixed"
      ]
    }
  }
);


const Total = mongoose.model('Total', TotalSchema);

module.exports = Total;
