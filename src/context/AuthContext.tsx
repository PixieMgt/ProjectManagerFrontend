"use client";

import { getCurrentUser } from "@/lib/api/auth";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
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
  const [loading, setLoading] = useState(true);

  async function saveUser() {
    try {
      const { user, token } = await getCurrentUser();
      setUser(user);
      setToken(token);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    saveUser();
  }, []);

  useEffect(() => {
    saveUser();
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
