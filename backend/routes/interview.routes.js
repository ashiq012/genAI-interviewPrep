const express = require('express')
const GetLoggedInUser = require('../middleware/auth')
const interviewController = require("../controller/interview.controller")
const upload = require("../middleware/file.middleware")

const interviewRoute = express.Router();

interviewRoute.post('/',
    GetLoggedInUser,
    upload.single("resume"),
    interviewController.generateInterViewReportController) 

interviewRoute.get('/report/:interviewId',
    GetLoggedInUser,
    interviewController.getInterviewReportByIdController)   

interviewRoute.get('/',
    GetLoggedInUser,
    interviewController.getAllInterviewReportsController)   

interviewRoute.post("/resume/pdf/:interviewReportId",
    GetLoggedInUser,
    interviewController.generateResumePdfController)       

module.exports = interviewRoute