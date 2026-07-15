"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CustomerApply() {

  const router = useRouter();


  const [form, setForm] = useState({

    fullName: "",
    mobile: "",
    loanType: "Personal Loan",
    amount: "",
    city: "",
    income: "",
    cibil: "",

  });



  const [message, setMessage] = useState("");



  const handleChange = (e: any) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value,

    });

  };



  const submitLoan = async () => {

    try {


      const res = await fetch("/api/apply", {

        method: "POST",

        headers: {

          "Content-Type": "application/json",

        },


        body: JSON.stringify(form),


      });



      const data = await res.json();



      setMessage(data.message);



      if (data.success) {


        localStorage.setItem("mobile", form.mobile);



        setTimeout(() => {


          router.push("/customer-documents");


        }, 1000);



      }



    } catch (error) {


      console.log(error);


      setMessage("Something went wrong");


    }


  };





  return (

    <main className="min-h-screen bg-gray-100 p-6">


      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow">



        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">

          Apply New Loan

        </h1>




        <input

          name="fullName"

          placeholder="Full Name"

          onChange={handleChange}

          className="w-full border p-3 rounded mb-4 text-black"

        />





        <input

          name="mobile"

          placeholder="Mobile Number"

          onChange={handleChange}

          className="w-full border p-3 rounded mb-4 text-black"

        />





        <select

          name="loanType"

          onChange={handleChange}

          className="w-full border p-3 rounded mb-4 text-black"

        >

          <option>
            Personal Loan
          </option>


          <option>
            Business Loan
          </option>


          <option>
            Home Loan
          </option>


        </select>





        <input

          name="amount"

          placeholder="Loan Amount"

          onChange={handleChange}

          className="w-full border p-3 rounded mb-4 text-black"

        />





        <input

          name="city"

          placeholder="City"

          onChange={handleChange}

          className="w-full border p-3 rounded mb-4 text-black"

        />





        <input

          name="income"

          placeholder="Monthly Income"

          onChange={handleChange}

          className="w-full border p-3 rounded mb-4 text-black"

        />





        <input

          name="cibil"

          placeholder="CIBIL Score"

          onChange={handleChange}

          className="w-full border p-3 rounded mb-4 text-black"

        />





        <button

          onClick={submitLoan}

          className="w-full bg-blue-600 text-white py-3 rounded-lg"

        >

          Submit Loan Application

        </button>





        <p className="text-center text-green-600 mt-4">

          {message}

        </p>



      </div>


    </main>

  );


}