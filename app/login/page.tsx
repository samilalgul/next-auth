"use client";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <button
        className="px-6 py-3 bg-blue-600 text-white rounded"
        onClick={() => signIn("auth0")}
      >
        Auth0 ile Giriş Yap
      </button>
    </div>
  );
}
