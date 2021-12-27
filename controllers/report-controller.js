const Report = require('../models/Report')
var Busboy = require('busboy')
var fs = require('fs')
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const path = require("path");
const mime = require('mime');
const totalController = require("./total-controller")

exports.getReports = async (req, res, next) => {
    try {
        const report = await Report.find();
        return res.status(200).json({
            success: true,
            count: report.length,
            data: report
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: `Error Getting Report: ${error.message}`
        })
    }
}



exports.getReportsByFilter = async (req, res, next) => {
    try {
        const report = await Report.find(req.body).exec();
        //const report = await Report.find().$where('this.firstReportTable[0].kat1 != "фыв"').exec();
        return res.status(200).json({
            success: true,
            count: report.length,
            data: report
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: `Error Getting Report: ${error.message}`
        })
    }
}

exports.addReport = async (req, res, next) => {
    try {
        const report = await Report.create(req.body);
        return res.status(201).json({
            success: true,
            data: report
        })
    }
    catch (error) {
        console.error(req)

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);

            return res.status(400).json({
                success: false,
                error: messages
            })
        } else {
            return res.status(500).json({
                success: false,
                error: `Error Adding Report: ${error.message}`
            })
        }
    }
}

exports.uploadReports = (req, res, next) => {
    var report_data = {}
    var fileData = null
    try {
        console.log("uploadReports")
        var busboy = new Busboy({ headers: req.headers });
        busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
            console.log('file ' + filename);
            file.on('data', (data) => {
                if (fileData === null) {
                  fileData = data;
                } else {
                  fileData = Buffer.concat([fileData, data]);
                }
              });
        });
        busboy.on('finish', function () {
            try {
                JSON.parse(fileData.toString('utf8')).reports.forEach(async (item)=> {
                   await Report.find({period:item.period,VOA: item.VOA}).deleteMany().exec()
                   await Report.create(item);
                   await console.log("refresh total ", item.period)
                   await totalController.removeTotal(+item.period)
                   await totalController.addTotal(+item.period)
                 
                });
                report_data = JSON.parse(fileData.toString('utf8')).reports
            }
            catch (error) {
                console.log("err");
            }
        

            return res.status(201).json({
                success: true,
                report : report_data
            })
            
        });
        return req.pipe(busboy);
        
    }
    catch (error) {
        console.error(req)

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);

            return res.status(400).json({
                success: false,
                error: messages
            })
        } else {
            return res.status(500).json({
                success: false,
                error: `Error Upload Reports: ${error.message}`
            })
        }
    }
}