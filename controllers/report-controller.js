const Report = require('../models/Report')
var Busboy = require('busboy')
var fs = require('fs')

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

        console.log("res", report)
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

exports.uploadReports = async (req, res, next) => {
    try {
        var busboy = new Busboy({ headers: req.headers });
        busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
         
          console.log('file ' + filename);
          file.on('data', function(data) {
            console.log('file',data.toString('utf8'))
          });
        });
        busboy.on('finish', function() {
          res.end("That's all folks!");
        });
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