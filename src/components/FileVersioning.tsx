
import React, { useState } from "react";
import {
  Clock,
  Download,
  RotateCcw,
  Check,
  FileText,
  Image,
  File,
  Calendar,
  User,
  MoreVertical,
} from "lucide-react";

interface FileVersion {
  id: string;
  version: string;
  createdAt: Date;
  createdBy: string;
  size: number;
  changes: string[];
  isCurrent: boolean;
  filePath: string;
}

interface FileVersioningProps {
  file: {
    id: string;
    name: string;
    type: string;
    size: number;
  };
  onClose: () => void;
}

const FileVersioning: React.FC<FileVersioningProps> = ({ file, onClose }) => {
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null
  );

  // Mock data - replace with actual API calls
  const versions: FileVersion[] = [
    {
      id: "v1",
      version: "1.0",
      createdAt: new Date(Date.now() - 86400000), // 1 day ago
      createdBy: "You",
      size: file.size,
      changes: ["Initial version"],
      isCurrent: true,
      filePath: `users/uid/${file.name}`,
    },
    {
      id: "v2",
      version: "1.1",
      createdAt: new Date(Date.now() - 172800000), // 2 days ago
      createdBy: "You",
      size: file.size + 1024,
      changes: ["Updated content", "Added new sections"],
      isCurrent: false,
      filePath: `users/uid/${file.name}`,
    },
    {
      id: "v3",
      version: "1.2",
      createdAt: new Date(Date.now() - 259200000), // 3 days ago
      createdBy: "You",
      size: file.size - 512,
      changes: ["Fixed formatting", "Removed outdated content"],
      isCurrent: false,
      filePath: `users/uid/${file.name}`,
    },
  ];

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/"))
      return <Image className="h-5 w-5 text-blue-500" />;
    if (type === "application/pdf")
      return <FileText className="h-5 w-5 text-red-500" />;
    return <File className="h-5 w-5 text-gray-500" />;
  };

  const handleRestoreVersion = (versionId: string) => {
    // In real app, this would call your backend API
    console.log(`Restoring version ${versionId}`);
    // Show success message
    alert("Version restored successfully!");
  };

  const handleDeleteVersion = (versionId: string) => {
    // In real app, this would call your backend API
    console.log(`Deleting version ${versionId}`);
    setShowDeleteConfirm(null);
    // Show success message
    alert("Version deleted successfully!");
  };

  const handleDownloadVersion = (version: FileVersion) => {
    // In real app, this would generate a download link
    console.log(`Downloading version ${version.version}`);
    // Show success message
    alert("Download started!");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            {getFileIcon(file.type)}
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Version History
              </h2>
              <p className="text-sm text-gray-500">{file.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              File Versions
            </h3>
            <p className="text-sm text-gray-500">
              Track changes and restore previous versions of your file
            </p>
          </div>

          {/* Version List */}
          <div className="space-y-4">
            {versions.map((version) => (
              <div
                key={version.id}
                className={`border rounded-lg p-4 transition-all ${
                  selectedVersion === version.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    {/* Version Badge */}
                    <div className="flex-shrink-0">
                      {version.isCurrent ? (
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <span className="text-gray-600 text-xs font-medium">
                            {version.version}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Version Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-medium text-gray-900">
                          Version {version.version}
                        </span>
                        {version.isCurrent && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Current
                          </span>
                        )}
                      </div>

                      {/* Metadata */}
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(version.createdAt)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4" />
                          <span>{version.createdBy}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <File className="h-4 w-4" />
                          <span>{formatFileSize(version.size)}</span>
                        </div>
                      </div>

                      {/* Changes */}
                      {version.changes.length > 0 && (
                        <div className="mb-3">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">
                            Changes:
                          </h4>
                          <ul className="space-y-1">
                            {version.changes.map((change, index) => (
                              <li
                                key={index}
                                className="text-sm text-gray-600 flex items-start space-x-2"
                              >
                                <span className="text-green-500 mt-1">•</span>
                                <span>{change}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 ml-4">
                    {!version.isCurrent && (
                      <>
                        <button
                          onClick={() => handleRestoreVersion(version.id)}
                          className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                          title="Restore this version"
                        >
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Restore
                        </button>
                        <button
                          onClick={() => handleDownloadVersion(version)}
                          className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                          title="Download this version"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </button>
                      </>
                    )}

                    {/* More Options */}
                    <div className="relative">
                      <button
                        onClick={() =>
                          setShowDeleteConfirm(
                            showDeleteConfirm === version.id ? null : version.id
                          )
                        }
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        title="More options"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>

                      {showDeleteConfirm === version.id && (
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                          <div className="py-1">
                            <button
                              onClick={() => handleDeleteVersion(version.id)}
                              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            >
                              Delete Version
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {versions.length === 0 && (
            <div className="text-center py-12">
              <Clock className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No versions yet
              </h3>
              <p className="text-gray-500">
                This file hasn't been modified yet. Versions will appear here
                after you make changes.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-500">
            {versions.length} version{versions.length !== 1 ? "s" : ""}{" "}
            available
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileVersioning;
