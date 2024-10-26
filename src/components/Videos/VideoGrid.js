import {useState, useEffect} from "react";
import VideoCard from "./VideoCard";



export default function VideoGrid (){

    const [videos, setVideos] = useState([]);


    useEffect(() => {
        fetch("videos.json")
        .then((response)=>response.json())
        .then((data)=>setVideos(data));
    }, []);

    return (
        <div className="flex justify-evenly flex-wrap gap-4 m-5 max-w-[1200px]"> 
                {
                    videos.map((video, index) => (
                        <VideoCard key={index} video={video}></VideoCard>
                    ))
                }
        </div>  
    )   
}