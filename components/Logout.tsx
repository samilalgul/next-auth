"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ redirect: false }).then(() => {
        window.location.href = "/api/logout"; // ⬅️ Auth0 logout
      })}
      className="px-4 py-2 bg-red-600 text-white rounded"
    >
      Çıkış Yap
    </button>
  );
}
