const express = require('express');
const router = express.Router();

const { getToyCars, getToyCarById, addToyCar, updateToyCar, deleteToyCar } = require('../controllers/toycar-controller');
const { getReports, addReport, getReportsByVoa, getReportsByFilter, uploadReports} = require('../controllers/report-controller')
const {getReportsTotalValues,getReportsTotalValuesDocument} = require('../controllers/total-controller')

router 
    .route('/reports')
    .get(getReports)
    .post(addReport)

router 
    .route('/reports/filter')
    .get(getReportsByFilter)

router 
    .route('/totalIndicators')
    .post(getReportsTotalValues)

router 
    .route('/totalIndicators/document')
    .get(getReportsTotalValuesDocument)
   
router 
    .route('/reports/upload')
    .post(uploadReports)

router
    .route('/toycars/')
    .get(getToyCars)
    .post(addToyCar)

router
    .route('/toycars/:id')
    .get(getToyCarById)
    .delete(deleteToyCar)
    .put(updateToyCar)

module.exports = router;