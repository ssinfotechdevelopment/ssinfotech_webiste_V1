import Submission from '../models/submission.js';
export const submitTest = async (req, res) => {
    try {
        console.log("📥 Received submission request");
        console.log("Request body:", req.body);

        const {
            userName,
            email,
            phone,
            company,
            score,
            totalQuestions,
            userAnswers,
            violationCount = 0,
            categoryFilter = 'all',
            timeTaken
        } = req.body;

        // Validate required fields
        if (
            !userName ||
            !email ||
            !phone ||
            !company ||
            score === undefined ||
            !totalQuestions
        ) {
            return res.status(400).json({
                success: false,
                error:
                    'Missing required fields: userName, email, phone, company, score, totalQuestions are required'
            });
        }

        console.log("✅ All required fields present");

        const submissionData = {
            userName: userName.trim(),
            email: email.toLowerCase().trim(),
            phone: phone.trim(),
            company: company.trim(),
            score: Number(score),
            totalQuestions: Number(totalQuestions),
            userAnswers: userAnswers || [],
            violationCount: Number(violationCount) || 0,
            categoryFilter: categoryFilter || 'all',
            timeTaken: Number(timeTaken) || 0,
            submittedAt: new Date()
        };

        console.log("📦 Creating submission:", submissionData);

        const submission = new Submission(submissionData);

        const savedSubmission = await submission.save();

        console.log(
            "✅ Submission saved successfully with ID:",
            savedSubmission._id
        );

        res.status(201).json({
            success: true,
            submissionId: savedSubmission._id,
            message: 'Test submitted successfully',
            data: {
                userName: savedSubmission.userName,
                company: savedSubmission.company,
                score: savedSubmission.score,
                totalQuestions: savedSubmission.totalQuestions,
                submittedAt: savedSubmission.submittedAt
            }
        });
    } catch (err) {
        console.error("❌ Submission error:", err);

        let errorMessage = 'Failed to save submission';
        let statusCode = 500;

        if (err.name === 'ValidationError') {
            errorMessage = Object.values(err.errors)
                .map(e => e.message)
                .join(', ');
            statusCode = 400;
        } else if (err.code === 11000) {
            errorMessage = 'Duplicate submission detected';
            statusCode = 400;
        }

        res.status(statusCode).json({
            success: false,
            error: errorMessage,
            details:
                process.env.NODE_ENV === 'development'
                    ? err.message
                    : undefined
        });
    }
};

export const getAllSubmissions = async (req, res) => {
    try {
        const submissions = await Submission.find().sort({ submittedAt: -1 });

        res.json({
            success: true,
            count: submissions.length,
            data: submissions
        });
    } catch (err) {
        console.error('Get submissions error:', err);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch submissions'
        });
    }
};

export const getSubmissionById = async (req, res) => {
    try {
        const submission = await Submission.findById(req.params.id);

        if (!submission) {
            return res.status(404).json({
                success: false,
                error: 'Submission not found'
            });
        }

        res.json({
            success: true,
            data: submission
        });
    } catch (err) {
        console.error('Get submission error:', err);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch submission'
        });
    }
};

export const deleteSubmission = async (req, res) => {
    try {
        console.log(" Delete request for submission ID:", req.params.id);

        const submissionId = req.params.id;

        // Validate MongoDB ID format
        if (!submissionId || submissionId.length !== 24) {
            console.log("❌ Invalid submission ID format:", submissionId);
            return res.status(400).json({
                success: false,
                error: 'Invalid submission ID format'
            });
        }

        console.log("🔍 Searching for submission with ID:", submissionId);

        // Check if submission exists
        const submission = await Submission.findById(submissionId);

        if (!submission) {
            console.log(" Submission not found for ID:", submissionId);
            return res.status(404).json({
                success: false,
                error: 'Submission not found in database'
            });
        }

        console.log("Submission found, deleting:", submission._id);

        // Delete the submission
        const result = await Submission.findByIdAndDelete(submissionId);

        if (!result) {
            console.log("❌ Failed to delete submission");
            return res.status(500).json({
                success: false,
                error: 'Failed to delete submission from database'
            });
        }

        console.log(" Submission deleted successfully");

        res.json({
            success: true,
            message: 'Submission deleted successfully',
            deletedId: submissionId
        });

    } catch (err) {
        console.error('❌ Delete submission error:', err);

        let errorMessage = 'Failed to delete submission';
        let statusCode = 500;

        if (err.name === 'CastError') {
            errorMessage = 'Invalid submission ID format';
            statusCode = 400;
        }

        res.status(statusCode).json({
            success: false,
            error: errorMessage,
            details: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
};