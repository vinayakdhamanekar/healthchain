"use client";

import { useEffect, useState } from "react";
import type { JSX, FormEvent } from "react";

interface FormState {
  name: string;
  email: string;
  phone: string;
  company: string;
  interest: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

const AREAS_OF_INTEREST = [
  "Interoperability & Compliance",
  "Longitudinal Data Enablement",
  "Benefit Design & Intelligence",
  "Platform & Data Infrastructure",
  "Other",
];

const FIELD_CLASS =
  "w-full bg-white border border-gray-200 rounded-[8px] px-4 py-[11px] text-[14px] text-[#1A1A1A] placeholder:text-[#A0A0A0] focus:outline-none focus:border-[#A8543C] transition-colors";

const FIELD_ERROR_CLASS = "border-red-400 focus:border-red-500";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Accepts numbers, spaces, +, -, () — at least 7 digits total
const PHONE_REGEX = /^[+()\-\s\d]{7,}$/;

function Label({ text, required }: { text: string; required?: boolean }): JSX.Element {
  return (
    <label className="block text-[14px] font-medium text-[#1A1A1A] mb-[6px]">
      {text}
      {required && <span className="text-[#A8543C] ml-[2px]">*</span>}
    </label>
  );
}

function FieldError({ message }: { message?: string }): JSX.Element | null {
  if (!message) return null;
  return <p className="mt-[6px] text-[12px] text-red-500">{message}</p>;
}

export default function ContactSection(): JSX.Element {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    company: "",
    interest: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  // Auto-hide the status message 10s after it appears
  useEffect(() => {
    if (status === "success" || status === "error") {
      const timer = setTimeout(() => setStatus("idle"), 10000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const set = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    // Clear the error for a field as soon as the person edits it
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const validate = (values: FormState): FormErrors => {
    const next: FormErrors = {};

    if (!values.name.trim()) {
      next.name = "Please enter your name.";
    }

    if (!values.email.trim()) {
      next.email = "Please enter your email address.";
    } else if (!EMAIL_REGEX.test(values.email.trim())) {
      next.email = "Please enter a valid email address.";
    }

    if (!values.phone.trim()) {
      next.phone = "Please enter your phone number.";
    } else if (!PHONE_REGEX.test(values.phone.trim())) {
      next.phone = "Please enter a valid phone number.";
    }

    if (!values.interest.trim()) {
      next.interest = "Please select an area of interest.";
    }

    return next;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setStatus("idle");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      setForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        interest: "",
        message: "",
      });
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <>
      <section className="relative bg-[#F7F3EF]">
  <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">

    {/* ================= LEFT SIDE ================= */}
    <div className="flex items-start border-r border-[#D8D1C6] px-7 md:px-16 pt-32 md:pt-40">
      <div className="max-w-[480px]">

        <p className="font-mono font-semibold text-[13px] tracking-[0.16em] uppercase text-[#A8543C] mb-6">
          Contact Us
        </p>

        <h1 className="text-[40px] md:text-[56px] font-semibold tracking-[-0.03em] leading-[1.05] text-[#1A1A1A] mb-8">
          Tell us about your
          <br />
          complex data
        </h1>

        <p className="text-[16px] md:text-[18px] leading-[1.7] text-[#57534C] max-w-[370px]">
          Get your messy data ready for CMS-0057-F, and whatever initiatives
          come next.
        </p>

      </div>
    </div>

    {/* ================= RIGHT SIDE ================= */}
    <div className="relative flex items-center justify-center overflow-hidden px-6 py-20">

      {/* Background Pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/Patterns/pattern1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Optional white overlay */}
      <div className="absolute inset-0 bg-white/15 " />

      {/* ================= FORM CARD ================= */}
      <div className="relative mt-10 z-10 w-full max-w-[600px] rounded-[18px] border border-white/60 bg-white/10 backdrop-blur-xl shadow-[0_25px_80px_rgba(0,0,0,0.08)] p-8">

        <h2 className="text-[28px] md:text-[34px] font-semibold text-[#1A1A1A] mb-8">
          Book a meeting
        </h2>

        <form onSubmit={handleSubmit} noValidate>

          {/* Name + Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">

            <div>
              <Label text="Name" required />
              <input
                type="text"
                placeholder="First and last name"
                value={form.name}
                onChange={set("name")}
                aria-invalid={!!errors.name}
                className={`${FIELD_CLASS} ${errors.name ? FIELD_ERROR_CLASS : ""}`}
              />
              <FieldError message={errors.name} />
            </div>

            <div>
              <Label text="Email Address" required />
              <input
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={set("email")}
                aria-invalid={!!errors.email}
                className={`${FIELD_CLASS} ${errors.email ? FIELD_ERROR_CLASS : ""}`}
              />
              <FieldError message={errors.email} />
            </div>

          </div>

          {/* Phone + Company */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">

            <div>
              <Label text="Phone number" required />
              <input
                type="tel"
                placeholder="Phone number"
                value={form.phone}
                onChange={set("phone")}
                aria-invalid={!!errors.phone}
                className={`${FIELD_CLASS} ${errors.phone ? FIELD_ERROR_CLASS : ""}`}
              />
              <FieldError message={errors.phone} />
            </div>

            <div>
              <Label text="Company" />
              <input
                type="text"
                placeholder="Company"
                value={form.company}
                onChange={set("company")}
                className={FIELD_CLASS}
              />
            </div>

          </div>

          {/* Interest */}
          <div className="mb-5">

            <Label text="Select your areas of interest" required />

            <select
              value={form.interest}
              onChange={set("interest")}
              aria-invalid={!!errors.interest}
              className={`${FIELD_CLASS} appearance-none bg-[right_14px_center] bg-no-repeat ${
                errors.interest ? FIELD_ERROR_CLASS : ""
              }`}
            >
              <option value="" disabled>
                Please choose an option
              </option>

              {AREAS_OF_INTEREST.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
            <FieldError message={errors.interest} />

          </div>

          {/* Message */}
          <div className="mb-8">

            <Label text="Message" />

            <textarea
              rows={4}
              placeholder="Share about the data challenges your company is currently facing, or whatever else you need us to know."
              value={form.message}
              onChange={set("message")}
              className={`${FIELD_CLASS} resize-none`}
            />

          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "submitting"}
            className="group inline-flex items-center gap-[14px] bg-[#A8543C] text-white text-[15px] font-medium py-[14px] pl-[24px] pr-[14px] rounded-[42px] transition-colors duration-300 hover:bg-[#97492F] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "submitting" ? "Submitting..." : "Submit"}

            <span className="w-[44px] h-[34px] rounded-full border border-white/40 inline-flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:text-[#A8543C]">
              →
            </span>
          </button>

          {/* Status message — auto-hides after 10s */}
          {status === "success" && (
            <p className="mt-4 text-[14px] font-medium text-green-700">
              Thank you! Someone from our team will reach out within one business day.
            </p>
          )}
          {status === "error" && (
            <p className="mt-4 text-[14px] font-medium text-red-600">
              Something went wrong sending your message. Please try again.
            </p>
          )}

        </form>

      </div>

    </div>

  </div>
</section>
      

    </>
  );
}