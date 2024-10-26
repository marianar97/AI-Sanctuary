import {useEffect, useState} from "react";
import '../CSS/header.css';
import HeroSection from "./HeroSection/HeroSection";
import VideoGrid from "./Videos/VideoGrid";
import Tags from "./Tags/Tags";

export default function HomePage() {
    const [videos, setVideos] = useState([]);
    const [activeVideo, setActiveVideo] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);

    const openVideo = (videoId) => setActiveVideo(videoId)
    const closeVideo = () => setActiveVideo(null)
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    }
    const handleTagClick = (tag) => {
        console.log("click", tag);
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    }

    let filteredVideos = videos.filter(video => video.title.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const filteredVideosByTags = (videos) => {
        if (selectedTags.length === 0) {
            return videos;
        }
        return videos.filter(video => selectedTags.every(tag => video.tags.includes(tag)));
    }

    filteredVideos = filteredVideosByTags(filteredVideos);

    useEffect(() => {
        fetch("videos.json")
        .then((response)=>response.json())
        .then((data)=>setVideos(data));
    }, []);


    return (
        <div className='flex flex-col w-full items-center'>
            <HeroSection value={searchTerm} handleSearch={handleSearch} ></HeroSection>
            <Tags onClick={handleTagClick}></Tags>
            <VideoGrid videos={filteredVideos} openVideo={openVideo} activeVideo={activeVideo} closeVideo={closeVideo}></VideoGrid>
        </div>
    );
}