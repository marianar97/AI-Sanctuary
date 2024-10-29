import React, { useReducer, useEffect } from "react";
import "../CSS/header.css";
import HeroSection from "./HeroSection/HeroSection";
import VideoGrid from "./Videos/VideoGrid";
import Tags from "./Tags/Tags";
import reducer from "../reducers/videoReducer";
import SearchBar from "./Search/SearchBar";
import AddVideoModal from "./AddVideoModal/AddVideoModal";

const initialState = {
  videos: [],
  activeVideo: null,
  searchTerm: "",
  selectedTags: [],
  isAddVideoModalOpen: false,
};

export default function HomePage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { videos, activeVideo, searchTerm, selectedTags, isAddVideoModalOpen } =
    state;

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

  const onAddVideo = () => {
    dispatch({ type: "SET_IS_ADD_VIDEO_MODAL_OPEN", payload: true });
  };
  const onCloseAddVideo = () => {
    dispatch({ type: "SET_IS_ADD_VIDEO_MODAL_OPEN", payload: false });
  };

  useEffect(() => {
    fetch("videos.json")
      .then((response) => response.json())
      .then((data) => dispatch({ type: "SET_VIDEOS", payload: data }));
  }, []);

  return (
    <div className="flex flex-col w-full items-center">
      <HeroSection onAddVideo={onAddVideo}></HeroSection>
      <div className="w-full py-12 md:py-24 lg:py-32 container">
        <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Tags onClick={handleTagToggle}></Tags>
          <SearchBar value={searchTerm} handleSearch={handleSearch}></SearchBar>
        </div>
        <VideoGrid
          videos={filteredVideos}
          openVideo={openVideo}
          activeVideo={activeVideo}
          closeVideo={closeVideo}
        ></VideoGrid>
        <AddVideoModal
          isOpen={isAddVideoModalOpen}
          onClose={onCloseAddVideo}
        ></AddVideoModal>
      </div>
    </div>
  );
}
