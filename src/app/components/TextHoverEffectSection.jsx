"use client";
import React from "react";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

export default function TextHoverEffectSection() {
  return (
    <div className="max-w-6xl mx-auto h-[10rem] sm:h-[14rem] lg:h-[18rem] flex items-center justify-center mt-[-1rem] md:mt-[-3rem] mb-4 relative z-10">
      <TextHoverEffect text="LET'S GROW" />
    </div>
  );
}
