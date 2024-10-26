import React from "react";
import VideoCardContent from "./VideoCardContent";

export default function VideoCard({video}) {   
    return (
        <div className="bg-white rounded-lg shadow-md w-[calc(33.33%-16px)] overflow-hidden flex flex-col hover:shadow-xl ">
            <img
                alt={video.title}
                // hover:grayscale
                className="w-full object-cover aspect-video hover:opacity-50  cursor-pointer"
                height="200"
                src={video.thumbnail}
                style={{
                aspectRatio: "300/200",
                objectFit: "cover",
                }}
                width="300"
            ></img>
            <VideoCardContent></VideoCardContent>
        </div>
    )
}   