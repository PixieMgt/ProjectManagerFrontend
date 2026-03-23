"use client";

import UnprotectedRoute from "@/components/navigation/UnprotectedRoute";
import { registerUser } from "@/lib/api/auth";
import parseDatabaseError from "@/lib/utils/parseDatabaseError";
import Link from "next/link";
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
              className="ml-2"
            />
          </div>
          <div>
            <label>E-mail</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your e-mail"
              className="ml-2"
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              className="ml-2"
            />
          </div>

          {error && (
            <p style={{ whiteSpace: "pre-wrap" }} className="text-red-500">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={registerLoading}
            className="hover:cursor-pointer"
          >
            {registerLoading ? "Creating account..." : "Register"}
          </button>
          <Link href={"/login"} className="block text-sm underline">
            Already have an account?
          </Link>
        </form>
      </main>
    </UnprotectedRoute>
  );
}
