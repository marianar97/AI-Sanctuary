import {useEffect, useState} from "react";
import '../CSS/header.css';
import HeroSection from "./HeroSection/HeroSection";
import VideoGrid from "./Videos/VideoGrid";

export default function HomePage() {
    const [videos, setVideos] = useState([]);
    const [activeVideo, setActiveVideo] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const openVideo = (videoId) => setActiveVideo(videoId)
    const closeVideo = () => setActiveVideo(null)
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    }

    const filteredVideos = videos.filter(video => video.title.toLowerCase().includes(searchTerm.toLowerCase()))
    
    useEffect(() => {
        fetch("videos.json")
        .then((response)=>response.json())
        .then((data)=>setVideos(data));
    }, []);


    return (
        <div className='flex flex-col w-full items-center'>
           <HeroSection value={searchTerm} handleSearch={handleSearch} ></HeroSection>
           <VideoGrid videos={filteredVideos} openVideo={openVideo} activeVideo={activeVideo} closeVideo={closeVideo}></VideoGrid>
        </div>
    );
}