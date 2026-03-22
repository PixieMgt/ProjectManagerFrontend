"use client";

import UnprotectedRoute from "@/components/UnprotectedRoute";
import { useAuth } from "@/hooks/useAuth";
import { loginUser } from "@/lib/api/auth";
import parseDatabaseError from "@/lib/utils/parseDatabaseError";
import { useRouter } from "next/navigation";
import { SubmitEvent, useEffect, useState } from "react";

export default function Login() {
  const router = useRouter();
  const { setToken, user, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [redirect, setRedirect] = useState("");

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoginLoading(true);
    setRedirect("");

    try {
      const token = await loginUser({ email, password });
      setToken(token);
      setRedirect("/dashboard");
    } catch (e: any) {
      setError(parseDatabaseError(e));
    } finally {
      setLoginLoading(false);
    }
  }

  // Redirect after user context has been set
  useEffect(() => {
    if (loading) return;
    if (!redirect) return;
    if (!user) return;
    router.push(redirect);
  }, [loading, redirect, user]);

  return (
    <UnprotectedRoute>
      <main className="text-center">
        <form onSubmit={handleSubmit}>
          <h1>Log in to your account</h1>

          <div>
            <label>E-mail</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your e-mail"
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
            />
          </div>

          {error && <p style={{ whiteSpace: "pre-wrap" }}>{error}</p>}

          <button type="submit" disabled={loginLoading}>
            {loginLoading ? "Logging in..." : "Log in"}
          </button>
        </form>
      </main>
    </UnprotectedRoute>
  );
}
