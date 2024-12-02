"use client";

import { useAuthContext } from "@/hooks/useAuthContext";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { ComponentType } from "react";

interface AuthState {
  isLoggedIn: boolean;
  role: string | null;
  authInitialized: boolean;
}

interface IsAuthProps {
  allowedRoles?: string[]; // List of roles allowed to access the route
}

export default function isAuth<P extends object>(
  Component: ComponentType<P>,
  { allowedRoles }: IsAuthProps = {}
) {
  const WithAuth = (props: P) => {
    const { state } = useAuthContext();
    const { isLoggedIn, role, authInitialized }: AuthState = state;

    useEffect(() => {
      if (!authInitialized) {
        // Wait until authentication has been initialized
        return;
      }

      if (!isLoggedIn || !role) {
        // Redirect to login if not authenticated
        redirect("/");
      } else if (allowedRoles && !allowedRoles.includes(role)) {
        // Redirect if the user's role is not authorized
        redirect("/unauthorized");
      }
    }, [isLoggedIn, role, authInitialized]);

    if (!authInitialized) {
      // Show a loading indicator while auth state is initializing
      return <div>Loading...</div>;
    }

    if (
      !isLoggedIn ||
      !role ||
      (allowedRoles && !allowedRoles.includes(role))
    ) {
      return null; // Render nothing while redirecting
    }

    // Render the wrapped component with the received props
    return <Component {...props} />;
  };

  // Ensure proper typing for the wrapped component
  WithAuth.displayName = `WithAuth(${
    Component.displayName || Component.name || "Component"
  })`;

  return WithAuth;
}
