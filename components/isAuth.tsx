"use client";

import { useAuthContext } from "@/hooks/useAuthContext";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { ComponentType, JSX } from "react";

interface AuthState {
  isLoggedIn: boolean;
  role: string | null;
  authInitialized: boolean;
}

interface IsAuthProps {
  allowedRoles?: string[]; // List of roles allowed to access the route
}

export default function isAuth<P extends JSX.IntrinsicAttributes>(
  Component: ComponentType<P>,
  { allowedRoles }: IsAuthProps = {} // Default to no role restriction
) {
  return function IsAuth(props: P) {
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
    }, [isLoggedIn, role, authInitialized, allowedRoles]);

    // Only render the component if the authentication state is initialized
    if (!authInitialized) {
      return null; // or a loading spinner
    }

    if (
      !isLoggedIn ||
      !role ||
      (allowedRoles && !allowedRoles.includes(role))
    ) {
      return null; // Render nothing while redirecting
    }

    return <Component {...props} />;
  };
}
