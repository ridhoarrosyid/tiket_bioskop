import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const SESSION_KEY = "SESSION_KEY";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
