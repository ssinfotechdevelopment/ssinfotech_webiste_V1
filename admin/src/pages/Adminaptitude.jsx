import React, { useState, useEffect } from 'react';

const Adminaptitude = () => {
    const [submissions, setSubmissions] = useState([]);
    const [filteredSubmissions, setFilteredSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedSubmission, setSelectedSubmission] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    const [stats, setStats] = useState({
        totalSubmissions: 0,
        averageScore: 0,
        highestScore: 0,
        lowestScore: 0
    });

    // Test backend connection
    const testBackendConnection = async () => {
        try {
            const endpoints = [
                'https://ssinfotech-0x5s.onrender.com/api/submissions',
                'https://ssinfotech-0x5s.onrender.com/api/submissions/all',
                'http://127.0.0.1:10000/api/submissions'
            ];

            for (const endpoint of endpoints) {
                try {
                    console.log(`🔍 Testing backend connection: ${endpoint}`);
                    const response = await fetch(endpoint);
                    if (response.ok) {
                        const data = await response.json();
                        console.log(`✅ Backend connected at: ${endpoint}`, data);
                        return { connected: true, endpoint, data };
                    }
                } catch (err) {
                    console.log(`❌ Backend not available at: ${endpoint}`, err.message);
                }
            }
            return { connected: false };
        } catch (error) {
            console.log('Backend connection test failed');
            return { connected: false };
        }
    };

    // Fetch submissions from backend and localStorage
    const fetchSubmissions = async () => {
        try {
            setLoading(true);
            setError('');

            console.log('🔄 Starting to fetch submissions...');

            // Test backend connection first
            const backendTest = await testBackendConnection();

            let backendSubmissions = [];
            if (backendTest.connected) {
                console.log('✅ Backend is connected, fetching data...');
                backendSubmissions = backendTest.data.data || backendTest.data.submissions || [];
                console.log(`📊 Backend submissions received:`, backendSubmissions);
            } else {
                console.log('❌ Backend is not connected, using localStorage only');
            }

            // Get submissions from localStorage
            let localSubmissions = [];
            try {
                const localData = localStorage.getItem('aptitudeTestSubmissions');
                if (localData) {
                    localSubmissions = JSON.parse(localData);
                    // Ensure it's an array and filter out any null/undefined entries
                    localSubmissions = Array.isArray(localSubmissions)
                        ? localSubmissions.filter(sub => sub != null && sub.userName && sub.submissionId)
                        : [];
                    console.log('📁 Local submissions loaded:', localSubmissions.length, localSubmissions);
                } else {
                    // Initialize empty array if no data exists
                    localStorage.setItem('aptitudeTestSubmissions', '[]');
                    console.log('📁 Initialized empty localStorage array');
                }
            } catch (err) {
                console.error('❌ Error loading local submissions:', err);
                // Initialize empty array if there's an error
                localStorage.setItem('aptitudeTestSubmissions', '[]');
            }

            // Combine all submissions
            const allSubmissions = [...backendSubmissions, ...localSubmissions];
            console.log('📦 All combined submissions:', allSubmissions);

            // Improved deduplication logic
            const uniqueSubmissions = allSubmissions.reduce((acc, current) => {
                if (!current || !current.userName) return acc;

                // Create a unique key for each submission
                const submissionKey = current.submissionId || current._id ||
                    `${current.email}-${current.userName}-${current.submittedAt || current.localSaveTime}`;

                const exists = acc.find(item =>
                    (item.submissionId && item.submissionId === current.submissionId) ||
                    (item._id && item._id === current._id) ||
                    (item.email === current.email &&
                        item.userName === current.userName &&
                        Math.abs(new Date(item.submittedAt || item.localSaveTime).getTime() -
                            new Date(current.submittedAt || current.localSaveTime).getTime()) < 60000)
                );

                if (!exists) {
                    acc.push({
                        ...current,
                        uniqueId: submissionKey
                    });
                }
                return acc;
            }, []);

            // Sort by submission date (newest first)
            uniqueSubmissions.sort((a, b) => {
                const dateA = new Date(a.submittedAt || a.localSaveTime);
                const dateB = new Date(b.submittedAt || b.localSaveTime);
                return dateB - dateA;
            });

            console.log('🎯 Final unique submissions:', uniqueSubmissions.length, uniqueSubmissions);

            setSubmissions(uniqueSubmissions);
            setFilteredSubmissions(uniqueSubmissions);
            calculateStats(uniqueSubmissions);

        } catch (err) {
            console.error('❌ Error fetching submissions:', err);
            setError(`Failed to load submissions: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const calculateStats = (subs) => {
        if (subs.length === 0) {
            setStats({
                totalSubmissions: 0,
                averageScore: 0,
                highestScore: 0,
                lowestScore: 0
            });
            return;
        }

        const validSubs = subs.filter(sub => sub.score !== undefined && sub.totalQuestions);
        const scores = validSubs.map(s => s.score);
        const totalScore = scores.reduce((sum, score) => sum + score, 0);
        const averageScore = validSubs.length > 0 ? totalScore / validSubs.length : 0;

        setStats({
            totalSubmissions: subs.length,
            averageScore: parseFloat(averageScore.toFixed(2)),
            highestScore: scores.length > 0 ? Math.max(...scores) : 0,
            lowestScore: scores.length > 0 ? Math.min(...scores) : 0
        });
    };

    // Filter submissions based on search and filters
    useEffect(() => {
        let filtered = submissions;

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(sub =>
                sub.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                sub.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                sub.phone?.includes(searchTerm)
            );
        }

        // Date filter
        if (dateFilter) {
            filtered = filtered.filter(sub => {
                try {
                    const submissionDate = new Date(sub.submittedAt || sub.localSaveTime).toDateString();
                    const filterDate = new Date(dateFilter).toDateString();
                    return submissionDate === filterDate;
                } catch (e) {
                    return false;
                }
            });
        }

        setFilteredSubmissions(filtered);
    }, [searchTerm, dateFilter, submissions]);

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const handleRefresh = () => {
        fetchSubmissions();
    };

    const handleDeleteSubmission = async (submissionId, isLocal = false) => {
        if (!window.confirm('Are you sure you want to delete this submission? This action cannot be undone.')) {
            return;
        }

        try {
            let backendDeleted = false;
            let deleteError = null;

            // Check if it's a valid MongoDB ID (24 character hex string)
            const isValidMongoId = submissionId && submissionId.length === 24 && /^[0-9a-fA-F]+$/.test(submissionId);

            if (!isLocal && isValidMongoId) {
                // Try to delete from backend only if it's a valid MongoDB ID
                try {
                    console.log(`🗑️ Attempting to delete from backend: ${submissionId}`);
                    const response = await fetch(`https://ssinfotech-0x5s.onrender.com/api/submissions/${submissionId}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });

                    console.log(`📨 Backend delete response status: ${response.status}`);

                    if (response.ok) {
                        const result = await response.json();
                        backendDeleted = true;
                        console.log('✅ Submission deleted from backend:', result);
                    } else {
                        const errorData = await response.json().catch(() => ({}));
                        deleteError = errorData.error || `Server error: ${response.status}`;
                        console.log('❌ Backend delete failed:', deleteError);

                        // If it's a 404, it means the submission doesn't exist in backend
                        if (response.status === 404) {
                            console.log('ℹ️ Submission not found in backend, will try local storage');
                        }
                    }
                } catch (err) {
                    deleteError = err.message;
                    console.log('❌ Backend delete failed:', err.message);
                }
            } else if (!isLocal && !isValidMongoId) {
                console.log('ℹ️ Not a valid MongoDB ID, skipping backend delete');
            }

            // Delete from local storage (for both backend and local submissions)
            let localDeleted = false;
            const localData = localStorage.getItem('aptitudeTestSubmissions');
            if (localData) {
                try {
                    const localSubmissions = JSON.parse(localData);
                    const updatedSubmissions = localSubmissions.filter(
                        sub => sub.submissionId !== submissionId && sub._id !== submissionId
                    );

                    if (updatedSubmissions.length < localSubmissions.length) {
                        localStorage.setItem('aptitudeTestSubmissions', JSON.stringify(updatedSubmissions));
                        localDeleted = true;
                        console.log('🗑️ Deleted from localStorage. Remaining:', updatedSubmissions.length);
                    } else {
                        console.log('ℹ️ Submission not found in localStorage');
                    }
                } catch (err) {
                    console.error('❌ Error deleting from localStorage:', err);
                }
            }

            // Update state regardless of deletion result
            const updatedSubmissions = submissions.filter(
                sub => sub.submissionId !== submissionId && sub._id !== submissionId
            );
            setSubmissions(updatedSubmissions);
            setFilteredSubmissions(updatedSubmissions);
            calculateStats(updatedSubmissions);

            // Show appropriate message
            if (backendDeleted) {
                alert('✅ Submission deleted from backend database!');
            } else if (localDeleted) {
                alert('✅ Submission deleted from local storage!');
            } else if (deleteError && deleteError.includes('not found')) {
                alert('✅ Submission removed from view (was not found in database)');
            } else if (deleteError) {
                alert(`⚠️ Could not delete submission: ${deleteError}`);
            } else {
                alert('ℹ️ Submission not found in any storage.');
            }

        } catch (err) {
            console.error('❌ Error in delete operation:', err);
            alert('❌ Failed to delete submission. Please try again.');
        }
    };

    const exportToCSV = () => {
        if (filteredSubmissions.length === 0) {
            alert('No data to export!');
            return;
        }

        const headers = ['Name', 'Email', 'Phone', 'Score', 'Total Questions', 'Percentage', 'Time Taken', 'Violations', 'Submitted At'];

        const csvData = filteredSubmissions.map(sub => [
            `"${sub.userName || 'N/A'}"`,
            `"${sub.email || 'N/A'}"`,
            `"${sub.phone || 'N/A'}"`,
            sub.score || 0,
            sub.totalQuestions || 0,
            sub.totalQuestions ? `${((sub.score / sub.totalQuestions) * 100).toFixed(1)}%` : '0%',
            `${sub.timeTaken || 0}s`,
            sub.violationCount || 0,
            `"${new Date(sub.submittedAt || sub.localSaveTime).toLocaleString()}"`
        ]);

        const csvContent = [
            headers.join(','),
            ...csvData.map(row => row.join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `aptitude-submissions-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const clearAllLocalData = () => {
        if (!window.confirm('Are you sure you want to clear ALL local submissions? This cannot be undone.')) {
            return;
        }

        localStorage.removeItem('aptitudeTestSubmissions');
        const backendOnlySubmissions = submissions.filter(sub => sub._id);
        setSubmissions(backendOnlySubmissions);
        setFilteredSubmissions(backendOnlySubmissions);
        calculateStats(backendOnlySubmissions);
        alert('✅ All local submissions cleared!');
    };

    const getScoreColor = (score, total) => {
        if (!score || !total) return 'bg-gray-100 text-gray-800';
        const percentage = (score / total) * 100;
        if (percentage >= 80) return 'bg-green-100 text-green-800';
        if (percentage >= 60) return 'bg-yellow-100 text-yellow-800';
        return 'bg-red-100 text-red-800';
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading submissions...</p>
                    <p className="text-sm text-gray-500">Checking backend connection and local storage</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Aptitude Test  Panel</h1>
                            <p className="text-gray-600 mt-2">Manage and analyze test submissions</p>
                            <p className="text-sm text-gray-500">
                                Total Submissions: {submissions.length}
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={exportToCSV}
                                disabled={filteredSubmissions.length === 0}
                                className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-4 py-2 rounded-lg transition duration-200"
                            >
                                Export CSV ({filteredSubmissions.length})
                            </button>
                            <button
                                onClick={handleRefresh}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200"
                            >
                                Refresh Data
                            </button>
                        </div>
                    </div>
                </div>

                {/* Debug Info */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-700 font-semibold">Error: {error}</p>
                        <p className="text-red-600 text-sm mt-2">
                            Check if backend server is running on port 10000 and try refreshing.
                        </p>
                    </div>
                )}

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="bg-blue-100 p-3 rounded-lg">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Submissions</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.totalSubmissions}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="bg-green-100 p-3 rounded-lg">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Average Score</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.averageScore}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="bg-yellow-100 p-3 rounded-lg">
                                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Highest Score</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.highestScore}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="bg-red-100 p-3 rounded-lg">
                                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Lowest Score</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.lowestScore}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Search Candidates</label>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search by name, email, or phone..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Date Filter</label>
                            <input
                                type="date"
                                value={dateFilter}
                                onChange={(e) => setDateFilter(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>

                {/* Submissions Table */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Submissions ({filteredSubmissions.length})
                            </h2>
                            {submissions.some(sub => !sub._id) && (
                                <button
                                    onClick={clearAllLocalData}
                                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                                >
                                    Clear Local Data
                                </button>
                            )}
                        </div>
                    </div>

                    {filteredSubmissions.length === 0 ? (
                        <div className="text-center py-12">
                            <svg className="w-12 h-12 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                            <p className="mt-4 text-gray-500">No submissions found</p>
                            <p className="text-sm text-gray-400 mt-2">
                                {submissions.length === 0 ?
                                    "No data available. Make sure tests have been taken or backend is running." :
                                    "Try adjusting your search filters."}
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Candidate
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Score
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Time & Violations
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Submitted
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredSubmissions.map((submission, index) => (
                                        <tr key={submission.uniqueId || submission.submissionId || submission._id || index}
                                            className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {submission.userName || 'Unknown'}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {submission.email || 'No email'}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {submission.phone || 'No phone'}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(submission.score, submission.totalQuestions)}`}>
                                                        {submission.score || 0}/{submission.totalQuestions || 0}
                                                        ({submission.totalQuestions ? ((submission.score / submission.totalQuestions) * 100).toFixed(1) : 0}%)
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {submission.timeTaken || 0}s
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    Violations: {submission.violationCount || 0}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {submission.submittedAt || submission.localSaveTime ?
                                                    new Date(submission.submittedAt || submission.localSaveTime).toLocaleString() :
                                                    'Unknown date'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button
                                                    onClick={() => setSelectedSubmission(submission)}
                                                    className="text-blue-600 hover:text-blue-900 mr-4"
                                                >
                                                    View Details
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteSubmission(
                                                        submission._id || submission.submissionId,
                                                        !submission._id
                                                    )}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Submission Detail Modal */}
            {selectedSubmission && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Submission Details - {selectedSubmission.userName}
                                </h3>
                                <button
                                    onClick={() => setSelectedSubmission(null)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500 mb-2">Candidate Information</h4>
                                    <p><strong>Name:</strong> {selectedSubmission.userName}</p>
                                    <p><strong>Email:</strong> {selectedSubmission.email}</p>
                                    <p><strong>Phone:</strong> {selectedSubmission.phone}</p>
                                    <p><strong>Category:</strong> {selectedSubmission.categoryFilter || 'All'}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500 mb-2">Test Results</h4>
                                    <p><strong>Score:</strong> {selectedSubmission.score}/{selectedSubmission.totalQuestions}</p>
                                    <p><strong>Percentage:</strong> {((selectedSubmission.score / selectedSubmission.totalQuestions) * 100).toFixed(1)}%</p>
                                    <p><strong>Time Taken:</strong> {selectedSubmission.timeTaken} seconds</p>
                                    <p><strong>Violations:</strong> {selectedSubmission.violationCount || 0}</p>
                                    <p><strong>Submitted:</strong> {new Date(selectedSubmission.submittedAt || selectedSubmission.localSaveTime).toLocaleString()}</p>
                                </div>
                            </div>

                            <h4 className="text-sm font-medium text-gray-500 mb-4">Question-wise Performance</h4>
                            <div className="space-y-3 max-h-96 overflow-y-auto">
                                {selectedSubmission.userAnswers && selectedSubmission.userAnswers.length > 0 ? (
                                    selectedSubmission.userAnswers.map((answer, index) => (
                                        <div key={index} className={`p-4 rounded-lg border ${answer.isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="font-medium">Q{index + 1}: {answer.question}</span>
                                                <span className={`px-2 py-1 rounded text-xs ${answer.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                    {answer.isCorrect ? 'Correct' : 'Incorrect'}
                                                </span>
                                            </div>
                                            <div className="text-sm">
                                                <p><strong>Selected:</strong> {answer.selectedAnswer}</p>
                                                <p><strong>Correct:</strong> {answer.correctAnswer}</p>
                                                <div className="flex gap-2 mt-2">
                                                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                                                        {answer.category}
                                                    </span>
                                                    <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                                                        {answer.difficulty}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-center py-4">No question data available</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Adminaptitude;