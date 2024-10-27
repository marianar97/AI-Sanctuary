import React from "react";
import HeroTitle from "./HeroTitle";
import HeroDescription from "./HeroDescription";
import SearchBar from "./Search/SearchBar";

export default function HeroSection({ value, handleSearch }) {
  return (
    <div className="flex items-center flex-col space-y-2 py-16">
      <HeroTitle></HeroTitle>
      <HeroDescription></HeroDescription>
      <SearchBar value={value} handleSearch={handleSearch}></SearchBar>
    </div>
  );
}
