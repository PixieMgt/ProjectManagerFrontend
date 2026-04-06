"use client";

import AuthInputField from "@/components/ui/input/AuthInputField";
import AuthPage from "@/components/ui/layout/auth/AuthPage";
import { registerUser } from "@/lib/api/calls/auth";
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
    <AuthPage
      title="Register"
      submitTitle="Register"
      redirect="/login"
      loading={registerLoading}
      error={error}
      onSubmit={handleSubmit}
    >
      <AuthInputField
        label="Name"
        placeholder="name"
        value={name}
        setValue={setName}
      />
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
