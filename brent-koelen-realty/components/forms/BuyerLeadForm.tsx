"use client";

import { useState, FormEvent } from "react";
import { submitLead } from "@/lib/leads/leadService";
import { FieldLabel, TextInput, TextArea, Select, FormRow } from "@/components/forms/FormElements";
import Button from "@/components/ui/Button";
import SuccessMessage from "@/components/forms/SuccessMessage";
import { communityList } from "@/lib/config/site";
import { PROPERTY_TYPES } from "@/lib/utils/format";

export default function BuyerLeadForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = new FormData(e.currentTarget);

    const result = await submitLead({
      leadType: "BUYER_INQUIRY",
      firstName: String(form.get("firstName") || ""),
      lastName: String(form.get("lastName") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      location: String(form.get("location") || ""),
      propertyType: String(form.get("propertyType") || ""),
      minPrice: Number(form.get("minPrice")) || undefined,
      maxPrice: Number(form.get("maxPrice")) || undefined,
      bedrooms: Number(form.get("bedrooms")) || undefined,
      bathrooms: Number(form.get("bathrooms")) || undefined,
      searchPreferences: String(form.get("preferences") || ""),
      formSource: "buyers-page",
    });

    if (result.success) setStatus("success");
    else {
      setStatus("error");
      setError(result.error);
    }
  }

  if (status === "success") {
    return <SuccessMessage subtext="I'll reach out with properties that match what you're looking for." />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
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
        <FieldLabel htmlFor="location">Where are you looking?</FieldLabel>
        <Select id="location" name="location" defaultValue="">
          <option value="" disabled>Select an area</option>
          {communityList.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
          <option value="Other">Other</option>
        </Select>
      </div>

      <div>
        <FieldLabel htmlFor="propertyType">Property Type</FieldLabel>
        <Select id="propertyType" name="propertyType" defaultValue="">
          <option value="" disabled>Select a property type</option>
          {PROPERTY_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
          <option value="Other">Other</option>
        </Select>
      </div>

      <FormRow>
        <div>
          <FieldLabel htmlFor="minPrice">Minimum Price</FieldLabel>
          <TextInput id="minPrice" name="minPrice" type="number" placeholder="$" />
        </div>
        <div>
          <FieldLabel htmlFor="maxPrice">Maximum Price</FieldLabel>
          <TextInput id="maxPrice" name="maxPrice" type="number" placeholder="$" />
        </div>
      </FormRow>
      <FormRow>
        <div>
          <FieldLabel htmlFor="bedrooms">Bedrooms</FieldLabel>
          <TextInput id="bedrooms" name="bedrooms" type="number" min={0} />
        </div>
        <div>
          <FieldLabel htmlFor="bathrooms">Bathrooms</FieldLabel>
          <TextInput id="bathrooms" name="bathrooms" type="number" min={0} />
        </div>
      </FormRow>

      <div>
        <FieldLabel htmlFor="preferences">Tell me what you&apos;re looking for</FieldLabel>
        <TextArea id="preferences" name="preferences" rows={4} />
      </div>

      {status === "error" && <p className="text-sm text-brand-red">{error}</p>}

      <Button type="submit" size="lg" className="w-full" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending..." : "Help Me Find a Home"}
      </Button>
    </form>
  );
}
