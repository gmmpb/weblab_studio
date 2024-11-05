import { FC } from "react";

interface LanguageSwitcherProps {
  language: string;
  handleLanguageSwitch: (lang: string) => void;
}

const LanguageSwitcher: FC<LanguageSwitcherProps> = ({
  language,
  handleLanguageSwitch,
}) => {
  return (
    <div className="flex justify-center items-center space-x-4">
      <span
        className={`cursor-pointer transition duration-300 ease-in-out transform ${
          language === "en" ? "underline scale-105" : "hover:scale-100"
        }`}
        onClick={() => handleLanguageSwitch("en")}
        style={{
          fontWeight: "bold",
          fontSize: "1.25rem",
          textShadow: "1px 1px 3px rgba(0, 0, 0, 0.3)",
          color: language === "en" ? "#ffffff" : "#bbbbbb",
          position: "relative",
        }}
      >
        EN
      </span>
      <span
        className={`cursor-pointer transition duration-300 ease-in-out transform ${
          language === "hu" ? "underline scale-105" : "hover:scale-100"
        }`}
        onClick={() => handleLanguageSwitch("hu")}
        style={{
          fontWeight: "bold",
          fontSize: "1.25rem",
          textShadow: "1px 1px 3px rgba(0, 0, 0, 0.3)",
          color: language === "hu" ? "#ffffff" : "#bbbbbb",
          position: "relative",
        }}
      >
        HU
      </span>
      <style jsx>{`
        @keyframes slide-right {
          from {
            width: 0;
            left: 0;
          }
          to {
            width: 100%;
            left: 0;
          }
        }

        @keyframes slide-left {
          from {
            width: 0;
            right: 0;
          }
          to {
            width: 100%;
            right: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default LanguageSwitcher;
