"use client";

import { ROUTES } from "@/routes";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const route = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) return setError(data.error);
    document.cookie = `token=${data.token}; path=/; max-age=86400`; // 1 day
    route.push(ROUTES.DASHBOARD.INDEX)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-mafaaheem-brown">Admin Login</h1>
        {error && <p className="text-red-500 mb-3">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded w-full mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded w-full mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-mafaaheem-brown text-white py-2 px-4 rounded w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
}
