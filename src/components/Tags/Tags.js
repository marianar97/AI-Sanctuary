import React from "react";
import Tag from "./Tag";

export default function Tags({ onClick }) {
  const tags = [
    "Intermediate",
    "Foundation",
    "Beginner",
    "Advanced",
    "Applied",
    "Theory",
  ];
  return (
    <div className="mb-8 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Tag key={tag} tag={tag} clickFunc={onClick}></Tag>
      ))}
    </div>
  );
}
