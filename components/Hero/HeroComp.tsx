import React from "react";
import Ripple from "../ui/ripple";
import Input from "./input";
import { HeroCards } from "./Cards";
import { cn } from "@/lib/utils";
import GridPattern from "../ui/grid-pattern";

export const HeroComp = () => {
  return (
    <div
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg border md:shadow-xl"
      style={{
        backgroundImage: "url('/assets/images/bg2.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="z-[60] text-center mb-10 px-4">
        <h1 className="text-3xl md:text-6xl font-bold text-black pb-4 font-playfair leading-tight">
          Compare Prices. Track History. Analyze Reviews.
        </h1>
        <p className="text-lg md:text-2xl text-gray-800 font-poppins font-medium leading-relaxed">
          RevTrack gives you the insights you need to make confident purchasing
          decisions. <br />
          Compare prices, track history, and get AI-powered review summaries —
          all in one place.
        </p>
      </div>

      <Input />
      <Ripple />

      {/* Floating Cards */}
      <HeroCards
        className="hidden md:block absolute lg:top-20 lg:left-20 md:top-36 md:left-10 px-4 rounded-xl z-[40]"
        imageUrl={"/assets/images/laptop.webp"}
        delay={0}
      />
      <HeroCards
        className="hidden md:block absolute lg:bottom-20 lg:left-64 md:bottom-10 md:left-10 rounded-xl z-[60]"
        imageUrl={"/assets/images/shirt.webp"}
        delay={2}
      />
      <HeroCards
        className="absolute top-20 md:top-9 md:right-6 lg:top-20 lg:right-80 rounded-xl z-[60]"
        imageUrl={"/assets/images/shoes.webp"}
        delay={1}
      />
      <HeroCards
        className="absolute bottom-20 right-10 md:bottom-20 md:right-3 lg:bottom-56 lg:right-48 rounded-xl z-[60]"
        imageUrl={"/assets/images/watch.webp"}
        delay={3}
      />

      {/* Background grid */}
      <GridPattern
        width={10}
        height={10}
        x={-1}
        y={-1}
        className={cn(
          "absolute inset-0 z-0 [mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"
        )}
      />
    </div>
  );
};
