"use client";

import { useState, useEffect } from "react";
import { X, Download, ExternalLink, FileText, Image, File } from "lucide-react";
import { FileItem } from "@/hooks/useFiles";
import { supabase, STORAGE_BUCKET } from "@/lib/supabase";

interface FilePreviewProps {
  file: FileItem;
  onClose: () => void;
}

export default function FilePreview({ file, onClose }: FilePreviewProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [textContent, setTextContent] = useState<string | null>(null);

  useEffect(() => {
    loadPreview();
  }, [file]);

  const loadPreview = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("Loading preview for file:", {
        name: file.name,
        type: file.type,
        path: file.path,
        bucket: STORAGE_BUCKET,
      });

      if (file.type.startsWith("image/")) {
        // For images, get the public URL
        const { data, error } = supabase.storage
          .from(STORAGE_BUCKET)
          .getPublicUrl(file.path);

        if (error) {
          console.error("Error getting public URL:", error);
          throw error;
        }

        console.log("Public URL data:", data);
        setPreviewUrl(data.publicUrl);

        // Test if the URL is accessible
        try {
          const response = await fetch(data.publicUrl, { method: "HEAD" });
          if (!response.ok) {
            console.warn("Public URL not accessible, trying download method");
            // Fallback: download and create blob URL
            const { data: fileData, error: downloadError } =
              await supabase.storage.from(STORAGE_BUCKET).download(file.path);

            if (downloadError) throw downloadError;

            const blobUrl = URL.createObjectURL(fileData);
            setPreviewUrl(blobUrl);
          }
        } catch (fetchError) {
          console.warn(
            "Fetch test failed, using public URL anyway:",
            fetchError
          );
        }
      } else if (
        file.type === "application/pdf" ||
        file.type.toLowerCase() === "application/pdf"
      ) {
        // For PDFs, try multiple approaches
        console.log("Processing PDF file:", {
          name: file.name,
          type: file.type,
          path: file.path,
          bucket: STORAGE_BUCKET,
        });

        try {
          // First, try to get public URL
          const { data, error } = supabase.storage
            .from(STORAGE_BUCKET)
            .getPublicUrl(file.path);

          if (error) {
            console.error("Error getting PDF public URL:", error);
            throw error;
          }

          console.log("PDF public URL data:", data);

          // Test if the URL is accessible
          try {
            const response = await fetch(data.publicUrl, { method: "HEAD" });
            if (!response.ok) {
              console.warn(
                "PDF public URL not accessible, trying download method"
              );
              // Fallback: download and create blob URL
              const { data: fileData, error: downloadError } =
                await supabase.storage.from(STORAGE_BUCKET).download(file.path);

              if (downloadError) throw downloadError;

              const blobUrl = URL.createObjectURL(fileData);
              setPreviewUrl(blobUrl);
            } else {
              setPreviewUrl(data.publicUrl);
            }
          } catch (fetchError) {
            console.warn(
              "PDF fetch test failed, trying download method:",
              fetchError
            );
            // Fallback: download and create blob URL
            const { data: fileData, error: downloadError } =
              await supabase.storage.from(STORAGE_BUCKET).download(file.path);

            if (downloadError) throw downloadError;

            const blobUrl = URL.createObjectURL(fileData);
            setPreviewUrl(blobUrl);
          }
        } catch (pdfError) {
          console.error("PDF processing error:", pdfError);
          throw pdfError;
        }
      } else if (file.type.startsWith("text/")) {
        // For text files, download and display content
        const { data, error } = await supabase.storage
          .from(STORAGE_BUCKET)
          .download(file.path);

        if (error) throw error;

        const text = await data.text();
        setTextContent(text);
      } else {
        // For other file types, show a generic preview
        setPreviewUrl(null);
        setTextContent(null);
      }
    } catch (err) {
      setError("Failed to load preview");
      console.error("Preview error:", err);
    } finally {
      setLoading(false);
    }
  };

  const getFileIcon = () => {
    if (file.type.startsWith("image/")) {
      return <Image className="h-16 w-16 text-blue-500" />;
    } else if (file.type === "application/pdf") {
      return <FileText className="h-16 w-16 text-red-500" />;
    } else if (file.type.startsWith("text/")) {
      return <FileText className="h-16 w-16 text-green-500" />;
    } else {
      return <File className="h-16 w-16 text-gray-500" />;
    }
  };

  const handleDownload = async () => {
    try {
      const { data, error } = await supabase.storage
        .from(STORAGE_BUCKET)
        .download(file.path);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download error:", err);
    }
  };

  const handleOpenInNewTab = () => {
    if (previewUrl) {
      window.open(previewUrl, "_blank");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] w-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            {getFileIcon()}
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {file.name}
              </h2>
              <p className="text-sm text-gray-500">
                {file.type} • {Math.round(file.size / 1024)} KB
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleDownload}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
              title="Download"
            >
              <Download className="h-5 w-5" />
            </button>
            {previewUrl && (
              <button
                onClick={handleOpenInNewTab}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                title="Open in new tab"
              >
                <ExternalLink className="h-5 w-5" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-gray-600">Loading preview...</span>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-64 text-red-600">
              <p>{error}</p>
            </div>
          ) : file.type.startsWith("image/") && previewUrl ? (
            <div className="flex justify-center">
              <img
                src={previewUrl}
                alt={file.name}
                className="max-w-full max-h-96 object-contain rounded-lg shadow-lg"
              />
            </div>
          ) : file.type === "application/pdf" && previewUrl ? (
            <div className="h-96">
              <iframe
                src={previewUrl}
                className="w-full h-full border border-gray-200 rounded-lg"
                title={file.name}
              />
            </div>
          ) : file.type.startsWith("text/") && textContent ? (
            <div className="bg-gray-50 p-4 rounded-lg">
              <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono overflow-auto max-h-96">
                {textContent}
              </pre>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              {getFileIcon()}
              <p className="mt-4 text-lg font-medium">Preview not available</p>
              <p className="text-sm">This file type cannot be previewed</p>
              <button
                onClick={handleDownload}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Download File
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
