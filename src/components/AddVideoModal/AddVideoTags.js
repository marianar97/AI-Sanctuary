import React from "react";
import AddVideoTag from "./AddVideoTag";

export default function AddVideoTags({ onClick }) {
  const tags = [
    "Intermediate",
    "Foundation",
    "Beginner",
    "Advanced",
    "Applied",
    "Theory",
  ];
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Select Tags:</h3>
      <div className="mb-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <AddVideoTag key={tag} tag={tag} clickFunc={onClick}></AddVideoTag>
        ))}
      </div>
    </div>
  );
}
