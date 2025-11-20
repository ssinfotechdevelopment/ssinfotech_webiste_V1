import React from "react";
import certificateBg from "../../assets/certificate-bg.png";

const TestingQAOfferLetter = ({ data = {} }) => {
    const { candidateName = "Candidate Name", collegeName = "College Name", internshipFrom = "DD/MM/YYYY", stipend = "Unpaid / As per company norms" } = data;

    return (
        <div className="relative w-[794px] h-[1123px] bg-white mx-auto overflow-hidden" style={{ backgroundImage: `url(${certificateBg})`, backgroundSize: "cover", backgroundPosition: "center" }}>
            <div className="absolute inset-x-12 top-48 bottom-16 text-gray-800 leading-relaxed">

                <p>To,</p>
                <p className="font-bold text-[15px] mt-1">{candidateName}</p>
                <p className="mb-10">{collegeName}</p>

                <p className="font-bold text-[15px]">Subject: Offer for Internship in Software Testing / QA</p>

                <p className="mt-10 text-lg">Dear {candidateName.split(" ")[0]},</p>

                <p className="mt-6 text-justify">
                    We are delighted to offer you the position of <strong>Software Testing / QA Intern</strong> at <strong>SS Infotech Pvt. Ltd.</strong>. This internship will help you master modern testing methodologies and quality assurance processes in real-world projects.
                </p>

                <p className="mt-6 text-justify">
                    <strong>Internship Details:</strong><br />
                    Role: Software Testing / QA Intern<br />
                    Location: Nagpur<br />
                    Joining Date: {internshipFrom}<br />
                    Stipend: {stipend}
                </p>

                <p className="mt-6 text-justify">
                    You will be involved in writing test cases, performing manual and automated testing, bug reporting, regression testing, API testing, and usability analysis using tools like Selenium, Postman, JIRA, and TestRail.
                </p>

                <p className="mt-6 text-justify">
                    Accuracy, attention to detail, timely reporting, and active participation in sprint reviews are expected.
                </p>

                <p className="mt-6 text-justify">
                    Upon successful completion and evaluation, you will receive an official <strong>Internship Completion Certificate</strong>.
                </p>

                <p className="mt-6 text-justify">
                    Kindly confirm your acceptance by replying to this email or submitting a signed copy of this letter.
                </p>

                <p className="mt-10">We look forward to having you on board!</p>
            </div>
        </div>
    );
};

export default TestingQAOfferLetter;