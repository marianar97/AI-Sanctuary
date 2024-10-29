import React from "react";

export default function HeroInfo() {
  return (
    <div>
      <h1 className="text-3xl mb-2font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
        <span
          style={{
            background: "linear-gradient(135deg, #3b82f6, #ec4899, #f97316)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            color: "transparent",
            display: "inline-block",
            padding: "0 0.1em",
          }}
        >
          AI Sanctuary
        </span>
      </h1>
    </div>
  );
}
