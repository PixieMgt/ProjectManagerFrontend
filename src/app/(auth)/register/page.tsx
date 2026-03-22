"use client";

import { registerUser } from "@/lib/api/auth";
import parseError from "@/lib/utils/parseError";
import { useRouter } from "next/navigation";
import { SubmitEvent, useState } from "react";

export default function Register() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await registerUser({ name, email, password });
      router.push("/login");
    } catch (e: any) {
      setError(parseError(e));
    } finally {
      setLoading(false);
    }
  }

  return (
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

        <button type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Register"}
        </button>
      </form>
    </main>
  );
}
