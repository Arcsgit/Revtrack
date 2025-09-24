"use client";

import { cn } from "@/lib/utils";
import { MagicCard } from "../ui/magic-card";
import Image from "next/image";
import { motion } from "motion/react";

export const HeroCards = ({
  className,
  imageUrl,
  delay = 0,
}: {
  className?: string;
  imageUrl: string;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: 20, 
        rotate: -2,
        scale: 0.9
      }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        rotate: [0, 1, -1, 0],
        scale: 1
      }}
      whileHover={{ 
        scale: 1.05, 
        rotate: 2,
        transition: { duration: 0.2 }
      }}
      transition={{ 
        duration: 0.6,
        delay: delay * 0.1,
        rotate: {
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }
      }}
      className={cn("flex w-max flex-col gap-4 h-max lg:flex-row", className)}
    >
      <MagicCard
        className="cursor-pointer flex-col items-center justify-center whitespace-nowrap text-4xl shadow-2xl"
        gradientColor="#D9D9D955"
      >
        <Image
          width={200}
          height={200}
          src={imageUrl}
          alt="product"
          className="p-4 rounded-xl"
        />
      </MagicCard>
    </motion.div>
  );
};
