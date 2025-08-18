"use client";

import { useState, useEffect } from "react";
import {
  Trash2,
  RotateCcw,
  File,
  Folder,
  Search,
  SortAsc,
  SortDesc,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useFiles } from "@/hooks/useFiles";
import Link from "next/link";

interface TrashFile {
  id: string;
  name: string;
  type: string;
  size: number;
  deletedAt: Date;
  originalPath: string;
}

export default function TrashPage() {
  const { user } = useAuth();
  const [trashFiles, setTrashFiles] = useState<TrashFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "size" | "deletedAt">(
    "deletedAt"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Mock trash data - in real app this would come from your backend
  useEffect(() => {
    if (user) {
      // Simulate loading trash files
      setTimeout(() => {
        setTrashFiles([
          {
            id: "1",
            name: "deleted-document.pdf",
            type: "application/pdf",
            size: 1024000,
            deletedAt: new Date(Date.now() - 86400000), // 1 day ago
            originalPath: "users/uid/documents/deleted-document.pdf",
          },
          {
            id: "2",
            name: "old-image.jpg",
            type: "image/jpeg",
            size: 512000,
            deletedAt: new Date(Date.now() - 172800000), // 2 days ago
            originalPath: "users/uid/images/old-image.jpg",
          },
          {
            id: "3",
            name: "temp-file.txt",
            type: "text/plain",
            size: 1024,
            deletedAt: new Date(Date.now() - 259200000), // 3 days ago
            originalPath: "users/uid/temp/temp-file.txt",
          },
        ]);
        setLoading(false);
      }, 1000);
    }
  }, [user]);

  // Filter and sort trash files
  const filteredAndSortedFiles = trashFiles
    .filter(
      (file) =>
        searchQuery.trim() === "" ||
        file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        file.type.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      let aValue: string | number | Date;
      let bValue: string | number | Date;

      switch (sortBy) {
        case "name":
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case "size":
          aValue = a.size;
          bValue = b.size;
          break;
        case "deletedAt":
          aValue = a.deletedAt;
          bValue = b.deletedAt;
          break;
        default:
          aValue = a.deletedAt;
          bValue = b.deletedAt;
      }

      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

  const handleRestore = (fileId: string) => {
    // In real app, this would call your backend API
    setTrashFiles(trashFiles.filter((f) => f.id !== fileId));
    // Show success message
    alert("File restored successfully!");
  };

  const handlePermanentDelete = (fileId: string) => {
    if (
      confirm(
        "Are you sure you want to permanently delete this file? This action cannot be undone."
      )
    ) {
      // In real app, this would call your backend API
      setTrashFiles(trashFiles.filter((f) => f.id !== fileId));
      // Show success message
      alert("File permanently deleted!");
    }
  };

  const handleEmptyTrash = () => {
    if (
      confirm(
        "Are you sure you want to empty the trash? This will permanently delete all files."
      )
    ) {
      setTrashFiles([]);
      alert("Trash emptied successfully!");
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) {
      return <File className="h-5 w-5 text-blue-500" />;
    } else if (type === "application/pdf") {
      return <File className="h-5 w-5 text-red-500" />;
    } else if (type.startsWith("text/")) {
      return <File className="h-5 w-5 text-green-500" />;
    } else {
      return <File className="h-5 w-5 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading trash...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-gray-900"
            >
              ← Back to Drive
            </Link>
            <Trash2 className="h-8 w-8 text-red-600" />
            <span className="text-xl font-bold text-gray-900">Trash</span>
          </div>
          {trashFiles.length > 0 && (
            <button
              onClick={handleEmptyTrash}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Empty Trash
            </button>
          )}
        </div>
      </header>

      <div className="p-6">
        {/* Search and Sort Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search in trash..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Sort Controls */}
          <div className="flex items-center space-x-2">
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "name" | "size" | "deletedAt")
              }
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[140px]"
            >
              <option value="name">Name</option>
              <option value="size">Size</option>
              <option value="deletedAt">Deleted Date</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              title={`Sort ${sortOrder === "asc" ? "Descending" : "Ascending"}`}
            >
              {sortOrder === "asc" ? (
                <SortAsc className="h-4 w-4" />
              ) : (
                <SortDesc className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Trash Content */}
        {trashFiles.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <Trash2 className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Trash is empty
            </h3>
            <p className="text-gray-500">Deleted files will appear here</p>
          </div>
        ) : filteredAndSortedFiles.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <Search className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No files found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
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
                      Deleted
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
                  {filteredAndSortedFiles.map((file) => (
                    <tr key={file.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            {getFileIcon(file.type)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                              {file.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {file.originalPath}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatFileSize(file.size)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(file.deletedAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {file.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleRestore(file.id)}
                            className="text-green-600 hover:text-green-900 p-1"
                            title="Restore file"
                          >
                            <RotateCcw className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handlePermanentDelete(file.id)}
                            className="text-red-600 hover:text-red-900 p-1"
                            title="Delete permanently"
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
          </div>
        )}

        {/* Trash Info */}
        {trashFiles.length > 0 && (
          <div className="mt-6 bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 text-blue-800">
              <Trash2 className="h-5 w-5" />
              <span className="font-medium">Trash Information</span>
            </div>
            <p className="text-sm text-blue-700 mt-1">
              Files in trash are automatically deleted after 30 days. You can
              restore them or delete them permanently.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
