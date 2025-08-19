import { useEffect, useRef, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "./useAuth";

interface CollaborationUser {
  id: string;
  email: string;
  displayName: string;
}

interface CursorPosition {
  x: number;
  y: number;
  userId: string;
}

interface TextSelection {
  start: number;
  end: number;
  userId: string;
}

interface CollaborationState {
  users: CollaborationUser[];
  cursors: CursorPosition[];
  selections: TextSelection[];
}

export const useCollaboration = (fileId?: string) => {
  const { user } = useAuth();
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [collaborationState, setCollaborationState] =
    useState<CollaborationState>({
      users: [],
      cursors: [],
      selections: [],
    });
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());
  const [connectionError, setConnectionError] = useState<string | null>(null);

  // Initialize WebSocket connection
  useEffect(() => {
    if (!user || !process.env.NEXT_PUBLIC_WEBSOCKET_URL) return;

    const initializeSocket = async () => {
      try {
        const token = await user.getIdToken();
        const socket = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL, {
          auth: {
            token: token,
          },
          transports: ["websocket", "polling"],
        });

        socketRef.current = socket;

        // Connection events
        socket.on("connect", () => {
          setIsConnected(true);
          setConnectionError(null);
          console.log("Connected to collaboration server");
        });

        socket.on("disconnect", () => {
          setIsConnected(false);
          console.log("Disconnected from collaboration server");
        });

        socket.on("connect_error", (error) => {
          setConnectionError(error.message);
          console.error("Connection error:", error);
        });

        // Collaboration events
        socket.on("file-collaboration-state", (state: CollaborationState) => {
          setCollaborationState(state);
        });

        socket.on(
          "user-joined-file",
          (data: { user: CollaborationUser; totalUsers: number }) => {
            setCollaborationState((prev) => ({
              ...prev,
              users: [...prev.users, data.user],
            }));
            console.log(`User ${data.user.displayName} joined the file`);
          }
        );

        socket.on(
          "user-left-file",
          (data: { userId: string; totalUsers: number }) => {
            setCollaborationState((prev) => ({
              ...prev,
              users: prev.users.filter((u) => u.id !== data.userId),
              cursors: prev.cursors.filter((c) => c.userId !== data.userId),
              selections: prev.selections.filter(
                (s) => s.userId !== data.userId
              ),
            }));
            console.log(`User left the file`);
          }
        );

        socket.on(
          "cursor-updated",
          (data: { userId: string; x: number; y: number }) => {
            setCollaborationState((prev) => ({
              ...prev,
              cursors: prev.cursors
                .filter((c) => c.userId !== data.userId)
                .concat({
                  userId: data.userId,
                  x: data.x,
                  y: data.y,
                }),
            }));
          }
        );

        socket.on(
          "selection-updated",
          (data: { userId: string; start: number; end: number }) => {
            setCollaborationState((prev) => ({
              ...prev,
              selections: prev.selections
                .filter((s) => s.userId !== data.userId)
                .concat({
                  userId: data.userId,
                  start: data.start,
                  end: data.end,
                }),
            }));
          }
        );

        socket.on(
          "text-changed",
          (data: { userId: string; changes: any[]; timestamp: number }) => {
            // Handle real-time text changes
            console.log("Text changed by user:", data.userId, data.changes);
            // You can implement your own text change handling logic here
          }
        );

        socket.on("user-typing", (data: { userId: string; email: string }) => {
          setTypingUsers((prev) => new Set(prev).add(data.email));
        });

        socket.on("user-stopped-typing", (data: { userId: string }) => {
          setTypingUsers((prev) => {
            const newSet = new Set(prev);
            const user = collaborationState.users.find(
              (u) => u.id === data.userId
            );
            if (user) {
              newSet.delete(user.email);
            }
            return newSet;
          });
        });

        return () => {
          socket.disconnect();
        };
      } catch (error) {
        console.error("Failed to initialize socket:", error);
        setConnectionError("Failed to connect to collaboration server");
      }
    };

    initializeSocket();
  }, [user]);

  // Join/leave file collaboration
  useEffect(() => {
    if (!socketRef.current || !fileId || !isConnected) return;

    // Join the file
    socketRef.current.emit("join-file", fileId);

    return () => {
      // Leave the file when component unmounts or fileId changes
      socketRef.current?.emit("leave-file", fileId);
    };
  }, [fileId, isConnected]);

  // Update cursor position
  const updateCursor = useCallback(
    (x: number, y: number) => {
      if (!socketRef.current || !fileId) return;

      socketRef.current.emit("cursor-update", { fileId, x, y });
    },
    [fileId]
  );

  // Update text selection
  const updateSelection = useCallback(
    (start: number, end: number) => {
      if (!socketRef.current || !fileId) return;

      socketRef.current.emit("selection-update", { fileId, start, end });
    },
    [fileId]
  );

  // Send text changes
  const sendTextChange = useCallback(
    (changes: any[]) => {
      if (!socketRef.current || !fileId) return;

      socketRef.current.emit("text-change", { fileId, changes });
    },
    [fileId]
  );

  // Start/stop typing indicator
  const startTyping = useCallback(() => {
    if (!socketRef.current || !fileId) return;

    socketRef.current.emit("typing-start", fileId);
  }, [fileId]);

  const stopTyping = useCallback(() => {
    if (!socketRef.current || !fileId) return;

    socketRef.current.emit("typing-stop", fileId);
  }, [fileId]);

  // Update presence status
  const updatePresence = useCallback(
    (status: "online" | "away" | "offline") => {
      if (!socketRef.current) return;

      socketRef.current.emit("presence-update", { status });
    },
    []
  );

  return {
    isConnected,
    collaborationState,
    typingUsers,
    connectionError,
    updateCursor,
    updateSelection,
    sendTextChange,
    startTyping,
    stopTyping,
    updatePresence,
  };
};
