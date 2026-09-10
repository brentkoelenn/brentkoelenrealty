"use client";

import { useState, FormEvent } from "react";
import { submitLead } from "@/lib/leads/leadService";
import { FieldLabel, TextInput, TextArea, Select, FormRow } from "@/components/forms/FormElements";
import Button from "@/components/ui/Button";
import SuccessMessage from "@/components/forms/SuccessMessage";
import { PROPERTY_TYPES } from "@/lib/utils/format";

export default function HomeValueForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = new FormData(e.currentTarget);

    const result = await submitLead({
      leadType: "HOME_VALUE",
      firstName: String(form.get("firstName") || ""),
      lastName: String(form.get("lastName") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      propertyAddress: `${form.get("address") || ""}, ${form.get("city") || ""} ${form.get("postalCode") || ""}`,
      message: String(form.get("additionalInfo") || ""),
      propertyDetails: {
        propertyType: String(form.get("propertyType") || ""),
        bedrooms: Number(form.get("bedrooms")) || undefined,
        bathrooms: Number(form.get("bathrooms")) || undefined,
        squareFeet: Number(form.get("squareFeet")) || undefined,
        lotSize: String(form.get("lotSize") || ""),
        garage: String(form.get("garage") || ""),
        yearBuilt: Number(form.get("yearBuilt")) || undefined,
        renovations: String(form.get("renovations") || ""),
      },
      formSource: "home-value-page",
    });

    if (result.success) setStatus("success");
    else {
      setStatus("error");
      setError(result.error);
    }
  }

  if (status === "success") {
    return (
      <SuccessMessage subtext="Brent will review your information and follow up with a personalized opinion of value." />
    );
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
        <FieldLabel htmlFor="address">Property Address</FieldLabel>
        <TextInput id="address" name="address" required />
      </div>
      <FormRow>
        <div>
          <FieldLabel htmlFor="city">City</FieldLabel>
          <TextInput id="city" name="city" required />
        </div>
        <div>
          <FieldLabel htmlFor="postalCode">Postal Code</FieldLabel>
          <TextInput id="postalCode" name="postalCode" />
        </div>
      </FormRow>

      <div>
        <FieldLabel htmlFor="propertyType">Property Type</FieldLabel>
        <Select id="propertyType" name="propertyType" defaultValue="">
          <option value="" disabled>Select a property type</option>
          {PROPERTY_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </Select>
      </div>

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
      <FormRow>
        <div>
          <FieldLabel htmlFor="squareFeet">Approx. Square Footage</FieldLabel>
          <TextInput id="squareFeet" name="squareFeet" type="number" />
        </div>
        <div>
          <FieldLabel htmlFor="lotSize">Lot Size</FieldLabel>
          <TextInput id="lotSize" name="lotSize" placeholder="e.g. 50 x 120 ft" />
        </div>
      </FormRow>
      <FormRow>
        <div>
          <FieldLabel htmlFor="garage">Garage</FieldLabel>
          <TextInput id="garage" name="garage" placeholder="e.g. 2 Car Attached" />
        </div>
        <div>
          <FieldLabel htmlFor="yearBuilt">Year Built</FieldLabel>
          <TextInput id="yearBuilt" name="yearBuilt" type="number" />
        </div>
      </FormRow>

      <div>
        <FieldLabel htmlFor="renovations">Recent Renovations</FieldLabel>
        <TextArea id="renovations" name="renovations" rows={3} />
      </div>
      <div>
        <FieldLabel htmlFor="additionalInfo">Additional Information</FieldLabel>
        <TextArea id="additionalInfo" name="additionalInfo" rows={3} />
      </div>

      {status === "error" && <p className="text-sm text-brand-red">{error}</p>}

      <Button type="submit" size="lg" className="w-full" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending..." : "Get My Home Value"}
      </Button>

      <p className="text-xs text-mist leading-relaxed">
        This form does not generate an automatic appraisal. Brent will personally review your
        information and provide a personalized opinion of value based on your property and current
        market conditions.
      </p>
    </form>
  );
}
