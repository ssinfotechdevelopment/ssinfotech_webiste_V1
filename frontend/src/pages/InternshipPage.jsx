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
        skills: ""
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
        { step: 1, title: "Application Review", description: "Our team reviews your application and qualifications" },
        { step: 2, title: "Technical Assessment", description: "Domain-specific test to evaluate your skills" },
        { step: 3, title: "Interview Round", description: "Virtual interview with our technical team" },
        { step: 4, title: "Onboarding", description: "Welcome session and project allocation" }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const validate = () => {
        const newErrors = {};

        if (!form.name.trim()) newErrors.name = "Full Name is required";
        if (!form.college.trim()) newErrors.college = "College Name is required";
        if (!form.education.trim()) newErrors.education = "Education is required";
        if (!form.domain) newErrors.domain = "Please select a domain";
        if (!form.skills.trim()) newErrors.skills = "Please mention your skills";
        if (!/^\d{10}$/.test(form.contact)) newErrors.contact = "Enter a valid 10-digit number";
        if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = "Enter a valid email";

        const resume = form.resume.trim();
        if (!resume) {
            newErrors.resume = "Resume link is required (or type 'NA')";
        } else if (resume.toLowerCase() !== "na" && !resume.includes("drive.google.com")) {
            newErrors.resume = "Must be a valid Google Drive link (or type 'NA')";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // ──────────────────────────────────────────────────────────────
    //  handleSubmit – Opens DEFAULT MAIL APP on mobile, Web Gmail on desktop
    // ──────────────────────────────────────────────────────────────
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);

        const resumeDisplay = form.resume.trim().toLowerCase() === "na" ? "Not Available" : form.resume;

        const subject = `Application for Internship Opportunity`;
        const body = `Dear HR Manager,

I am ${form.name}, a student of ${form.education} at ${form.college}. I am writing to express my interest in applying for an internship position at SS Infotech.

I am eager to gain practical exposure and enhance my skills in ${form.domain}, and I believe that an internship with your esteemed organization will provide me with valuable learning and professional experience.

I have a keen interest in ${form.skills}, and I am confident that I can contribute positively to your team while learning from the experts at SS Infotech.

Please find my details below for your kind consideration:
- Contact: ${form.contact}
- Email: ${form.email}
- Resume: ${resumeDisplay}

I would be grateful if given an opportunity to discuss my application further.

Thank you for your time and consideration. I look forward to hearing from you.

Yours sincerely,
${form.name}
${form.education}, ${form.college}
${form.email}
${form.contact}
${resumeDisplay !== "Not Available" ? `\nResume: ${resumeDisplay}` : ""}`;

        const encSubject = encodeURIComponent(subject);
        const encBody = encodeURIComponent(body);
        const to = "ssinfotechtnp@gmail.com";

        // Web Gmail URL (for desktop)
        const webGmail = `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${to}&su=${encSubject}&body=${encBody}`;

        // Detect if mobile
        const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
            (navigator.userAgent.includes("Mac") && "ontouchend" in document);

        if (isMobile) {
            // Open default mail app on mobile
            const mailtoLink = `mailto:${to}?subject=${encSubject}&body=${encBody}`;
            window.location.href = mailtoLink;

            setTimeout(() => {
                alert("Opening your mail app. Please review and send the email.");
                setIsSubmitting(false);
            }, 1000);
        } else {
            // Desktop: Open web Gmail
            const win = window.open(webGmail, "_blank", "noopener,noreferrer");
            setTimeout(() => {
                if (!win || win.closed) {
                    alert("Popup blocked. Please allow pop-ups and be logged into Gmail.");
                } else {
                    alert("Gmail opened in browser. Review and click Send.");
                }
                setIsSubmitting(false);
            }, 1000);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-8 px-4 flex flex-col items-center">
            <div className="w-full max-w-6xl">

                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Join Our <span className="text-purple-600">Internship</span> Program
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                        Kickstart your career with hands-on experience and professional mentorship
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex justify-center mb-8">
                    <div className="bg-white rounded-full p-1.5 shadow-lg flex flex-wrap justify-center gap-2">
                        {["about", "process", "application"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${activeTab === tab
                                    ? "bg-purple-600 text-white shadow-md"
                                    : "text-gray-600 hover:text-purple-600"
                                    }`}
                            >
                                {tab === "about" ? "About Us" : tab === "process" ? "Process" : "Apply Now"}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex flex-col lg:flex-row gap-8 items-start w-full">

                    {/* Left Sidebar */}
                    <aside className="hidden lg:block lg:w-80 space-y-8">
                        {activeTab === "about" && (
                            <div className="bg-white rounded-2xl shadow-xl p-6">
                                <h3 className="text-2xl font-bold text-purple-700 mb-4">About SS Infotech</h3>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    We bridge the gap between academia and industry with hands-on training, real projects, and expert mentorship.
                                </p>
                                <p className="text-gray-600 leading-relaxed">
                                    Our internship program is designed to provide students with practical experience and professional development opportunities.
                                </p>
                            </div>
                        )}

                        {activeTab === "process" && (
                            <div className="bg-white rounded-2xl shadow-xl p-6">
                                <h3 className="text-2xl font-bold text-purple-700 mb-6">Internship Process</h3>
                                <div className="space-y-4">
                                    {internshipProcess.map((item) => (
                                        <div key={item.step} className="flex items-start space-x-4">
                                            <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
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
                    </aside>

                    {/* Centered Form */}
                    <div className="flex-1 flex justify-center w-full">
                        <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-6 md:p-8 hover:shadow-purple-100 transition-all">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-gray-900">Internship Application</h2>
                                <p className="text-gray-600 mt-2">Fill your details to apply for internship</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name & College */}
                                <div className="grid md:grid-cols-2 gap-6">
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
                                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                    </div>

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
                                        {errors.college && <p className="text-red-500 text-xs mt-1">{errors.college}</p>}
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
                                    {errors.education && <p className="text-red-500 text-xs mt-1">{errors.education}</p>}
                                </div>

                                {/* Domain */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Preferred Domain <span className="text-red-500">*</span>
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
                                            <option key={d} value={d}>{d}</option>
                                        ))}
                                    </select>
                                    {errors.domain && <p className="text-red-500 text-xs mt-1">{errors.domain}</p>}
                                </div>

                                {/* Skills */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Skills & Interests <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="skills"
                                        value={form.skills}
                                        onChange={handleChange}
                                        placeholder="Web development, Python programming, Digital marketing, etc."
                                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${errors.skills ? "border-red-500" : "border-gray-200 hover:border-purple-300"
                                            }`}
                                    />
                                    {errors.skills && <p className="text-red-500 text-xs mt-1">{errors.skills}</p>}
                                </div>

                                {/* Contact & Email */}
                                <div className="grid md:grid-cols-2 gap-6">
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
                                        {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact}</p>}
                                    </div>

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
                                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                    </div>
                                </div>

                                {/* Resume */}
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
                                    <p className="text-xs text-gray-500 mt-1">Type 'NA' if not available</p>
                                    {errors.resume && <p className="text-red-500 text-xs mt-1">{errors.resume}</p>}
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
                                            Opening Mail App...
                                        </div>
                                    ) : (
                                        "Open in Mail App & Send"
                                    )}
                                </button>

                                <p className="text-center text-xs text-gray-500 mt-4">
                                    Your default mail app will open with a pre-filled email.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="mt-12 w-full bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl shadow-lg p-6 text-white">
                    <h3 className="text-xl font-bold mb-4 text-center md:text-left">Why Choose Our Internship Program?</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div><div className="text-2xl font-bold">500+</div><div className="text-sm opacity-90">Interns Trained</div></div>
                        <div><div className="text-2xl font-bold">85%</div><div className="text-sm opacity-90">Conversion Rate</div></div>
                        <div><div className="text-2xl font-bold">50+</div><div className="text-sm opacity-90">Projects</div></div>
                        <div><div className="text-2xl font-bold">4.8/5</div><div className="text-sm opacity-90">Satisfaction Rating</div></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InternshipPage;