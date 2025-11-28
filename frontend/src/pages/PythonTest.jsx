import React, { useState, useEffect } from 'react';
import { pythonQuestions } from '../pythonQuestions';

const PythonTest = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [testStarted, setTestStarted] = useState(false);
    const [testCompleted, setTestCompleted] = useState(false);
    const [userAnswers, setUserAnswers] = useState([]);
    const [timeLeft, setTimeLeft] = useState(3600);
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [fullscreen, setFullscreen] = useState(false);
    const [violationCount, setViolationCount] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [submissionLoading, setSubmissionLoading] = useState(false);
    const [submissionError, setSubmissionError] = useState('');
    const [submissionSuccess, setSubmissionSuccess] = useState('');
    const [backendStatus, setBackendStatus] = useState('checking');
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const filteredQuestions = categoryFilter === 'all'
        ? pythonQuestions
        : pythonQuestions.filter(q => q.category === categoryFilter);

    const generateSubmissionId = () => {
        return 'python-sub-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    };

    const SUBMIT_ENDPOINT = 'https://ssinfotech-backend-k03q.onrender.com/api/submissions/submit';
    const HEALTH_ENDPOINTS = [
        'https://ssinfotech-backend-k03q.onrender.com/health',
        'https://ssinfotech-backend-k03q.onrender.com/api/health'
    ];

    // Google Form URL for Python test submission
    const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfYourPythonFormID/viewform";

    const submitTestToBackend = async (submissionData) => {
        try {
            setSubmissionLoading(true);
            setSubmissionError('');
            setSubmissionSuccess('');

            console.log('Submitting Python test data:', submissionData);

            const response = await fetch(SUBMIT_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submissionData),
            });

            const result = await response.json();
            console.log('Backend response:', result);

            if (response.ok && result.success) {
                setSubmissionSuccess('Your Python test results have been successfully recorded!');
                setBackendStatus('connected');
                return { ...result, synced: true };
            } else {
                throw new Error(result.error || 'Submission failed');
            }
        } catch (error) {
            console.warn('Backend submission failed:', error.message);
            setSubmissionError('Results saved locally (server offline)');
            setBackendStatus('disconnected');
            return { synced: false, error: error.message };
        } finally {
            setSubmissionLoading(false);
        }
    };

    const testBackendConnection = async () => {
        for (const endpoint of HEALTH_ENDPOINTS) {
            try {
                const response = await fetch(endpoint, { method: 'GET' });
                if (response.ok) {
                    setBackendStatus('connected');
                    return true;
                }
            } catch (error) {
                console.log(`Health check failed: ${endpoint}`);
            }
        }
        setBackendStatus('disconnected');
        return false;
    };

    const saveToLocalStorage = (submission, synced = false) => {
        try {
            const existing = JSON.parse(localStorage.getItem('pythonTestSubmissions') || '[]');

            const existingSubmission = existing.find(sub =>
                sub.submissionId === submission.submissionId
            );

            if (existingSubmission) {
                console.log('Python submission already exists in localStorage, updating...');
                const updated = existing.map(sub =>
                    sub.submissionId === submission.submissionId
                        ? { ...submission, localSaveTime: new Date().toISOString(), syncedToBackend: synced }
                        : sub
                );
                localStorage.setItem('pythonTestSubmissions', JSON.stringify(updated));
            } else {
                const newEntry = {
                    ...submission,
                    submissionId: submission.submissionId || generateSubmissionId(),
                    localSaveTime: new Date().toISOString(),
                    syncedToBackend: synced
                };
                existing.unshift(newEntry);
                localStorage.setItem('pythonTestSubmissions', JSON.stringify(existing));
                console.log('New Python submission saved to localStorage:', newEntry);
            }
        } catch (e) {
            console.error('localStorage error:', e);
        }
    };

    const syncPendingSubmissions = async () => {
        const pending = JSON.parse(localStorage.getItem('pythonTestSubmissions') || '[]')
            .filter(s => !s.syncedToBackend);

        for (const sub of pending) {
            const result = await submitTestToBackend(sub);
            if (result.synced) {
                const updated = JSON.parse(localStorage.getItem('pythonTestSubmissions') || '[]')
                    .map(s => s.submissionId === sub.submissionId ? { ...s, syncedToBackend: true } : s);
                localStorage.setItem('pythonTestSubmissions', JSON.stringify(updated));
            }
        }
    };

    const enterFullscreen = () => {
        const elem = document.documentElement;
        (elem.requestFullscreen || elem.webkitRequestFullscreen || elem.msRequestFullscreen)?.call(elem);
        setFullscreen(true);
    };

    const exitFullscreen = () => {
        (document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen)?.call(document);
        setFullscreen(false);
    };

    const handleViolation = () => {
        const newCount = violationCount + 1;
        setViolationCount(newCount);
        if (newCount >= 3) {
            handleTestCompletion();
            alert('Test terminated due to multiple security violations!');
        } else {
            alert(`Security Warning ${newCount}/3: Do not attempt to leave the test environment!`);
        }
    };

    // Security event listeners
    useEffect(() => {
        if (!testStarted || testCompleted) return;

        const visibilityHandler = () => document.hidden && handleViolation();
        const blurHandler = () => handleViolation();
        const fullscreenHandler = () => !document.fullscreenElement && handleViolation();
        const keydownHandler = (e) => {
            if (
                e.key === 'Escape' || e.key === 'F12' ||
                (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)) ||
                (e.ctrlKey && e.key === 'u')
            ) {
                e.preventDefault();
                handleViolation();
            }
        };
        const contextMenuHandler = (e) => e.preventDefault();
        const beforeUnloadHandler = (e) => {
            e.preventDefault();
            e.returnValue = 'Are you sure? Your test will be submitted.';
            return e.returnValue;
        };

        document.addEventListener('visibilitychange', visibilityHandler);
        window.addEventListener('blur', blurHandler);
        document.addEventListener('fullscreenchange', fullscreenHandler);
        document.addEventListener('keydown', keydownHandler);
        document.addEventListener('contextmenu', contextMenuHandler);
        window.addEventListener('beforeunload', beforeUnloadHandler);

        enterFullscreen();
        document.body.style.userSelect = 'none';
        document.body.style.webkitUserSelect = 'none';

        return () => {
            document.removeEventListener('visibilitychange', visibilityHandler);
            window.removeEventListener('blur', blurHandler);
            document.removeEventListener('fullscreenchange', fullscreenHandler);
            document.removeEventListener('keydown', keydownHandler);
            document.removeEventListener('contextmenu', contextMenuHandler);
            window.removeEventListener('beforeunload', beforeUnloadHandler);
            document.body.style.userSelect = '';
            document.body.style.webkitUserSelect = '';
            if (testCompleted) exitFullscreen();
        };
    }, [testStarted, testCompleted, violationCount]);

    // Timer
    useEffect(() => {
        if (!testStarted || testCompleted || timeLeft <= 0) return;
        const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
        if (timeLeft === 0) handleTestCompletion();
        return () => clearInterval(timer);
    }, [testStarted, testCompleted, timeLeft]);

    // Check backend on mount + periodic sync
    useEffect(() => {
        testBackendConnection();
        const interval = setInterval(() => {
            testBackendConnection();
            syncPendingSubmissions();
        }, 30000);
        return () => clearInterval(interval);
    }, []);

    const validateUserInfo = () => {
        if (!userName.trim()) return alert('Please enter your name'), false;
        if (!email.trim()) return alert('Please enter your email'), false;
        if (!phone.trim()) return alert('Please enter your phone number'), false;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return alert('Please enter a valid email address'), false;
        if (!/^[0-9+\-\s()]{10,}$/.test(phone)) return alert('Please enter a valid phone number'), false;
        return true;
    };

    const handleStartTest = async () => {
        if (!validateUserInfo()) return;
        await testBackendConnection();
        setTestStarted(true);
        setStartTime(Date.now());
        setUserAnswers([]);
        setScore(0);
        setCurrentQuestion(0);
        setSelectedAnswer('');
        setViolationCount(0);
        setHasSubmitted(false);
    };

    const handleAnswerSelect = (answer) => setSelectedAnswer(answer);

    const handleNextQuestion = () => {
        const q = filteredQuestions[currentQuestion];
        const isCorrect = selectedAnswer === q.correctAnswer;

        setUserAnswers(prev => [...prev, {
            questionId: q.id,
            question: q.question,
            selectedAnswer,
            correctAnswer: q.correctAnswer,
            isCorrect,
            difficulty: q.difficulty,
            category: q.category,
            explanation: q.explanation
        }]);

        if (isCorrect) setScore(s => s + 1);

        if (currentQuestion < filteredQuestions.length - 1) {
            setCurrentQuestion(c => c + 1);
            setSelectedAnswer('');
        } else {
            handleTestCompletion();
        }
    };

    const handleTestCompletion = async () => {
        if (hasSubmitted) {
            console.log('Python test already submitted, skipping duplicate submission');
            return;
        }

        setHasSubmitted(true);

        const timeTaken = startTime ? Math.floor((Date.now() - startTime) / 1000) : 3600 - timeLeft;

        const submissionData = {
            testType: 'python',
            userName: userName.trim(),
            email: email.trim().toLowerCase(),
            phone: phone.trim(),
            score,
            totalQuestions: filteredQuestions.length,
            userAnswers,
            violationCount,
            categoryFilter,
            timeTaken,
            submittedAt: new Date().toISOString(),
            submissionId: generateSubmissionId()
        };

        console.log('Submitting Python test with ID:', submissionData.submissionId);

        saveToLocalStorage(submissionData, false);

        const result = await submitTestToBackend(submissionData);

        saveToLocalStorage(submissionData, result.synced);

        setTestCompleted(true);
        setTestStarted(false);
        exitFullscreen();
    };

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h}:${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const resetTest = () => {
        setUserName(''); setEmail(''); setPhone('');
        setTestStarted(false); setTestCompleted(false);
        setCurrentQuestion(0); setSelectedAnswer(''); setScore(0);
        setUserAnswers([]); setTimeLeft(3600); setCategoryFilter('all');
        setViolationCount(0); setSubmissionError(''); setSubmissionSuccess('');
        setBackendStatus('checking');
        setHasSubmitted(false);
        testBackendConnection();
    };

    const getDifficultyColor = (d) => {
        return d === 'medium' ? 'bg-yellow-100 text-yellow-800' :
            d === 'hard' ? 'bg-red-100 text-red-800' :
                'bg-green-100 text-green-800';
    };

    const getCategoryColor = (c) => {
        return c === 'Basic Syntax' ? 'bg-blue-100 text-blue-800' :
            c === 'Data Types' ? 'bg-purple-100 text-purple-800' :
                c === 'Functions' ? 'bg-indigo-100 text-indigo-800' :
                    c === 'OOP' ? 'bg-pink-100 text-pink-800' :
                        c === 'Data Structures' ? 'bg-teal-100 text-teal-800' :
                            'bg-gray-100 text-gray-800';
    };

    const getBackendStatusColor = () => {
        return backendStatus === 'connected' ? 'bg-green-100 text-green-800' :
            backendStatus === 'disconnected' ? 'bg-yellow-100 text-yellow-800' :
                backendStatus === 'error' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800';
    };

    const getBackendStatusText = () => {
        return backendStatus === 'connected' ? '' :
            backendStatus === 'disconnected' ? 'Backend Offline' :
                backendStatus === 'error' ? 'Connection Error' :
                    'Checking Status...';
    };

    const handleGoogleFormClick = () => {
        window.open(GOOGLE_FORM_URL, '_blank', 'noopener,noreferrer');
    };

    // Get category counts
    const getCategoryCounts = () => {
        const counts = {};
        pythonQuestions.forEach(q => {
            counts[q.category] = (counts[q.category] || 0) + 1;
        });
        return counts;
    };

    const categoryCounts = getCategoryCounts();

    // === UI: START SCREEN ===
    if (!testStarted && !testCompleted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="text-center mb-6">
                            <h1 className="text-4xl font-bold text-gray-800 mb-2">
                                Python Programming Test
                            </h1>
                            <p className="text-gray-600">Test your Python programming skills</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div>
                                <label className="block text-lg font-medium text-gray-700 mb-2">Full Name *</label>
                                <input type="text" value={userName} onChange={e => setUserName(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="John Doe" />
                            </div>
                            <div>
                                <label className="block text-lg font-medium text-gray-700 mb-2">Email *</label>
                                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="john@example.com" />
                            </div>
                            <div>
                                <label className="block text-lg font-medium text-gray-700 mb-2">Phone Number *</label>
                                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="+1234567890" />
                            </div>
                            <div>
                                <label className="block text-lg font-medium text-gray-700 mb-2">Test Category</label>
                                <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                    <option value="all">All Categories ({pythonQuestions.length} Questions)</option>
                                    {Object.entries(categoryCounts).map(([category, count]) => (
                                        <option key={category} value={category}>
                                            {category} ({count} Questions)
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            {Object.entries(categoryCounts).map(([category, count]) => (
                                <div key={category} className="bg-blue-50 p-4 rounded-lg text-center">
                                    <div className="text-2xl font-bold text-blue-600">{count}</div>
                                    <div className="text-blue-700 font-medium text-sm">{category}</div>
                                </div>
                            ))}
                        </div> */}

                        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
                            <h3 className="text-lg font-semibold text-red-800 mb-2">Security Measures:</h3>
                            <ul className="list-disc list-inside text-red-700 space-y-1">
                                <li>Fullscreen mode will be enforced</li>
                                <li>Tab/window switching is prohibited</li>
                                <li>Right-click and developer tools are disabled</li>
                                <li>3 security violations will auto-submit your test</li>
                            </ul>
                        </div>

                        <div className="bg-blue-50 rounded-lg p-6 mb-8">
                            <h3 className="text-lg font-semibold text-blue-800 mb-2">Test Information:</h3>
                            <ul className="list-disc list-inside text-blue-700 space-y-1">
                                <li>Total Questions: {filteredQuestions.length}</li>
                                <li>Time Limit: 60 minutes (1 hour)</li>
                                <li>All questions are multiple choice</li>
                                <li>No negative marking</li>
                                <li>Your results will be saved automatically</li>
                                <li>Backup storage in browser</li>
                                <li>Topics: Basic Syntax, Data Types, OOP, Functions, Data Structures</li>
                            </ul>
                        </div>

                        {backendStatus === 'disconnected' && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                                <p className="text-yellow-700 text-center">
                                    Backend server is not connected. Test results will be saved locally in your browser.
                                </p>
                            </div>
                        )}

                        <button
                            onClick={handleStartTest}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={backendStatus === 'checking'}
                        >
                            {backendStatus === 'checking' ? 'Checking Connection...' : 'Start Python Test'}
                        </button>

                        {backendStatus === 'disconnected' && (
                            <div className="mt-4 text-center">
                                <button onClick={testBackendConnection} className="text-blue-600 hover:text-blue-800 underline text-sm">
                                    Retry Backend Connection
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // === UI: TEST IN PROGRESS ===
    if (testStarted && !testCompleted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Main Test Content - 3/4 width */}
                        <div className="lg:col-span-3">
                            <div className="bg-white rounded-2xl shadow-xl p-8">
                                <div className="flex justify-between items-center mb-8">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-800">Python Programming Test</h2>
                                        <p className="text-gray-600">Candidate: {userName}</p>
                                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getBackendStatusColor()}`}>
                                            {getBackendStatusText()}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-lg font-semibold text-gray-700">
                                            Time Left: <span className={timeLeft < 300 ? "text-red-600 font-bold" : "text-gray-800"}>
                                                {formatTime(timeLeft)}
                                            </span>
                                        </div>
                                        <div className="text-gray-600">
                                            Question {currentQuestion + 1} of {filteredQuestions.length}
                                        </div>
                                        <div className="text-sm text-red-600">
                                            Violations: {violationCount}/3
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
                                    <div className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${((currentQuestion + 1) / filteredQuestions.length) * 100}%` }}></div>
                                </div>

                                <div className="mb-8">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex gap-2">
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(filteredQuestions[currentQuestion].category)}`}>
                                                {filteredQuestions[currentQuestion].category}
                                            </span>
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(filteredQuestions[currentQuestion].difficulty)}`}>
                                                {filteredQuestions[currentQuestion].difficulty.toUpperCase()}
                                            </span>
                                        </div>
                                        <span className="text-sm text-gray-500">
                                            Q{filteredQuestions[currentQuestion].id}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-semibold text-gray-800 mb-6 leading-relaxed">
                                        {filteredQuestions[currentQuestion].question}
                                    </h3>

                                    <div className="space-y-3">
                                        {filteredQuestions[currentQuestion].options.map((option, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleAnswerSelect(option)}
                                                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${selectedAnswer === option
                                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25'
                                                    }`}
                                            >
                                                <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-between">
                                    <button
                                        onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                                        disabled={currentQuestion === 0}
                                        className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Previous
                                    </button>

                                    <button
                                        onClick={handleNextQuestion}
                                        disabled={!selectedAnswer}
                                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {currentQuestion === filteredQuestions.length - 1 ? 'Finish Test' : 'Next Question'}
                                    </button>
                                </div>

                                <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                                        </svg>
                                        <span className="text-red-700 font-medium">
                                            SECURITY ACTIVE: {violationCount > 0 && `Violations: ${violationCount}/3`}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Advertisement Sidebar - 1/4 width */}
                        <div className="lg:col-span-1 space-y-4">
                            {/* SS SKILL 2 SUCCESS Ad */}
                            <div className="bg-gradient-to-b from-blue-600 to-purple-700 rounded-2xl shadow-lg p-4 text-white">
                                <div className="text-center mb-3">
                                    <h3 className="font-bold text-sm mb-1">SS Traning Center</h3>
                                    <p className="text-xs mb-2">AI-DATA ANALYTICS</p>
                                    <div className="bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
                                        FORAGE CERTIFICATION
                                    </div>
                                </div>

                                <div className="text-xs space-y-1 mb-3">
                                    <p className="font-semibold text-yellow-300">TOPICS:</p>
                                    <p>• Excel, BI Tools, SQL</p>
                                    <p>• Python, Data Science</p>
                                    <p>• WebScraping, API</p>
                                </div>

                                <div className="text-xs space-y-1 mb-3">
                                    <p className="font-semibold text-yellow-300">PERKS:</p>
                                    <p>• Industry Experts</p>
                                    <p>• Placement Assistance</p>
                                    <p>• Internship Certificate</p>
                                </div>

                                <div className="bg-white text-blue-600 text-center py-1 rounded-lg text-xs font-bold mb-2">
                                    GRAB YOUR SEAT NOW!
                                </div>

                                <div className="text-center text-xs">
                                    <p className="font-semibold">Contact:</p>
                                    <p>9422129534</p>
                                    <p>7719927774</p>
                                </div>
                            </div>

                            {/* ANSWERCRAFT Ad */}
                            <div className="bg-gradient-to-b from-green-600 to-blue-700 rounded-2xl shadow-lg p-4 text-white">
                                <div className="text-center mb-3">
                                    <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full mb-1">
                                        LAUNCHING
                                    </div>
                                    <h3 className="font-bold text-sm mb-1">ANSWERCRAFT</h3>
                                    <p className="text-xs mb-2">Get "HIRED" Skills</p>
                                </div>

                                <div className="text-xs space-y-1 mb-3">
                                    <p className="font-semibold text-yellow-300">YOU GET:</p>
                                    <p>• STAR+ Strategy</p>
                                    <p>• HR Question Handling</p>
                                    <p>• Interview Practice</p>
                                    <p>• Negotiation Skills</p>
                                </div>

                                <div className="bg-yellow-400 text-black text-center py-1 rounded-lg text-xs font-bold mb-2">
                                    JOIN NOW!
                                </div>

                                <div className="text-center text-xs">
                                    <p className="font-semibold">Contact:</p>
                                    <p>7719927774</p>
                                    <p>7720846048</p>
                                    <p className="text-xs mt-1">skill2success.in</p>
                                </div>

                                <div className="text-center mt-2 pt-2 border-t border-white/30">
                                    <p className="font-bold text-xs">ALLAN ABHRAHAM</p>
                                    <p className="text-xs">14+ Years Experience</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // === UI: RESULTS SCREEN ===
    if (testCompleted) {
        const categoryStats = {};
        pythonQuestions.forEach(q => {
            categoryStats[q.category] = { total: 0, correct: 0 };
        });

        userAnswers.forEach(a => {
            if (categoryStats[a.category]) {
                categoryStats[a.category].total++;
                if (a.isCorrect) categoryStats[a.category].correct++;
            }
        });

        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 py-8 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">Python Test Completed</h1>
                            <p className="text-gray-600">Congratulations {userName} on completing the Python programming test</p>

                            {submissionSuccess && (
                                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                                    <p className="text-green-700">{submissionSuccess}</p>
                                </div>
                            )}

                            {submissionError && (
                                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                    <p className="text-yellow-700">{submissionError}</p>
                                </div>
                            )}

                            {violationCount > 0 && (
                                <p className="text-yellow-600 mt-2">
                                    Note: {violationCount} security violation(s) were recorded during your test.
                                </p>
                            )}

                            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 ${getBackendStatusColor()}`}>
                                {getBackendStatusText()}
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white text-center mb-8">
                            <h2 className="text-2xl font-bold mb-4">Your Python Test Score</h2>
                            <div className="text-5xl font-bold mb-2">{score}/{filteredQuestions.length}</div>
                            <div className="text-xl">
                                {((score / filteredQuestions.length) * 100).toFixed(1)}%
                            </div>
                            <div className="text-sm mt-2">
                                Time Taken: {formatTime(3600 - timeLeft)}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            {Object.entries(categoryStats).map(([category, stats]) => (
                                stats.total > 0 && (
                                    <div key={category} className={`p-4 rounded-lg text-center ${getCategoryColor(category).replace('text', 'bg').split(' ')[0]}`}>
                                        <div className={`text-xl font-bold ${getCategoryColor(category).split(' ')[1]}`}>
                                            {stats.correct}/{stats.total}
                                        </div>
                                        <div className={`text-sm font-medium ${getCategoryColor(category).split(' ')[1]}`}>
                                            {category}
                                        </div>
                                        <div className={`text-xs ${getCategoryColor(category).split(' ')[1]}`}>
                                            {((stats.correct / stats.total) * 100).toFixed(1)}%
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Detailed Results</h3>
                            <div className="bg-gray-50 rounded-lg p-6">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                                    <div><div className="text-2xl font-bold text-green-600">{score}</div><div className="text-gray-600">Correct Answers</div></div>
                                    <div><div className="text-2xl font-bold text-red-600">{filteredQuestions.length - score}</div><div className="text-gray-600">Incorrect Answers</div></div>
                                    <div><div className="text-2xl font-bold text-blue-600">{userAnswers.length}</div><div className="text-gray-600">Questions Attempted</div></div>
                                    <div><div className="text-2xl font-bold text-purple-600">{filteredQuestions.length - userAnswers.length}</div><div className="text-gray-600">Skipped Questions</div></div>
                                </div>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Question Review</h3>
                            <div className="space-y-4">
                                {userAnswers.map((answer, index) => (
                                    <div key={index} className={`border rounded-lg p-4 ${answer.isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="font-semibold">Q{index + 1}: {answer.question}</span>
                                            <span className={`px-2 py-1 rounded text-xs ${answer.isCorrect ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                                                {answer.isCorrect ? 'CORRECT' : 'INCORRECT'}
                                            </span>
                                        </div>
                                        <div className="text-sm">
                                            <p><strong>Your answer:</strong> {answer.selectedAnswer}</p>
                                            <p><strong>Correct answer:</strong> {answer.correctAnswer}</p>
                                            {answer.explanation && (
                                                <p className="mt-2 text-gray-600"><strong>Explanation:</strong> {answer.explanation}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Google Form Button Section */}
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
                            <div className="text-center">
                                <h3 className="text-xl font-bold text-yellow-800 mb-3">Next Step: Complete Online Test Form</h3>
                                <p className="text-yellow-700 mb-4">
                                    Please click the button below to complete the official Google Form for your Python test submission.
                                    This is required to finalize your application process.
                                </p>
                                <button
                                    onClick={handleGoogleFormClick}
                                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 flex items-center justify-center mx-auto"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M14.4 12.8H12v2.4h2.4V12.8zM21.6 12c0-1.2-.4-2.4-1.2-3.2l-2.4 2.4c.4.8.4 1.6.4 2.4 0 .8-.4 1.6-.4 2.4l2.4 2.4c.8-.8 1.2-2 1.2-3.2zM12 7.2c-2.4 0-4.4 2-4.4 4.4s2 4.4 4.4 4.4 4.4-2 4.4-4.4-2-4.4-4.4-4.4zM2.4 12c0-1.2.4-2.4 1.2-3.2l2.4 2.4c-.4.8-.4 1.6-.4 2.4 0 .8.4 1.6.4 2.4l-2.4 2.4c-.8-.8-1.2-2-1.2-3.2z" />
                                    </svg>
                                    Complete Google Form
                                </button>
                                <p className="text-yellow-600 text-sm mt-3">
                                    Note: If you are giving this test online, please fill the Google Form only. You don't need to take the test again.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button onClick={resetTest}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
                                Take Test Again
                            </button>
                            <button onClick={() => window.print()}
                                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
                                Print Results
                            </button>
                        </div>

                        {backendStatus === 'disconnected' && (
                            <div className="mt-6 text-center">
                                <p className="text-sm text-gray-600">
                                    Your Python test results are saved in your browser's local storage.
                                    They will be available until you clear your browser data.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
};

export default PythonTest;