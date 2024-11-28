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
}

type AuthAction =
  | { type: "LOGIN"; payload: { user: User; role: string; token: string } }
  | { type: "LOGOUT" };

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
      };
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
    }
  }, []);

  console.log("AuthContextProvider state:", state);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
