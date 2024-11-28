import { User } from "@/services/user.service";
import CryptoJS from "crypto-js";

const SECRET_KEY = "your_secret_key";

interface AuthState {
  user: User | null;
  role: string | null;
  token: string | null;
  isLoggedIn: boolean;
}

export const encryptData = (data: AuthState): string => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

export const decryptData = (encryptedData: string): AuthState => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

export const saveAuthData = (data: AuthState): void => {
  const encryptedData = encryptData(data);
  sessionStorage.setItem("authData", encryptedData);                                                                         
};

export const getAuthData = (): AuthState | null => {
  const encryptedData = sessionStorage.getItem("authData");
  if (encryptedData) {
    try {
      return decryptData(encryptedData);
    } catch (error) {
      console.error("Failed to decrypt session data:", error);
      return null;
    }
      
  }
  return null;
};

export const clearAuthData = (): void => {
  sessionStorage.removeItem("authData");
};

// New function to retrieve only the token
export const getAuthToken = (): string | null => {
  const authData = getAuthData();
  return authData?.token || null;
};
