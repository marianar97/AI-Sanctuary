import { useState } from "react";

export default function Tag({ tag, clickFunc }) {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
    clickFunc(tag);
  };
  return (
    <button
      onClick={handleClick}
      className={`${
        isActive ? "bg-black text-white hover:text-black" : ""
      } hover:bg-black hover:text-white inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground cursor-pointer`}
    >
      {tag}
    </button>
  );
}
