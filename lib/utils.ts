import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatFileName(url: string): string {
  if (!url || typeof url !== "string") {
    return "";
  }

  try {
    const fileName = url.split("/").pop() || "";
    if (!fileName) {
      return "";
    }

    return fileName
      .replace(/\.[^/.]+$/, "")
      .replace(/[-_]/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  } catch (error) {
    console.error("Error formatting filename:", error);
    return "";
  }
}
