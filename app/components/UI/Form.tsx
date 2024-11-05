"use client";
import { useState, FormEvent, useEffect } from "react";
import { analyzeSentiment } from "@/actions/sentiment";
import { extractKeywords } from "@/actions/keywords";
import sendMail from "@/actions/mail";
import Link from "next/link";
import { InputField } from "./InputField";

// Define the type for textContent prop
interface TextContent {
  nameLabel: string;
  namePlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  newMessagePrompt: string;
  clickHere: string;
  thankYouMessage: string;
  formTitle: string;
}

// Define the type for form data
interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  honeypot: string;
}

interface FormProps {
  textContent: TextContent;
}

export default function Form({ textContent }: FormProps) {
  const initialData: FormData = {
    name: "",
    email: "",
    phone: "",
    message: "",
    honeypot: "", // Honeypot field
  };

  const [formData, setFormData] = useState<FormData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mouseMoved, setMouseMoved] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    const formSubmitted = localStorage.getItem("formSubmitted") === "true";
    setIsSubmitted(formSubmitted);

    const handleMouseMove = () => setMouseMoved(true);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const validateReCaptcha = () => {
    const btd = parseInt(localStorage.getItem("btd") || "0", 10);

    if (btd >= 2) {
      return false;
    }

    if (formData.honeypot) {
      localStorage.setItem("btd", (btd + 1).toString());
      return false;
    }

    if (!mouseMoved) {
      localStorage.setItem("btd", (btd + 1).toString());
      return false;
    }

    if (startTime && endTime) {
      const timeSpent = (endTime - startTime) / 1000; // Time in seconds
      const typingSpeed = charCount / timeSpent; // Characters per second

      if (timeSpent < 2 || typingSpeed > 10) {
        console.log("Suspicious behavior detected, possible bot");
        localStorage.setItem("btd", (btd + 1).toString());
        return false;
      }
    }

    return true;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateReCaptcha()) {
      return;
    }

    setIsSubmitting(true);
    console.log("Form submitted", formData);
    const mailresponse=await sendMail({ ...formData });
    console.log(mailresponse);
    setFormData(initialData);
    localStorage.setItem("formSubmitted", "true");
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitting(false), 500); // Reset after animation
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (name === "message") {
      if (!startTime) {
        setStartTime(Date.now());
      }
      setEndTime(Date.now());
      setCharCount(value.length);
    }
  };

  const resetForm = () => {
    localStorage.removeItem("formSubmitted");
    setIsSubmitted(false);
  };

  return (
    <>
      {/* Form */}
      <div className="lg:mx-20 fade-in">
        <form onSubmit={onSubmit}>
          <div
            className={`space-y-4 ${isSubmitting || isSubmitted ? "fall" : ""}`}
          >
            <InputField
              id="name"
              label={textContent.nameLabel}
              type="text"
              placeholder={textContent.namePlaceholder}
              required={true}
              name="name"
              value={formData.name}
              onChange={onChange}
              disabled={isSubmitted}
            />
            <InputField
              id="full-name"
              label={textContent.phoneLabel}
              type="tel"
              placeholder={textContent.phonePlaceholder}
              required={false}
              name="phone"
              value={formData.phone}
              onChange={onChange}
              disabled={isSubmitted}
            />
            <InputField
              id="email"
              label={textContent.emailLabel}
              type="email"
              placeholder={textContent.emailPlaceholder}
              required={true}
              name="email"
              value={formData.email}
              onChange={onChange}
              disabled={isSubmitted}
            />
            <div className="relative">
              <InputField
                id="message"
                name="message"
                type="textarea"
                placeholder={textContent.messagePlaceholder}
                value={formData.message}
                onChange={onChange}
                disabled={isSubmitted}
                label={textContent.messageLabel}
                required={false}
              />
            </div>
            {/* Honeypot Field */}
            <input
              type="text"
              name="honeypot"
              value={formData.honeypot}
              onChange={onChange}
              style={{ display: "none" }}
            />
          </div>
          <div className="mt-6">
            <div className=" h-8">
              {isSubmitted && (
                <p className="text-white-500 mb-2 fade-in text-center">
                  {textContent.newMessagePrompt}{" "}
                  <span
                    onClick={resetForm}
                    className="text-blue-500 cursor-pointer"
                  >
                    {textContent.clickHere}
                  </span>
                </p>
              )}
            </div>
            <button
              id="submit"
              className={`btn text-sm text-white w-full shadow-sm group ${
                isSubmitted
                  ? "bg-gradient-to-r from-iemerald-700 to-green-600 hover:from-iemerald-900 hover:to-green-700"
                  : "bg-gradient-to-r from-emerald-500 to-green-500 hover:from-iemerald-900 hover:to-green-600"
              } transition-all ease-in-out duration-300`}
              disabled={isSubmitted}
              style={{
                height: "40px",
                transition: "background 0.3s ease-in-out",
              }} // Ensure consistent button height and smooth background transition
            >
              {isSubmitted
                ? textContent.thankYouMessage
                : textContent.formTitle}{" "}
              <span className="tracking-normal text-primary-light group-hover:translate-x-0.5 transition-transform duration-300 ease-in-out ml-1">
                <svg
                  className="w-4 h-4 fill-current text-gradient-to-r from-indigo-400 to-green-400 group-hover:from-indigo-500 group-hover:to-green-500 transition-colors duration-300 ease-in-out"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              </span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
