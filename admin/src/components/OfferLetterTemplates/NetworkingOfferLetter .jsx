import React from "react";
import certificateBg from "../../assets/certificate-bg.png";

const NetworkingEngineerOfferLetter = ({ data = {} }) => {
    const { candidateName = "Candidate Name", collegeName = "College Name", internshipFrom = "DD/MM/YYYY", stipend = "Unpaid / As per company norms" } = data;

    return (
        <div className="relative w-[794px] h-[1123px] bg-white mx-auto overflow-hidden" style={{ backgroundImage: `url(${certificateBg})`, backgroundSize: "cover", backgroundPosition: "center" }}>
            <div className="absolute inset-x-12 top-48 bottom-16 text-gray-800 leading-relaxed">

                <p>To,</p>
                <p className="font-bold text-[15px] mt-1">{candidateName}</p>
                <p className="mb-10">{collegeName}</p>

                <p className="font-bold text-[15px]">Subject: Offer for Internship in Networking Engineering</p>

                <p className="mt-10 text-lg">Dear {candidateName.split(" ")[0]},</p>

                <p className="mt-6 text-justify">
                    We are pleased to offer you the position of <strong>Networking Engineer Intern</strong> at <strong>SS Infotech Pvt. Ltd.</strong>. This internship will provide hands-on experience in network design, configuration, and troubleshooting.
                </p>

                <p className="mt-6 text-justify">
                    <strong>Internship Details:</strong><br />
                    Role: Networking Engineer Intern<br />
                    Location: Nagpur<br />
                    Joining Date: {internshipFrom}<br />
                    Stipend: {stipend}
                </p>

                <p className="mt-6 text-justify">
                    You will work on Cisco/Juniper devices, VLAN configuration, routing protocols (OSPF, BGP), firewall rules, VPN setup, network monitoring (SolarWinds, PRTG), and cabling standards.
                </p>

                <p className="mt-6 text-justify">
                    Discipline, documentation, safety protocols, and incident reporting are mandatory.
                </p>

                <p className="mt-6 text-justify">
                    Upon successful completion, you will receive an official <strong>Internship Completion Certificate</strong>.
                </p>

                <p className="mt-6 text-justify">
                    Kindly confirm your acceptance by reply or signed letter.
                </p>
            </div>
        </div>
    );
};

export default NetworkingEngineerOfferLetter;