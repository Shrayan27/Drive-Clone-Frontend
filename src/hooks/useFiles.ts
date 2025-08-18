import { useState, useEffect, useCallback } from "react";
import { supabase, STORAGE_BUCKET } from "@/lib/supabase";
import { useAuth } from "./useAuth";

export interface FileItem {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  path: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export function useFiles() {
  const { user } = useAuth();
  const [files, setFiles] = useState<FileItem[]>([]);
  const [recentFiles, setRecentFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Load user's files from Supabase
  const loadFiles = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Get files from Supabase storage using base client
      // Storage policies will handle authentication based on file path
      const { data: storageFiles, error: storageError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .list(`users/${user.uid}`, {
          limit: 100,
          offset: 0,
        });

      if (storageError) {
        console.error("Error loading files from storage:", storageError);
        return;
      }

      // Get file metadata from database (you can use Supabase database too)
      const fileList: FileItem[] = storageFiles
        .filter((file) => file.name !== ".emptyFolderPlaceholder")
        .map((file) => ({
          id: file.id || file.name,
          name: file.name,
          size: file.metadata?.size || 0,
          type: file.metadata?.mimetype || "application/octet-stream",
          url: "", // Will be generated when needed
          path: `users/${user.uid}/${file.name}`,
          userId: user.uid,
          createdAt: new Date(file.created_at || Date.now()),
          updatedAt: new Date(file.updated_at || Date.now()),
        }));
      setFiles(fileList);
      setRecentFiles(fileList.slice(0, 10)); // Get 10 most recent files
    } catch (error) {
      console.error("Error loading files:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // For Firebase auth + Supabase storage, we need to use a different approach
  // We'll use the base Supabase client but with proper storage policies
  // that can identify Firebase users by their UID in the file path

  // Upload file to Supabase
  const uploadFile = async (file: File, folderPath: string = "") => {
    if (!user) {
      console.error("No user found for upload");
      throw new Error("User not authenticated");
    }

    try {
      setUploading(true);

      // Create unique filename
      const fileName = `${Date.now()}_${file.name}`;
      const filePath = folderPath
        ? `${folderPath}/${fileName}`
        : `users/${user.uid}/${fileName}`;

      // Upload to Supabase storage using base client
      // Storage policies will handle authentication based on file path
      const { data, error } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        console.error("Supabase upload error:", error);
        throw new Error(`Upload failed: ${error.message}`);
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(filePath);

      // Reload files
      await loadFiles();

      return urlData.publicUrl;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  // Delete file from Supabase
  const deleteFile = async (fileId: string, filePath: string) => {
    if (!user) return;

    try {
      // Delete from Supabase storage using base client
      // Storage policies will handle authentication based on file path
      const { error } = await supabase.storage
        .from(STORAGE_BUCKET)
        .remove([filePath]);

      if (error) {
        console.error("Delete error:", error);
        throw error;
      }

      // Reload files
      await loadFiles();
    } catch (error) {
      console.error("Error deleting file:", error);
      throw error;
    }
  };

  // Search files
  const searchFiles = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      return files;
    }

    return files.filter(
      (file) =>
        file.name.toLowerCase().includes(query.toLowerCase()) ||
        file.type.toLowerCase().includes(query.toLowerCase())
    );
  };

  // Load files on mount and when user changes
  useEffect(() => {
    if (user) {
      loadFiles();
    }
  }, [user]);

  return {
    files,
    recentFiles,
    loading,
    uploading,
    searchQuery,
    uploadFile,
    deleteFile,
    searchFiles,
    loadFiles,
  };
}
