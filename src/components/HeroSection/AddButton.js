import React from "react";

export default function AddButton({ onAddVideo }) {
  return (
    <button
      className="gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-black text-white hover:bg-black/90 h-11 rounded-md px-8 inline-flex items-center justify-center"
      onClick={onAddVideo}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className="lucide lucide-plus mr-2 h-4 w-4"
        data-id="24"
      >
        <path d="M5 12h14"></path>
        <path d="M12 5v14"></path>
      </svg>
      Add Your Own Video
    </button>
  );
}
