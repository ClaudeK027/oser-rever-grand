import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function combining clsx and tailwind-merge.
 * Allows conditional class names with intelligent Tailwind conflict resolution.
 * Example: cn("p-2", isPrimary && "bg-gold-500", className)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
