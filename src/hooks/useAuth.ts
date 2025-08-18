import { useState, useEffect } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        console.log("Auth state changed:", user ? "User signed in" : "No user");
        setUser(user);
        setLoading(false);
      },
      (error) => {
        console.error("Auth state change error:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      console.log("Attempting Google sign-in...");

      const provider = new GoogleAuthProvider();
      // Add scopes if needed
      provider.addScope("email");
      provider.addScope("profile");

      const result = await signInWithPopup(auth, provider);
      console.log("Google sign-in successful:", result.user.email);

      // Redirect to dashboard after successful sign in
      router.push("/dashboard");
      return result;
    } catch (error: any) {
      console.error("Google sign-in error:", error);

      // Handle specific Firebase errors
      if (error.code === "auth/configuration-not-found") {
        console.error(
          "Firebase configuration error - check if Google Auth is enabled in Firebase Console"
        );
        throw new Error(
          "Authentication service not configured. Please contact support."
        );
      } else if (error.code === "auth/popup-closed-by-user") {
        throw new Error("Sign-in was cancelled");
      } else if (error.code === "auth/popup-blocked") {
        throw new Error(
          "Pop-up was blocked by browser. Please allow pop-ups for this site."
        );
      } else {
        throw new Error(error.message || "Failed to sign in with Google");
      }
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      console.log("Signing out...");
      await firebaseSignOut(auth);
      console.log("Sign out successful");
      router.push("/auth/login");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return {
    user,
    loading,
    signInWithGoogle,
    signOut,
    isAuthenticated: !!user,
  };
}
