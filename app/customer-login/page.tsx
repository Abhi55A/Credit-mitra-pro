"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CustomerLogin() {

  const router = useRouter();

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [message, setMessage] = useState("");



  const sendOTP = async () => {

    const res = await fetch("/api/send-otp", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        mobile,
      }),

    });


    const data = await res.json();


    setMessage(data.message);



    if (data.success) {

      setShowOtp(true);

      alert("Your OTP is: " + data.otp);

    }

  };




  const verifyOTP = async () => {


    const res = await fetch("/api/verify-otp", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({

        mobile,

        otp,

      }),

    });



    const data = await res.json();


    setMessage(data.message);




    if (data.success) {


      // Save customer mobile for dashboard

      localStorage.setItem("mobile", mobile);



      alert("Login Successful");



      router.push("/customer-dashboard");


    }


  };





  return (

    <main className="min-h-screen bg-gray-100 flex items-center justify-center">


      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">



        <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">

          Customer Login

        </h1>




        <input

          type="text"

          placeholder="Mobile Number"

          value={mobile}

          onChange={(e)=>setMobile(e.target.value)}

          className="w-full border p-3 rounded mb-4 text-black"

        />





        {!showOtp && (


          <button

            onClick={sendOTP}

            className="w-full bg-blue-600 text-white py-3 rounded-lg"

          >

            Send OTP

          </button>


        )}







        {showOtp && (


          <>


            <input

              type="text"

              placeholder="Enter OTP"

              value={otp}

              onChange={(e)=>setOtp(e.target.value)}

              className="w-full border p-3 rounded mb-4 text-black"

            />





            <button

              onClick={verifyOTP}

              className="w-full bg-green-600 text-white py-3 rounded-lg"

            >

              Verify OTP

            </button>



          </>


        )}







        <a

          href="/forgot-password"

          className="block text-center text-blue-600 mt-4"

        >

          Forgot Password?

        </a>






        <p className="text-center mt-4 text-blue-700">

          {message}

        </p>





      </div>



    </main>

  );

}