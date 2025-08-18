"use client";

import { useAuth } from "@/hooks/useAuth";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { user, loading, isAuthenticated } = useAuth();
  const pathname = usePathname();

  // Define public routes that don't require authentication
  const publicRoutes = ["/", "/auth/login", "/auth/signup"];
  const isPublicRoute = publicRoutes.includes(pathname);

  useEffect(() => {
    // If not loading and not authenticated and trying to access protected route
    if (!loading && !isAuthenticated && !isPublicRoute) {
      // Redirect to login
      window.location.href = "/auth/login";
    }
  }, [loading, isAuthenticated, isPublicRoute, pathname]);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // If it's a public route, render children
  if (isPublicRoute) {
    return <>{children}</>;
  }

  // If authenticated, render children
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // If not authenticated and not a public route, show loading (will redirect)
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
}
