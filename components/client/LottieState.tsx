'use client';

import { LottieStateProps } from '@/types';
import { DotLottiePlayer } from '@dotlottie/react-player';
import '@dotlottie/react-player/dist/index.css';

export default function LottieState({ src, description, children }: LottieStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-32 h-32">
        <DotLottiePlayer src={src} autoplay loop />
      </div>
      <p className="text-gray-500 mt-2">{description}</p>
      {children}
    </div>
  );
}
