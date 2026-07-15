"use client";

import { useState } from "react";

export default function ApplyNow() {
  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    email: "",
    city: "",
    loanType: "",
    amount: "",
    income: "",
    cibil: "",
  });

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        alert("Application Submitted Successfully!");

        setForm({
          fullName: "",
          mobile: "",
          email: "",
          city: "",
          loanType: "",
          amount: "",
          income: "",
          cibil: "",
        });
      } else {
        alert("Submission Failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server Error");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
          Apply For Loan
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block mb-2 font-semibold text-black text-lg">
              Full Name
            </label>
            <input
              type="text"
              value={form.fullName}
              onChange={(e)=>setForm({...form,fullName:e.target.value})}
              className="w-full rounded-lg border border-gray-300 bg-white p-3 text-black"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-black text-lg">
              Mobile Number
            </label>
            <input
              type="text"
              value={form.mobile}
              onChange={(e)=>setForm({...form,mobile:e.target.value})}
              className="w-full rounded-lg border border-gray-300 bg-white p-3 text-black"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-black text-lg">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e)=>setForm({...form,email:e.target.value})}
              className="w-full rounded-lg border border-gray-300 bg-white p-3 text-black"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-black text-lg">
              City
            </label>
            <input
              type="text"
              value={form.city}
              onChange={(e)=>setForm({...form,city:e.target.value})}
              className="w-full rounded-lg border border-gray-300 bg-white p-3 text-black"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-black text-lg">
              Loan Type
            </label>

            <select
              value={form.loanType}
              onChange={(e)=>setForm({...form,loanType:e.target.value})}
              className="w-full rounded-lg border border-gray-300 bg-white p-3 text-black"
            >
              <option value="">Select Loan Type</option>
              <option>Personal Loan</option>
              <option>Business Loan</option>
              <option>Home Loan</option>
              <option>Vehicle Loan</option>
            </select>

          </div>

          <div>
            <label className="block mb-2 font-semibold text-black text-lg">
              Required Loan Amount
            </label>

            <input
              type="number"
              value={form.amount}
              onChange={(e)=>setForm({...form,amount:e.target.value})}
              className="w-full rounded-lg border border-gray-300 bg-white p-3 text-black"
            />

          </div>

          <div>
            <label className="block mb-2 font-semibold text-black text-lg">
              Monthly Income
            </label>

            <input
              type="number"
              value={form.income}
              onChange={(e)=>setForm({...form,income:e.target.value})}
              className="w-full rounded-lg border border-gray-300 bg-white p-3 text-black"
            />

          </div>

          <div>
            <label className="block mb-2 font-semibold text-black text-lg">
              CIBIL Score
            </label>

            <input
              type="number"
              value={form.cibil}
              onChange={(e)=>setForm({...form,cibil:e.target.value})}
              className="w-full rounded-lg border border-gray-300 bg-white p-3 text-black"
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 text-white py-3 rounded-lg font-bold hover:bg-blue-800"
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>

        </form>
      </div>
    </main>
  );
}