"use client";

import UnprotectedRoute from "@/components/UnprotectedRoute";
import { registerUser } from "@/lib/api/auth";
import parseDatabaseError from "@/lib/utils/parseDatabaseError";
import { useRouter } from "next/navigation";
import { SubmitEvent, useState } from "react";

export default function Register() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [registerLoading, setRegisterLoading] = useState(false);

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setRegisterLoading(true);

    try {
      await registerUser({ name, email, password });
      router.push("/login");
    } catch (e: any) {
      setError(parseDatabaseError(e));
    } finally {
      setRegisterLoading(false);
    }
  }

  return (
    <UnprotectedRoute>
      <main className="text-center">
        <form onSubmit={handleSubmit}>
          <h1>Create an account</h1>

          <div>
            <label>Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </div>
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

          <button type="submit" disabled={registerLoading}>
            {registerLoading ? "Creating account..." : "Register"}
          </button>
        </form>
      </main>
    </UnprotectedRoute>
  );
}
