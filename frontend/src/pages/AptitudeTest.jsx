import React, { useState, useEffect } from 'react';

const AptitudeTest = () => {
    const [userName, setUserName] = useState('');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [testStarted, setTestStarted] = useState(false);
    const [testCompleted, setTestCompleted] = useState(false);
    const [userAnswers, setUserAnswers] = useState([]);
    const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [fullscreen, setFullscreen] = useState(false);
    const [violationCount, setViolationCount] = useState(0);

    // Comprehensive Aptitude Questions - Only Medium and Hard (15 each section)
    const aptitudeQuestions = [
        // Logical Questions - Medium & Hard only (15 questions)
        {
            id: 1,
            question: "Complete the series: 2, 6, 18, 54, ?",
            options: ["108", "162", "216", "81"],
            correctAnswer: "162",
            difficulty: "medium",
            category: "Logical"
        },
        {
            id: 2,
            question: "Find the missing number: 5, 11, 19, 29, ?, 55",
            options: ["39", "41", "45", "49"],
            correctAnswer: "41",
            difficulty: "medium",
            category: "Logical"
        },
        {
            id: 3,
            question: "A clock shows 3:15. What is the angle between the hour and minute hands?",
            options: ["0°", "7.5°", "15°", "30°"],
            correctAnswer: "7.5°",
            difficulty: "hard",
            category: "Logical"
        },
        {
            id: 4,
            question: "If CODE is written as DPEH, how is BOOK written?",
            options: ["CPPL", "CPQM", "CQPL", "CPQL"],
            correctAnswer: "CPPL",
            difficulty: "medium",
            category: "Logical"
        },
        {
            id: 5,
            question: "A man is 3 years older than his wife and 4 times as old as his son. If the son is 10 years old, how old is the wife?",
            options: ["32", "35", "37", "40"],
            correctAnswer: "37",
            difficulty: "medium",
            category: "Logical"
        },
        {
            id: 6,
            question: "If 5 workers can complete a work in 12 days, how many days will 6 workers take?",
            options: ["10", "11", "12", "13"],
            correctAnswer: "10",
            difficulty: "medium",
            category: "Logical"
        },
        {
            id: 7,
            question: "What comes next: A, C, F, J, ?",
            options: ["N", "O", "P", "Q"],
            correctAnswer: "O",
            difficulty: "hard",
            category: "Logical"
        },
        {
            id: 8,
            question: "A train 100m long crosses a pole in 5 seconds. What is its speed in km/h?",
            options: ["72", "90", "108", "120"],
            correctAnswer: "72",
            difficulty: "hard",
            category: "Logical"
        },
        {
            id: 9,
            question: "If RED is coded as 27, BLUE is coded as 40, how is GREEN coded?",
            options: ["49", "56", "60", "64"],
            correctAnswer: "56",
            difficulty: "hard",
            category: "Logical"
        },
        {
            id: 10,
            question: "What is the probability of getting a prime number when a die is rolled?",
            options: ["1/2", "1/3", "1/4", "2/3"],
            correctAnswer: "1/2",
            difficulty: "medium",
            category: "Logical"
        },
        {
            id: 11,
            question: "A shop offers 20% discount and still makes 20% profit. What is the marked price if cost price is $200?",
            options: ["300", "320", "350", "400"],
            correctAnswer: "300",
            difficulty: "hard",
            category: "Logical"
        },
        {
            id: 12,
            question: "If 2^x = 8^(y+1) and 9^y = 3^(x-9), find the value of x+y",
            options: ["18", "21", "24", "27"],
            correctAnswer: "21",
            difficulty: "hard",
            category: "Logical"
        },
        {
            id: 13,
            question: "The ratio of boys to girls in a class is 3:2. If 5 more boys join, the ratio becomes 7:4. How many girls are there?",
            options: ["20", "24", "28", "32"],
            correctAnswer: "24",
            difficulty: "medium",
            category: "Logical"
        },
        {
            id: 14,
            question: "A number when divided by 133 gives a remainder of 49. What is the remainder when the same number is divided by 7?",
            options: ["0", "1", "3", "5"],
            correctAnswer: "0",
            difficulty: "hard",
            category: "Logical"
        },
        {
            id: 15,
            question: "In how many different ways can the letters of the word 'LEADING' be arranged?",
            options: ["2520", "5040", "720", "360"],
            correctAnswer: "5040",
            difficulty: "medium",
            category: "Logical"
        },

        // Technical Questions - Medium & Hard only (15 questions)
        {
            id: 16,
            question: "What is the time complexity of binary search?",
            options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
            correctAnswer: "O(log n)",
            difficulty: "medium",
            category: "Technical"
        },
        {
            id: 17,
            question: "Which protocol is used for secure web browsing?",
            options: ["HTTP", "FTP", "HTTPS", "SMTP"],
            correctAnswer: "HTTPS",
            difficulty: "medium",
            category: "Technical"
        },
        {
            id: 18,
            question: "What is the main purpose of an API?",
            options: [
                "To connect different software applications",
                "To store data",
                "To design user interfaces",
                "To compile code"
            ],
            correctAnswer: "To connect different software applications",
            difficulty: "medium",
            category: "Technical"
        },
        {
            id: 19,
            question: "Which of these is a NoSQL database?",
            options: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"],
            correctAnswer: "MongoDB",
            difficulty: "medium",
            category: "Technical"
        },
        {
            id: 20,
            question: "Which algorithm is used for shortest path finding?",
            options: ["Dijkstra", "Bubble Sort", "Quick Sort", "Binary Search"],
            correctAnswer: "Dijkstra",
            difficulty: "hard",
            category: "Technical"
        },
        {
            id: 21,
            question: "What is the output of '2' + 2 in JavaScript?",
            options: ["4", "22", "NaN", "Error"],
            correctAnswer: "22",
            difficulty: "medium",
            category: "Technical"
        },
        {
            id: 22,
            question: "Which HTTP method is used for updating data?",
            options: ["GET", "POST", "PUT", "DELETE"],
            correctAnswer: "PUT",
            difficulty: "medium",
            category: "Technical"
        },
        {
            id: 23,
            question: "What is object-oriented programming?",
            options: [
                "Programming with objects and classes",
                "Programming without functions",
                "Web development only",
                "Database programming"
            ],
            correctAnswer: "Programming with objects and classes",
            difficulty: "medium",
            category: "Technical"
        },
        {
            id: 24,
            question: "What is the time complexity of quicksort in worst case?",
            options: ["O(n log n)", "O(n²)", "O(log n)", "O(n)"],
            correctAnswer: "O(n²)",
            difficulty: "hard",
            category: "Technical"
        },
        {
            id: 25,
            question: "Which data structure is best for implementing a priority queue?",
            options: ["Array", "Linked List", "Heap", "Stack"],
            correctAnswer: "Heap",
            difficulty: "hard",
            category: "Technical"
        },
        {
            id: 26,
            question: "What is the purpose of a virtual DOM in React?",
            options: [
                "To improve performance by minimizing direct DOM manipulation",
                "To create virtual reality applications",
                "To store data securely",
                "To handle API calls"
            ],
            correctAnswer: "To improve performance by minimizing direct DOM manipulation",
            difficulty: "hard",
            category: "Technical"
        },
        {
            id: 27,
            question: "Which of these is NOT a JavaScript framework?",
            options: ["Angular", "React", "Vue", "Django"],
            correctAnswer: "Django",
            difficulty: "medium",
            category: "Technical"
        },
        {
            id: 28,
            question: "What does CSS stand for?",
            options: [
                "Computer Style Sheets",
                "Creative Style System",
                "Cascading Style Sheets",
                "Colorful Style Sheets"
            ],
            correctAnswer: "Cascading Style Sheets",
            difficulty: "medium",
            category: "Technical"
        },
        {
            id: 29,
            question: "Which sorting algorithm has the best average-case time complexity?",
            options: ["Bubble Sort", "Quick Sort", "Selection Sort", "Insertion Sort"],
            correctAnswer: "Quick Sort",
            difficulty: "hard",
            category: "Technical"
        },
        {
            id: 30,
            question: "What is the main difference between SQL and NoSQL databases?",
            options: [
                "SQL is relational, NoSQL is non-relational",
                "SQL is faster than NoSQL",
                "NoSQL uses tables, SQL uses documents",
                "SQL is for mobile apps, NoSQL for web apps"
            ],
            correctAnswer: "SQL is relational, NoSQL is non-relational",
            difficulty: "medium",
            category: "Technical"
        },

        // Reasoning Questions - Medium & Hard only (15 questions)
        {
            id: 31,
            question: "If all roses are flowers and some flowers fade quickly, which statement must be true?",
            options: [
                "All roses fade quickly",
                "Some roses fade quickly",
                "No roses fade quickly",
                "Some flowers that fade quickly are roses"
            ],
            correctAnswer: "Some flowers that fade quickly are roses",
            difficulty: "hard",
            category: "Reasoning"
        },
        {
            id: 32,
            question: "Find the missing number: 3, 7, 15, 31, ?",
            options: ["45", "63", "47", "59"],
            correctAnswer: "63",
            difficulty: "medium",
            category: "Reasoning"
        },
        {
            id: 33,
            question: "If TEACHER is coded as UBDDIFS, how is STUDENT coded?",
            options: ["TUVEUOU", "TUVFUOU", "TUVFVFV", "TUVFUPU"],
            correctAnswer: "TUVFUOU",
            difficulty: "hard",
            category: "Reasoning"
        },
        {
            id: 34,
            question: "A is B's sister. C is B's mother. D is C's father. How is A related to D?",
            options: ["Granddaughter", "Daughter", "Niece", "Sister"],
            correctAnswer: "Granddaughter",
            difficulty: "medium",
            category: "Reasoning"
        },
        {
            id: 35,
            question: "If Monday is the first day, what is the 25th day?",
            options: ["Tuesday", "Wednesday", "Thursday", "Friday"],
            correctAnswer: "Thursday",
            difficulty: "medium",
            category: "Reasoning"
        },
        {
            id: 36,
            question: "If all managers are executives and some executives are directors, which is definitely true?",
            options: [
                "Some managers are directors",
                "All directors are executives",
                "Some directors are managers",
                "Some executives are managers"
            ],
            correctAnswer: "Some executives are managers",
            difficulty: "hard",
            category: "Reasoning"
        },
        {
            id: 37,
            question: "If 20% of a = b, then b% of 20 is the same as:",
            options: ["4% of a", "5% of a", "20% of a", "10% of a"],
            correctAnswer: "4% of a",
            difficulty: "hard",
            category: "Reasoning"
        },
        {
            id: 38,
            question: "Complete the series: Z, X, V, T, R, ?",
            options: ["P", "O", "Q", "N"],
            correctAnswer: "P",
            difficulty: "medium",
            category: "Reasoning"
        },
        {
            id: 39,
            question: "A man walks 5 km South, then 3 km East, then 5 km North. How far is he from starting point?",
            options: ["3 km", "5 km", "8 km", "13 km"],
            correctAnswer: "3 km",
            difficulty: "hard",
            category: "Reasoning"
        },
        {
            id: 40,
            question: "If 3x + 7 = 22, what is the value of x²?",
            options: ["25", "36", "49", "64"],
            correctAnswer: "25",
            difficulty: "medium",
            category: "Reasoning"
        },
        {
            id: 41,
            question: "Find the odd one out: Java, Python, C++, Keyboard",
            options: ["Java", "Python", "C++", "Keyboard"],
            correctAnswer: "Keyboard",
            difficulty: "medium",
            category: "Reasoning"
        },
        {
            id: 42,
            question: "If A is the brother of B; B is the sister of C; and C is the father of D, how is A related to D?",
            options: ["Uncle", "Father", "Brother", "Grandfather"],
            correctAnswer: "Uncle",
            difficulty: "hard",
            category: "Reasoning"
        },
        {
            id: 43,
            question: "Complete the analogy: Ocean is to Water as Desert is to?",
            options: ["Sand", "Heat", "Cactus", "Oasis"],
            correctAnswer: "Sand",
            difficulty: "medium",
            category: "Reasoning"
        },
        {
            id: 44,
            question: "Find the missing number: 2, 6, 12, 20, 30, ?",
            options: ["42", "44", "46", "48"],
            correctAnswer: "42",
            difficulty: "medium",
            category: "Reasoning"
        },
        {
            id: 45,
            question: "If 'PENCIL' is written as 'QFMHJK', how is 'PAPER' written?",
            options: ["QBQFS", "QBQFT", "QBPFS", "QBPFT"],
            correctAnswer: "QBQFS",
            difficulty: "hard",
            category: "Reasoning"
        }
    ];

    const filteredQuestions = categoryFilter === 'all'
        ? aptitudeQuestions
        : aptitudeQuestions.filter(q => q.category === categoryFilter);

    // Enhanced security functions
    const enterFullscreen = () => {
        const element = document.documentElement;
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
        setFullscreen(true);
    };

    const exitFullscreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
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

    // Enhanced security event handlers
    useEffect(() => {
        let visibilityChangeHandler;
        let blurHandler;
        let focusHandler;
        let fullscreenChangeHandler;
        let keyDownHandler;
        let contextMenuHandler;
        let beforeUnloadHandler;

        if (testStarted && !testCompleted) {
            // Page visibility change (switching tabs)
            visibilityChangeHandler = () => {
                if (document.hidden) {
                    handleViolation();
                    // Force focus back
                    window.focus();
                }
            };

            // Window blur (switching windows)
            blurHandler = () => {
                handleViolation();
                window.focus();
            };

            // Window focus (coming back to window)
            focusHandler = () => {
                if (!document.hasFocus()) {
                    handleViolation();
                    window.focus();
                }
            };

            // Fullscreen change
            fullscreenChangeHandler = () => {
                if (!document.fullscreenElement &&
                    !document.webkitFullscreenElement &&
                    !document.msFullscreenElement) {
                    handleViolation();
                    enterFullscreen();
                }
            };

            // Keyboard restrictions
            keyDownHandler = (e) => {
                // Block Escape key, function keys, developer tools shortcuts
                if (e.key === 'Escape' ||
                    e.key === 'F12' ||
                    (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
                    (e.ctrlKey && e.key === 'u') ||
                    (e.altKey && e.key === 'Tab')) {
                    e.preventDefault();
                    handleViolation();
                }
            };

            // Right-click context menu
            contextMenuHandler = (e) => {
                e.preventDefault();
                handleViolation();
            };

            // Before unload (closing tab/window)
            beforeUnloadHandler = (e) => {
                e.preventDefault();
                e.returnValue = 'Are you sure you want to leave? Your test progress will be lost and this may be considered a violation.';
                return e.returnValue;
            };

            // Add event listeners
            document.addEventListener('visibilitychange', visibilityChangeHandler);
            window.addEventListener('blur', blurHandler);
            window.addEventListener('focus', focusHandler);
            document.addEventListener('fullscreenchange', fullscreenChangeHandler);
            document.addEventListener('webkitfullscreenchange', fullscreenChangeHandler);
            document.addEventListener('msfullscreenchange', fullscreenChangeHandler);
            document.addEventListener('keydown', keyDownHandler);
            document.addEventListener('contextmenu', contextMenuHandler);
            window.addEventListener('beforeunload', beforeUnloadHandler);

            // Enter fullscreen
            enterFullscreen();

            // Disable text selection
            document.body.style.userSelect = 'none';
            document.body.style.webkitUserSelect = 'none';
        }

        return () => {
            // Cleanup event listeners
            if (visibilityChangeHandler) {
                document.removeEventListener('visibilitychange', visibilityChangeHandler);
            }
            if (blurHandler) {
                window.removeEventListener('blur', blurHandler);
            }
            if (focusHandler) {
                window.removeEventListener('focus', focusHandler);
            }
            if (fullscreenChangeHandler) {
                document.removeEventListener('fullscreenchange', fullscreenChangeHandler);
                document.removeEventListener('webkitfullscreenchange', fullscreenChangeHandler);
                document.removeEventListener('msfullscreenchange', fullscreenChangeHandler);
            }
            if (keyDownHandler) {
                document.removeEventListener('keydown', keyDownHandler);
            }
            if (contextMenuHandler) {
                document.removeEventListener('contextmenu', contextMenuHandler);
            }
            if (beforeUnloadHandler) {
                window.removeEventListener('beforeunload', beforeUnloadHandler);
            }

            // Re-enable text selection
            document.body.style.userSelect = '';
            document.body.style.webkitUserSelect = '';

            // Exit fullscreen if test is completed
            if (testCompleted && fullscreen) {
                exitFullscreen();
            }
        };
    }, [testStarted, testCompleted, fullscreen, violationCount]);

    useEffect(() => {
        let timer;
        if (testStarted && !testCompleted && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(time => time - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            handleTestCompletion();
        }
        return () => clearInterval(timer);
    }, [testStarted, testCompleted, timeLeft]);

    const handleStartTest = () => {
        if (userName.trim()) {
            setTestStarted(true);
            setUserAnswers([]);
            setScore(0);
            setCurrentQuestion(0);
            setSelectedAnswer('');
            setViolationCount(0);
        } else {
            alert('Please enter your name to start the test');
        }
    };

    const handleAnswerSelect = (answer) => {
        setSelectedAnswer(answer);
    };

    const handleNextQuestion = () => {
        const isCorrect = selectedAnswer === filteredQuestions[currentQuestion].correctAnswer;

        setUserAnswers(prev => [...prev, {
            questionId: filteredQuestions[currentQuestion].id,
            question: filteredQuestions[currentQuestion].question,
            selectedAnswer,
            correctAnswer: filteredQuestions[currentQuestion].correctAnswer,
            isCorrect,
            difficulty: filteredQuestions[currentQuestion].difficulty,
            category: filteredQuestions[currentQuestion].category
        }]);

        if (isCorrect) {
            setScore(prev => prev + 1);
        }

        if (currentQuestion < filteredQuestions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
            setSelectedAnswer('');
        } else {
            handleTestCompletion();
        }
    };

    const handleTestCompletion = () => {
        setTestCompleted(true);
        setTestStarted(false);
        exitFullscreen();
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const resetTest = () => {
        setUserName('');
        setTestStarted(false);
        setTestCompleted(false);
        setCurrentQuestion(0);
        setSelectedAnswer('');
        setScore(0);
        setUserAnswers([]);
        setTimeLeft(3600);
        setCategoryFilter('all');
        setViolationCount(0);
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'medium': return 'bg-yellow-100 text-yellow-800';
            case 'hard': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getCategoryColor = (category) => {
        switch (category) {
            case 'Logical': return 'bg-blue-100 text-blue-800';
            case 'Technical': return 'bg-purple-100 text-purple-800';
            case 'Reasoning': return 'bg-indigo-100 text-indigo-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (!testStarted && !testCompleted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
                            Secure Aptitude Test
                        </h1>

                        <div className="mb-8">
                            <label className="block text-lg font-medium text-gray-700 mb-2">
                                Enter Your Name
                            </label>
                            <input
                                type="text"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="John Doe"
                            />
                        </div>

                        <div className="mb-8">
                            <label className="block text-lg font-medium text-gray-700 mb-2">
                                Select Test Category
                            </label>
                            <select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">All Categories (45 Questions)</option>
                                <option value="Logical">Logical Only (15 Questions)</option>
                                <option value="Technical">Technical Only (15 Questions)</option>
                                <option value="Reasoning">Reasoning Only (15 Questions)</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                            <div className="bg-blue-50 p-4 rounded-lg text-center">
                                <div className="text-2xl font-bold text-blue-600">15</div>
                                <div className="text-blue-700 font-medium">Logical Questions</div>
                                <div className="text-sm text-blue-600 mt-1">Medium & Hard Level</div>
                            </div>
                            <div className="bg-purple-50 p-4 rounded-lg text-center">
                                <div className="text-2xl font-bold text-purple-600">15</div>
                                <div className="text-purple-700 font-medium">Technical Questions</div>
                                <div className="text-sm text-purple-600 mt-1">Medium & Hard Level</div>
                            </div>
                            <div className="bg-indigo-50 p-4 rounded-lg text-center">
                                <div className="text-2xl font-bold text-indigo-600">15</div>
                                <div className="text-indigo-700 font-medium">Reasoning Questions</div>
                                <div className="text-sm text-indigo-600 mt-1">Medium & Hard Level</div>
                            </div>
                        </div>

                        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
                            <h3 className="text-lg font-semibold text-red-800 mb-2">⚠️ Strict Security Measures:</h3>
                            <ul className="list-disc list-inside text-red-700 space-y-1">
                                <li>Fullscreen mode will be enforced</li>
                                <li>Tab/window switching is prohibited</li>
                                <li>Right-click and developer tools are disabled</li>
                                <li>Escape key and function keys are blocked</li>
                                <li>3 security violations will auto-submit your test</li>
                                <li>Text selection is disabled during test</li>
                            </ul>
                        </div>

                        <div className="bg-blue-50 rounded-lg p-6 mb-8">
                            <h3 className="text-lg font-semibold text-blue-800 mb-2">Test Information:</h3>
                            <ul className="list-disc list-inside text-blue-700 space-y-1">
                                <li>Total Questions: {filteredQuestions.length}</li>
                                <li>Time Limit: 60 minutes</li>
                                <li>All questions are multiple choice</li>
                                <li>Only Medium and Hard difficulty questions</li>
                                <li>No negative marking</li>
                            </ul>
                        </div>

                        <button
                            onClick={handleStartTest}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition duration-300 transform hover:scale-105"
                        >
                            Start Secure Test
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (testStarted && !testCompleted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">Secure Aptitude Test</h2>
                                <p className="text-gray-600">Candidate: {userName}</p>
                            </div>
                            <div className="text-right">
                                <div className="text-lg font-semibold text-gray-700">
                                    Time Left: <span className="text-red-600">{formatTime(timeLeft)}</span>
                                </div>
                                <div className="text-gray-600">
                                    Question {currentQuestion + 1} of {filteredQuestions.length}
                                </div>
                                <div className="text-sm text-red-600">
                                    Violations: {violationCount}/3
                                </div>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
                            <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${((currentQuestion + 1) / filteredQuestions.length) * 100}%` }}
                            ></div>
                        </div>

                        {/* Question */}
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

                            {/* Options */}
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

                        {/* Navigation */}
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

                        {/* Security Warning */}
                        <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                                </svg>
                                <span className="text-red-700 font-medium">
                                    SECURITY ACTIVE: Fullscreen enforced. Tab switching, right-click, and keyboard shortcuts are blocked. {violationCount > 0 && `Violations: ${violationCount}/3`}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (testCompleted) {
        const categoryStats = {
            Logical: { total: 0, correct: 0 },
            Technical: { total: 0, correct: 0 },
            Reasoning: { total: 0, correct: 0 }
        };

        userAnswers.forEach(answer => {
            categoryStats[answer.category].total++;
            if (answer.isCorrect) categoryStats[answer.category].correct++;
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
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">Test Completed!</h1>
                            <p className="text-gray-600">Congratulations {userName} on completing the secure aptitude test</p>
                            {violationCount > 0 && (
                                <p className="text-red-600 mt-2">
                                    Note: {violationCount} security violation(s) were recorded during your test.
                                </p>
                            )}
                        </div>

                        {/* Score Card */}
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white text-center mb-8">
                            <h2 className="text-2xl font-bold mb-4">Your Overall Score</h2>
                            <div className="text-5xl font-bold mb-2">{score}/{filteredQuestions.length}</div>
                            <div className="text-xl">
                                {((score / filteredQuestions.length) * 100).toFixed(1)}%
                            </div>
                        </div>

                        {/* Category-wise Performance */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            {Object.entries(categoryStats).map(([category, stats]) => (
                                stats.total > 0 && (
                                    <div key={category} className={`p-6 rounded-lg text-center ${category === 'Logical' ? 'bg-blue-50' :
                                        category === 'Technical' ? 'bg-purple-50' : 'bg-indigo-50'
                                        }`}>
                                        <div className={`text-2xl font-bold ${category === 'Logical' ? 'text-blue-600' :
                                            category === 'Technical' ? 'text-purple-600' : 'text-indigo-600'
                                            }`}>
                                            {stats.correct}/{stats.total}
                                        </div>
                                        <div className={`font-medium ${category === 'Logical' ? 'text-blue-700' :
                                            category === 'Technical' ? 'text-purple-700' : 'text-indigo-700'
                                            }`}>
                                            {category}
                                        </div>
                                        <div className={`text-sm ${category === 'Logical' ? 'text-blue-600' :
                                            category === 'Technical' ? 'text-purple-600' : 'text-indigo-600'
                                            }`}>
                                            {((stats.correct / stats.total) * 100).toFixed(1)}%
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>

                        {/* Close Button */}
                        <div className="text-center">
                            <button
                                onClick={resetTest}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
                            >
                                Close Test
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default AptitudeTest;