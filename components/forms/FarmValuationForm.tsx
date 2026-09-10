"use client";

import { useState, FormEvent } from "react";
import { submitLead } from "@/lib/leads/leadService";
import { FieldLabel, TextInput, TextArea, FormRow } from "@/components/forms/FormElements";
import Button from "@/components/ui/Button";
import SuccessMessage from "@/components/forms/SuccessMessage";

export default function FarmValuationForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = new FormData(e.currentTarget);

    const result = await submitLead({
      leadType: "FARM_VALUATION",
      firstName: String(form.get("firstName") || ""),
      lastName: String(form.get("lastName") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      propertyAddress: String(form.get("address") || ""),
      message: String(form.get("additionalInfo") || ""),
      farmDetails: {
        totalAcreage: Number(form.get("totalAcreage")) || undefined,
        tillableAcreage: Number(form.get("tillableAcreage")) || undefined,
        pasture: String(form.get("pasture") || ""),
        woodlot: String(form.get("woodlot") || ""),
        buildings: String(form.get("buildings") || ""),
        house: String(form.get("house") || ""),
        barns: String(form.get("barns") || ""),
        silos: String(form.get("silos") || ""),
        outbuildings: String(form.get("outbuildings") || ""),
      },
      formSource: "farms-page",
    });

    if (result.success) setStatus("success");
    else {
      setStatus("error");
      setError(result.error);
    }
  }

  if (status === "success") {
    return (
      <SuccessMessage subtext="Brent will review your farm details and follow up with a personalized opinion of value." />
    );
  }

  return (
    <form id="farm-valuation" onSubmit={handleSubmit} className="space-y-5">
      <FormRow>
        <div>
          <FieldLabel htmlFor="fvFirstName">Name</FieldLabel>
          <TextInput id="fvFirstName" name="firstName" required />
        </div>
        <div>
          <FieldLabel htmlFor="fvLastName">&nbsp;</FieldLabel>
          <TextInput id="fvLastName" name="lastName" placeholder="Last name" required />
        </div>
      </FormRow>
      <FormRow>
        <div>
          <FieldLabel htmlFor="fvEmail">Email</FieldLabel>
          <TextInput id="fvEmail" name="email" type="email" required />
        </div>
        <div>
          <FieldLabel htmlFor="fvPhone">Phone</FieldLabel>
          <TextInput id="fvPhone" name="phone" type="tel" required />
        </div>
      </FormRow>

      <div>
        <FieldLabel htmlFor="fvAddress">Property Address</FieldLabel>
        <TextInput id="fvAddress" name="address" required />
      </div>

      <FormRow>
        <div>
          <FieldLabel htmlFor="totalAcreage">Total Acreage</FieldLabel>
          <TextInput id="totalAcreage" name="totalAcreage" type="number" />
        </div>
        <div>
          <FieldLabel htmlFor="tillableAcreage">Tillable Acreage</FieldLabel>
          <TextInput id="tillableAcreage" name="tillableAcreage" type="number" />
        </div>
      </FormRow>
      <FormRow>
        <div>
          <FieldLabel htmlFor="pasture">Pasture</FieldLabel>
          <TextInput id="pasture" name="pasture" placeholder="Acres or description" />
        </div>
        <div>
          <FieldLabel htmlFor="woodlot">Woodlot</FieldLabel>
          <TextInput id="woodlot" name="woodlot" placeholder="Acres or description" />
        </div>
      </FormRow>

      <div>
        <FieldLabel htmlFor="buildings">Buildings (general)</FieldLabel>
        <TextInput id="buildings" name="buildings" placeholder="Brief overview" />
      </div>
      <FormRow>
        <div>
          <FieldLabel htmlFor="house">House</FieldLabel>
          <TextInput id="house" name="house" placeholder="e.g. 4 bed farmhouse, 1995" />
        </div>
        <div>
          <FieldLabel htmlFor="barns">Barns</FieldLabel>
          <TextInput id="barns" name="barns" />
        </div>
      </FormRow>
      <FormRow>
        <div>
          <FieldLabel htmlFor="silos">Silos</FieldLabel>
          <TextInput id="silos" name="silos" />
        </div>
        <div>
          <FieldLabel htmlFor="outbuildings">Outbuildings</FieldLabel>
          <TextInput id="outbuildings" name="outbuildings" />
        </div>
      </FormRow>

      <div>
        <FieldLabel htmlFor="fvAdditionalInfo">Additional Information</FieldLabel>
        <TextArea id="fvAdditionalInfo" name="additionalInfo" rows={4} />
      </div>

      {status === "error" && <p className="text-sm text-brand-red">{error}</p>}

      <Button type="submit" size="lg" className="w-full" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending..." : "Request Farm Valuation"}
      </Button>
    </form>
  );
}
