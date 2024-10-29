import React from "react";
import { X } from "lucide-react";

export default function CloseButton({ onClose }) {
  return (
    // dispatch({ type: "TOGGLE_TAG", payload: tag })
    <button className="absolute top-2 right-2" onClick={onClose}>
      <X className="h-4 w-4" />
      <span className="sr-only">Close</span>
    </button>
  );
}
