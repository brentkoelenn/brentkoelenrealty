"use client";

import { useState, FormEvent } from "react";
import { submitLead } from "@/lib/leads/leadService";
import { FieldLabel, TextInput, TextArea, FormRow } from "@/components/forms/FormElements";
import Button from "@/components/ui/Button";
import SuccessMessage from "@/components/forms/SuccessMessage";

export default function WaterfrontInquiryForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = new FormData(e.currentTarget);

    const result = await submitLead({
      leadType: "WATERFRONT_INQUIRY",
      firstName: String(form.get("firstName") || ""),
      lastName: String(form.get("lastName") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      location: String(form.get("location") || ""),
      minPrice: Number(form.get("minPrice")) || undefined,
      maxPrice: Number(form.get("maxPrice")) || undefined,
      searchPreferences: String(form.get("preferences") || ""),
      formSource: "waterfront-page",
    });

    if (result.success) setStatus("success");
    else {
      setStatus("error");
      setError(result.error);
    }
  }

  if (status === "success") {
    return <SuccessMessage subtext="I'll follow up with waterfront properties that match what you're looking for." />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <FormRow>
        <div>
          <FieldLabel htmlFor="wfFirstName">First Name</FieldLabel>
          <TextInput id="wfFirstName" name="firstName" required />
        </div>
        <div>
          <FieldLabel htmlFor="wfLastName">Last Name</FieldLabel>
          <TextInput id="wfLastName" name="lastName" required />
        </div>
      </FormRow>
      <FormRow>
        <div>
          <FieldLabel htmlFor="wfEmail">Email</FieldLabel>
          <TextInput id="wfEmail" name="email" type="email" required />
        </div>
        <div>
          <FieldLabel htmlFor="wfPhone">Phone</FieldLabel>
          <TextInput id="wfPhone" name="phone" type="tel" required />
        </div>
      </FormRow>
      <div>
        <FieldLabel htmlFor="wfLocation">Preferred Area</FieldLabel>
        <TextInput id="wfLocation" name="location" placeholder="e.g. Sauble Beach, Kincardine..." />
      </div>
      <FormRow>
        <div>
          <FieldLabel htmlFor="wfMinPrice">Minimum Price</FieldLabel>
          <TextInput id="wfMinPrice" name="minPrice" type="number" />
        </div>
        <div>
          <FieldLabel htmlFor="wfMaxPrice">Maximum Price</FieldLabel>
          <TextInput id="wfMaxPrice" name="maxPrice" type="number" />
        </div>
      </FormRow>
      <div>
        <FieldLabel htmlFor="wfPreferences">Tell Me What You&apos;re Looking For</FieldLabel>
        <TextArea id="wfPreferences" name="preferences" rows={4} placeholder="Cottage, year-round home, vacant land, frontage, etc." />
      </div>

      {status === "error" && <p className="text-sm text-brand-red">{error}</p>}

      <Button type="submit" size="lg" className="w-full" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending..." : "Tell Me What You're Looking For"}
      </Button>
    </form>
  );
}
