"use client";

import { useState } from "react";
import { Cloud, File, ArrowLeft, Upload, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useFiles } from "@/hooks/useFiles";
import FileList from "@/components/FileList";
import FileUpload from "@/components/FileUpload";
import Link from "next/link";

export default function RecentPage() {
  const { user, signOut } = useAuth();
  const { recentFiles, loading, deleteFile } = useFiles();
  const [showUpload, setShowUpload] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

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
                <File className="h-5 w-5 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">
                {user?.displayName || user?.email}
              </span>
            </div>
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
              <File className="h-5 w-5" />
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
              <Link
                href="/dashboard"
                className="sidebar-item w-full flex items-center"
              >
                <ArrowLeft className="h-5 w-5 mr-3" />
                Back to Drive
              </Link>
              <div className="border-t border-gray-200 my-4"></div>
              <div className="sidebar-item active w-full">
                <File className="h-5 w-5 mr-3" />
                Recent Files
              </div>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Recent Files
                </h1>
                <p className="text-gray-600">
                  Your recently uploaded and modified files
                </p>
              </div>
              <button
                onClick={() => setShowUpload(true)}
                className="btn-primary"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Files
              </button>
            </div>
          </div>

          {/* Content Area */}
          {loading ? (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">
                  Loading recent files...
                </span>
              </div>
            </div>
          ) : (
            <FileList files={recentFiles} onDelete={deleteFile} />
          )}
        </main>
      </div>

      {/* Upload Modal */}
      {showUpload && <FileUpload onClose={() => setShowUpload(false)} />}
    </div>
  );
}
