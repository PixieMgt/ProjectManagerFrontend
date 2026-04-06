"use client";

import AuthInputField from "@/components/ui/input/AuthInputField";
import AuthPage from "@/components/ui/layout/auth/AuthPage";
import { useAuth } from "@/hooks/useAuth";
import { loginUser } from "@/lib/api/calls/auth";
import parseDatabaseError from "@/lib/utils/parseDatabaseError";
import Link from "next/link";
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
      const data = await loginUser({ email, password });
      if (!data?.token) return;
      setToken(data.token);
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
    <AuthPage
      title="Login"
      submitTitle="Login"
      redirect="/register"
      loading={loginLoading}
      error={error}
      onSubmit={handleSubmit}
    >
      <AuthInputField
        label="E-mail"
        placeholder="e-mail"
        value={email}
        setValue={setEmail}
      />
      <AuthInputField
        label="Password"
        placeholder="password"
        value={password}
        setValue={setPassword}
        isPassword={true}
      />
    </AuthPage>
  );
}
