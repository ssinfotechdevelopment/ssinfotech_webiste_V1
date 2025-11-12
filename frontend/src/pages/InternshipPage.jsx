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

    const domains = [
        "Frontend Development",
        "Backend Development",
        "Machine Learning",
        "Data Analytics",
        "Human Resources",
        "Digital Marketing",
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        // Clear error on input
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

        // Resume validation: Allow "NA" (case-insensitive), otherwise require Google Drive link
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
        const body = `Dear Flantik Solutions Team,

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

        const mailto = `mailto:ssinfotechtnp@gmail.com?subject=${encodeURIComponent(
            subject
        )}&body=${encodeURIComponent(body)}`;

        alert("Opening your email client... Please click 'Send' to submit.");
        window.location.href = mailto;

        setTimeout(() => setIsSubmitting(false), 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 p-4">
            <div className="w-full max-w-lg">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-2xl shadow-2xl p-8 space-y-5 transform transition-all hover:shadow-purple-100"
                >
                    <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
                        Internship Application
                    </h2>

                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition ${errors.name ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    {/* College Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            College Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="college"
                            value={form.college}
                            onChange={handleChange}
                            placeholder="XYZ University"
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition ${errors.college ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {errors.college && (
                            <p className="text-red-500 text-xs mt-1">{errors.college}</p>
                        )}
                    </div>

                    {/* Education */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Education <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="education"
                            value={form.education}
                            onChange={handleChange}
                            placeholder="B.Tech in Computer Science"
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition ${errors.education ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {errors.education && (
                            <p className="text-red-500 text-xs mt-1">{errors.education}</p>
                        )}
                    </div>

                    {/* Domain */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Domain <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="domain"
                            value={form.domain}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition ${errors.domain ? "border-red-500" : "border-gray-300"
                                }`}
                        >
                            <option value="">Select Domain</option>
                            {domains.map((d) => (
                                <option key={d} value={d}>
                                    {d}
                                </option>
                            ))}
                        </select>
                        {errors.domain && (
                            <p className="text-red-500 text-xs mt-1">{errors.domain}</p>
                        )}
                    </div>

                    {/* Contact */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Contact Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="tel"
                            name="contact"
                            value={form.contact}
                            onChange={handleChange}
                            placeholder="9876543210"
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition ${errors.contact ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {errors.contact && (
                            <p className="text-red-500 text-xs mt-1">{errors.contact}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email ID <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition ${errors.email ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                        )}
                    </div>

                    {/* Resume Link */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Resume (Google Drive Link) <span className="text-red-500">*</span>
                            <span className="text-xs text-gray-500 block">Type 'NA' if not available</span>
                        </label>
                        <input
                            type="text" // Changed from "url" to allow "NA"
                            name="resume"
                            value={form.resume}
                            onChange={handleChange}
                            placeholder="https://drive.google.com/... or type NA"
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition ${errors.resume ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {errors.resume && (
                            <p className="text-red-500 text-xs mt-1">{errors.resume}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-3 rounded-lg font-semibold text-white transition-all transform ${isSubmitting
                            ? "bg-purple-400 cursor-not-allowed"
                            : "bg-purple-600 hover:bg-purple-700 active:scale-95"
                            }`}
                    >
                        {isSubmitting ? "Opening Email..." : "Send Application"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default InternshipPage;