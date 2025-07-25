import React, { useRef } from "react";
import ReactDOM from "react-dom";
import SplitText from "../TextAnimations/SplitText/SplitText.jsx";

export default function HeroTitle() {
  return (
    <div className="mt-10">
      <SplitText
        text="Digital Sanctuary"
        className="text-7xl font-semibold text-center"
        delay={100}
        duration={0.6}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-100px"
        textAlign="center"
      />
    </div>
  );
}
