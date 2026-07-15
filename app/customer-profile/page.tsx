"use client";

import { useEffect, useState } from "react";

export default function CustomerProfile() {
  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    email: "",
    city: "",
    address: "",
    state: "",
    pincode: "",
    occupation: "",
    income: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const mobile = localStorage.getItem("mobile");

    if (!mobile) return;

    fetch("/api/customer-profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mobile }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setForm({
            fullName: result.customer.fullName || "",
            mobile: result.customer.mobile || "",
            email: result.customer.email || "",
            city: result.customer.city || "",
            address: result.customer.address || "",
            state: result.customer.state || "",
            pincode: result.customer.pincode || "",
            occupation: result.customer.occupation || "",
            income: result.customer.income?.toString() || "",
          });
        }
      });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };  const saveProfile = async () => {
    setLoading(true);

    const res = await fetch("/api/customer-profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const result = await res.json();

    setLoading(false);

    if (result.success) {
      alert("Profile Updated Successfully");
    } else {
      alert(result.message || "Update Failed");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">

        <h1 className="text-3xl font-bold text-blue-700 mb-6">
          My Profile
        </h1>

        <div className="grid gap-4">

          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="border p-3 rounded"
          />

          <input
            name="mobile"
            value={form.mobile}
            readOnly
            className="border p-3 rounded bg-gray-100"
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="border p-3 rounded"
          />

          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="City"
            className="border p-3 rounded"
          />

          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
            className="border p-3 rounded"
          />

          <input
            name="state"
            value={form.state}
            onChange={handleChange}
            placeholder="State"
            className="border p-3 rounded"
          />

          <input
            name="pincode"
            value={form.pincode}
            onChange={handleChange}
            placeholder="Pincode"
            className="border p-3 rounded"
          />

          <input
            name="occupation"
            value={form.occupation}
            onChange={handleChange}
            placeholder="Occupation"
            className="border p-3 rounded"
          />

          <input
            name="income"
            value={form.income}
            onChange={handleChange}
            placeholder="Monthly Income"
            className="border p-3 rounded"
          />          <button
            onClick={saveProfile}
            disabled={loading}
            className="bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700"
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>

        </div>

      </div>

    </main>
  );
}