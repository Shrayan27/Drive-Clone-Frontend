"use client";

import { useState } from "react";
import { X, Copy, Mail, Link, Eye, Edit, Users, Check } from "lucide-react";
import { FileItem } from "@/hooks/useFiles";
import { supabase, STORAGE_BUCKET } from "@/lib/supabase";
import toast from "react-hot-toast";

interface FileSharingProps {
  file: FileItem;
  onClose: () => void;
}

interface ShareLink {
  id: string;
  email?: string;
  permission: "viewer" | "editor";
  createdAt: Date;
  expiresAt?: Date;
  isPublic?: boolean;
  accessCount?: number;
}

export default function FileSharing({ file, onClose }: FileSharingProps) {
  const [email, setEmail] = useState("");
  const [permission, setPermission] = useState<"viewer" | "editor">("viewer");
  const [shareLinks, setShareLinks] = useState<ShareLink[]>([
    // Mock data for demo - in real app this would come from database
    {
      id: "1",
      email: "user@example.com",
      permission: "viewer",
      createdAt: new Date(),
    },
    {
      id: "2",
      permission: "viewer",
      createdAt: new Date(),
    },
  ]);

  const handleShareViaEmail = async () => {
    if (!email.trim()) {
      toast.error("Please enter an email address");
      return;
    }

    // In a real app, you'd send an email invitation
    toast.success(`Invitation sent to ${email}`);
    setEmail("");

    // Add to share list
    const newShare: ShareLink = {
      id: Date.now().toString(),
      email: email.trim(),
      permission,
      createdAt: new Date(),
    };
    setShareLinks([...shareLinks, newShare]);
  };

  const handleCreatePublicLink = async () => {
    try {
      // Get public URL from Supabase
      const { data } = supabase.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(file.path);

      // Copy to clipboard
      await navigator.clipboard.writeText(data.publicUrl);
      toast.success("Public link copied to clipboard!");
    } catch (error) {
      toast.error("Failed to create public link");
    }
  };

  const handleCopyLink = async (link: ShareLink) => {
    try {
      const { data } = supabase.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(file.path);

      await navigator.clipboard.writeText(data.publicUrl);
      toast.success("Link copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  const handleRemoveShare = (shareId: string) => {
    setShareLinks(shareLinks.filter((share) => share.id !== shareId));
    toast.success("Share removed");
  };

  const handleUpdatePermission = (
    shareId: string,
    newPermission: "viewer" | "editor"
  ) => {
    setShareLinks(
      shareLinks.map((share) =>
        share.id === shareId ? { ...share, permission: newPermission } : share
      )
    );
    toast.success("Permission updated");
  };

  const getPermissionIcon = (perm: "viewer" | "editor") => {
    return perm === "viewer" ? (
      <Eye className="h-4 w-4" />
    ) : (
      <Edit className="h-4 w-4" />
    );
  };

  const getPermissionColor = (perm: "viewer" | "editor") => {
    return perm === "viewer" ? "text-blue-600" : "text-green-600";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Users className="h-6 w-6 text-blue-600" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Share "{file.name}"
              </h2>
              <p className="text-sm text-gray-500">
                Manage who can access this file
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* Share via Email */}
          <div className="space-y-3">
            <h3 className="font-medium text-gray-900">Share with people</h3>
            <div className="flex space-x-3">
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={permission}
                onChange={(e) =>
                  setPermission(e.target.value as "viewer" | "editor")
                }
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[120px]"
              >
                <option value="viewer">Can view</option>
                <option value="editor">Can edit</option>
              </select>
              <button
                onClick={handleShareViaEmail}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <Mail className="h-4 w-4 mr-2 inline" />
                Share
              </button>
            </div>
          </div>

          {/* Create Public Link */}
          <div className="space-y-3">
            <h3 className="font-medium text-gray-900">Create a link</h3>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleCreatePublicLink}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                <Link className="h-4 w-4 mr-2 inline" />
                Create Public Link
              </button>
              <span className="text-sm text-gray-500">
                Anyone with the link can view
              </span>
            </div>
          </div>

          {/* Share Statistics */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-2">Share Statistics</h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {shareLinks.length}
                </div>
                <div className="text-blue-700">Total Shares</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {shareLinks.filter((s) => s.permission === "viewer").length}
                </div>
                <div className="text-green-700">Viewers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {shareLinks.filter((s) => s.permission === "editor").length}
                </div>
                <div className="text-purple-700">Editors</div>
              </div>

              {/* Current Public URL */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-600 mb-2">
                  Current public URL:
                </p>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    readOnly
                    value={(() => {
                      try {
                        const { data } = supabase.storage
                          .from(STORAGE_BUCKET)
                          .getPublicUrl(file.path);
                        return data.publicUrl;
                      } catch {
                        return "Generating...";
                      }
                    })()}
                    className="flex-1 px-3 py-2 text-xs bg-white border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleCreatePublicLink}
                    className="px-3 py-2 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    <Copy className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Current Shares */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-900">People with access</h3>
              {shareLinks.length > 0 && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      // Bulk remove all shares
                      setShareLinks([]);
                      toast.success("All shares removed");
                    }}
                    className="text-xs px-2 py-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                  >
                    Remove All
                  </button>
                  <button
                    onClick={() => {
                      // Bulk change all to viewer
                      setShareLinks(
                        shareLinks.map((s) => ({
                          ...s,
                          permission: "viewer" as const,
                        }))
                      );
                      toast.success("All permissions changed to viewer");
                    }}
                    className="text-xs px-2 py-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                  >
                    Make All Viewers
                  </button>
                </div>
              )}
            </div>
            <div className="space-y-2">
              {shareLinks.map((share) => (
                <div
                  key={share.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`${getPermissionColor(share.permission)}`}>
                      {getPermissionIcon(share.permission)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {share.email || "Public link"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {share.permission === "viewer"
                          ? "Can view"
                          : "Can edit"}{" "}
                        • {share.createdAt.toLocaleDateString()}
                      </p>
                      {share.expiresAt && (
                        <p className="text-xs text-orange-600">
                          Expires: {share.expiresAt.toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <select
                      value={share.permission}
                      onChange={(e) =>
                        handleUpdatePermission(
                          share.id,
                          e.target.value as "viewer" | "editor"
                        )
                      }
                      className="text-xs px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 min-w-[100px]"
                    >
                      <option value="viewer">Can view</option>
                      <option value="editor">Can edit</option>
                    </select>
                    <button
                      onClick={() => handleCopyLink(share)}
                      className="p-1 text-gray-400 hover:text-gray-600"
                      title="Copy link"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleRemoveShare(share.id)}
                      className="p-1 text-red-400 hover:text-red-600"
                      title="Remove access"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
