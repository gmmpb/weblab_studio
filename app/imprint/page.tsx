import React from "react";

// IMPRESS content object
const impressContent = {
  title: "Legal Notice",
  paragraphs: [
    "Company Name: Weblab Studio",
    "Address: 1234 Innovation Drive, Tech City, TC 56789",
    "Phone: +1 (234) 567-890",
    "Email: contact@weblabstudio.com",
    "VAT ID: TC123456789",
    "Managing Director: John Doe",
    "Company Registration Number: 12345678",
    "Jurisdiction: Tech City",
    "Disclaimer: The information provided on this website is for general informational purposes only. All information on the site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.",
  ],
};

export default function ImpressPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-16 md:pt-52 md:pb-32">
          {/* Main Content */}
          <div className="flex-grow container mx-auto p-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1
                className="h1 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4"
                data-aos="fade-down"
              >
                {impressContent.title}
              </h1>
              <div className="space-y-8">
                {impressContent.paragraphs.map((paragraph, index) => (
                  <div
                    key={index}
                    className="border-2 p-6 rounded-lg shadow-lg"
                    data-aos="fade-up"
                    data-aos-delay={200 * (index + 1)}
                  >
                    <p className="text-lg text-slate-300">{paragraph}</p>
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
