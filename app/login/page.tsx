"use client";

import { useEffect } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  useEffect(() => {
    // 500ms delay for better UX perception
    const timer = setTimeout(() => {
      signIn("auth0");
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h2>Giriş ekranına yönlendiriliyorsunuz...</h2>
    </div>
  );
}
