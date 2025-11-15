import express from 'express';
import { submitTest, getAllSubmissions, getSubmissionById, deleteSubmission } from '../controllers/submissionController.js';

const router = express.Router();

// POST /api/submissions/submit
router.post('/submit', submitTest);

// GET /api/submissions
router.get('/', getAllSubmissions);

// GET /api/submissions/all (alternative endpoint)
router.get('/all', getAllSubmissions);

// GET /api/submissions/:id
router.get('/:id', getSubmissionById);

// DELETE /api/submissions/:id
router.delete('/:id', deleteSubmission);

export default router;