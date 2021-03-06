const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema(
  {
    "id": {
      "type": "Number"
    },
    "VOA": {
      "type": "String"
    },
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
    "tableFourTwo": {
      "type": [
        "Mixed"
      ]
    },
    "tableFiveOne": {
      "type": [
        "Mixed"
      ]
    },
    "tableFiveTwo": {
      "type": [
        "Mixed"
      ]
    },
    "tableFiveThree": {
      "type": [
        "Mixed"
      ]
    },
    "tableSix": {
      "type": [
        "Mixed"
      ]
    },
    "tableSeven": {
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


const Report = mongoose.model('Report', ReportSchema);

module.exports = Report;
