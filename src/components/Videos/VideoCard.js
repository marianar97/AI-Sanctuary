import React from "react";
import VideoCardContent from "./VideoCardContent";

export default function VideoCard({ video, playVideo }) {
  console.log("in video card");
  console.log("video", video);
  return (
    <div className="bg-white rounded-lg shadow-md sm:w-full md:w-[calc(33.33%-16px)] overflow-hidden flex flex-col hover:shadow-xl ">
      <img
        alt={video.title}
        // hover:grayscale
        className="w-full object-cover aspect-video hover:opacity-50  cursor-pointer"
        height="200"
        src={video.thumbnails.high.url}
        style={{
          aspectRatio: "300/200",
          objectFit: "cover",
        }}
        width="300"
        onClick={() => playVideo(video.videoId)}
      ></img>
      <VideoCardContent
        title={video.title}
        channel={video.channelTitle}
        duration={video.duration}
        tags={video.tags}
      ></VideoCardContent>
    </div>
  );
}
