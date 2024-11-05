import React from "react";

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
  name: string;
  value: string;
  disabled?: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const sanitizeInput = (input: string): string => {
  // Remove any script tags and their content
  let sanitized = input.replace(/<script.*?>.*?<\/script>/gi, "");

  // Remove event handlers like onClick, onMouseOver, etc.
  sanitized = sanitized.replace(/on\w+=".*?"/gi, "");

  // Remove potentially dangerous HTML tags (e.g., iframe, object, embed)
  sanitized = sanitized.replace(/<(iframe|object|embed).*?>.*?<\/\1>/gi, "");

  // Encode HTML entities to prevent injection attacks
  sanitized = sanitized.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // Strip out any remaining dangerous characters like quotes or backticks
  sanitized = sanitized.replace(/["'`]/g, "");

  // Trim any remaining whitespace

  return sanitized;
};

export const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type,
  placeholder,
  required,
  name,
  value,
  onChange,
  disabled,
}) => {
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phoneRegex = /^\+?[0-9]{0,12}$/;
    const sanitizedValue = sanitizeInput(e.target.value);
    if (phoneRegex.test(sanitizedValue)) {
      e.target.value = sanitizedValue;
      onChange(e);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const sanitizedValue = sanitizeInput(e.target.value);
    e.target.value = sanitizedValue;
    onChange(e);
  };

  return (
    <div>
      <label
        className="block text-sm text-slate-300 font-medium mb-1"
        htmlFor={id}
      >
        {label} {required ? <span className="text-red-500">*</span> : null}
      </label>
      {type === "textarea" ? (
        <textarea
          id={id}
          className="form-textarea w-full bg-transparent border border-slate-300 text-slate-100"
          autoComplete="on"
          required={required}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          rows={5}
        />
      ) : (
        <input
          id={id}
          className="form-input w-full bg-transparent border border-slate-300 text-slate-100"
          type={type}
          placeholder={placeholder}
          required={required}
          name={name}
          value={value}
          onChange={type === "tel" ? handlePhoneChange : handleChange}
        />
      )}
    </div>
  );
};
