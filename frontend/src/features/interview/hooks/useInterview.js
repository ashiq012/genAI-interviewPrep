import { generateInterviewReport, getAllInterviewReports, getInterviewReportById, generateResumePdf } from '../services/interview.api.js'

import { useContext,useEffect } from 'react'
import { InterviewContext } from '../interview.context.jsx'
import { useParams } from 'react-router-dom';
 
export const useInterview = () => {
    const context = useContext(InterviewContext)
    const { interviewId } = useParams()

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider")
    }
    const {loading, setLoading, report, setReport, reports, setReports} = context;

    const generateReport = async ({selfDescription, jobDescription ,resumeFile}) => {
        let data = null;
        try {
            setLoading(true);
            data = await generateInterviewReport({selfDescription, jobDescription ,resumeFile});
            setReport(data.interviewReport);
        } catch (err) {
            console.error("Error generating interview report:", err);
        } finally {
            setLoading(false);
        }
        return data.interviewReport;
    }
    
    const getReports = async () => {
        let data = null;
        try {
            setLoading(true);
            data = await getAllInterviewReports();
            setReports(data.interviewReports);
        } catch (err) {
            console.error("Error fetching interview reports:", err);
        } finally {
            setLoading(false);
        }
    
        return data.interviewReports;
    }
    
    
    const getReportById = async (interviewId) => {
        let data = null;
        try {
            setLoading(true);
            data = await getInterviewReportById(interviewId);
            setReport(data.interviewReport);
        } catch (err) {
            console.error("Error fetching interview report:", err);
        } finally {
            setLoading(false);
        }
        return data.interviewReport;
    }
 const getResumePdf = async (interviewReportId) => {
        setLoading(true)
        let response = null
        try {
            response = await generateResumePdf({ interviewReportId })
            const url = window.URL.createObjectURL(new Blob([ response ], { type: "application/pdf" }))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", `resume_${interviewReportId}.pdf`)
            document.body.appendChild(link)
            link.click()
        }
        catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        } else {
            getReports()
        }
    }, [ interviewId ])
    return {
        loading,
        report,
        reports,
        generateReport,
        getReports,
        getReportById,
        getResumePdf

    }
}