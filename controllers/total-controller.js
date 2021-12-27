const Report = require('../models/Report')
const Total = require('../models/Total')
var templateTotal= require('./total')
var fs = require('fs')
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const path = require("path");
const mime = require('mime');

exports.getReportsTotalValuesDocument = async (req, res, next) =>  {

    const totalReport = await Total.find({period : req.query.year }).exec();
    console.log(totalReport)
    const content = fs.readFileSync(
        path.resolve(__dirname, "total_doc_template.docx"),
        "binary"
    );
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
    });

      doc.render({
        table1_00: totalReport[0].tableOne[0].kat2,
        table1_01: totalReport[0].tableOne[0].kat3,
        table1_02: totalReport[0].tableOne[0].total,
        table1_10: totalReport[0].tableOne[1].kat2,
        table1_11: totalReport[0].tableOne[1].kat3,
        table1_12: totalReport[0].tableOne[1].total,
        table1_20: totalReport[0].tableOne[2].kat2,
        table1_21: totalReport[0].tableOne[2].kat3,
        table1_22: totalReport[0].tableOne[2].total,
        table1_30: totalReport[0].tableOne[3].kat2,
        table1_31: totalReport[0].tableOne[3].kat3,
        table1_32: totalReport[0].tableOne[3].total,
        table1_40: totalReport[0].tableOne[4].kat2,
        table1_41: totalReport[0].tableOne[4].kat3,
        table1_42: totalReport[0].tableOne[4].total,
        table1_50: totalReport[0].tableOne[5].kat2,
        table1_51: totalReport[0].tableOne[5].kat3,
        table1_52: totalReport[0].tableOne[5].total,
        table1_60: totalReport[0].tableOne[6].kat2,
        table1_61: totalReport[0].tableOne[6].kat3,
        table1_62: totalReport[0].tableOne[6].total,
       

        
       
    });

    const buf = doc.getZip().generate({ type: "nodebuffer" });

    fs.writeFileSync(path.resolve(__dirname, "total_doc.docx"), buf);
    console.log(req.query.year)
    var filename = path.basename("total_doc.docx");
    var mimetype = mime.lookup("total_doc.docx");

    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    res.setHeader('Content-type', mimetype);
    const filestream  = fs.createReadStream(path.resolve(__dirname, "total_doc.docx"))
    filestream.pipe(res)
}

exports.getReportsTotalValues = async (req, res, next) => {
    try {
        const totalReport = await Total.find(req.body).exec();
        console.log(req.body,"body")
        return res.status(200).json({
            success: true,
            count: totalReport.length,
            data: totalReport
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: `Error Getting Report: ${error.message}`
        })
    }
}

