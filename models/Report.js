const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    "type": "object",
    "id": {
        "type": "Number"
    },
    "VOA": {
        "type": "string"
    },
    "period": {
        "type": "Number"
    },
    "firstReportTable": {
        "type": "array",
        "items": [
            {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "ObjInf": {
                        "type": "string"
                    },
                    "kat1": {
                        "type": "string"
                    },
                    "kat2": {
                        "type": "string"
                    },
                    "kat3": {
                        "type": "string"
                    },
                    "kat4": {
                        "type": "string"
                    },
                    "kat5": {
                        "type": "string"
                    }
                },
                "required": [
                    "name",
                    "ObjInf",
                    "kat1",
                    "kat2",
                    "kat3",
                    "kat4",
                    "kat5"
                ]
            },
            {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "ObjInf": {
                        "type": "string"
                    },
                    "kat1": {
                        "type": "string"
                    },
                    "kat2": {
                        "type": "string"
                    },
                    "kat3": {
                        "type": "string"
                    },
                    "kat4": {
                        "type": "string"
                    },
                    "kat5": {
                        "type": "string"
                    }
                },
                "required": [
                    "name",
                    "ObjInf",
                    "kat1",
                    "kat2",
                    "kat3",
                    "kat4",
                    "kat5"
                ]
            },
            {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "kat1": {
                        "type": "string"
                    },
                    "kat2": {
                        "type": "string"
                    },
                    "kat3": {
                        "type": "string"
                    },
                    "kat4": {
                        "type": "string"
                    },
                    "kat5": {
                        "type": "string"
                    }
                },
                "required": [
                    "name",
                    "kat1",
                    "kat2",
                    "kat3",
                    "kat4",
                    "kat5"
                ]
            },
            {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "ObjInf": {
                        "type": "string"
                    },
                    "kat1": {
                        "type": "string"
                    },
                    "kat2": {
                        "type": "string"
                    },
                    "kat3": {
                        "type": "string"
                    },
                    "kat4": {
                        "type": "string"
                    },
                    "kat5": {
                        "type": "string"
                    }
                },
                "required": [
                    "name",
                    "ObjInf",
                    "kat1",
                    "kat2",
                    "kat3",
                    "kat4",
                    "kat5"
                ]
            },
            {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "ObjInf": {
                        "type": "string"
                    },
                    "kat1": {
                        "type": "string"
                    },
                    "kat2": {
                        "type": "string"
                    },
                    "kat3": {
                        "type": "string"
                    },
                    "kat4": {
                        "type": "string"
                    },
                    "kat5": {
                        "type": "string"
                    }
                },
                "required": [
                    "name",
                    "ObjInf",
                    "kat1",
                    "kat2",
                    "kat3",
                    "kat4",
                    "kat5"
                ]
            },
            {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "ObjInf": {
                        "type": "string"
                    },
                    "kat1": {
                        "type": "string"
                    },
                    "kat2": {
                        "type": "string"
                    },
                    "kat3": {
                        "type": "string"
                    },
                    "kat4": {
                        "type": "string"
                    },
                    "kat5": {
                        "type": "string"
                    }
                },
                "required": [
                    "name",
                    "ObjInf",
                    "kat1",
                    "kat2",
                    "kat3",
                    "kat4",
                    "kat5"
                ]
            },
            {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "ObjInf": {
                        "type": "string"
                    },
                    "kat1": {
                        "type": "string"
                    },
                    "kat2": {
                        "type": "string"
                    },
                    "kat3": {
                        "type": "string"
                    },
                    "kat4": {
                        "type": "string"
                    },
                    "kat5": {
                        "type": "string"
                    }
                },
                "required": [
                    "name",
                    "ObjInf",
                    "kat1",
                    "kat2",
                    "kat3",
                    "kat4",
                    "kat5"
                ]
            }
        ]
    },
});


const Report = mongoose.model('Report', ReportSchema);

module.exports = Report;