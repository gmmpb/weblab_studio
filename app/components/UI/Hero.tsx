"use client";
import { useState, useEffect } from "react";

import Form from "./Form";
import LanguageSwitcher from "./LanguageSwitcher"; // Import the new component

// Text content object
const textContent: { [key: string]: any } = {
  en: {
    buttonLabel: "Weblab Studio",
    buttonArrow: "->",
    heading: "Web Development & AI Integration",
    description:
      "Weblab Studio is a software development company that uses the latest technologies to achieve the best results.",
    getStarted: "Web Applications",
    readDocs: "Artificial Intelligence",
    formTitle: "Send",
    thankYouMessage: "Thank you for your message!",
    nameLabel: "Name",
    namePlaceholder: "Elon Musk",
    phoneLabel: "Phone Number",
    phonePlaceholder: "+1 234 567 890",
    emailLabel: "Email Address",
    emailPlaceholder: "elon.m@spacex.com",
    messageLabel: "Message",
    messagePlaceholder:
      "Hey there! Can your software help us land a Tesla on Mars while optimizing rocket fuel consumption? Also, thinking about integrating AI for our next interstellar mission. Let's talk!",
    newMessagePrompt: "Send a new message?",
    clickHere: "Click here",
  },
  hu: {
    buttonLabel: "Weblab Studio",
    buttonArrow: "->",
    heading: "Webfejlesztés & AI Integráció",
    description:
      "Weblab Studio egy olyan szoftverfejlesztő cég, amely a legújabb technológiákat használja a legjobb eredmények eléréséhez.",
    getStarted: "Webalkalmazások",
    readDocs: "Mesterséges Intelligencia",
    formTitle: "Küldés",
    thankYouMessage: "Köszönjük az üzenetet!",
    nameLabel: "Név",
    namePlaceholder: "Elon Musk",
    phoneLabel: "Telefonszám",
    phonePlaceholder: "+361 420 696",
    emailLabel: "E-mail cím",
    emailPlaceholder: "elon.m@spacex.com",
    messageLabel: "Üzenet",
    messagePlaceholder:
      "Hey there! Can your software help us land a Tesla on Mars while optimizing rocket fuel consumption? Also, thinking about integrating AI for our next interstellar mission. Let's talk!",
    newMessagePrompt: "Új üzenet küldése?",
    clickHere: "Kattintson ide",
  },
};

export default function Hero() {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const browserLanguage = navigator.language.startsWith("hu") ? "hu" : "en";
    setLanguage(browserLanguage);
  }, []);

  const handleLanguageSwitch = (lang: string) => {
    setLanguage(lang);
  };

  const currentText = textContent[language];

  return (
    <section>
      <div className="relative max-w-6xl mx-auto px-2 sm:px-6">
        <div className="pt-8 pb-4 flex justify-center">
          <LanguageSwitcher
            language={language}
            handleLanguageSwitch={handleLanguageSwitch}
          />
        </div>
        <div className="pt-16 pb-16 md:pt-40 md:pb-32">
          {/* Main Content */}
          <div className="flex-grow container mx-auto p-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-28 justify-center items-center">
              {/* Column 1 */}
              <div className="max-w-84 mx-auto text-center">
                <div className="mb-6" data-aos="fade-down">
                  <div className="inline-flex relative before:absolute before:inset-0 before:bg-green-500 before:blur-md">
                    <a
                      className="btn-sm py-0.5 text-slate-300 hover:text-white transition duration-150 ease-in-out group [background:linear-gradient(theme(colors.green.500),_theme(colors.green.500))_padding-box,_linear-gradient(theme(colors.green.500),_theme(colors.green.200)_75%,_theme(colors.transparent)_100%)_border-box] relative before:absolute before:inset-0 before:bg-slate-800/50 before:rounded-full before:pointer-events-none shadow"
                      href="#0"
                    >
                      <span className="relative inline-flex items-center">
                        {currentText.buttonLabel}
                      </span>
                    </a>
                  </div>
                </div>
                <h1
                  className="h1 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4"
                  data-aos="fade-down"
                >
                  {currentText.heading}
                </h1>
                <p
                  className="text-lg text-slate-300 mb-8"
                  data-aos="fade-down"
                  data-aos-delay="200"
                >
                  {currentText.description}
                </p>
                <div
                  className="max-w-xs mx-auto sm:max-w-none sm:inline-flex sm:justify-center space-y-4 sm:space-y-0 sm:space-x-4"
                  data-aos="fade-down"
                  data-aos-delay="400"
                >
                  <div>
                    <a
                      className="btn text-slate-900 bg-gradient-to-r from-white/80 via-white to-white/80 hover:bg-white w-full transition duration-150 ease-in-out group"
                      href="#0"
                    >
                      {currentText.getStarted}{" "}
                    </a>
                  </div>
                  <div>
                    <a
                      className="btn text-slate-200 hover:text-white bg-slate-900 bg-opacity-25 hover:bg-opacity-30 w-full transition duration-150 ease-in-out"
                      href="#0"
                    >
                      <svg
                        className="shrink-0 fill-slate-300 mr-3"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                      >
                        <path d="m1.999 0 1 2-1 2 2-1 2 1-1-2 1-2-2 1zM11.999 0l1 2-1 2 2-1 2 1-1-2 1-2-2 1zM11.999 10l1 2-1 2 2-1 2 1-1-2 1-2-2 1zM6.292 7.586l2.646-2.647L11.06 7.06 8.413 9.707zM0 13.878l5.586-5.586 2.122 2.121L2.12 16z" />
                      </svg>
                      <span>{currentText.readDocs}</span>
                    </a>
                  </div>
                </div>
              </div>
              {/* Column 2 */}
              <Form textContent={currentText} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
