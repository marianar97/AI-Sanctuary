import React from "react";
import AddVideoInput from "./AddVideoInput";
import AddVideoButton from "./AddVideoButton";
import AddVideoTags from "./AddVideoTags";

export default function AddVideoForm({
  value,
  onChange,
  handleAddVideo,
  handleSelectedTag,
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <AddVideoInput value={value} onChange={onChange} />
      <AddVideoTags onClick={handleSelectedTag}></AddVideoTags>
      <AddVideoButton handleAddVideo={handleAddVideo}></AddVideoButton>
    </form>
  );
}
