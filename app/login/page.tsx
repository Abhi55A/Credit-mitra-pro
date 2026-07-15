"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const result = await res.json();

    if (result.success) {
      router.push("/admin");
    } else {
      alert(result.message);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-700 to-indigo-800 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-700">
            CreditMitra Pro
          </h1>
          <p className="text-gray-500 mt-2">
            Admin Login
          </p>
        </div>

        <div className="space-y-5">

          <div>
            <label className="block mb-2 font-semibold text-black">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@creditmitra.com"
              className="w-full border rounded-lg p-3 text-black"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-black">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="w-full border rounded-lg p-3 text-black"
            />
          </div>

          <button
            type="button"
            onClick={login}
            className="w-full bg-blue-700 text-white py-3 rounded-lg font-bold hover:bg-blue-800"
          >
            Login
          </button>

        </div>

      </div>
    </main>
  );
}