exports.addTotal =  async (year) => {
    try {
        const total = JSON.parse(JSON.stringify(templateTotal));
        const report = await Report.find({"period":year}).exec();
        if(report){
            console.log(report,"parse report this")
        }
        console.log(year,"year of total")
        total.totalReport.period = year
        //ищем репорты по году, создаем JSON byответ для итоговых данных
        //const report = await Report.find().$where('this.firstReportTable[0].kat1 != "фыв"').exec();
        for(let r of report) {
            //1 таблица итоги
            for(let i=0; i < r.tableOne.length; i++) {
                if(r.tableOne[i].kat2){
                    total.totalReport.tableOne[i].kat2 += +r.tableOne[i].kat2 || 0
                    total.totalReport.tableOne[i].total += +r.tableOne[i].kat2 || 0
                }
                if (r.tableOne[i].kat3){
                    total.totalReport.tableOne[i].kat3 += +r.tableOne[i].kat3 || 0
                    total.totalReport.tableOne[i].total += +r.tableOne[i].kat3 || 0
                }
            }
            console.log("1 table result")
            
               
            //2 таблица
            for(let t of r.tableTwo){
                total.totalReport.tableTwo.push(t)
            }
            // 3 таблица сотрудники
            total.totalReport.tableThree[0].staff += +r.tableThree[0].staff || 0
            total.totalReport.tableThree[0].staffList += +r.tableThree[0].staffList || 0
            total.totalReport.tableThree[0].authorizedList += +r.tableThree[0].authorizedList || 0
            total.totalReport.tableThree[0].specEdu += +r.tableThree[0].specEdu || 0
            total.totalReport.tableThree[0].retrain += +r.tableThree[0].retrain || 0
            total.totalReport.tableThree[0].improve += +r.tableThree[0].improve || 0
            
            // 4 таблица
            total.totalReport.tableFourOne[0].byState += +r.tableFourOne[0].byState || 0
            total.totalReport.tableFourOne[0].byTheList += +r.tableFourOne[0].byTheList || 0
            total.totalReport.tableFourOne[0].attSupvisor += +r.tableFourOne[0].attSupvisor || 0
            total.totalReport.tableFourOne[0].engWorkers += +r.tableFourOne[0].engWorkers || 0
            
            // 6 таблица
            total.totalReport.tableSix[0].attDecl += +r.tableSix[0].attDecl || 0
            total.totalReport.tableSix[0].attSucc += +r.tableSix[0].attSucc || 0
            total.totalReport.tableSix[0].effDecl += +r.tableSix[0].effDecl || 0
            total.totalReport.tableSix[0].effSucc += +r.tableSix[0].effSucc || 0
            total.totalReport.tableSix[0].specCheckDecl += +r.tableSix[0].specCheckDecl || 0
            total.totalReport.tableSix[0].specCheckSucc += +r.tableSix[0].specCheckSucc || 0
            total.totalReport.tableSix[0].specResDecl += +r.tableSix[0].specResDecl || 0
            total.totalReport.tableSix[0].specResSucc += +r.tableSix[0].specResSucc || 0
            total.totalReport.tableSix[0].specExamDecl += +r.tableSix[0].specExamDecl || 0
            total.totalReport.tableSix[0].specExamSucc += +r.tableSix[0].specExamSucc || 0
         
            // 8 таблица НЕ ЗАБЫТЬ УТОЧНИТЬ ПО ДАТЕ НУЖНА ИЛИ НЕТ!!!!
            for(let t of total.totalReport.tableEight){
                for(let i = 0; i < r.tableEight.length; i++){
                    if (r.tableEight[i].InsBody == t.InsBody){
                        t["1kat"] += +r.tableEight[i]["1kat"]|| 0
                        t["2kat"] += +r.tableEight[i]["2kat"] || 0
                        t["3kat"] += +r.tableEight[i]["3kat"] || 0
                    }
                }
            } 
            // 9 таблица надо считать дополнительно
            for(let i = 0; i < r.tableTen.length; i++){
                total.totalReport.tableTen[0].plan += +r.tableTen[i].ObjInf || 0
                total.totalReport.tableTen[0].fact += +r.tableTen[i].kat4 || 0
                total.totalReport.tableTen[0].need += +r.tableTen[i].kat5 || 0
                total.totalReport.tableTen[0].writeoff += +r.tableTen[i].kat3 || 0
           
            }
            if (total.totalReport.tableTen[0].plan !=0 && total.totalReport.tableTen[0].plan){
                total.totalReport.tableTen[0].percent = Math.round(100*(total.totalReport.tableTen[0].need /total.totalReport.tableTen[0].plan)) + '%'
            }
             // 9.3 таблица 
            total.totalReport.tableNineTwo[0].numb += +r.tableNineTwo[0].numb || 0
            total.totalReport.tableNineTwo[0].numbARM += +r.tableNineTwo[0].numbARM || 0
            total.totalReport.tableNineTwo[0].connARM += +r.tableNineTwo[0].connARM || 0
        }
        for(let i=0; i <  total.totalReport.tableOne.length-1; i++) {
            console.log(total.totalReport.tableOne[7].kat2, " + ", +total.totalReport.tableOne[i].kat2)
            total.totalReport.tableOne[7].kat2 += +total.totalReport.tableOne[i].kat2
            total.totalReport.tableOne[7].kat3 += +total.totalReport.tableOne[i].kat3
            total.totalReport.tableOne[7].total += +total.totalReport.tableOne[i].total
        }
        console.log(total.totalReport.tableOne[7].kat2)
        console.log(total.totalReport.tableOne, "создаем вот такой отчет")
        Total.create(total.totalReport)
    }
    catch (error) {
        console.log(error.message)
    }
}

exports.removeTotal = async (year) => {
    try {
        await Total.deleteMany({"period":year})
    }
    catch (error) {
        console.log(error.message)
    }
    
}