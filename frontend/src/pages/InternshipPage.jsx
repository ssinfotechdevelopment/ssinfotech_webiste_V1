// InternshipPage.jsx
import React, { useState } from "react";

const InternshipPage = () => {
    const [form, setForm] = useState({
        name: "",
        college: "",
        education: "",
        domain: "",
        contact: "",
        email: "",
        resume: "",
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeTab, setActiveTab] = useState("application");

    const domains = [
        "Frontend Development",
        "Backend Development",
        "Full Stack Development",
        "Machine Learning",
        "Data Analytics",
        "Human Resources",
        "Digital Marketing",
        "UI/UX Design",
        "Mobile App Development",
        "Cloud Computing"
    ];

    const internshipProcess = [
        {
            step: 1,
            title: "Application Review",
            description: "Our team reviews your application and qualifications"
        },
        {
            step: 2,
            title: "Technical Assessment",
            description: "Domain-specific test to evaluate your skills"
        },
        {
            step: 3,
            title: "Interview Round",
            description: "Virtual interview with our technical team"
        },
        {
            step: 4,
            title: "Onboarding",
            description: "Welcome session and project allocation"
        }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!form.name.trim()) newErrors.name = "Full Name is required";
        if (!form.college.trim()) newErrors.college = "College Name is required";
        if (!form.education.trim()) newErrors.education = "Education is required";
        if (!form.domain) newErrors.domain = "Please select a domain";
        if (!/^\d{10}$/.test(form.contact))
            newErrors.contact = "Enter a valid 10-digit number";
        if (!/^\S+@\S+\.\S+$/.test(form.email))
            newErrors.email = "Enter a valid email";

        const resume = form.resume.trim();
        if (!resume) {
            newErrors.resume = "Resume link is required (or type 'NA' if not available)";
        } else if (resume.toLowerCase() !== "na" && !resume.includes("drive.google.com")) {
            newErrors.resume = "Must be a valid Google Drive link (or type 'NA')";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);

        const resumeDisplay = form.resume.trim().toLowerCase() === "na" ? "Not Available" : form.resume;

        const subject = `Application for Internship in ${form.domain}`;
        const body = `Dear SS Infotech Team,

I hope you are doing well.
I am ${form.name} from ${form.college}, currently pursuing ${form.education}.
I would like to apply for an internship in the ${form.domain} domain.

Here are my details:
- Full Name: ${form.name}
- College Name: ${form.college}
- Education: ${form.education}
- Domain: ${form.domain}
- Contact Number: ${form.contact}
- Email ID: ${form.email}
- Resume Link: ${resumeDisplay}

Thank you for your time and consideration.

Best regards,
${form.name}`;

        // Gmail Compose URL (opens in new tab)
        const gmailUrl = `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=ssinfotechtnp@gmail.com&su=${encodeURIComponent(
            subject
        )}&body=${encodeURIComponent(body)}`;

        // Open Gmail in new tab
        const newWindow = window.open(gmailUrl, "_blank", "noopener,noreferrer");

        setTimeout(() => {
            if (!newWindow || newWindow.closed || typeof newWindow.closed === "undefined") {
                alert("Popup blocked or Gmail not opened. Please allow popups and ensure you're logged into Gmail.");
            } else {
                alert("Gmail opened! Please review and click 'Send' to submit your application.");
            }
            setIsSubmitting(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Join Our <span className="text-purple-600">Internship</span> Program
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Kickstart your career with hands-on experience and mentorship from industry experts
                    </p>
                </div>

                {/* Tabs Navigation */}
                <div className="flex justify-center mb-8">
                    <div className="bg-white rounded-full p-2 shadow-lg flex space-x-2">
                        <button
                            onClick={() => setActiveTab("about")}
                            className={`px-6 py-3 rounded-full font-semibold transition-all ${activeTab === "about"
                                    ? "bg-purple-600 text-white shadow-md"
                                    : "text-gray-600 hover:text-purple-600"
                                }`}
                        >
                            About Us
                        </button>
                        <button
                            onClick={() => setActiveTab("process")}
                            className={`px-6 py-3 rounded-full font-semibold transition-all ${activeTab === "process"
                                    ? "bg-purple-600 text-white shadow-md"
                                    : "text-gray-600 hover:text-purple-600"
                                }`}
                        >
                            Process
                        </button>
                        <button
                            onClick={() => setActiveTab("application")}
                            className={`px-6 py-3 rounded-full font-semibold transition-all ${activeTab === "application"
                                    ? "bg-purple-600 text-white shadow-md"
                                    : "text-gray-600 hover:text-purple-600"
                                }`}
                        >
                            Apply Now
                        </button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Side - Conditional Content */}
                    <div className="lg:col-span-1 space-y-8">
                        {activeTab === "about" && (
                            <div className="bg-white rounded-2xl shadow-xl p-6">
                                <h3 className="text-2xl font-bold text-purple-700 mb-4">About SS Infotech</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    We are a leading tech training and placement company dedicated to bridging the gap between academia and industry. With a focus on practical learning, we help students gain real-world experience through structured internships.
                                </p>
                            </div>
                        )}

                        {activeTab === "process" && (
                            <div className="bg-white rounded-2xl shadow-xl p-6">
                                <h3 className="text-2xl font-bold text-purple-700 mb-6">Internship Process</h3>
                                <div className="space-y-4">
                                    {internshipProcess.map((item) => (
                                        <div key={item.step} className="flex items-start space-x-4">
                                            <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                                                {item.step}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-800">{item.title}</h4>
                                                <p className="text-sm text-gray-600">{item.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === "application" && (
                            <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl shadow-xl p-6 text-white">
                                <h3 className="text-xl font-bold mb-4">Quick Tips</h3>
                                <ul className="space-y-2 text-sm">
                                    <li>Ensure your resume is publicly accessible</li>
                                    <li>Double-check your contact details</li>
                                    <li>Be ready for a technical assessment</li>
                                    <li>Stay responsive during the process</li>
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Right Side - Application Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-2xl p-8 hover:shadow-purple-100 transition-all">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-gray-900">Application Form</h2>
                                <p className="text-gray-600 mt-2">Fill in your details to start your journey with us</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Full Name */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Full Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${errors.name ? "border-red-500" : "border-gray-200 hover:border-purple-300"
                                                }`}
                                        />
                                        {errors.name && <p className="text-red-500 text-xs mt-2">{errors.name}</p>}
                                    </div>

                                    {/* College Name */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            College Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="college"
                                            value={form.college}
                                            onChange={handleChange}
                                            placeholder="XYZ University"
                                            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${errors.college ? "border-red-500" : "border-gray-200 hover:border-purple-300"
                                                }`}
                                        />
                                        {errors.college && <p className="text-red-500 text-xs mt-2">{errors.college}</p>}
                                    </div>
                                </div>

                                {/* Education */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Education <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="education"
                                        value={form.education}
                                        onChange={handleChange}
                                        placeholder="B.Tech in Computer Science"
                                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${errors.education ? "border-red-500" : "border-gray-200 hover:border-purple-300"
                                            }`}
                                    />
                                    {errors.education && <p className="text-red-500 text-xs mt-2">{errors.education}</p>}
                                </div>

                                {/* Domain */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Domain <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="domain"
                                        value={form.domain}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${errors.domain ? "border-red-500" : "border-gray-200 hover:border-purple-300"
                                            }`}
                                    >
                                        <option value="">Select Your Preferred Domain</option>
                                        {domains.map((d) => (
                                            <option key={d} value={d}>
                                                {d}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.domain && <p className="text-red-500 text-xs mt-2">{errors.domain}</p>}
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Contact */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Contact Number <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            name="contact"
                                            value={form.contact}
                                            onChange={handleChange}
                                            placeholder="9876543210"
                                            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${errors.contact ? "border-red-500" : "border-gray-200 hover:border-purple-300"
                                                }`}
                                        />
                                        {errors.contact && <p className="text-red-500 text-xs mt-2">{errors.contact}</p>}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Email ID <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            placeholder="john@example.com"
                                            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${errors.email ? "border-red-500" : "border-gray-200 hover:border-purple-300"
                                                }`}
                                        />
                                        {errors.email && <p className="text-red-500 text-xs mt-2">{errors.email}</p>}
                                    </div>
                                </div>

                                {/* Resume Link */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Resume (Google Drive Link) <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="resume"
                                        value={form.resume}
                                        onChange={handleChange}
                                        placeholder="https://drive.google.com/... or type NA"
                                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${errors.resume ? "border-red-500" : "border-gray-200 hover:border-purple-300"
                                            }`}
                                    />
                                    <p className="text-xs text-gray-500 mt-2">
                                        Type 'NA' if you don't have a resume ready
                                    </p>
                                    {errors.resume && <p className="text-red-500 text-xs mt-2">{errors.resume}</p>}
                                </div>

                                {/* Gmail Notice */}
                                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
                                    <strong>Note:</strong> This form will open <strong>Gmail</strong> in a new tab.
                                    Make sure you're logged in to send the application.
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full py-4 rounded-xl font-bold text-white transition-all transform hover:scale-[1.02] ${isSubmitting
                                            ? "bg-purple-400 cursor-not-allowed"
                                            : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl"
                                        }`}
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center justify-center">
                                            <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-3"></div>
                                            Opening Gmail...
                                        </div>
                                    ) : (
                                        "Open in Gmail & Send"
                                    )}
                                </button>

                                <p className="text-center text-sm text-gray-500">
                                    By applying, you agree to our privacy policy and terms of service
                                </p>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="mt-12 bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl shadow-lg p-6 text-white">
                    <h3 className="text-xl font-bold mb-4">Why Choose Us?</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold">500+</div>
                            <div className="text-sm opacity-90">Interns Trained</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold">85%</div>
                            <div className="text-sm opacity-90">Conversion Rate</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold">50+</div>
                            <div className="text-sm opacity-90">Projects</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold">4.8 stars</div>
                            <div className="text-sm opacity-90">Rating</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InternshipPage;