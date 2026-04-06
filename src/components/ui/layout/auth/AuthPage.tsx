import { SubmitEvent } from "react";
import Link from "next/link";

export default function AuthPage({
  title,
  submitTitle,
  redirect,
  loading,
  error,
  onSubmit,
  children,
}: {
  title: string;
  submitTitle: string;
  redirect: string;
  loading: boolean;
  error: string;
  onSubmit: (e: SubmitEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <form onSubmit={onSubmit} className="border-2 rounded-xl p-8">
        <h1 className="text-center text-3xl">{title}</h1>

        <div className="w-[25vw]">{children}</div>

        <button
          type="submit"
          disabled={loading}
          className="block mx-auto mb-4 hover:cursor-pointer"
        >
          {loading ? "Loading..." : submitTitle}
        </button>

        {error && (
          <p
            style={{ whiteSpace: "pre-wrap" }}
            className="mb-4 text-red-500 text-center"
          >
            {error}
          </p>
        )}

        <div className="flex justify-center">
          <Link href={redirect} className="text-sm underline">
            {redirect === "/register" ? `Don't have an account?` : null}
            {redirect === "/login" ? `Already have an account?` : null}
          </Link>
        </div>
      </form>
    </div>
  );
}
