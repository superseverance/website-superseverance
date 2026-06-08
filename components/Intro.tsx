"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

interface Props {
  onComplete: () => void;
  loop?: boolean;
}

export default function Intro({ onComplete, loop = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      containerRef.current?.classList.add("opacity-0");
      setTimeout(onComplete, 500);
    }, 6000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-100 flex items-center justify-center overflow-hidden bg-neutral-900 transition-opacity duration-500">
      <div className="flex items-end animate-[intro-grow_2000ms_ease-out_forwards]">
        <div className="relative overflow-hidden h-24 md:h-64 animate-[intro-ma-sm_1000ms_ease-out_2000ms_forwards] md:animate-[intro-ma-md_1000ms_ease-out_2000ms_forwards]">
          <Image src="/images/ma.png" alt="" fill priority className="object-contain" />
        </div>
        <div className="relative h-24 w-24 md:h-64 md:w-64">
          <Image src="/images/stick.png" alt="" fill priority
            className="absolute inset-0 animate-[intro-spin_2000ms_ease-out_forwards]" />
          <Image src="/images/stick.png" alt="" fill priority
            className="absolute inset-0 -scale-x-100 animate-[intro-spin_2000ms_ease-out_forwards]" />
        </div>
      </div>
    </div>
  );
}