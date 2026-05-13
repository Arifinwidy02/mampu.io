"use client";

import { fluidClamp } from "@/lib/utils";
import { LottieStateProps } from "@/types";
import { DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";

export default function LottieState({
  src,
  description,
  children,
}: LottieStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div
        style={{
          width: fluidClamp(160, 320),
          height: fluidClamp(160, 320),
        }}
      >
        <DotLottiePlayer src={src} autoplay loop />
      </div>
      <p className="text-gray-500 mt-2">{description}</p>
      {children}
    </div>
  );
}
