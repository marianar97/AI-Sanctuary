import React from "react";
import '../CSS/header.css';
import HeroSection from "./HeroSection/HeroSection";
import VideoGrid from "./Videos/VideoGrid";

export default function HomePage() {
    return (
        <div className='w-full'>
           <HeroSection></HeroSection>
           <VideoGrid></VideoGrid>
        </div>
    );
}