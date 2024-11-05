import React from "react";

// GDPR content object
const gdprContent = {
  title: "GDPR Compliance",
  paragraphs: [
    "At Weblab Studio, we are committed to protecting your privacy and ensuring that your personal data is handled in a safe and responsible manner.",
    "Data Controller: Weblab Studio, 1234 Innovation Drive, Tech City, TC 56789",
    "Data Protection Officer: John Doe, contact@weblabstudio.com",
    "Purpose of Data Processing: We process personal data to provide our services, improve user experience, and comply with legal obligations.",
    "Legal Basis for Processing: Consent, contract, legal obligation, and legitimate interests.",
    "Data Retention: We retain personal data for as long as necessary to fulfill the purposes for which it was collected, or as required by law.",
    "Your Rights: You have the right to access, rectify, erase, restrict, and object to the processing of your personal data. You also have the right to data portability and to lodge a complaint with a supervisory authority.",
    "Contact Us: If you have any questions or concerns about our GDPR compliance, please contact us at contact@weblabstudio.com.",
  ],
};

// Privacy Policy content object
const privacyPolicyContent = {
  title: "Privacy Policy",
  effectiveDate: "Effective Date: 2024",
  paragraphs: [
    'WebLab Studio ("we", "our", or "us") operates the website weblabstudio.hu ("Site"). This Privacy Policy outlines our policies regarding the collection, use, and disclosure of personal data when you use our Site and the choices you have associated with that data.',
    "1. Information We Collect\nWe collect the following personal information via our contact form:\n\nName\nEmail Address\nPhone Number (optional)\nMessage\nWe do not use cookies, tracking scripts, or any other means to collect data beyond what you voluntarily provide through our contact form.",
    "2. Purpose of Data Collection\nThe personal data you provide is collected solely for the purpose of:\n\nResponding to your inquiries.\nCommunicating with you regarding your requests.\nWe do not use your personal data for marketing purposes, nor do we share your data with third parties unless required by law.",
    "3. Legal Basis for Processing\nThe legal basis for processing your personal data is your consent, which you provide when you submit your data via our contact form. You may withdraw your consent at any time by contacting us at info@weblabstudio.hu.",
    "4. Data Retention\nWe retain your personal data only for as long as necessary to respond to your inquiry. After your inquiry has been resolved, your personal data will be deleted.",
    "5. Data Sharing and Disclosure\nWe do not share or disclose your personal data to third parties, except when required by law or in response to legal requests.",
    "6. Your Rights Under GDPR\nUnder the General Data Protection Regulation (GDPR), you have the following rights:\n\nRight to Access: You can request a copy of the personal data we hold about you.\nRight to Rectification: You can request that we correct any inaccurate or incomplete personal data.\nRight to Erasure: You can request that we delete your personal data.\nRight to Restrict Processing: You can request that we limit the processing of your personal data.\nRight to Object: You can object to the processing of your personal data.\nRight to Data Portability: You can request to receive your personal data in a structured, commonly used, and machine-readable format.\nTo exercise any of these rights, please contact us at info@weblabstudio.hu.",
    "7. Security of Your Data\nWe take the security of your data seriously. We use reasonable administrative, technical, and physical measures to protect your personal data from unauthorized access, use, or disclosure.",
    "8. Changes to This Privacy Policy\nWe may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.",
    "9. Contact Us\nIf you have any questions about this Privacy Policy or how we handle your personal data, please contact us:\n\nEmail: info@weblabstudio.hu",
  ],
};

export default function GdprPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-16 md:pt-52 md:pb-32">
          {/* Main Content */}
          <div className="flex-grow container mx-auto p-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1
                className="h1 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pt-16 pb-4"
                data-aos="fade-down"
              >
                {privacyPolicyContent.title}
              </h1>
              <p className="text-lg text-slate-300 pb-8">
                {privacyPolicyContent.effectiveDate}
              </p>
              <div className="space-y-8">
                {privacyPolicyContent.paragraphs.map((paragraph, index) => (
                  <div
                    key={index}
                    className="border-2  p-6 rounded-lg shadow-lg"
                    data-aos="fade-up"
                    data-aos-delay={200 * (index + 1)}
                  >
                    <p className="text-lg text-slate-300 whitespace-pre-line">
                      {paragraph}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
