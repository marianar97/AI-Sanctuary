import React from "react";
import '../CSS/header.css';
import HeroSection from "./HeroSection/HeroSection";
import VideoGrid from "./Videos/VideoGrid";

export default function HomePage() {
    return (
        <div className='flex flex-col w-full items-center'>
           <HeroSection></HeroSection>
           <VideoGrid></VideoGrid>
        </div>
    );
}