"use client";

import { useState, useMemo } from "react";
import {
  Cloud,
  Folder,
  File,
  Search,
  Upload,
  Settings,
  LogOut,
  User,
  SortAsc,
  SortDesc,
  Trash2,
  Crown,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useFiles } from "@/hooks/useFiles";
import FileList from "@/components/FileList";
import FileUpload from "@/components/FileUpload";
import PremiumPlans from "@/components/PremiumPlans";
import Link from "next/link";

export default function DashboardPage() {
  const { user, signOut } = useAuth();
  const { files, loading, deleteFile } = useFiles();
  const [currentFolder, setCurrentFolder] = useState("My Drive");
  const [showUpload, setShowUpload] = useState(false);
  const [showPremiumPlans, setShowPremiumPlans] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "size" | "date">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  // Filter and sort files
  const filteredAndSortedFiles = useMemo(() => {
    let filtered = files;

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = files.filter(
        (file) =>
          file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          file.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
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
        case "date":
          aValue = a.updatedAt;
          bValue = b.updatedAt;
          break;
        default:
          aValue = a.updatedAt;
          bValue = b.updatedAt;
      }

      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [files, searchQuery, sortBy, sortOrder]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Cloud className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">DriveClone</span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">
                {user?.displayName || user?.email}
              </span>
            </div>
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
              <Settings className="h-5 w-5" />
            </button>
            <button
              onClick={handleSignOut}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <nav className="p-4">
            <div className="space-y-2">
              <Link href="/dashboard" className="sidebar-item active w-full">
                <Folder className="h-5 w-5 mr-3" />
                My Drive
              </Link>
              <Link href="/dashboard/recent" className="sidebar-item w-full">
                <File className="h-5 w-5 mr-3" />
                Recent
              </Link>
              <Link href="/dashboard/search" className="sidebar-item w-full">
                <Search className="h-5 w-5 mr-3" />
                Search
              </Link>
              <Link href="/dashboard/trash" className="sidebar-item w-full">
                <Trash2 className="h-5 w-5 mr-3" />
                Trash
              </Link>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900">
                {currentFolder}
              </h1>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowPremiumPlans(true)}
                  className="btn-secondary flex items-center"
                >
                  <Crown className="h-4 w-4 mr-2" />
                  Upgrade
                </button>
                <button
                  onClick={() => setShowUpload(true)}
                  className="btn-primary"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Files
                </button>
              </div>
            </div>

            {/* Breadcrumbs */}
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <span className="breadcrumb-item">My Drive</span>
              {currentFolder !== "My Drive" && (
                <>
                  <span className="breadcrumb-separator">/</span>
                  <span className="breadcrumb-item">{currentFolder}</span>
                </>
              )}
            </nav>

            {/* Storage Usage */}
            {(() => {
              const totalSize = files.reduce((acc, file) => acc + file.size, 0);
              const usedGB = (totalSize / (1024 * 1024 * 1024)).toFixed(2);
              const usagePercentage = Math.min(
                (totalSize / (5 * 1024 * 1024 * 1024)) * 100,
                100
              );

              return (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-blue-900">
                        Storage Usage
                      </h3>
                      <p className="text-xs text-blue-700 mt-1">
                        {usedGB} GB used
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-blue-900">
                        Free Plan
                      </p>
                      <p className="text-xs text-blue-700">5 GB limit</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${usagePercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Search and Sort Controls */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search files..."
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
                    setSortBy(e.target.value as "name" | "size" | "date")
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[120px]"
                >
                  <option value="name">Name</option>
                  <option value="size">Size</option>
                  <option value="date">Date</option>
                </select>
                <button
                  onClick={() =>
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                  }
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  title={`Sort ${
                    sortOrder === "asc" ? "Descending" : "Ascending"
                  }`}
                >
                  {sortOrder === "asc" ? (
                    <SortAsc className="h-4 w-4" />
                  ) : (
                    <SortDesc className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          {loading ? (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">Loading files...</span>
              </div>
            </div>
          ) : files.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="text-center text-gray-500">
                <Folder className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium mb-2">No files yet</p>
                <p className="text-sm mb-4">
                  Upload files or create folders to get started
                </p>
                <button
                  onClick={() => setShowUpload(true)}
                  className="btn-outline"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Files
                </button>
              </div>
            </div>
          ) : (
            <FileList files={filteredAndSortedFiles} onDelete={deleteFile} />
          )}
        </main>
      </div>

      {/* Upload Modal */}
      {showUpload && <FileUpload onClose={() => setShowUpload(false)} />}

      {/* Premium Plans Modal */}
      {showPremiumPlans && (
        <PremiumPlans onClose={() => setShowPremiumPlans(false)} />
      )}
    </div>
  );
}
