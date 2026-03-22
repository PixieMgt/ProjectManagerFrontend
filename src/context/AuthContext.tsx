"use client";

import { getCurrentUser } from "@/lib/api/auth";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  user: any;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token || token.length === 0) return;
    (async () => {
      setLoading(true);
      try {
        const user = await getCurrentUser(token);
        setUser(user);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
