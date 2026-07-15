"use client";

import { useState } from "react";

export default function ForgotPassword() {

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const updatePassword = async () => {

    const res = await fetch("/api/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mobile,
        password,
      }),
    });

    const data = await res.json();

    setMessage(data.message);
  };


  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

        <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          Reset Password
        </h1>


        <input
          type="text"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="w-full border p-3 rounded mb-4 text-black"
        />


        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 rounded mb-4 text-black"
        />


        <button
          onClick={updatePassword}
          className="w-full bg-blue-600 text-white py-3 rounded-lg"
        >
          Update Password
        </button>


        {message && (
          <p className="text-center mt-4 text-green-600">
            {message}
          </p>
        )}

      </div>

    </main>
  );
}