"use client";

import { User } from "@/services/user.service";
import React, {
  createContext,
  useReducer,
  ReactNode,
  Dispatch,
  useEffect,
} from "react";
import { saveAuthData, getAuthData } from "@/lib/encrypt";

interface AuthState {
  user: User | null;
  role: string | null;
  token: string | null;
  isLoggedIn: boolean;
  authInitialized: boolean; // Track if authentication has been initialized
}

type AuthAction =
  | { type: "LOGIN"; payload: { user: User; role: string; token: string } }
  | { type: "LOGOUT" }
  | { type: "SET_AUTH_INITIALIZED" }; // Action to mark initialization complete

interface AuthContextType {
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN": {
      const newState: AuthState = {
        user: action.payload.user,
        role: action.payload.role,
        token: action.payload.token,
        isLoggedIn: true,
        authInitialized: true, // Mark as initialized
      };
      saveAuthData(newState);
      return newState;
    }
    case "LOGOUT": {
      sessionStorage.removeItem("authData");
      return {
        user: null,
        role: null,
        token: null,
        isLoggedIn: false,
        authInitialized: true, // Mark as initialized
      };
    }
    case "SET_AUTH_INITIALIZED": {
      return { ...state, authInitialized: true }; // Action to mark initialization as complete
    }
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    role: null,
    token: null,
    isLoggedIn: false,
    authInitialized: false, // Set authInitialized to false initially
  });

  useEffect(() => {
    const storedState = getAuthData();
    if (
      storedState &&
      storedState.user !== null && // Ensure user is not null
      storedState.role !== null &&
      storedState.token !== null
    ) {
      dispatch({
        type: "LOGIN",
        payload: {
          user: storedState.user,
          role: storedState.role,
          token: storedState.token,
        },
      });
    } else {
      dispatch({ type: "SET_AUTH_INITIALIZED" }); // Mark initialization as complete
    }
  }, []);

  console.log("AuthContextProvider state:", state);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {state.authInitialized ? children : <div>Loading...</div>}{" "}
      {/* Show loading until auth is initialized */}
    </AuthContext.Provider>
  );
};
