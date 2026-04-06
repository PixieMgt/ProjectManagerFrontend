"use client";

import { getCurrentUser } from "@/lib/api/calls/auth";
import { User } from "@/lib/api/models/user";
import { createContext, useEffect, useState } from "react";

type AuthContextType = {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  user: any;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [token, setToken] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  async function saveUser() {
    try {
      const data = await getCurrentUser();
      if (!data?.user || !data?.token) return;
      setUser(data?.user);
      setToken(data?.token);
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
