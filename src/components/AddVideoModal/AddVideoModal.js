import React, { useState } from "react";
import ModalTitle from "./ModalTitle";
import CloseButton from "./CloseButton";
import AddVideoForm from "./AddVideoForm";
import AddVideoTags from "./AddVideoTags";

export default function AddVideoModal({ isOpen, onClose }) {
  const [newVideoUrl, setNewVideoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);

  const handleSelectedTag = (tag) => {
    setSelectedTags((prevTags) => {
      if (prevTags.includes(tag)) {
        return prevTags.filter((t) => t !== tag);
      } else {
        return [...prevTags, tag];
      }
    });
  };

  const clearState = () => {
    setNewVideoUrl("");
    setSelectedTags([]);
    setError(null);
  };

  const handleClose = () => {
    clearState();
    onClose();
  };
  const isValidYouTubeUrl = (url) => {
    console.log(url);
    if (!url || typeof url !== "string") {
      throw new Error("URL must be a non-empty string");
    }

    // Pattern for various YouTube URL formats
    const patterns = {
      // Standard watch URL
      standardWatch:
        /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})(?:&.*)?$/,
      // Short URL
      shortUrl:
        /^(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]{11})(?:\?.*)?$/,
      // Embed URL
      embedUrl:
        /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})(?:\?.*)?$/,
      // Share URL
      shareUrl:
        /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/v\/([a-zA-Z0-9_-]{11})(?:\?.*)?$/,
    };

    // Try each pattern
    for (const [format, pattern] of Object.entries(patterns)) {
      const match = url.match(pattern);
      if (match) {
        return match[1]; // Return the video ID
      }
    }

    // If no patterns match
    throw new Error("Invalid YouTube URL format");
  };

  const handleAddVideo = async () => {
    setIsLoading(true);
    clearState();
    try {
      isValidYouTubeUrl(newVideoUrl);
      // We don't need to check if(!videoId) here because isValidYouTubeUrl will throw if invalid
      console.log("sending data to the server");
      const request = JSON.stringify({
        tags: selectedTags,
        url: newVideoUrl,
      });
      console.log("request", request);
      // Add video
      const response = await fetch(
        "https://ai-hub-server.vercel.app/api/parse-video",
        {
          // Added http://
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tags: selectedTags,
            url: newVideoUrl,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to add video: ${response.statusText}`);
      }

      const data = await response.json();
      window.location.reload(true);
      onClose();
    } catch (error) {
      setError(error.message); // Set just the error message instead of the entire error object
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative max-w-md w-full">
        <CloseButton onClose={handleClose} />
        <ModalTitle title="Add Your Own Video" />
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <AddVideoForm
          value={newVideoUrl}
          onChange={(e) => setNewVideoUrl(e.target.value)}
          handleAddVideo={handleAddVideo}
          handleSelectedTag={handleSelectedTag}
        ></AddVideoForm>
      </div>
    </div>
  );
}
