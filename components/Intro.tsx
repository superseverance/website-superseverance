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
    }, 8000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-100 flex items-center justify-center overflow-hidden bg-neutral-900 transition-opacity duration-500">
      <div className="relative w-1/2 aspect-video">
        <div className="absolute z-20 top-1/2 left-1/2 w-1/2 aspect-square animate-max">
          <div className="absolute w-[150%] aspect-[4/3] -translate-x-full animate-ma">
            <Image src="/images/ma.png" alt="" fill priority className="object-contain" />
          </div>
          <div className="absolute inset-0">
            <Image src="/images/stick.png" alt="" fill priority
              className="absolute inset-0 animate-stick" />
            <Image src="/images/stick.png" alt="" fill priority
              className="absolute inset-0 -scale-x-100 animate-stick" />
          </div>
        </div>
        <Image src="/images/sse.png" alt="" fill priority className="absolute inset-0 z-10 opacity-0 animate-sse" />
      </div>
    </div>
  );
}