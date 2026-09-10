"use client";

import { useState, FormEvent } from "react";
import { submitLead } from "@/lib/leads/leadService";
import { FieldLabel, TextInput, TextArea, Select, FormRow } from "@/components/forms/FormElements";
import Button from "@/components/ui/Button";

const inquiryTypes = [
  "I'd like more information",
  "I'd like to book a showing",
  "I'd like similar properties",
  "I have a question",
];

export default function PropertyInquiryForm({
  propertyId,
  propertyAddress,
}: {
  propertyId: string;
  propertyAddress: string;
}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = new FormData(e.currentTarget);

    const result = await submitLead({
      leadType: "PROPERTY_INQUIRY",
      firstName: String(form.get("firstName") || ""),
      lastName: String(form.get("lastName") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      message: String(form.get("message") || ""),
      propertyId,
      propertyAddress,
      extra: { inquiryType: String(form.get("inquiryType") || "") },
      formSource: "property-detail",
    });

    if (result.success) {
      setStatus("success");
    } else {
      setStatus("error");
      setError(result.error);
    }
  }

  if (status === "success") {
    return (
      <div className="bg-brand-red-light border border-brand-red/20 rounded-sm p-6 text-center">
        <p className="font-display text-xl text-ink">Thanks! I&apos;ll be in touch shortly.</p>
        <p className="mt-2 text-sm text-stone">
          Your message about {propertyAddress} has been received.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormRow>
        <div>
          <FieldLabel htmlFor="firstName">First Name</FieldLabel>
          <TextInput id="firstName" name="firstName" required />
        </div>
        <div>
          <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
          <TextInput id="lastName" name="lastName" required />
        </div>
      </FormRow>
      <FormRow>
        <div>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <TextInput id="email" name="email" type="email" required />
        </div>
        <div>
          <FieldLabel htmlFor="phone">Phone</FieldLabel>
          <TextInput id="phone" name="phone" type="tel" required />
        </div>
      </FormRow>

      <div>
        <FieldLabel htmlFor="inquiryType">What can I help you with?</FieldLabel>
        <Select id="inquiryType" name="inquiryType" defaultValue={inquiryTypes[0]}>
          {inquiryTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <FieldLabel htmlFor="message">Message</FieldLabel>
        <TextArea id="message" name="message" rows={4} placeholder="Tell me a bit more..." />
      </div>

      <label className="flex items-start gap-2.5 text-xs text-stone">
        <input type="checkbox" required className="accent-brand-red h-4 w-4 mt-0.5" />
        I consent to being contacted by Brent Koelen regarding this inquiry.
      </label>

      {status === "error" && <p className="text-sm text-brand-red">{error}</p>}

      <Button type="submit" className="w-full" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending..." : "Request Information"}
      </Button>
    </form>
  );
}
