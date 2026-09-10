"use client";

import { useState, FormEvent } from "react";
import { submitLead } from "@/lib/leads/leadService";
import { FieldLabel, TextInput, TextArea, Select, FormRow } from "@/components/forms/FormElements";
import Button from "@/components/ui/Button";
import SuccessMessage from "@/components/forms/SuccessMessage";

const interests = ["Buying", "Selling", "Farm / Acreage", "Waterfront", "Investment", "General Question"];

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = new FormData(e.currentTarget);

    const result = await submitLead({
      leadType: "GENERAL_CONTACT",
      firstName: String(form.get("firstName") || ""),
      lastName: String(form.get("lastName") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      message: String(form.get("message") || ""),
      extra: { interestedIn: String(form.get("interestedIn") || "") },
      formSource: "contact-page",
    });

    if (result.success) setStatus("success");
    else {
      setStatus("error");
      setError(result.error);
    }
  }

  if (status === "success") {
    return <SuccessMessage />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <FormRow>
        <div>
          <FieldLabel htmlFor="cFirstName">First Name</FieldLabel>
          <TextInput id="cFirstName" name="firstName" required />
        </div>
        <div>
          <FieldLabel htmlFor="cLastName">Last Name</FieldLabel>
          <TextInput id="cLastName" name="lastName" required />
        </div>
      </FormRow>
      <FormRow>
        <div>
          <FieldLabel htmlFor="cEmail">Email</FieldLabel>
          <TextInput id="cEmail" name="email" type="email" required />
        </div>
        <div>
          <FieldLabel htmlFor="cPhone">Phone</FieldLabel>
          <TextInput id="cPhone" name="phone" type="tel" required />
        </div>
      </FormRow>
      <div>
        <FieldLabel htmlFor="interestedIn">I&apos;m interested in</FieldLabel>
        <Select id="interestedIn" name="interestedIn" defaultValue={interests[0]}>
          {interests.map((i) => (
            <option key={i} value={i}>{i}</option>
          ))}
        </Select>
      </div>
      <div>
        <FieldLabel htmlFor="cMessage">Message</FieldLabel>
        <TextArea id="cMessage" name="message" rows={5} required />
      </div>

      {status === "error" && <p className="text-sm text-brand-red">{error}</p>}

      <Button type="submit" size="lg" className="w-full" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
