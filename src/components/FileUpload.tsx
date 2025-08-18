"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, File, Folder } from "lucide-react";
import { useFiles } from "@/hooks/useFiles";
import toast from "react-hot-toast";

interface FileUploadProps {
  onClose: () => void;
  folderPath?: string;
}

export default function FileUpload({
  onClose,
  folderPath = "",
}: FileUploadProps) {
  const { uploadFile, uploading } = useFiles();
  const [uploadProgress, setUploadProgress] = useState<{
    [key: string]: number;
  }>({});

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      try {
        for (const file of acceptedFiles) {
          setUploadProgress((prev) => ({ ...prev, [file.name]: 0 }));

          await uploadFile(file, folderPath);
          setUploadProgress((prev) => ({ ...prev, [file.name]: 100 }));

          toast.success(`${file.name} uploaded successfully!`);
        }

        // Close modal and refresh page after successful upload
        setTimeout(() => {
          onClose();
          window.location.reload();
        }, 1000);
      } catch (error: any) {
        console.error("Upload error:", error);
        const errorMessage =
          error.message || "Failed to upload file. Please try again.";
        toast.error(errorMessage);
      }
    },
    [uploadFile, folderPath, onClose]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
      "application/pdf": [".pdf"],
      "text/*": [".txt", ".md", ".json", ".csv"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "application/vnd.ms-powerpoint": [".ppt"],
      "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        [".pptx"],
    },
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Upload Files</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
        >
          <input {...getInputProps()} />

          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />

          {isDragActive ? (
            <p className="text-blue-600 font-medium">Drop the files here...</p>
          ) : (
            <div>
              <p className="text-gray-600 mb-2">
                Drag & drop files here, or click to select
              </p>
              <p className="text-sm text-gray-500">
                Supports images, documents, PDFs, and more
              </p>
            </div>
          )}
        </div>

        {uploading && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Uploading files...</p>
            {Object.entries(uploadProgress).map(([fileName, progress]) => (
              <div key={fileName} className="mb-2">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="truncate">{fileName}</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
