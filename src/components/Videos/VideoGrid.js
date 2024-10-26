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
        <div className="flex justify-center flex-wrap gap-4 m-5"> 
                {
                    videos.map((video, index) => (
                        <VideoCard key={index} video={video}></VideoCard>
                    ))
                }
        </div>  
    )   
}