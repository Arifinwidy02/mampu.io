import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fluidClamp(
  min: number,
  max: number,
  minViewport = 320,
  maxViewport = 1440,
): string {
  const slope = ((max - min) / (maxViewport - minViewport)) * 100;

  const intercept = min - (slope * minViewport) / 100;

  return `clamp(
    ${min}px,
    ${intercept.toFixed(4)}px + ${slope.toFixed(4)}vw,
    ${max}px
  )`;
}
