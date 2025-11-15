export const aptitudeQuestions = [
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

export default aptitudeQuestions;