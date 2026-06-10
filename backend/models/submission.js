import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const AnswerSchema = new Schema({
    questionId: Number,
    question: String,
    selectedAnswer: String,
    correctAnswer: String,
    isCorrect: Boolean,
    difficulty: String,
    category: String
});

const SubmissionSchema = new Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String, required: true },
    score: { type: Number, required: true },
    company:{type:String,require:true},
    totalQuestions: { type: Number, required: true },
    userAnswers: [AnswerSchema],
    violationCount: { type: Number, default: 0 },
    categoryFilter: { type: String, default: 'all' },
    timeTaken: { type: Number, required: true },
    submittedAt: { type: Date, default: Date.now }
});

const Submission = model('Submission', SubmissionSchema);

export default Submission;