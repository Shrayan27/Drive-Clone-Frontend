"use client";

import { useState } from "react";
import {
  File,
  Folder,
  Download,
  Trash2,
  MoreVertical,
  Eye,
  AlertTriangle,
  X,
  Share2,
  History,
} from "lucide-react";
import { FileItem } from "@/hooks/useFiles";
import { formatFileSize, formatDate, getFileIcon } from "@/lib/utils";
import { supabase, STORAGE_BUCKET } from "@/lib/supabase";
import FilePreview from "./FilePreview";
import FileSharing from "./FileSharing";
import FileVersioning from "./FileVersioning";

interface FileListProps {
  files: FileItem[];
  onDelete: (fileId: string, filePath: string) => void;
  onDownload?: (file: FileItem) => void;
  onView?: (file: FileItem) => void;
}

export default function FileList({
  files,
  onDelete,
  onDownload,
  onView,
}: FileListProps) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<FileItem | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [fileToPreview, setFileToPreview] = useState<FileItem | null>(null);
  const [showSharing, setShowSharing] = useState(false);
  const [fileToShare, setFileToShare] = useState<FileItem | null>(null);
  const [showVersioning, setShowVersioning] = useState(false);
  const [fileToVersion, setFileToVersion] = useState<FileItem | null>(null);

  const handleDelete = (file: FileItem) => {
    setFileToDelete(file);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (fileToDelete) {
      onDelete(fileToDelete.id, fileToDelete.path);
      setShowDeleteModal(false);
      setFileToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setFileToDelete(null);
  };

  const handlePreview = (file: FileItem) => {
    setFileToPreview(file);
    setShowPreview(true);
  };

  const closePreview = () => {
    setShowPreview(false);
    setFileToPreview(null);
  };

  const handleShare = (file: FileItem) => {
    setFileToShare(file);
    setShowSharing(true);
  };

  const closeSharing = () => {
    setShowSharing(false);
    setFileToShare(null);
  };

  const handleVersioning = (file: FileItem) => {
    setFileToVersion(file);
    setShowVersioning(true);
  };

  const closeVersioning = () => {
    setShowVersioning(false);
    setFileToVersion(null);
  };

  const handleDownload = async (file: FileItem) => {
    if (onDownload) {
      onDownload(file);
    } else {
      try {
        // Download from Supabase
        const { data, error } = await supabase.storage
          .from(STORAGE_BUCKET)
          .download(file.path);

        if (error) {
          console.error("Download error:", error);
          return;
        }

        // Create download link
        const url = URL.createObjectURL(data);
        const link = document.createElement("a");
        link.href = url;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Download error:", error);
      }
    }
  };

  if (files.length === 0) {
    return (
      <div className="text-center text-gray-500 py-12">
        <File className="h-16 w-16 mx-auto mb-4 text-gray-300" />
        <p className="text-lg font-medium mb-2">No files found</p>
        <p className="text-sm">Upload some files to get started</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Size
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Modified
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {files.map((file) => (
              <tr key={file.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      {getFileIcon(file.type, "h-10 w-10 text-gray-400")}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                        {file.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatFileSize(file.size)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(file.updatedAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {file.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => handlePreview(file)}
                      className="text-blue-600 hover:text-blue-900 p-1"
                      title="Preview file"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleShare(file)}
                      className="text-purple-600 hover:text-purple-900 p-1"
                      title="Share file"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleVersioning(file)}
                      className="text-orange-600 hover:text-orange-900 p-1"
                      title="View versions"
                    >
                      <History className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDownload(file)}
                      className="text-green-600 hover:text-green-900 p-1"
                      title="Download file"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(file)}
                      className="text-red-600 hover:text-red-900 p-1"
                      title="Delete file"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && fileToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 h-10 w-10 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Delete File
                </h3>
              </div>
              <button
                onClick={cancelDelete}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-6">
              <p className="text-gray-600 mb-2">
                Are you sure you want to delete this file?
              </p>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 h-8 w-8">
                    {getFileIcon(fileToDelete.type, "h-8 w-8 text-gray-400")}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {fileToDelete.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(fileToDelete.size)}
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-red-600 mt-2">
                This action cannot be undone.
              </p>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Delete File
              </button>
            </div>
          </div>
        </div>
      )}

      {/* File Preview Modal */}
      {showPreview && fileToPreview && (
        <FilePreview file={fileToPreview} onClose={closePreview} />
      )}

      {/* File Sharing Modal */}
      {showSharing && fileToShare && (
        <FileSharing file={fileToShare} onClose={closeSharing} />
      )}

      {/* File Versioning Modal */}
      {showVersioning && fileToVersion && (
        <FileVersioning file={fileToVersion} onClose={closeVersioning} />
      )}
    </div>
  );
}
