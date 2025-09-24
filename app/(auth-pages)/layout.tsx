import React from "react";
import type { Metadata } from "next";
import GridPattern from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "RevTrack",
  description: "Disaster management app",
};

type LayoutProps = {
  children: React.ReactNode;
};

export default function AuthPagesLayout({ children }: LayoutProps) {
  return (
    <div 
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden"
      style={{
        backgroundImage: "url('/assets/images/bg2.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Background grid pattern - same as home page */}
      <GridPattern
        width={10}
        height={10}
        x={-1}
        y={-1}
        className={cn(
          "absolute inset-0 z-0 [mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"
        )}
      />
      
      {/* Semi-transparent overlay for better form readability */}
      <div className="absolute inset-0 bg-black/20 z-10" />

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center min-h-screen p-4 w-full">
        <div className="w-full max-w-md">
          {/* Glass morphism card */}
          <div className="backdrop-blur-sm bg-white/95 dark:bg-black/95 border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}



