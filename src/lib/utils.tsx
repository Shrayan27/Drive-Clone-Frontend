import React from "react";
import {
  File,
  Folder,
  Image,
  FileText,
  FileSpreadsheet,
  FilePresentation,
  Archive,
} from "lucide-react";

// Format file size
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

// Format date
export function formatDate(date: Date): string {
  const now = new Date();
  const diffInHours =
    Math.abs(now.getTime() - date.getTime()) / (1000 * 60 * 60);

  if (diffInHours < 24) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } else if (diffInHours < 168) {
    // 7 days
    return date.toLocaleDateString([], { weekday: "short" });
  } else {
    return date.toLocaleDateString([], { month: "short", day: "numeric" });
  }
}

// Get file icon based on MIME type
export function getFileIcon(
  mimeType: string,
  className: string = "h-6 w-6"
): React.ReactElement {
  if (mimeType.startsWith("image/")) {
    return <Image className={className} />;
  } else if (mimeType.includes("pdf")) {
    return <FileText className={className} />;
  } else if (mimeType.includes("word") || mimeType.includes("document")) {
    return <FileText className={className} />;
  } else if (mimeType.includes("excel") || mimeType.includes("spreadsheet")) {
    return <FileSpreadsheet className={className} />;
  } else if (
    mimeType.includes("powerpoint") ||
    mimeType.includes("presentation")
  ) {
    return <FilePresentation className={className} />;
  } else if (
    mimeType.includes("zip") ||
    mimeType.includes("rar") ||
    mimeType.includes("7z")
  ) {
    return <Archive className={className} />;
  } else if (mimeType.startsWith("text/")) {
    return <FileText className={className} />;
  } else {
    return <File className={className} />;
  }
}

// Get file extension from filename
export function getFileExtension(filename: string): string {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
}

// Check if file is an image
export function isImageFile(mimeType: string): boolean {
  return mimeType.startsWith("image/");
}

// Check if file is a document
export function isDocumentFile(mimeType: string): boolean {
  return (
    mimeType.includes("pdf") ||
    mimeType.includes("word") ||
    mimeType.includes("document") ||
    mimeType.includes("excel") ||
    mimeType.includes("spreadsheet") ||
    mimeType.includes("powerpoint") ||
    mimeType.includes("presentation") ||
    mimeType.startsWith("text/")
  );
}

// Generate a unique filename
export function generateUniqueFilename(originalName: string): string {
  const timestamp = Date.now();
  const extension = getFileExtension(originalName);
  const nameWithoutExt = originalName.replace(`.${extension}`, "");
  return `${nameWithoutExt}_${timestamp}.${extension}`;
}
