"use client";

import { useEffect, useState } from "react";

export default function CustomerDashboard() {

  const [data, setData] = useState<any>(null);


  useEffect(() => {

    const mobile = localStorage.getItem("mobile");


    if (mobile) {

      fetch("/api/customer-dashboard", {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          mobile,
        }),

      })

      .then(res => res.json())

      .then(result => {

        setData(result);

      });

    }


  }, []);



  return (

    <main className="min-h-screen bg-gray-100 p-6">


      <div className="max-w-6xl mx-auto">


        <h1 className="text-3xl font-bold text-blue-700 mb-6">
          Customer Dashboard
        </h1>



        <div className="bg-white rounded-xl shadow p-6">


          <h2 className="text-xl font-bold mb-4">
            Welcome {data?.customer || "Customer"}
          </h2>



          <div className="mt-6 grid md:grid-cols-3 gap-5">


            <div className="bg-yellow-100 p-5 rounded-lg">
              <h3 className="font-bold">
                Pending Loan
              </h3>

              <p className="text-3xl font-bold">
                {data?.pending || 0}
              </p>

            </div>



            <div className="bg-green-100 p-5 rounded-lg">

              <h3 className="font-bold">
                Approved Loan
              </h3>

              <p className="text-3xl font-bold">
                {data?.approved || 0}
              </p>

            </div>



            <div className="bg-red-100 p-5 rounded-lg">

              <h3 className="font-bold">
                Rejected Loan
              </h3>

              <p className="text-3xl font-bold">
                {data?.rejected || 0}
              </p>

            </div>


          </div>




          <a
            href="/customer-apply"
            className="inline-block mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Apply New Loan
          </a>




          {/* Loan History */}

          <div className="mt-10">

            <h2 className="text-2xl font-bold mb-4">
              Loan History
            </h2>



            <div className="overflow-x-auto">


              <table className="w-full border-collapse">


                <thead className="bg-gray-200">

                  <tr>

                    <th className="border p-3">
                      Loan Type
                    </th>

                    <th className="border p-3">
                      Amount
                    </th>

                    <th className="border p-3">
                      Status
                    </th>

                    <th className="border p-3">
                      Date
                    </th>

                  </tr>

                </thead>



                <tbody>


                  {data?.applications?.length > 0 ? (

                    data.applications.map((loan:any)=>(

                      <tr key={loan.id}>


                        <td className="border p-3">
                          {loan.loanType}
                        </td>


                        <td className="border p-3">
                          ₹ {loan.amount}
                        </td>


                        <td className="border p-3">

                          <span
                            className={
                              loan.status === "Approved"
                              ? "text-green-600 font-bold"
                              : loan.status === "Rejected"
                              ? "text-red-600 font-bold"
                              : "text-yellow-600 font-bold"
                            }
                          >

                            {loan.status}

                          </span>

                        </td>


                        <td className="border p-3">

                          {new Date(loan.createdAt).toLocaleDateString()}

                        </td>


                      </tr>


                    ))


                  ) : (

                    <tr>

                      <td
                        colSpan={4}
                        className="border p-4 text-center"
                      >
                        No Loan Applications Found
                      </td>

                    </tr>

                  )}


                </tbody>


              </table>


            </div>


          </div>



        </div>


      </div>


    </main>

  );

}