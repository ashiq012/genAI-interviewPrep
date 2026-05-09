const { GoogleGenAI } = require("@google/genai")
const puppeteer = require("puppeteer")

const ai = new GoogleGenAI({
    apiKey: process.env.Gemini_api_key,
})

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

    const prompt = `
You are an expert technical interviewer and career coach.
Analyze the candidate and return ONLY a valid JSON object with EXACTLY this structure.
Do NOT add any extra fields. Do NOT change any field names.

Resume: ${resume}
Self Description: ${selfDescription}
Job Description: ${jobDescription}

Return this exact JSON structure:
{
    "title": "Job title from job description",
    "matchScore": 85,
    "technicalQuestion": [
        {
            "question": "What is closure in JavaScript?",
            "intention": "To test core JS knowledge",
            "answer": "A closure is when inner function remembers outer scope..."
        }
    ],
    "behavioralQuestion": [
        {
            "question": "Tell me about a challenging project",
            "intention": "To assess problem solving ability",
            "answer": "Use STAR method - Situation Task Action Result..."
        }
    ],
    "skillGap": [
        {
            "skill": "Redux",
            "severity": "medium"
        }
    ],
    "preparationPlan": [
        {
            "day": 1,
            "focus": "JavaScript Fundamentals",
            "tasks": [
                "Revise closures and promises",
                "Practice array methods"
            ]
        }
    ]
}

Rules:
- technicalQuestion must have minimum 5 items
- behavioralQuestion must have minimum 3 items
- skillGap severity must be exactly: "low", "medium", or "high"
- preparationPlan must have exactly 7 items (day 1 to day 7)
- tasks inside preparationPlan must be an array of strings
- Return ONLY the JSON — no markdown, no explanation
`

    const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            // ✅ NO responseSchema — prompt controls the structure
        }
    })

    const parsed = JSON.parse(response.text)
    return parsed
}

async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setContent(htmlContent, { waitUntil: "networkidle0" })
    const pdfBuffer = await page.pdf({
        format: "A4",
        margin: { top: "20mm", bottom: "20mm", left: "15mm", right: "15mm" }
    })
    await browser.close()
    return pdfBuffer
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {

    const prompt = `Generate a professional resume in HTML format.

Resume: ${resume}
Self Description: ${selfDescription}
Job Description: ${jobDescription}

Return ONLY a JSON object with this exact structure:
{
    "html": "<html>...</html>"
}

Rules:
- Tailor resume for the job description
- Simple professional ATS-friendly design
- 1-2 pages when converted to PDF
- Return ONLY JSON, no markdown
`

    const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
        }
    })

    const jsonContent = JSON.parse(response.text)
    return await generatePdfFromHtml(jsonContent.html)
}

module.exports = { generateInterviewReport, generateResumePdf }