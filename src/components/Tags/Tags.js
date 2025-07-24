import React from "react";
import Tag from "./Tag";


export default function Tags({ onClick }) {
  const tags = [
    "Videos",
    "Articles",
    "Books",
    "Movies",
    "Quotes",
  ];
  return (
    <div className="mb-8 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Tag key={tag} tag={tag} clickFunc={onClick}></Tag>
      ))}
    </div>
  );
}
