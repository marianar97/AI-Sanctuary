import VideoCard from "./VideoCard";
import { X } from "lucide-react";

export default function VideoGrid({
  videos,
  openVideo,
  closeVideo,
  activeVideo,
}) {
  return (
    <div>
      <div className="flex justify-evenly flex-wrap gap-4 m-5 max-w-[1200px]">
        {videos.map((video, index) => (
          <VideoCard
            key={index}
            video={video}
            playVideo={openVideo}
          ></VideoCard>
        ))}
      </div>

      {activeVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg relative max-w-3xl w-full">
            <button
              className="[&_svg]:size-4 [&_svg]:shrink-0 hover:bg-white color-black h-9 w-9 absolute top-2 right-2"
              onClick={closeVideo}
            >
              <X size={24} />
              <span className="sr-only">Close</span>
            </button>
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${activeVideo}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
