// src/components/FullScreenModal.js

import React from "react";
import { Shield, Eye, Lock, Users, Database, AlertCircle } from "lucide-react";
import { FileText, CheckCircle, User, BookOpen, Gavel } from "lucide-react";

const FullScreenModal = ({ title, onClose }) => {
  // Render content based on title
  const renderContent = () => {
    if (title === "Privacy Policy") {
      return (
        <>
          <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
                <div className="mb-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <Shield className="h-8 w-8 text-blue-600" />
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                      Privacy Policy
                    </h1>
                  </div>
                  <p className="text-gray-600">
                    Last updated:{" "}
                    {new Date().toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>

                <div className="prose prose-lg max-w-none">
                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                      <Eye className="h-6 w-6 text-blue-600 mr-2" />
                      Introduction
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      StudyTap AI ("we," "our," or "us") is committed to
                      protecting your privacy. This Privacy Policy explains how
                      we collect, use, disclose, and safeguard your information
                      when you use our AI-powered educational platform designed
                      for B.Tech students.
                    </p>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                      <Database className="h-6 w-6 text-blue-600 mr-2" />
                      Information We Collect
                    </h2>

                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                      Personal Information
                    </h3>
                    <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                      <li>
                        Name and email address (for account creation and
                        communication)
                      </li>
                      <li>
                        Payment information (processed securely through
                        third-party payment processors)
                      </li>
                  
                      <li>Profile preferences</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                      Usage Data
                    </h3>
                    <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                      <li>Questions asked to our AI system</li>
                      <li>Interaction patterns and usage statistics</li>
                      <li>
                        Device information (IP address, browser type, operating
                        system)
                      </li>
                      <li>Session data and timestamps</li>
                      <li>Search queries and preferences</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                      Technical Data
                    </h3>
                    <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                      <li>Log files and server data</li>
                      <li>Performance metrics and error reports</li>
                    </ul>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                      <Users className="h-6 w-6 text-blue-600 mr-2" />
                      How We Use Your Information
                    </h2>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>
                        Provide personalized AI-powered educational assistance
                      </li>
                      <li>
                        Process subscription payments and manage your account
                      </li>
                      <li>Improve our AI algorithms and service quality</li>
                      <li>
                        Send important updates about your subscription and
                        service changes
                      </li>
                      <li>
                        Provide customer support and respond to your inquiries
                      </li>
                      <li>
                        Ensure platform security and prevent unauthorized access
                      </li>
                      <li>Analyze usage patterns to enhance user experience</li>
                      <li>
                        Comply with legal obligations and enforce our terms
                      </li>
                    </ul>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                      <Lock className="h-6 w-6 text-blue-600 mr-2" />
                      Data Security & Storage
                    </h2>
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
                      <p className="text-blue-800">
                        <strong>Security Measures:</strong> We implement
                        industry-standard security measures including
                        encryption, secure servers, and regular security audits
                        to protect your data.
                      </p>
                    </div>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Data encryption in transit and at rest</li>
                      <li>Secure cloud infrastructure with regular backups</li>
                      <li>Limited access controls and employee training</li>
                      <li>Regular security assessments and updates</li>
                      <li>
                        Compliance with applicable data protection regulations
                      </li>
                    </ul>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                      Information Sharing
                    </h2>
                    <p className="text-gray-700 mb-4">
                      We do not sell, trade, or rent your personal information.
                      We may share your information only in the following
                      circumstances:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>
                        <strong>With your consent:</strong> When you explicitly
                        agree to share your information
                      </li>
                      <li>
                        <strong>Service providers:</strong> Third-party vendors
                        who assist in service delivery (payment processing,
                        cloud hosting)
                      </li>
                      <li>
                        <strong>Legal requirements:</strong> When required by
                        law, court order, or government request
                      </li>
                      <li>
                        <strong>Business transfers:</strong> In case of merger,
                        acquisition, or sale of assets
                      </li>
                      <li>
                        <strong>Safety purposes:</strong> To protect our users'
                        safety and prevent harmful activities
                      </li>
                    </ul>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                      Your Rights
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-2">
                          Access & Portability
                        </h4>
                        <p className="text-sm text-gray-600">
                          Request access to your personal data and receive a
                          copy in a portable format
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-2">
                          Correction
                        </h4>
                        <p className="text-sm text-gray-600">
                          Update or correct inaccurate personal information
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-2">
                          Deletion
                        </h4>
                        <p className="text-sm text-gray-600">
                          Request deletion of your personal data (subject to
                          legal requirements)
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-2">
                          Opt-out
                        </h4>
                        <p className="text-sm text-gray-600">
                          Unsubscribe from marketing communications
                        </p>
                      </div>
                    </div>
                  </section>

               

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                      Data Retention
                    </h2>
                    <p className="text-gray-700 mb-4">
                      We retain your information for as long as necessary to
                      provide our services and comply with legal obligations:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>
                        Account data: Until account deletion or 3 years after
                        last activity
                      </li>
                      <li>
                        Payment records: As required by tax and financial
                        regulations (typically 7 years)
                      </li>
                      <li>
                        Usage analytics: Aggregated and anonymized data may be
                        retained indefinitely
                      </li>
                      <li>
                        Support communications: 2 years from last interaction
                      </li>
                    </ul>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                      Children's Privacy
                    </h2>
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                      <div className="flex items-center">
                        <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
                        <p className="text-yellow-800">
                          <strong>Age Restriction:</strong> Our service is
                          intended for students 18 years and older. We do not
                          knowingly collect personal information from children
                          under 18.
                        </p>
                      </div>
                    </div>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                      International Transfers
                    </h2>
                    <p className="text-gray-700">
                      Your information may be transferred to and processed in
                      countries other than India. We ensure appropriate
                      safeguards are in place to protect your data in accordance
                      with applicable data protection laws.
                    </p>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                      Changes to This Policy
                    </h2>
                    <p className="text-gray-700">
                      We may update this Privacy Policy periodically. We will
                      notify you of significant changes via email or through our
                      platform. Your continued use of StudyTap AI after such
                      modifications constitutes acceptance of the updated
                      Privacy Policy.
                    </p>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                      Contact Us
                    </h2>
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <p className="text-gray-700 mb-4">
                        If you have questions about this Privacy Policy or wish
                        to exercise your rights, please contact us:
                      </p>
                      <ul className="space-y-2 text-gray-700">
                        <li>
                          <strong>Email:</strong> studytapai@gmail.com
                        </li>
                        <li>
                          <strong>Support:</strong> studytapai@gmail.com
                        </li>
                        <li>
                          <strong>Address:</strong> StudyTap AI Privacy Team,
                          [Shree Gajanana Enterprises LLP , D.No. 8-2-289/7, 3rd
                          floor Road No-14,Banjara Hills, Hyderabad, 500034
                          Telangana]
                        </li>
                      </ul>
                      <p className="text-sm text-gray-600 mt-4">
                        We aim to respond to all privacy-related inquiries
                        within 30 days.
                      </p>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }

    if (title === "Terms & Conditions") {
      return (
        <>
          {/* <p className="mb-4">These are your Terms & Conditions.</p>
          <p>Include all your service usage terms here.........</p> */}

          <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
                <div className="mb-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <FileText className="h-8 w-8 text-blue-600" />
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                      Terms of Use
                    </h1>
                  </div>
                
                </div>

                <div className="prose prose-lg max-w-none">
                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                      <User className="h-6 w-6 text-blue-600 mr-2" />
                      Who We Are
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      StudyTap AI is an educational technology platform
                      dedicated to providing AI-powered academic support for
                      engineering students. These Terms govern your use of our
                      services and resources.
                    </p>
                  </section>

                  {/* Repeat sections like this for: */}
                  {/* Registration and Access, User Responsibilities, Content, Restrictions, IP Rights, Paid Plans, Termination, Liability, Dispute Resolution, etc. */}

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                      <CheckCircle className="h-6 w-6 text-blue-600 mr-2" />
                      Using Our Services
                    </h2>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>
                        You must be at least 13 years old to use StudyTap AI,
                        and have parental permission if under 18.
                      </li>
                      <li>
                        You agree not to misuse, reverse-engineer, or
                        redistribute our AI outputs or platform services.
                      </li>
                      <li>
                        You may not use our services to violate any laws or
                        infringe upon rights.
                      </li>
                    </ul>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                      <Gavel className="h-6 w-6 text-blue-600 mr-2" />
                      Governing Law & Disputes
                    </h2>
                    <p className="text-gray-700">
                      These Terms are governed by the laws of India. Any
                      disputes shall be subject to arbitration or the
                      jurisdiction of the courts located in [Hyderabad, India].
                    </p>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                      <AlertCircle className="h-6 w-6 text-blue-600 mr-2" />
                      Disclaimer
                    </h2>
                    <p className="text-gray-700">
                      StudyTap AI provides information "as is." We do not
                      guarantee the accuracy of AI-generated content and are not
                      liable for decisions made based on it.
                    </p>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                      Contact Us
                    </h2>
                    <p className="text-gray-700 mb-2">
                      If you have questions about these Terms, reach us at:
                    </p>
                    <ul className="text-gray-700 space-y-1">
                      <li>
                        <strong>Email:</strong> studytapai@gmail.com
                      </li>
                      <li>
                        <strong>Support:</strong> studytapai@gmail.com
                      </li>
                    </ul>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }

    return <p>No content provided.</p>;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 text-white overflow-auto">
      {/* Sticky Header with title and close button */}
      <div className="sticky top-0 bg-black bg-opacity-90 z-10 flex justify-between items-center p-4 border-b border-gray-700">
        <h2 className="text-xl font-semibold">{title}</h2>
        <button
          onClick={onClose}
          className="text-2xl text-white hover:text-gray-300 focus:outline-none"
        >
          &times;
        </button>
      </div>

      {/* Body */}
      <div className="p-6 max-w-4xl mx-auto">{renderContent()}</div>
    </div>
  );
};

export default FullScreenModal;
