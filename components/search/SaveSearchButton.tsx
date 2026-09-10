"use client";

import { useState } from "react";
import { Bookmark } from "lucide-react";
import Button from "@/components/ui/Button";

export default function SaveSearchButton() {
  const [showMessage, setShowMessage] = useState(false);

  return (
    <div className="relative">
      <Button variant="outline" size="sm" onClick={() => setShowMessage(true)}>
        <Bookmark size={15} />
        Save Search
      </Button>

      {showMessage && (
        <div className="absolute right-0 mt-2 w-72 bg-ink text-white text-sm rounded-sm p-4 shadow-xl z-20 animate-fade-up">
          <p>
            Saved searches will be connected to an account/email system in a future update — this
            feature isn&apos;t live yet.
          </p>
          <button
            onClick={() => setShowMessage(false)}
            className="mt-3 text-xs font-medium text-brand-red hover:underline"
          >
            Got it
          </button>
        </div>
      )}
    </div>
  );
}
