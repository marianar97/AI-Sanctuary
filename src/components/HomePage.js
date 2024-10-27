import { useEffect, useState, useReducer } from "react";
import "../CSS/header.css";
import HeroSection from "./HeroSection/HeroSection";
import VideoGrid from "./Videos/VideoGrid";
import Tags from "./Tags/Tags";
import reducer from "../reducers/videoReducer";

const initialState = {
  videos: [],
  activeVideo: null,
  searchTerm: "",
  selectedTags: [],
};

export default function HomePage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { videos, activeVideo, searchTerm, selectedTags } = state;

  const openVideo = (videoId) =>
    dispatch({ type: "SET_ACTIVE_VIDEO", payload: videoId });
  const closeVideo = () =>
    dispatch({ type: "SET_ACTIVE_VIDEO", payload: null });

  const handleSearch = (event) => {
    dispatch({ type: "SET_SEARCH_TERM", payload: event.target.value });
  };

  const handleTagToggle = (tag) => {
    dispatch({ type: "TOGGLE_TAG", payload: tag });
  };

  let filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredVideosByTags = (videos) => {
    if (selectedTags.length === 0) {
      return videos;
    }
    return videos.filter((video) =>
      selectedTags.every((tag) => video.tags.includes(tag))
    );
  };

  filteredVideos = filteredVideosByTags(filteredVideos);

  useEffect(() => {
    fetch("videos.json")
      .then((response) => response.json())
      .then((data) => dispatch({ type: "SET_VIDEOS", payload: data }));
  }, []);

  return (
    <div className="flex flex-col w-full items-center">
      <HeroSection value={searchTerm} handleSearch={handleSearch}></HeroSection>
      <Tags onClick={handleTagToggle}></Tags>
      <VideoGrid
        videos={filteredVideos}
        openVideo={openVideo}
        activeVideo={activeVideo}
        closeVideo={closeVideo}
      ></VideoGrid>
    </div>
  );
}
