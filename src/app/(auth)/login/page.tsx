"use client";

import { loginUser } from "@/lib/api/auth";
import parseError from "@/lib/utils/parseError";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitEvent, useState } from "react";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await loginUser({ email, password });
      router.push("/dashboard");
    } catch (e: any) {
      setError(parseError(e));
    } finally {
      setLoading(false);
    }
  }

  return (
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

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>
    </main>
  );
}
