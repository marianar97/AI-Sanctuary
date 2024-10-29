import React from "react";
import HeroTitle from "./HeroTitle";
import HeroDescription from "./HeroDescription";
import AddButton from "./AddButton";

export default function HeroSection({ onAddVideo }) {
  return (
    <section className="w-full flex items-center flex-col space-y-2 py-16">
      <HeroTitle></HeroTitle>
      <HeroDescription></HeroDescription>
      <AddButton onAddVideo={onAddVideo}></AddButton>
    </section>
  );
}
